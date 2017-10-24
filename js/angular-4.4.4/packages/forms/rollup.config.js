/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import resolve from 'rollup-plugin-node-resolve';

const globals = {
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/compiler': 'ng.compiler',
  '@angular/platform-browser': 'ng.platformBrowser',
  'rxjs/Observable': 'Rx',
  'rxjs/Subject': 'Rx',
  'rxjs/observable/fromPromise': 'Rx.Observable',
  'rxjs/observable/forkJoin': 'Rx.Observable',
  'rxjs/operator/map': 'Rx.Observable.prototype'
};

export default {
  entry: '../../dist/packages-dist/forms/@angular/forms.es5.js',
  dest: '../../dist/packages-dist/forms/bundles/forms.umd.js',
  format: 'umd',
  exports: 'named',
  moduleName: 'ng.forms',
  plugins: [resolve()],
  external: Object.keys(globals),
  globals: globals
};
