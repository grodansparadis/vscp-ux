/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Location} from '@angular/common';
import {Compiler, Injector, NgModuleFactoryLoader, NgModuleRef, Type, isDevMode} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {from} from 'rxjs/observable/from';
import {of } from 'rxjs/observable/of';
import {concatMap} from 'rxjs/operator/concatMap';
import {every} from 'rxjs/operator/every';
import {first} from 'rxjs/operator/first';
import {last} from 'rxjs/operator/last';
import {map} from 'rxjs/operator/map';
import {mergeMap} from 'rxjs/operator/mergeMap';
import {reduce} from 'rxjs/operator/reduce';

import {applyRedirects} from './apply_redirects';
import {LoadedRouterConfig, QueryParamsHandling, ResolveData, Route, Routes, RunGuardsAndResolvers, validateConfig} from './config';
import {createRouterState} from './create_router_state';
import {createUrlTree} from './create_url_tree';
import {Event, GuardsCheckEnd, GuardsCheckStart, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, RoutesRecognized} from './events';
import {recognize} from './recognize';
import {DefaultRouteReuseStrategy, DetachedRouteHandleInternal, RouteReuseStrategy} from './route_reuse_strategy';
import {RouterConfigLoader} from './router_config_loader';
import {ChildrenOutletContexts, OutletContext} from './router_outlet_context';
import {ActivatedRoute, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot, advanceActivatedRoute, createEmptyState, equalParamsAndUrlSegments, inheritedParamsDataResolve} from './router_state';
import {Params, isNavigationCancelingError} from './shared';
import {DefaultUrlHandlingStrategy, UrlHandlingStrategy} from './url_handling_strategy';
import {UrlSerializer, UrlTree, containsTree, createEmptyUrlTree} from './url_tree';
import {andObservables, forEach, shallowEqual, waitForMap, wrapIntoObservable} from './utils/collection';
import {TreeNode} from './utils/tree';

declare let Zone: any;

/**
 * @whatItDoes Represents the extra options used during navigation.
 *
 * @stable
 */
export interface NavigationExtras {
  /**
  * Enables relative navigation from the current ActivatedRoute.
  *
  * Configuration:
  *
  * ```
  * [{
  *   path: 'parent',
  *   component: ParentComponent,
  *   children: [{
  *     path: 'list',
  *     component: ListComponent
  *   },{
  *     path: 'child',
  *     component: ChildComponent
  *   }]
  * }]
  * ```
  *
  * Navigate to list route from child route:
  *
  * ```
  *  @Component({...})
  *  class ChildComponent {
  *    constructor(private router: Router, private route: ActivatedRoute) {}
  *
  *    go() {
  *      this.router.navigate(['../list'], { relativeTo: this.route });
  *    }
  *  }
  * ```
  */
  relativeTo?: ActivatedRoute|null;

  /**
  * Sets query parameters to the URL.
  *
  * ```
  * // Navigate to /results?page=1
  * this.router.navigate(['/results'], { queryParams: { page: 1 } });
  * ```
  */
  queryParams?: Params|null;

  /**
  * Sets the hash fragment for the URL.
  *
  * ```
  * // Navigate to /results#top
  * this.router.navigate(['/results'], { fragment: 'top' });
  * ```
  */
  fragment?: string;

  /**
  * Preserves the query parameters for the next navigation.
  *
  * deprecated, use `queryParamsHandling` instead
  *
  * ```
  * // Preserve query params from /results?page=1 to /view?page=1
  * this.router.navigate(['/view'], { preserveQueryParams: true });
  * ```
  *
  * @deprecated since v4
  */
  preserveQueryParams?: boolean;

  /**
  *  config strategy to handle the query parameters for the next navigation.
  *
  * ```
  * // from /results?page=1 to /view?page=1&page=2
  * this.router.navigate(['/view'], { queryParams: { page: 2 },  queryParamsHandling: "merge" });
  * ```
  */
  queryParamsHandling?: QueryParamsHandling|null;
  /**
  * Preserves the fragment for the next navigation
  *
  * ```
  * // Preserve fragment from /results#top to /view#top
  * this.router.navigate(['/view'], { preserveFragment: true });
  * ```
  */
  preserveFragment?: boolean;
  /**
  * Navigates without pushing a new state into history.
  *
  * ```
  * // Navigate silently to /view
  * this.router.navigate(['/view'], { skipLocationChange: true });
  * ```
  */
  skipLocationChange?: boolean;
  /**
  * Navigates while replacing the current state in history.
  *
  * ```
  * // Navigate to /view
  * this.router.navigate(['/view'], { replaceUrl: true });
  * ```
  */
  replaceUrl?: boolean;
}

/**
 * @whatItDoes Error handler that is invoked when a navigation errors.
 *
 * @description
 * If the handler returns a value, the navigation promise will be resolved with this value.
 * If the handler throws an exception, the navigation promise will be rejected with
 * the exception.
 *
 * @stable
 */
export type ErrorHandler = (error: any) => any;

function defaultErrorHandler(error: any): any {
  throw error;
}

type NavigationSource = 'imperative' | 'popstate' | 'hashchange';

type NavigationParams = {
  id: number,
  rawUrl: UrlTree,
  extras: NavigationExtras,
  resolve: any,
  reject: any,
  promise: Promise<boolean>,
  source: NavigationSource,
};

/**
 * @internal
 */
export type RouterHook = (snapshot: RouterStateSnapshot) => Observable<void>;

/**
 * @internal
 */
function defaultRouterHook(snapshot: RouterStateSnapshot): Observable<void> {
  return of (null) as any;
}

/**
 * @whatItDoes Provides the navigation and url manipulation capabilities.
 *
 * See {@link Routes} for more details and examples.
 *
 * @ngModule RouterModule
 *
 * @stable
 */
export class Router {
  private currentUrlTree: UrlTree;
  private rawUrlTree: UrlTree;

  private navigations = new BehaviorSubject<NavigationParams>(null !);
  private routerEvents = new Subject<Event>();

  private currentRouterState: RouterState;
  private locationSubscription: Subscription;
  private navigationId: number = 0;
  private configLoader: RouterConfigLoader;
  private ngModule: NgModuleRef<any>;

  /**
   * Error handler that is invoked when a navigation errors.
   *
   * See {@link ErrorHandler} for more information.
   */
  errorHandler: ErrorHandler = defaultErrorHandler;



  /**
   * Indicates if at least one navigation happened.
   */
  navigated: boolean = false;

  /**
   * Used by RouterModule. This allows us to
   * pause the navigation either before preactivation or after it.
   * @internal
   */
  hooks: {beforePreactivation: RouterHook, afterPreactivation: RouterHook} = {
    beforePreactivation: defaultRouterHook,
    afterPreactivation: defaultRouterHook
  };

  /**
   * Extracts and merges URLs. Used for AngularJS to Angular migrations.
   */
  urlHandlingStrategy: UrlHandlingStrategy = new DefaultUrlHandlingStrategy();

  routeReuseStrategy: RouteReuseStrategy = new DefaultRouteReuseStrategy();

  /**
   * Creates the router service.
   */
  // TODO: vsavkin make internal after the final is out.
  constructor(
      private rootComponentType: Type<any>|null, private urlSerializer: UrlSerializer,
      private rootContexts: ChildrenOutletContexts, private location: Location, injector: Injector,
      loader: NgModuleFactoryLoader, compiler: Compiler, public config: Routes) {
    const onLoadStart = (r: Route) => this.triggerEvent(new RouteConfigLoadStart(r));
    const onLoadEnd = (r: Route) => this.triggerEvent(new RouteConfigLoadEnd(r));

    this.ngModule = injector.get(NgModuleRef);

    this.resetConfig(config);
    this.currentUrlTree = createEmptyUrlTree();
    this.rawUrlTree = this.currentUrlTree;

    this.configLoader = new RouterConfigLoader(loader, compiler, onLoadStart, onLoadEnd);
    this.currentRouterState = createEmptyState(this.currentUrlTree, this.rootComponentType);
    this.processNavigations();
  }

  /**
   * @internal
   * TODO: this should be removed once the constructor of the router made internal
   */
  resetRootComponentType(rootComponentType: Type<any>): void {
    this.rootComponentType = rootComponentType;
    // TODO: vsavkin router 4.0 should make the root component set to null
    // this will simplify the lifecycle of the router.
    this.currentRouterState.root.component = this.rootComponentType;
  }

  /**
   * Sets up the location change listener and performs the initial navigation.
   */
  initialNavigation(): void {
    this.setUpLocationChangeListener();
    if (this.navigationId === 0) {
      this.navigateByUrl(this.location.path(true), {replaceUrl: true});
    }
  }

  /**
   * Sets up the location change listener.
   */
  setUpLocationChangeListener(): void {
    // Zone.current.wrap is needed because of the issue with RxJS scheduler,
    // which does not work properly with zone.js in IE and Safari
    if (!this.locationSubscription) {
      this.locationSubscription = <any>this.location.subscribe(Zone.current.wrap((change: any) => {
        const rawUrlTree = this.urlSerializer.parse(change['url']);
        const source: NavigationSource = change['type'] === 'popstate' ? 'popstate' : 'hashchange';
        setTimeout(() => { this.scheduleNavigation(rawUrlTree, source, {replaceUrl: true}); }, 0);
      }));
    }
  }

  /** The current route state */
  get routerState(): RouterState { return this.currentRouterState; }

  /** The current url */
  get url(): string { return this.serializeUrl(this.currentUrlTree); }

  /** An observable of router events */
  get events(): Observable<Event> { return this.routerEvents; }

  /** @internal */
  triggerEvent(e: Event): void { this.routerEvents.next(e); }

  /**
   * Resets the configuration used for navigation and generating links.
   *
   * ### Usage
   *
   * ```
   * router.resetConfig([
   *  { path: 'team/:id', component: TeamCmp, children: [
   *    { path: 'simple', component: SimpleCmp },
   *    { path: 'user/:name', component: UserCmp }
   *  ]}
   * ]);
   * ```
   */
  resetConfig(config: Routes): void {
    validateConfig(config);
    this.config = config;
    this.navigated = false;
  }

  /** @docsNotRequired */
  ngOnDestroy(): void { this.dispose(); }

  /** Disposes of the router */
  dispose(): void {
    if (this.locationSubscription) {
      this.locationSubscription.unsubscribe();
      this.locationSubscription = null !;
    }
  }

  /**
   * Applies an array of commands to the current url tree and creates a new url tree.
   *
   * When given an activate route, applies the given commands starting from the route.
   * When not given a route, applies the given command starting from the root.
   *
   * ### Usage
   *
   * ```
   * // create /team/33/user/11
   * router.createUrlTree(['/team', 33, 'user', 11]);
   *
   * // create /team/33;expand=true/user/11
   * router.createUrlTree(['/team', 33, {expand: true}, 'user', 11]);
   *
   * // you can collapse static segments like this (this works only with the first passed-in value):
   * router.createUrlTree(['/team/33/user', userId]);
   *
   * // If the first segment can contain slashes, and you do not want the router to split it, you
   * // can do the following:
   *
   * router.createUrlTree([{segmentPath: '/one/two'}]);
   *
   * // create /team/33/(user/11//right:chat)
   * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: 'chat'}}]);
   *
   * // remove the right secondary node
   * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: null}}]);
   *
   * // assuming the current url is `/team/33/user/11` and the route points to `user/11`
   *
   * // navigate to /team/33/user/11/details
   * router.createUrlTree(['details'], {relativeTo: route});
   *
   * // navigate to /team/33/user/22
   * router.createUrlTree(['../22'], {relativeTo: route});
   *
   * // navigate to /team/44/user/22
   * router.createUrlTree(['../../team/44/user/22'], {relativeTo: route});
   * ```
   */
  createUrlTree(commands: any[], navigationExtras: NavigationExtras = {}): UrlTree {
    const {relativeTo,          queryParams,         fragment,
           preserveQueryParams, queryParamsHandling, preserveFragment} = navigationExtras;
    if (isDevMode() && preserveQueryParams && <any>console && <any>console.warn) {
      console.warn('preserveQueryParams is deprecated, use queryParamsHandling instead.');
    }
    const a = relativeTo || this.routerState.root;
    const f = preserveFragment ? this.currentUrlTree.fragment : fragment;
    let q: Params|null = null;
    if (queryParamsHandling) {
      switch (queryParamsHandling) {
        case 'merge':
          q = {...this.currentUrlTree.queryParams, ...queryParams};
          break;
        case 'preserve':
          q = this.currentUrlTree.queryParams;
          break;
        default:
          q = queryParams || null;
      }
    } else {
      q = preserveQueryParams ? this.currentUrlTree.queryParams : queryParams || null;
    }
    return createUrlTree(a, this.currentUrlTree, commands, q !, f !);
  }

  /**
   * Navigate based on the provided url. This navigation is always absolute.
   *
   * Returns a promise that:
   * - resolves to 'true' when navigation succeeds,
   * - resolves to 'false' when navigation fails,
   * - is rejected when an error happens.
   *
   * ### Usage
   *
   * ```
   * router.navigateByUrl("/team/33/user/11");
   *
   * // Navigate without updating the URL
   * router.navigateByUrl("/team/33/user/11", { skipLocationChange: true });
   * ```
   *
   * In opposite to `navigate`, `navigateByUrl` takes a whole URL
   * and does not apply any delta to the current one.
   */
  navigateByUrl(url: string|UrlTree, extras: NavigationExtras = {skipLocationChange: false}):
      Promise<boolean> {
    const urlTree = url instanceof UrlTree ? url : this.parseUrl(url);
    const mergedTree = this.urlHandlingStrategy.merge(urlTree, this.rawUrlTree);

    return this.scheduleNavigation(mergedTree, 'imperative', extras);
  }

  /**
   * Navigate based on the provided array of commands and a starting point.
   * If no starting route is provided, the navigation is absolute.
   *
   * Returns a promise that:
   * - resolves to 'true' when navigation succeeds,
   * - resolves to 'false' when navigation fails,
   * - is rejected when an error happens.
   *
   * ### Usage
   *
   * ```
   * router.navigate(['team', 33, 'user', 11], {relativeTo: route});
   *
   * // Navigate without updating the URL
   * router.navigate(['team', 33, 'user', 11], {relativeTo: route, skipLocationChange: true});
   * ```
   *
   * In opposite to `navigateByUrl`, `navigate` always takes a delta that is applied to the current
   * URL.
   */
  navigate(commands: any[], extras: NavigationExtras = {skipLocationChange: false}):
      Promise<boolean> {
    validateCommands(commands);
    if (typeof extras.queryParams === 'object' && extras.queryParams !== null) {
      extras.queryParams = this.removeEmptyProps(extras.queryParams);
    }
    return this.navigateByUrl(this.createUrlTree(commands, extras), extras);
  }

  /** Serializes a {@link UrlTree} into a string */
  serializeUrl(url: UrlTree): string { return this.urlSerializer.serialize(url); }

  /** Parses a string into a {@link UrlTree} */
  parseUrl(url: string): UrlTree { return this.urlSerializer.parse(url); }

  /** Returns whether the url is activated */
  isActive(url: string|UrlTree, exact: boolean): boolean {
    if (url instanceof UrlTree) {
      return containsTree(this.currentUrlTree, url, exact);
    }

    const urlTree = this.urlSerializer.parse(url);
    return containsTree(this.currentUrlTree, urlTree, exact);
  }

  private removeEmptyProps(params: Params): Params {
    return Object.keys(params).reduce((result: Params, key: string) => {
      const value: any = params[key];
      if (value !== null && value !== undefined) {
        result[key] = value;
      }
      return result;
    }, {});
  }

  private processNavigations(): void {
    concatMap
        .call(
            this.navigations,
            (nav: NavigationParams) => {
              if (nav) {
                this.executeScheduledNavigation(nav);
                // a failed navigation should not stop the router from processing
                // further navigations => the catch
                return nav.promise.catch(() => {});
              } else {
                return <any>of (null);
              }
            })
        .subscribe(() => {});
  }

  private scheduleNavigation(rawUrl: UrlTree, source: NavigationSource, extras: NavigationExtras):
      Promise<boolean> {
    const lastNavigation = this.navigations.value;

    // If the user triggers a navigation imperatively (e.g., by using navigateByUrl),
    // and that navigation results in 'replaceState' that leads to the same URL,
    // we should skip those.
    if (lastNavigation && source !== 'imperative' && lastNavigation.source === 'imperative' &&
        lastNavigation.rawUrl.toString() === rawUrl.toString()) {
      return Promise.resolve(true);  // return value is not used
    }

    // Because of a bug in IE and Edge, the location class fires two events (popstate and
    // hashchange) every single time. The second one should be ignored. Otherwise, the URL will
    // flicker.
    if (lastNavigation && source == 'hashchange' && lastNavigation.source === 'popstate' &&
        lastNavigation.rawUrl.toString() === rawUrl.toString()) {
      return Promise.resolve(true);  // return value is not used
    }

    let resolve: any = null;
    let reject: any = null;

    const promise = new Promise<boolean>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    const id = ++this.navigationId;
    this.navigations.next({id, source, rawUrl, extras, resolve, reject, promise});

    // Make sure that the error is propagated even though `processNavigations` catch
    // handler does not rethrow
    return promise.catch((e: any) => Promise.reject(e));
  }

  private executeScheduledNavigation({id, rawUrl, extras, resolve, reject}: NavigationParams):
      void {
    const url = this.urlHandlingStrategy.extract(rawUrl);
    const urlTransition = !this.navigated || url.toString() !== this.currentUrlTree.toString();

    if (urlTransition && this.urlHandlingStrategy.shouldProcessUrl(rawUrl)) {
      this.routerEvents.next(new NavigationStart(id, this.serializeUrl(url)));
      Promise.resolve()
          .then(
              (_) => this.runNavigate(
                  url, rawUrl, !!extras.skipLocationChange, !!extras.replaceUrl, id, null))
          .then(resolve, reject);

      // we cannot process the current URL, but we could process the previous one =>
      // we need to do some cleanup
    } else if (
        urlTransition && this.rawUrlTree &&
        this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)) {
      this.routerEvents.next(new NavigationStart(id, this.serializeUrl(url)));
      Promise.resolve()
          .then(
              (_) => this.runNavigate(
                  url, rawUrl, false, false, id,
                  createEmptyState(url, this.rootComponentType).snapshot))
          .then(resolve, reject);

    } else {
      this.rawUrlTree = rawUrl;
      resolve(null);
    }
  }

  private runNavigate(
      url: UrlTree, rawUrl: UrlTree, shouldPreventPushState: boolean, shouldReplaceUrl: boolean,
      id: number, precreatedState: RouterStateSnapshot|null): Promise<boolean> {
    if (id !== this.navigationId) {
      this.location.go(this.urlSerializer.serialize(this.currentUrlTree));
      this.routerEvents.next(new NavigationCancel(
          id, this.serializeUrl(url),
          `Navigation ID ${id} is not equal to the current navigation id ${this.navigationId}`));
      return Promise.resolve(false);
    }

    return new Promise((resolvePromise, rejectPromise) => {
      // create an observable of the url and route state snapshot
      // this operation do not result in any side effects
      let urlAndSnapshot$: Observable<{appliedUrl: UrlTree, snapshot: RouterStateSnapshot}>;
      if (!precreatedState) {
        const moduleInjector = this.ngModule.injector;
        const redirectsApplied$ =
            applyRedirects(moduleInjector, this.configLoader, this.urlSerializer, url, this.config);

        urlAndSnapshot$ = mergeMap.call(redirectsApplied$, (appliedUrl: UrlTree) => {
          return map.call(
              recognize(
                  this.rootComponentType, this.config, appliedUrl, this.serializeUrl(appliedUrl)),
              (snapshot: any) => {

                this.routerEvents.next(new RoutesRecognized(
                    id, this.serializeUrl(url), this.serializeUrl(appliedUrl), snapshot));

                return {appliedUrl, snapshot};
              });
        });
      } else {
        urlAndSnapshot$ = of ({appliedUrl: url, snapshot: precreatedState});
      }

      const beforePreactivationDone$ = mergeMap.call(
          urlAndSnapshot$, (p: {appliedUrl: string, snapshot: RouterStateSnapshot}) => {
            return map.call(this.hooks.beforePreactivation(p.snapshot), () => p);
          });

      // run preactivation: guards and data resolvers
      let preActivation: PreActivation;

      const preactivationTraverse$ = map.call(
          beforePreactivationDone$,
          ({appliedUrl, snapshot}: {appliedUrl: string, snapshot: RouterStateSnapshot}) => {
            const moduleInjector = this.ngModule.injector;
            preActivation =
                new PreActivation(snapshot, this.currentRouterState.snapshot, moduleInjector);
            preActivation.traverse(this.rootContexts);
            return {appliedUrl, snapshot};
          });

      const preactivationCheckGuards$ = mergeMap.call(
          preactivationTraverse$,
          ({appliedUrl, snapshot}: {appliedUrl: string, snapshot: RouterStateSnapshot}) => {
            if (this.navigationId !== id) return of (false);

            this.triggerEvent(
                new GuardsCheckStart(id, this.serializeUrl(url), appliedUrl, snapshot));

            return map.call(preActivation.checkGuards(), (shouldActivate: boolean) => {
              this.triggerEvent(new GuardsCheckEnd(
                  id, this.serializeUrl(url), appliedUrl, snapshot, shouldActivate));
              return {appliedUrl: appliedUrl, snapshot: snapshot, shouldActivate: shouldActivate};
            });
          });

      const preactivationResolveData$ = mergeMap.call(
          preactivationCheckGuards$,
          (p: {appliedUrl: string, snapshot: RouterStateSnapshot, shouldActivate: boolean}) => {
            if (this.navigationId !== id) return of (false);

            if (p.shouldActivate && preActivation.isActivating()) {
              this.triggerEvent(
                  new ResolveStart(id, this.serializeUrl(url), p.appliedUrl, p.snapshot));
              return map.call(preActivation.resolveData(), () => {
                this.triggerEvent(
                    new ResolveEnd(id, this.serializeUrl(url), p.appliedUrl, p.snapshot));
                return p;
              });
            } else {
              return of (p);
            }
          });

      const preactivationDone$ = mergeMap.call(preactivationResolveData$, (p: any) => {
        return map.call(this.hooks.afterPreactivation(p.snapshot), () => p);
      });


      // create router state
      // this operation has side effects => route state is being affected
      const routerState$ =
          map.call(preactivationDone$, ({appliedUrl, snapshot, shouldActivate}: any) => {
            if (shouldActivate) {
              const state =
                  createRouterState(this.routeReuseStrategy, snapshot, this.currentRouterState);
              return {appliedUrl, state, shouldActivate};
            } else {
              return {appliedUrl, state: null, shouldActivate};
            }
          });


      // applied the new router state
      // this operation has side effects
      let navigationIsSuccessful: boolean;
      const storedState = this.currentRouterState;
      const storedUrl = this.currentUrlTree;

      routerState$
          .forEach(({appliedUrl, state, shouldActivate}: any) => {
            if (!shouldActivate || id !== this.navigationId) {
              navigationIsSuccessful = false;
              return;
            }

            this.currentUrlTree = appliedUrl;
            this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, rawUrl);

            this.currentRouterState = state;

            if (!shouldPreventPushState) {
              const path = this.urlSerializer.serialize(this.rawUrlTree);
              if (this.location.isCurrentPathEqualTo(path) || shouldReplaceUrl) {
                this.location.replaceState(path);
              } else {
                this.location.go(path);
              }
            }

            new ActivateRoutes(this.routeReuseStrategy, state, storedState)
                .activate(this.rootContexts);

            navigationIsSuccessful = true;
          })
          .then(
              () => {
                if (navigationIsSuccessful) {
                  this.navigated = true;
                  this.routerEvents.next(new NavigationEnd(
                      id, this.serializeUrl(url), this.serializeUrl(this.currentUrlTree)));
                  resolvePromise(true);
                } else {
                  this.resetUrlToCurrentUrlTree();
                  this.routerEvents.next(new NavigationCancel(id, this.serializeUrl(url), ''));
                  resolvePromise(false);
                }
              },
              (e: any) => {
                if (isNavigationCancelingError(e)) {
                  this.resetUrlToCurrentUrlTree();
                  this.navigated = true;
                  this.routerEvents.next(
                      new NavigationCancel(id, this.serializeUrl(url), e.message));
                  resolvePromise(false);
                } else {
                  this.routerEvents.next(new NavigationError(id, this.serializeUrl(url), e));
                  try {
                    resolvePromise(this.errorHandler(e));
                  } catch (ee) {
                    rejectPromise(ee);
                  }
                }

                this.currentRouterState = storedState;
                this.currentUrlTree = storedUrl;
                this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, rawUrl);
                this.location.replaceState(this.serializeUrl(this.rawUrlTree));
              });
    });
  }

  private resetUrlToCurrentUrlTree(): void {
    const path = this.urlSerializer.serialize(this.rawUrlTree);
    this.location.replaceState(path);
  }
}


class CanActivate {
  constructor(public path: ActivatedRouteSnapshot[]) {}
  get route(): ActivatedRouteSnapshot { return this.path[this.path.length - 1]; }
}

class CanDeactivate {
  constructor(public component: Object|null, public route: ActivatedRouteSnapshot) {}
}

export class PreActivation {
  private canActivateChecks: CanActivate[] = [];
  private canDeactivateChecks: CanDeactivate[] = [];

  constructor(
      private future: RouterStateSnapshot, private curr: RouterStateSnapshot,
      private moduleInjector: Injector) {}

  traverse(parentContexts: ChildrenOutletContexts): void {
    const futureRoot = this.future._root;
    const currRoot = this.curr ? this.curr._root : null;
    this.traverseChildRoutes(futureRoot, currRoot, parentContexts, [futureRoot.value]);
  }

  // TODO(jasonaden): Refactor checkGuards and resolveData so they can collect the checks
  // and guards before mapping into the observable. Likely remove the observable completely
  // and make these pure functions so they are more predictable and don't rely on so much
  // external state.
  checkGuards(): Observable<boolean> {
    if (!this.isDeactivating() && !this.isActivating()) {
      return of (true);
    }
    const canDeactivate$ = this.runCanDeactivateChecks();
    return mergeMap.call(
        canDeactivate$,
        (canDeactivate: boolean) => canDeactivate ? this.runCanActivateChecks() : of (false));
  }

  resolveData(): Observable<any> {
    if (!this.isActivating()) return of (null);
    const checks$ = from(this.canActivateChecks);
    const runningChecks$ =
        concatMap.call(checks$, (check: CanActivate) => this.runResolve(check.route));
    return reduce.call(runningChecks$, (_: any, __: any) => _);
  }

  isDeactivating(): boolean { return this.canDeactivateChecks.length !== 0; }

  isActivating(): boolean { return this.canActivateChecks.length !== 0; }

  private traverseChildRoutes(
      futureNode: TreeNode<ActivatedRouteSnapshot>, currNode: TreeNode<ActivatedRouteSnapshot>|null,
      contexts: ChildrenOutletContexts|null, futurePath: ActivatedRouteSnapshot[]): void {
    const prevChildren = nodeChildrenAsMap(currNode);

    // Process the children of the future route
    futureNode.children.forEach(c => {
      this.traverseRoutes(c, prevChildren[c.value.outlet], contexts, futurePath.concat([c.value]));
      delete prevChildren[c.value.outlet];
    });

    // Process any children left from the current route (not active for the future route)
    forEach(
        prevChildren, (v: TreeNode<ActivatedRouteSnapshot>, k: string) =>
                          this.deactivateRouteAndItsChildren(v, contexts !.getContext(k)));
  }

  private traverseRoutes(
      futureNode: TreeNode<ActivatedRouteSnapshot>, currNode: TreeNode<ActivatedRouteSnapshot>,
      parentContexts: ChildrenOutletContexts|null, futurePath: ActivatedRouteSnapshot[]): void {
    const future = futureNode.value;
    const curr = currNode ? currNode.value : null;
    const context = parentContexts ? parentContexts.getContext(futureNode.value.outlet) : null;

    // reusing the node
    if (curr && future._routeConfig === curr._routeConfig) {
      const shouldRunGuardsAndResolvers = this.shouldRunGuardsAndResolvers(
          curr, future, future._routeConfig !.runGuardsAndResolvers);
      if (shouldRunGuardsAndResolvers) {
        this.canActivateChecks.push(new CanActivate(futurePath));
      } else {
        // we need to set the data
        future.data = curr.data;
        future._resolvedData = curr._resolvedData;
      }

      // If we have a component, we need to go through an outlet.
      if (future.component) {
        this.traverseChildRoutes(
            futureNode, currNode, context ? context.children : null, futurePath);

        // if we have a componentless route, we recurse but keep the same outlet map.
      } else {
        this.traverseChildRoutes(futureNode, currNode, parentContexts, futurePath);
      }

      if (shouldRunGuardsAndResolvers) {
        const outlet = context !.outlet !;
        this.canDeactivateChecks.push(new CanDeactivate(outlet.component, curr));
      }
    } else {
      if (curr) {
        this.deactivateRouteAndItsChildren(currNode, context);
      }

      this.canActivateChecks.push(new CanActivate(futurePath));
      // If we have a component, we need to go through an outlet.
      if (future.component) {
        this.traverseChildRoutes(futureNode, null, context ? context.children : null, futurePath);

        // if we have a componentless route, we recurse but keep the same outlet map.
      } else {
        this.traverseChildRoutes(futureNode, null, parentContexts, futurePath);
      }
    }
  }

  private shouldRunGuardsAndResolvers(
      curr: ActivatedRouteSnapshot, future: ActivatedRouteSnapshot,
      mode: RunGuardsAndResolvers|undefined): boolean {
    switch (mode) {
      case 'always':
        return true;

      case 'paramsOrQueryParamsChange':
        return !equalParamsAndUrlSegments(curr, future) ||
            !shallowEqual(curr.queryParams, future.queryParams);

      case 'paramsChange':
      default:
        return !equalParamsAndUrlSegments(curr, future);
    }
  }

  private deactivateRouteAndItsChildren(
      route: TreeNode<ActivatedRouteSnapshot>, context: OutletContext|null): void {
    const children = nodeChildrenAsMap(route);
    const r = route.value;

    forEach(children, (node: TreeNode<ActivatedRouteSnapshot>, childName: string) => {
      if (!r.component) {
        this.deactivateRouteAndItsChildren(node, context);
      } else if (context) {
        this.deactivateRouteAndItsChildren(node, context.children.getContext(childName));
      } else {
        this.deactivateRouteAndItsChildren(node, null);
      }
    });

    if (!r.component) {
      this.canDeactivateChecks.push(new CanDeactivate(null, r));
    } else if (context && context.outlet && context.outlet.isActivated) {
      this.canDeactivateChecks.push(new CanDeactivate(context.outlet.component, r));
    } else {
      this.canDeactivateChecks.push(new CanDeactivate(null, r));
    }
  }

  private runCanDeactivateChecks(): Observable<boolean> {
    const checks$ = from(this.canDeactivateChecks);
    const runningChecks$ = mergeMap.call(
        checks$, (check: CanDeactivate) => this.runCanDeactivate(check.component, check.route));
    return every.call(runningChecks$, (result: boolean) => result === true);
  }

  private runCanActivateChecks(): Observable<boolean> {
    const checks$ = from(this.canActivateChecks);
    const runningChecks$ = concatMap.call(
        checks$, (check: CanActivate) => andObservables(from(
                     [this.runCanActivateChild(check.path), this.runCanActivate(check.route)])));
    return every.call(runningChecks$, (result: boolean) => result === true);
  }

  private runCanActivate(future: ActivatedRouteSnapshot): Observable<boolean> {
    const canActivate = future._routeConfig ? future._routeConfig.canActivate : null;
    if (!canActivate || canActivate.length === 0) return of (true);
    const obs = map.call(from(canActivate), (c: any) => {
      const guard = this.getToken(c, future);
      let observable: Observable<boolean>;
      if (guard.canActivate) {
        observable = wrapIntoObservable(guard.canActivate(future, this.future));
      } else {
        observable = wrapIntoObservable(guard(future, this.future));
      }
      return first.call(observable);
    });
    return andObservables(obs);
  }

  private runCanActivateChild(path: ActivatedRouteSnapshot[]): Observable<boolean> {
    const future = path[path.length - 1];

    const canActivateChildGuards = path.slice(0, path.length - 1)
                                       .reverse()
                                       .map(p => this.extractCanActivateChild(p))
                                       .filter(_ => _ !== null);

    return andObservables(map.call(from(canActivateChildGuards), (d: any) => {
      const obs = map.call(from(d.guards), (c: any) => {
        const guard = this.getToken(c, d.node);
        let observable: Observable<boolean>;
        if (guard.canActivateChild) {
          observable = wrapIntoObservable(guard.canActivateChild(future, this.future));
        } else {
          observable = wrapIntoObservable(guard(future, this.future));
        }
        return first.call(observable);
      });
      return andObservables(obs);
    }));
  }

  private extractCanActivateChild(p: ActivatedRouteSnapshot):
      {node: ActivatedRouteSnapshot, guards: any[]}|null {
    const canActivateChild = p._routeConfig ? p._routeConfig.canActivateChild : null;
    if (!canActivateChild || canActivateChild.length === 0) return null;
    return {node: p, guards: canActivateChild};
  }

  private runCanDeactivate(component: Object|null, curr: ActivatedRouteSnapshot):
      Observable<boolean> {
    const canDeactivate = curr && curr._routeConfig ? curr._routeConfig.canDeactivate : null;
    if (!canDeactivate || canDeactivate.length === 0) return of (true);
    const canDeactivate$ = mergeMap.call(from(canDeactivate), (c: any) => {
      const guard = this.getToken(c, curr);
      let observable: Observable<boolean>;
      if (guard.canDeactivate) {
        observable =
            wrapIntoObservable(guard.canDeactivate(component, curr, this.curr, this.future));
      } else {
        observable = wrapIntoObservable(guard(component, curr, this.curr, this.future));
      }
      return first.call(observable);
    });
    return every.call(canDeactivate$, (result: any) => result === true);
  }

  private runResolve(future: ActivatedRouteSnapshot): Observable<any> {
    const resolve = future._resolve;
    return map.call(this.resolveNode(resolve, future), (resolvedData: any): any => {
      future._resolvedData = resolvedData;
      future.data = {...future.data, ...inheritedParamsDataResolve(future).resolve};
      return null;
    });
  }

  private resolveNode(resolve: ResolveData, future: ActivatedRouteSnapshot): Observable<any> {
    const keys = Object.keys(resolve);
    if (keys.length === 0) {
      return of ({});
    }
    if (keys.length === 1) {
      const key = keys[0];
      return map.call(
          this.getResolver(resolve[key], future), (value: any) => { return {[key]: value}; });
    }
    const data: {[k: string]: any} = {};
    const runningResolvers$ = mergeMap.call(from(keys), (key: string) => {
      return map.call(this.getResolver(resolve[key], future), (value: any) => {
        data[key] = value;
        return value;
      });
    });
    return map.call(last.call(runningResolvers$), () => data);
  }

  private getResolver(injectionToken: any, future: ActivatedRouteSnapshot): Observable<any> {
    const resolver = this.getToken(injectionToken, future);
    return resolver.resolve ? wrapIntoObservable(resolver.resolve(future, this.future)) :
                              wrapIntoObservable(resolver(future, this.future));
  }

  private getToken(token: any, snapshot: ActivatedRouteSnapshot): any {
    const config = closestLoadedConfig(snapshot);
    const injector = config ? config.module.injector : this.moduleInjector;
    return injector.get(token);
  }
}

class ActivateRoutes {
  constructor(
      private routeReuseStrategy: RouteReuseStrategy, private futureState: RouterState,
      private currState: RouterState) {}

  activate(parentContexts: ChildrenOutletContexts): void {
    const futureRoot = this.futureState._root;
    const currRoot = this.currState ? this.currState._root : null;

    this.deactivateChildRoutes(futureRoot, currRoot, parentContexts);
    advanceActivatedRoute(this.futureState.root);
    this.activateChildRoutes(futureRoot, currRoot, parentContexts);
  }

  // De-activate the child route that are not re-used for the future state
  private deactivateChildRoutes(
      futureNode: TreeNode<ActivatedRoute>, currNode: TreeNode<ActivatedRoute>|null,
      contexts: ChildrenOutletContexts): void {
    const children: {[outletName: string]: TreeNode<ActivatedRoute>} = nodeChildrenAsMap(currNode);

    // Recurse on the routes active in the future state to de-activate deeper children
    futureNode.children.forEach(futureChild => {
      const childOutletName = futureChild.value.outlet;
      this.deactivateRoutes(futureChild, children[childOutletName], contexts);
      delete children[childOutletName];
    });

    // De-activate the routes that will not be re-used
    forEach(children, (v: TreeNode<ActivatedRoute>, childName: string) => {
      this.deactivateRouteAndItsChildren(v, contexts);
    });
  }

  private deactivateRoutes(
      futureNode: TreeNode<ActivatedRoute>, currNode: TreeNode<ActivatedRoute>,
      parentContext: ChildrenOutletContexts): void {
    const future = futureNode.value;
    const curr = currNode ? currNode.value : null;

    if (future === curr) {
      // Reusing the node, check to see if the children need to be de-activated
      if (future.component) {
        // If we have a normal route, we need to go through an outlet.
        const context = parentContext.getContext(future.outlet);
        if (context) {
          this.deactivateChildRoutes(futureNode, currNode, context.children);
        }
      } else {
        // if we have a componentless route, we recurse but keep the same outlet map.
        this.deactivateChildRoutes(futureNode, currNode, parentContext);
      }
    } else {
      if (curr) {
        // Deactivate the current route which will not be re-used
        this.deactivateRouteAndItsChildren(currNode, parentContext);
      }
    }
  }

  private deactivateRouteAndItsChildren(
      route: TreeNode<ActivatedRoute>, parentContexts: ChildrenOutletContexts): void {
    if (this.routeReuseStrategy.shouldDetach(route.value.snapshot)) {
      this.detachAndStoreRouteSubtree(route, parentContexts);
    } else {
      this.deactivateRouteAndOutlet(route, parentContexts);
    }
  }

  private detachAndStoreRouteSubtree(
      route: TreeNode<ActivatedRoute>, parentContexts: ChildrenOutletContexts): void {
    const context = parentContexts.getContext(route.value.outlet);
    if (context && context.outlet) {
      const componentRef = context.outlet.detach();
      const contexts = context.children.onOutletDeactivated();
      this.routeReuseStrategy.store(route.value.snapshot, {componentRef, route, contexts});
    }
  }

  private deactivateRouteAndOutlet(
      route: TreeNode<ActivatedRoute>, parentContexts: ChildrenOutletContexts): void {
    const context = parentContexts.getContext(route.value.outlet);

    if (context) {
      const children: {[outletName: string]: any} = nodeChildrenAsMap(route);
      const contexts = route.value.component ? context.children : parentContexts;

      forEach(children, (v: any, k: string) => this.deactivateRouteAndItsChildren(v, contexts));

      if (context.outlet) {
        // Destroy the component
        context.outlet.deactivate();
        // Destroy the contexts for all the outlets that were in the component
        context.children.onOutletDeactivated();
      }
    }
  }

  private activateChildRoutes(
      futureNode: TreeNode<ActivatedRoute>, currNode: TreeNode<ActivatedRoute>|null,
      contexts: ChildrenOutletContexts): void {
    const children: {[outlet: string]: any} = nodeChildrenAsMap(currNode);
    futureNode.children.forEach(
        c => { this.activateRoutes(c, children[c.value.outlet], contexts); });
  }

  private activateRoutes(
      futureNode: TreeNode<ActivatedRoute>, currNode: TreeNode<ActivatedRoute>,
      parentContexts: ChildrenOutletContexts): void {
    const future = futureNode.value;
    const curr = currNode ? currNode.value : null;

    advanceActivatedRoute(future);

    // reusing the node
    if (future === curr) {
      if (future.component) {
        // If we have a normal route, we need to go through an outlet.
        const context = parentContexts.getOrCreateContext(future.outlet);
        this.activateChildRoutes(futureNode, currNode, context.children);
      } else {
        // if we have a componentless route, we recurse but keep the same outlet map.
        this.activateChildRoutes(futureNode, currNode, parentContexts);
      }
    } else {
      if (future.component) {
        // if we have a normal route, we need to place the component into the outlet and recurse.
        const context = parentContexts.getOrCreateContext(future.outlet);

        if (this.routeReuseStrategy.shouldAttach(future.snapshot)) {
          const stored =
              (<DetachedRouteHandleInternal>this.routeReuseStrategy.retrieve(future.snapshot));
          this.routeReuseStrategy.store(future.snapshot, null);
          context.children.onOutletReAttached(stored.contexts);
          context.attachRef = stored.componentRef;
          context.route = stored.route.value;
          if (context.outlet) {
            // Attach right away when the outlet has already been instantiated
            // Otherwise attach from `RouterOutlet.ngOnInit` when it is instantiated
            context.outlet.attach(stored.componentRef, stored.route.value);
          }
          advanceActivatedRouteNodeAndItsChildren(stored.route);
        } else {
          const config = parentLoadedConfig(future.snapshot);
          const cmpFactoryResolver = config ? config.module.componentFactoryResolver : null;

          context.route = future;
          context.resolver = cmpFactoryResolver;
          if (context.outlet) {
            // Activate the outlet when it has already been instantiated
            // Otherwise it will get activated from its `ngOnInit` when instantiated
            context.outlet.activateWith(future, cmpFactoryResolver);
          }

          this.activateChildRoutes(futureNode, null, context.children);
        }
      } else {
        // if we have a componentless route, we recurse but keep the same outlet map.
        this.activateChildRoutes(futureNode, null, parentContexts);
      }
    }
  }
}

function advanceActivatedRouteNodeAndItsChildren(node: TreeNode<ActivatedRoute>): void {
  advanceActivatedRoute(node.value);
  node.children.forEach(advanceActivatedRouteNodeAndItsChildren);
}

function parentLoadedConfig(snapshot: ActivatedRouteSnapshot): LoadedRouterConfig|null {
  for (let s = snapshot.parent; s; s = s.parent) {
    const route = s._routeConfig;
    if (route && route._loadedConfig) return route._loadedConfig;
    if (route && route.component) return null;
  }

  return null;
}

function closestLoadedConfig(snapshot: ActivatedRouteSnapshot): LoadedRouterConfig|null {
  if (!snapshot) return null;

  for (let s = snapshot.parent; s; s = s.parent) {
    const route = s._routeConfig;
    if (route && route._loadedConfig) return route._loadedConfig;
  }

  return null;
}

// Return the list of T indexed by outlet name
function nodeChildrenAsMap<T extends{outlet: string}>(node: TreeNode<T>| null) {
  const map: {[outlet: string]: TreeNode<T>} = {};

  if (node) {
    node.children.forEach(child => map[child.value.outlet] = child);
  }

  return map;
}

function validateCommands(commands: string[]): void {
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    if (cmd == null) {
      throw new Error(`The requested path contains ${cmd} segment at index ${i}`);
    }
  }
}
