/*
jQWidgets v5.3.2 (2017-Sep)
Copyright (c) 2011-2017 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import { Component, Input, Output, EventEmitter, ElementRef, forwardRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxGrid',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxGridComponent implements OnChanges
{
   @Input('altrows') attrAltrows: any;
   @Input('altstart') attrAltstart: any;
   @Input('altstep') attrAltstep: any;
   @Input('autoshowloadelement') attrAutoshowloadelement: any;
   @Input('autoshowfiltericon') attrAutoshowfiltericon: any;
   @Input('autoshowcolumnsmenubutton') attrAutoshowcolumnsmenubutton: any;
   @Input('clipboard') attrClipboard: any;
   @Input('closeablegroups') attrCloseablegroups: any;
   @Input('columnsmenuwidth') attrColumnsmenuwidth: any;
   @Input('columnmenuopening') attrColumnmenuopening: any;
   @Input('columnmenuclosing') attrColumnmenuclosing: any;
   @Input('cellhover') attrCellhover: any;
   @Input('enablekeyboarddelete') attrEnablekeyboarddelete: any;
   @Input('enableellipsis') attrEnableellipsis: any;
   @Input('enablemousewheel') attrEnablemousewheel: any;
   @Input('enableanimations') attrEnableanimations: any;
   @Input('enabletooltips') attrEnabletooltips: any;
   @Input('enablehover') attrEnablehover: any;
   @Input('enablebrowserselection') attrEnablebrowserselection: any;
   @Input('everpresentrowposition') attrEverpresentrowposition: any;
   @Input('everpresentrowheight') attrEverpresentrowheight: any;
   @Input('everpresentrowactions') attrEverpresentrowactions: any;
   @Input('everpresentrowactionsmode') attrEverpresentrowactionsmode: any;
   @Input('filterrowheight') attrFilterrowheight: any;
   @Input('filtermode') attrFiltermode: any;
   @Input('groupsrenderer') attrGroupsrenderer: any;
   @Input('groupcolumnrenderer') attrGroupcolumnrenderer: any;
   @Input('groupsexpandedbydefault') attrGroupsexpandedbydefault: any;
   @Input('handlekeyboardnavigation') attrHandlekeyboardnavigation: any;
   @Input('pagerrenderer') attrPagerrenderer: any;
   @Input('rtl') attrRtl: any;
   @Input('showdefaultloadelement') attrShowdefaultloadelement: any;
   @Input('showfiltercolumnbackground') attrShowfiltercolumnbackground: any;
   @Input('showfiltermenuitems') attrShowfiltermenuitems: any;
   @Input('showpinnedcolumnbackground') attrShowpinnedcolumnbackground: any;
   @Input('showsortcolumnbackground') attrShowsortcolumnbackground: any;
   @Input('showsortmenuitems') attrShowsortmenuitems: any;
   @Input('showgroupmenuitems') attrShowgroupmenuitems: any;
   @Input('showrowdetailscolumn') attrShowrowdetailscolumn: any;
   @Input('showheader') attrShowheader: any;
   @Input('showgroupsheader') attrShowgroupsheader: any;
   @Input('showaggregates') attrShowaggregates: any;
   @Input('showgroupaggregates') attrShowgroupaggregates: any;
   @Input('showeverpresentrow') attrShoweverpresentrow: any;
   @Input('showfilterrow') attrShowfilterrow: any;
   @Input('showemptyrow') attrShowemptyrow: any;
   @Input('showstatusbar') attrShowstatusbar: any;
   @Input('statusbarheight') attrStatusbarheight: any;
   @Input('showtoolbar') attrShowtoolbar: any;
   @Input('selectionmode') attrSelectionmode: any;
   @Input('updatefilterconditions') attrUpdatefilterconditions: any;
   @Input('updatefilterpanel') attrUpdatefilterpanel: any;
   @Input('theme') attrTheme: any;
   @Input('toolbarheight') attrToolbarheight: any;
   @Input('autoheight') attrAutoheight: any;
   @Input('autorowheight') attrAutorowheight: any;
   @Input('columnsheight') attrColumnsheight: any;
   @Input('deferreddatafields') attrDeferreddatafields: any;
   @Input('groupsheaderheight') attrGroupsheaderheight: any;
   @Input('groupindentwidth') attrGroupindentwidth: any;
   @Input('pagerheight') attrPagerheight: any;
   @Input('rowsheight') attrRowsheight: any;
   @Input('scrollbarsize') attrScrollbarsize: any;
   @Input('scrollmode') attrScrollmode: any;
   @Input('scrollfeedback') attrScrollfeedback: any;
   @Input('autosavestate') attrAutosavestate: any;
   @Input('autoloadstate') attrAutoloadstate: any;
   @Input('columns') attrColumns: any;
   @Input('columngroups') attrColumngroups: any;
   @Input('columnsmenu') attrColumnsmenu: any;
   @Input('columnsresize') attrColumnsresize: any;
   @Input('columnsautoresize') attrColumnsautoresize: any;
   @Input('columnsreorder') attrColumnsreorder: any;
   @Input('disabled') attrDisabled: any;
   @Input('editable') attrEditable: any;
   @Input('editmode') attrEditmode: any;
   @Input('filter') attrFilter: any;
   @Input('filterable') attrFilterable: any;
   @Input('groupable') attrGroupable: any;
   @Input('groups') attrGroups: any;
   @Input('horizontalscrollbarstep') attrHorizontalscrollbarstep: any;
   @Input('horizontalscrollbarlargestep') attrHorizontalscrollbarlargestep: any;
   @Input('initrowdetails') attrInitrowdetails: any;
   @Input('keyboardnavigation') attrKeyboardnavigation: any;
   @Input('localization') attrLocalization: any;
   @Input('pagesize') attrPagesize: any;
   @Input('pagesizeoptions') attrPagesizeoptions: any;
   @Input('pagermode') attrPagermode: any;
   @Input('pagerbuttonscount') attrPagerbuttonscount: any;
   @Input('pageable') attrPageable: any;
   @Input('rowdetails') attrRowdetails: any;
   @Input('rowdetailstemplate') attrRowdetailstemplate: any;
   @Input('ready') attrReady: any;
   @Input('rendered') attrRendered: any;
   @Input('renderstatusbar') attrRenderstatusbar: any;
   @Input('rendertoolbar') attrRendertoolbar: any;
   @Input('rendergridrows') attrRendergridrows: any;
   @Input('sortable') attrSortable: any;
   @Input('selectedrowindex') attrSelectedrowindex: any;
   @Input('selectedrowindexes') attrSelectedrowindexes: any;
   @Input('source') attrSource: any;
   @Input('sorttogglestates') attrSorttogglestates: any;
   @Input('updatedelay') attrUpdatedelay: any;
   @Input('virtualmode') attrVirtualmode: any;
   @Input('verticalscrollbarstep') attrVerticalscrollbarstep: any;
   @Input('verticalscrollbarlargestep') attrVerticalscrollbarlargestep: any;
   @Input('width') attrWidth: any;
   @Input('height') attrHeight: any;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['altrows','altstart','altstep','autoshowloadelement','autoshowfiltericon','autoshowcolumnsmenubutton','clipboard','closeablegroups','columnsmenuwidth','columnmenuopening','columnmenuclosing','cellhover','enablekeyboarddelete','enableellipsis','enablemousewheel','enableanimations','enabletooltips','enablehover','enablebrowserselection','everpresentrowposition','everpresentrowheight','everpresentrowactions','everpresentrowactionsmode','filterrowheight','filtermode','groupsrenderer','groupcolumnrenderer','groupsexpandedbydefault','handlekeyboardnavigation','pagerrenderer','rtl','showdefaultloadelement','showfiltercolumnbackground','showfiltermenuitems','showpinnedcolumnbackground','showsortcolumnbackground','showsortmenuitems','showgroupmenuitems','showrowdetailscolumn','showheader','showgroupsheader','showaggregates','showgroupaggregates','showeverpresentrow','showfilterrow','showemptyrow','showstatusbar','statusbarheight','showtoolbar','selectionmode','updatefilterconditions','updatefilterpanel','theme','toolbarheight','autoheight','autorowheight','columnsheight','deferreddatafields','groupsheaderheight','groupindentwidth','height','pagerheight','rowsheight','scrollbarsize','scrollmode','scrollfeedback','width','autosavestate','autoloadstate','columns','columngroups','columnsmenu','columnsresize','columnsautoresize','columnsreorder','disabled','editable','editmode','filter','filterable','groupable','groups','horizontalscrollbarstep','horizontalscrollbarlargestep','initrowdetails','keyboardnavigation','localization','pagesize','pagesizeoptions','pagermode','pagerbuttonscount','pageable','rowdetails','rowdetailstemplate','ready','rendered','renderstatusbar','rendertoolbar','rendergridrows','sortable','selectedrowindex','selectedrowindexes','source','sorttogglestates','updatedelay','virtualmode','verticalscrollbarstep','verticalscrollbarlargestep'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxGrid;

   constructor(containerElement: ElementRef) {
      this.elementRef = containerElement;
   }

   ngOnInit() {
      if (this.autoCreate) {
         this.createComponent(); 
      }
   }; 

   ngOnChanges(changes: SimpleChanges) {
      if (this.host) {
         for (let i = 0; i < this.properties.length; i++) {
            let attrName = 'attr' + this.properties[i].substring(0, 1).toUpperCase() + this.properties[i].substring(1);
            let areEqual: boolean;

            if (this[attrName] !== undefined) {
               if (typeof this[attrName] === 'object') {
                  if (this[attrName] instanceof Array) {
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxGrid(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxGrid(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxGrid(this.properties[i])) {
                  this.host.jqxGrid(this.properties[i], this[attrName]); 
               }
            }
         }
      }
   }

   arraysEqual(attrValue: any, hostValue: any): boolean {
      if (attrValue.length != hostValue.length) {
         return false;
      }
      for (let i = 0; i < attrValue.length; i++) {
         if (attrValue[i] !== hostValue[i]) {
            return false;
         }
      }
      return true;
   }

   manageAttributes(): any {
      let options = {};
      for (let i = 0; i < this.properties.length; i++) {
         let attrName = 'attr' + this.properties[i].substring(0, 1).toUpperCase() + this.properties[i].substring(1);
         if (this[attrName] !== undefined) {
            options[this.properties[i]] = this[attrName];
         }
      }
      return options;
   }

   moveClasses(parentEl: HTMLElement, childEl: HTMLElement): void {
      let classes: any = parentEl.classList;
      childEl.classList.add(...classes);
      parentEl.className = '';
   }

   moveStyles(parentEl: HTMLElement, childEl: HTMLElement): void {
      let style = parentEl.style.cssText;
      childEl.style.cssText = style
      parentEl.style.cssText = '';
   }

   createComponent(options?: any): void {
      if (options) {
         JQXLite.extend(options, this.manageAttributes());
      }
      else {
        options = this.manageAttributes();
      }
      this.host = JQXLite(this.elementRef.nativeElement.firstChild);

      this.moveClasses(this.elementRef.nativeElement, this.host[0]);
      this.moveStyles(this.elementRef.nativeElement, this.host[0]);

      this.__wireEvents__();
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxGrid', options);

      this.__updateRect__();
   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxGrid('setOptions', options);
   }

   // jqxGridComponent properties
   altrows(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('altrows', arg);
      } else {
          return this.host.jqxGrid('altrows');
      }
   }

   altstart(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('altstart', arg);
      } else {
          return this.host.jqxGrid('altstart');
      }
   }

   altstep(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('altstep', arg);
      } else {
          return this.host.jqxGrid('altstep');
      }
   }

   autoshowloadelement(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('autoshowloadelement', arg);
      } else {
          return this.host.jqxGrid('autoshowloadelement');
      }
   }

   autoshowfiltericon(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('autoshowfiltericon', arg);
      } else {
          return this.host.jqxGrid('autoshowfiltericon');
      }
   }

   autoshowcolumnsmenubutton(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('autoshowcolumnsmenubutton', arg);
      } else {
          return this.host.jqxGrid('autoshowcolumnsmenubutton');
      }
   }

   clipboard(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('clipboard', arg);
      } else {
          return this.host.jqxGrid('clipboard');
      }
   }

   closeablegroups(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('closeablegroups', arg);
      } else {
          return this.host.jqxGrid('closeablegroups');
      }
   }

   columnsmenuwidth(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('columnsmenuwidth', arg);
      } else {
          return this.host.jqxGrid('columnsmenuwidth');
      }
   }

   columnmenuopening(arg?: (menu?: any, datafield?: String, height?: Number | String) => Boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('columnmenuopening', arg);
      } else {
          return this.host.jqxGrid('columnmenuopening');
      }
   }

   columnmenuclosing(arg?: (menu?: any, datafield?: String, height?: Number | String) => Boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('columnmenuclosing', arg);
      } else {
          return this.host.jqxGrid('columnmenuclosing');
      }
   }

   cellhover(arg?: (cellhtmlElement?: any, x?: Number, y?: Number) => void) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('cellhover', arg);
      } else {
          return this.host.jqxGrid('cellhover');
      }
   }

   enablekeyboarddelete(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('enablekeyboarddelete', arg);
      } else {
          return this.host.jqxGrid('enablekeyboarddelete');
      }
   }

   enableellipsis(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('enableellipsis', arg);
      } else {
          return this.host.jqxGrid('enableellipsis');
      }
   }

   enablemousewheel(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('enablemousewheel', arg);
      } else {
          return this.host.jqxGrid('enablemousewheel');
      }
   }

   enableanimations(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('enableanimations', arg);
      } else {
          return this.host.jqxGrid('enableanimations');
      }
   }

   enabletooltips(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('enabletooltips', arg);
      } else {
          return this.host.jqxGrid('enabletooltips');
      }
   }

   enablehover(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('enablehover', arg);
      } else {
          return this.host.jqxGrid('enablehover');
      }
   }

   enablebrowserselection(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('enablebrowserselection', arg);
      } else {
          return this.host.jqxGrid('enablebrowserselection');
      }
   }

   everpresentrowposition(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('everpresentrowposition', arg);
      } else {
          return this.host.jqxGrid('everpresentrowposition');
      }
   }

   everpresentrowheight(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('everpresentrowheight', arg);
      } else {
          return this.host.jqxGrid('everpresentrowheight');
      }
   }

   everpresentrowactions(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('everpresentrowactions', arg);
      } else {
          return this.host.jqxGrid('everpresentrowactions');
      }
   }

   everpresentrowactionsmode(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('everpresentrowactionsmode', arg);
      } else {
          return this.host.jqxGrid('everpresentrowactionsmode');
      }
   }

   filterrowheight(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('filterrowheight', arg);
      } else {
          return this.host.jqxGrid('filterrowheight');
      }
   }

   filtermode(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('filtermode', arg);
      } else {
          return this.host.jqxGrid('filtermode');
      }
   }

   groupsrenderer(arg?: (text?: String, group?: Number, expanded?: Boolean, data?: any) => String) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('groupsrenderer', arg);
      } else {
          return this.host.jqxGrid('groupsrenderer');
      }
   }

   groupcolumnrenderer(arg?: (text?: String, group?: Number, expanded?: Boolean, data?: any) => String) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('groupcolumnrenderer', arg);
      } else {
          return this.host.jqxGrid('groupcolumnrenderer');
      }
   }

   groupsexpandedbydefault(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('groupsexpandedbydefault', arg);
      } else {
          return this.host.jqxGrid('groupsexpandedbydefault');
      }
   }

   handlekeyboardnavigation(arg?: (event: any) => Boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('handlekeyboardnavigation', arg);
      } else {
          return this.host.jqxGrid('handlekeyboardnavigation');
      }
   }

   pagerrenderer(arg?: () => any[]) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('pagerrenderer', arg);
      } else {
          return this.host.jqxGrid('pagerrenderer');
      }
   }

   rtl(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('rtl', arg);
      } else {
          return this.host.jqxGrid('rtl');
      }
   }

   showdefaultloadelement(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('showdefaultloadelement', arg);
      } else {
          return this.host.jqxGrid('showdefaultloadelement');
      }
   }

   showfiltercolumnbackground(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('showfiltercolumnbackground', arg);
      } else {
          return this.host.jqxGrid('showfiltercolumnbackground');
      }
   }

   showfiltermenuitems(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('showfiltermenuitems', arg);
      } else {
          return this.host.jqxGrid('showfiltermenuitems');
      }
   }

   showpinnedcolumnbackground(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('showpinnedcolumnbackground', arg);
      } else {
          return this.host.jqxGrid('showpinnedcolumnbackground');
      }
   }

   showsortcolumnbackground(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('showsortcolumnbackground', arg);
      } else {
          return this.host.jqxGrid('showsortcolumnbackground');
      }
   }

   showsortmenuitems(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('showsortmenuitems', arg);
      } else {
          return this.host.jqxGrid('showsortmenuitems');
      }
   }

   showgroupmenuitems(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('showgroupmenuitems', arg);
      } else {
          return this.host.jqxGrid('showgroupmenuitems');
      }
   }

   showrowdetailscolumn(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('showrowdetailscolumn', arg);
      } else {
          return this.host.jqxGrid('showrowdetailscolumn');
      }
   }

   showheader(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('showheader', arg);
      } else {
          return this.host.jqxGrid('showheader');
      }
   }

   showgroupsheader(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('showgroupsheader', arg);
      } else {
          return this.host.jqxGrid('showgroupsheader');
      }
   }

   showaggregates(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('showaggregates', arg);
      } else {
          return this.host.jqxGrid('showaggregates');
      }
   }

   showgroupaggregates(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('showgroupaggregates', arg);
      } else {
          return this.host.jqxGrid('showgroupaggregates');
      }
   }

   showeverpresentrow(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('showeverpresentrow', arg);
      } else {
          return this.host.jqxGrid('showeverpresentrow');
      }
   }

   showfilterrow(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('showfilterrow', arg);
      } else {
          return this.host.jqxGrid('showfilterrow');
      }
   }

   showemptyrow(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('showemptyrow', arg);
      } else {
          return this.host.jqxGrid('showemptyrow');
      }
   }

   showstatusbar(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('showstatusbar', arg);
      } else {
          return this.host.jqxGrid('showstatusbar');
      }
   }

   statusbarheight(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('statusbarheight', arg);
      } else {
          return this.host.jqxGrid('statusbarheight');
      }
   }

   showtoolbar(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('showtoolbar', arg);
      } else {
          return this.host.jqxGrid('showtoolbar');
      }
   }

   selectionmode(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('selectionmode', arg);
      } else {
          return this.host.jqxGrid('selectionmode');
      }
   }

   updatefilterconditions(arg?: (type?: string, defaultconditions?: any) => any) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('updatefilterconditions', arg);
      } else {
          return this.host.jqxGrid('updatefilterconditions');
      }
   }

   updatefilterpanel(arg?: (filtertypedropdown1?: any, filtertypedropdown2?: any, filteroperatordropdown?: any, filterinputfield1?: any, filterinputfield2?: any, filterbutton?: any, clearbutton?: any, columnfilter?: any, filtertype?: any, filterconditions?: any) => any) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('updatefilterpanel', arg);
      } else {
          return this.host.jqxGrid('updatefilterpanel');
      }
   }

   theme(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('theme', arg);
      } else {
          return this.host.jqxGrid('theme');
      }
   }

   toolbarheight(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('toolbarheight', arg);
      } else {
          return this.host.jqxGrid('toolbarheight');
      }
   }

   autoheight(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('autoheight', arg);
      } else {
          return this.host.jqxGrid('autoheight');
      }
   }

   autorowheight(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('autorowheight', arg);
      } else {
          return this.host.jqxGrid('autorowheight');
      }
   }

   columnsheight(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('columnsheight', arg);
      } else {
          return this.host.jqxGrid('columnsheight');
      }
   }

   deferreddatafields(arg?: Array<String>) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('deferreddatafields', arg);
      } else {
          return this.host.jqxGrid('deferreddatafields');
      }
   }

   groupsheaderheight(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('groupsheaderheight', arg);
      } else {
          return this.host.jqxGrid('groupsheaderheight');
      }
   }

   groupindentwidth(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('groupindentwidth', arg);
      } else {
          return this.host.jqxGrid('groupindentwidth');
      }
   }

   height(arg?: String | Number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('height', arg);
      } else {
          return this.host.jqxGrid('height');
      }
   }

   pagerheight(arg?: String | Number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('pagerheight', arg);
      } else {
          return this.host.jqxGrid('pagerheight');
      }
   }

   rowsheight(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('rowsheight', arg);
      } else {
          return this.host.jqxGrid('rowsheight');
      }
   }

   scrollbarsize(arg?: String | Number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('scrollbarsize', arg);
      } else {
          return this.host.jqxGrid('scrollbarsize');
      }
   }

   scrollmode(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('scrollmode', arg);
      } else {
          return this.host.jqxGrid('scrollmode');
      }
   }

   scrollfeedback(arg?: (row: any) => String) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('scrollfeedback', arg);
      } else {
          return this.host.jqxGrid('scrollfeedback');
      }
   }

   width(arg?: String | Number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('width', arg);
      } else {
          return this.host.jqxGrid('width');
      }
   }

   autosavestate(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('autosavestate', arg);
      } else {
          return this.host.jqxGrid('autosavestate');
      }
   }

   autoloadstate(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('autoloadstate', arg);
      } else {
          return this.host.jqxGrid('autoloadstate');
      }
   }

   columns(arg?: Array<jqwidgets.GridColumn>) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('columns', arg);
      } else {
          return this.host.jqxGrid('columns');
      }
   }

   columngroups(arg?: Array<any>) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('columngroups', arg);
      } else {
          return this.host.jqxGrid('columngroups');
      }
   }

   columnsmenu(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('columnsmenu', arg);
      } else {
          return this.host.jqxGrid('columnsmenu');
      }
   }

   columnsresize(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('columnsresize', arg);
      } else {
          return this.host.jqxGrid('columnsresize');
      }
   }

   columnsautoresize(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('columnsautoresize', arg);
      } else {
          return this.host.jqxGrid('columnsautoresize');
      }
   }

   columnsreorder(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('columnsreorder', arg);
      } else {
          return this.host.jqxGrid('columnsreorder');
      }
   }

   disabled(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('disabled', arg);
      } else {
          return this.host.jqxGrid('disabled');
      }
   }

   editable(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('editable', arg);
      } else {
          return this.host.jqxGrid('editable');
      }
   }

   editmode(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('editmode', arg);
      } else {
          return this.host.jqxGrid('editmode');
      }
   }

   filter(arg?: (cellValue?: any, rowData?: any, dataField?: String, filterGroup?: any, defaultFilterResult?: Boolean) => any) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('filter', arg);
      } else {
          return this.host.jqxGrid('filter');
      }
   }

   filterable(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('filterable', arg);
      } else {
          return this.host.jqxGrid('filterable');
      }
   }

   groupable(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('groupable', arg);
      } else {
          return this.host.jqxGrid('groupable');
      }
   }

   groups(arg?: Array<String>) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('groups', arg);
      } else {
          return this.host.jqxGrid('groups');
      }
   }

   horizontalscrollbarstep(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('horizontalscrollbarstep', arg);
      } else {
          return this.host.jqxGrid('horizontalscrollbarstep');
      }
   }

   horizontalscrollbarlargestep(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('horizontalscrollbarlargestep', arg);
      } else {
          return this.host.jqxGrid('horizontalscrollbarlargestep');
      }
   }

   initrowdetails(arg?: (index?: Number, parentElement?: any, gridElement?: any, datarecord?: any) => void) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('initrowdetails', arg);
      } else {
          return this.host.jqxGrid('initrowdetails');
      }
   }

   keyboardnavigation(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('keyboardnavigation', arg);
      } else {
          return this.host.jqxGrid('keyboardnavigation');
      }
   }

   localization(arg?: any) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('localization', arg);
      } else {
          return this.host.jqxGrid('localization');
      }
   }

   pagesize(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('pagesize', arg);
      } else {
          return this.host.jqxGrid('pagesize');
      }
   }

   pagesizeoptions(arg?: Array<Number | String>) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('pagesizeoptions', arg);
      } else {
          return this.host.jqxGrid('pagesizeoptions');
      }
   }

   pagermode(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('pagermode', arg);
      } else {
          return this.host.jqxGrid('pagermode');
      }
   }

   pagerbuttonscount(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('pagerbuttonscount', arg);
      } else {
          return this.host.jqxGrid('pagerbuttonscount');
      }
   }

   pageable(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('pageable', arg);
      } else {
          return this.host.jqxGrid('pageable');
      }
   }

   rowdetails(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('rowdetails', arg);
      } else {
          return this.host.jqxGrid('rowdetails');
      }
   }

   rowdetailstemplate(arg?: any) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('rowdetailstemplate', arg);
      } else {
          return this.host.jqxGrid('rowdetailstemplate');
      }
   }

   ready(arg?: () => void) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('ready', arg);
      } else {
          return this.host.jqxGrid('ready');
      }
   }

   rendered(arg?: () => void) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('rendered', arg);
      } else {
          return this.host.jqxGrid('rendered');
      }
   }

   renderstatusbar(arg?: (statusbar?: any) => void) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('renderstatusbar', arg);
      } else {
          return this.host.jqxGrid('renderstatusbar');
      }
   }

   rendertoolbar(arg?: (toolbar?: any) => void) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('rendertoolbar', arg);
      } else {
          return this.host.jqxGrid('rendertoolbar');
      }
   }

   rendergridrows(arg?: (params?: any) => any) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('rendergridrows', arg);
      } else {
          return this.host.jqxGrid('rendergridrows');
      }
   }

   sortable(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('sortable', arg);
      } else {
          return this.host.jqxGrid('sortable');
      }
   }

   selectedrowindex(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('selectedrowindex', arg);
      } else {
          return this.host.jqxGrid('selectedrowindex');
      }
   }

   selectedrowindexes(arg?: Array<Number>) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('selectedrowindexes', arg);
      } else {
          return this.host.jqxGrid('selectedrowindexes');
      }
   }

   source(arg?: any) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('source', arg);
      } else {
          return this.host.jqxGrid('source');
      }
   }

   sorttogglestates(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('sorttogglestates', arg);
      } else {
          return this.host.jqxGrid('sorttogglestates');
      }
   }

   updatedelay(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('updatedelay', arg);
      } else {
          return this.host.jqxGrid('updatedelay');
      }
   }

   virtualmode(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('virtualmode', arg);
      } else {
          return this.host.jqxGrid('virtualmode');
      }
   }

   verticalscrollbarstep(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('verticalscrollbarstep', arg);
      } else {
          return this.host.jqxGrid('verticalscrollbarstep');
      }
   }

   verticalscrollbarlargestep(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxGrid('verticalscrollbarlargestep', arg);
      } else {
          return this.host.jqxGrid('verticalscrollbarlargestep');
      }
   }


   // jqxGridComponent functions
   autoresizecolumns(type?: string): void {
      this.host.jqxGrid('autoresizecolumns', type);
   }

   autoresizecolumn(dataField: string, type?: string): void {
      this.host.jqxGrid('autoresizecolumn', dataField, type);
   }

   beginupdate(): void {
      this.host.jqxGrid('beginupdate');
   }

   clear(): void {
      this.host.jqxGrid('clear');
   }

   destroy(): void {
      this.host.jqxGrid('destroy');
   }

   endupdate(): void {
      this.host.jqxGrid('endupdate');
   }

   ensurerowvisible(rowBoundIndex: number): void {
      this.host.jqxGrid('ensurerowvisible', rowBoundIndex);
   }

   focus(): void {
      this.host.jqxGrid('focus');
   }

   getcolumnindex(dataField: string): number {
      return this.host.jqxGrid('getcolumnindex', dataField);
   }

   getcolumn(dataField: string): jqwidgets.GridGetColumn {
      return this.host.jqxGrid('getcolumn', dataField);
   }

   getcolumnproperty(dataField: string, propertyName: string): any {
      return this.host.jqxGrid('getcolumnproperty', dataField, propertyName);
   }

   getrowid(rowBoundIndex: number): string {
      return this.host.jqxGrid('getrowid', rowBoundIndex);
   }

   getrowdata(rowBoundIndex: number): any {
      return this.host.jqxGrid('getrowdata', rowBoundIndex);
   }

   getrowdatabyid(rowID: string): any {
      return this.host.jqxGrid('getrowdatabyid', rowID);
   }

   getrowboundindexbyid(rowID: string): number {
      return this.host.jqxGrid('getrowboundindexbyid', rowID);
   }

   getrowboundindex(rowDisplayIndex: number): number {
      return this.host.jqxGrid('getrowboundindex', rowDisplayIndex);
   }

   getrows(): Array<any> {
      return this.host.jqxGrid('getrows');
   }

   getboundrows(): Array<any> {
      return this.host.jqxGrid('getboundrows');
   }

   getdisplayrows(): Array<any> {
      return this.host.jqxGrid('getdisplayrows');
   }

   getdatainformation(): jqwidgets.GridGetDataInformation {
      return this.host.jqxGrid('getdatainformation');
   }

   getsortinformation(): jqwidgets.GridGetSortInformation {
      return this.host.jqxGrid('getsortinformation');
   }

   getpaginginformation(): jqwidgets.GridGetPagingInformation {
      return this.host.jqxGrid('getpaginginformation');
   }

   hidecolumn(dataField: string): void {
      this.host.jqxGrid('hidecolumn', dataField);
   }

   hideloadelement(): void {
      this.host.jqxGrid('hideloadelement');
   }

   hiderowdetails(rowBoundIndex: number): void {
      this.host.jqxGrid('hiderowdetails', rowBoundIndex);
   }

   iscolumnvisible(dataField: string): boolean {
      return this.host.jqxGrid('iscolumnvisible', dataField);
   }

   iscolumnpinned(dataField: string): boolean {
      return this.host.jqxGrid('iscolumnpinned', dataField);
   }

   localizestrings(localizationObject: jqwidgets.GridLocalizationObject): void {
      this.host.jqxGrid('localizestrings', localizationObject);
   }

   pincolumn(dataField: string): void {
      this.host.jqxGrid('pincolumn', dataField);
   }

   refreshdata(): void {
      this.host.jqxGrid('refreshdata');
   }

   refresh(): void {
      this.host.jqxGrid('refresh');
   }

   render(): void {
      this.host.jqxGrid('render');
   }

   scrolloffset(top: number, left: number): void {
      this.host.jqxGrid('scrolloffset', top, left);
   }

   scrollposition(): jqwidgets.GridScrollPosition {
      return this.host.jqxGrid('scrollposition');
   }

   showloadelement(): void {
      this.host.jqxGrid('showloadelement');
   }

   showrowdetails(rowBoundIndex: number): void {
      this.host.jqxGrid('showrowdetails', rowBoundIndex);
   }

   setcolumnindex(dataField: string, index: number): void {
      this.host.jqxGrid('setcolumnindex', dataField, index);
   }

   setcolumnproperty(dataField: string, propertyName: any, propertyValue: any): void {
      this.host.jqxGrid('setcolumnproperty', dataField, propertyName, propertyValue);
   }

   showcolumn(dataField: string): void {
      this.host.jqxGrid('showcolumn', dataField);
   }

   unpincolumn(dataField: string): void {
      this.host.jqxGrid('unpincolumn', dataField);
   }

   updatebounddata(type?: any): void {
      this.host.jqxGrid('updatebounddata', type);
   }

   updating(): boolean {
      return this.host.jqxGrid('updating');
   }

   getsortcolumn(): string {
      return this.host.jqxGrid('getsortcolumn');
   }

   removesort(): void {
      this.host.jqxGrid('removesort');
   }

   sortby(dataField: string, sortOrder: string): void {
      this.host.jqxGrid('sortby', dataField, sortOrder);
   }

   addgroup(dataField: string): void {
      this.host.jqxGrid('addgroup', dataField);
   }

   cleargroups(): void {
      this.host.jqxGrid('cleargroups');
   }

   collapsegroup(group: String | Number): void {
      this.host.jqxGrid('collapsegroup', group);
   }

   collapseallgroups(): void {
      this.host.jqxGrid('collapseallgroups');
   }

   expandallgroups(): void {
      this.host.jqxGrid('expandallgroups');
   }

   expandgroup(group: String | Number): void {
      this.host.jqxGrid('expandgroup', group);
   }

   getrootgroupscount(): number {
      return this.host.jqxGrid('getrootgroupscount');
   }

   getgroup(groupIndex: number): jqwidgets.GridGetGroup {
      return this.host.jqxGrid('getgroup', groupIndex);
   }

   insertgroup(groupIndex: number, dataField: string): void {
      this.host.jqxGrid('insertgroup', groupIndex, dataField);
   }

   iscolumngroupable(): boolean {
      return this.host.jqxGrid('iscolumngroupable');
   }

   removegroupat(groupIndex: number): void {
      this.host.jqxGrid('removegroupat', groupIndex);
   }

   removegroup(dataField: string): void {
      this.host.jqxGrid('removegroup', dataField);
   }

   addfilter(dataField: string, filterGroup: any, refreshGrid?: boolean): void {
      this.host.jqxGrid('addfilter', dataField, filterGroup, refreshGrid);
   }

   applyfilters(): void {
      this.host.jqxGrid('applyfilters');
   }

   clearfilters(): void {
      this.host.jqxGrid('clearfilters');
   }

   getfilterinformation(): any {
      return this.host.jqxGrid('getfilterinformation');
   }

   getcolumnat(index: number): any {
      return this.host.jqxGrid('getcolumnat', index);
   }

   removefilter(dataField: string, refreshGrid: boolean): void {
      this.host.jqxGrid('removefilter', dataField, refreshGrid);
   }

   refreshfilterrow(): void {
      this.host.jqxGrid('refreshfilterrow');
   }

   gotopage(pageNumber: number): void {
      this.host.jqxGrid('gotopage', pageNumber);
   }

   gotoprevpage(): void {
      this.host.jqxGrid('gotoprevpage');
   }

   gotonextpage(): void {
      this.host.jqxGrid('gotonextpage');
   }

   addrow(rowIds: any, data: any, rowPosition?: any): void {
      this.host.jqxGrid('addrow', rowIds, data, rowPosition);
   }

   begincelledit(rowBoundIndex: number, dataField: string): void {
      this.host.jqxGrid('begincelledit', rowBoundIndex, dataField);
   }

   beginrowedit(rowBoundIndex: number): void {
      this.host.jqxGrid('beginrowedit', rowBoundIndex);
   }

   closemenu(): void {
      this.host.jqxGrid('closemenu');
   }

   deleterow(rowIds: String | Number | Array<Number | String>): void {
      this.host.jqxGrid('deleterow', rowIds);
   }

   endcelledit(rowBoundIndex: number, dataField: string, confirmChanges: boolean): void {
      this.host.jqxGrid('endcelledit', rowBoundIndex, dataField, confirmChanges);
   }

   endrowedit(rowBoundIndex: number, confirmChanges: boolean): void {
      this.host.jqxGrid('endrowedit', rowBoundIndex, confirmChanges);
   }

   getcell(rowBoundIndex: number, datafield: string): jqwidgets.GridGetCell {
      return this.host.jqxGrid('getcell', rowBoundIndex, datafield);
   }

   getcellatposition(left: number, top: number): jqwidgets.GridGetCell {
      return this.host.jqxGrid('getcellatposition', left, top);
   }

   getcelltext(rowBoundIndex: number, dataField: string): string {
      return this.host.jqxGrid('getcelltext', rowBoundIndex, dataField);
   }

   getcelltextbyid(rowID: string, dataField: string): string {
      return this.host.jqxGrid('getcelltextbyid', rowID, dataField);
   }

   getcellvaluebyid(rowID: string, dataField: string): any {
      return this.host.jqxGrid('getcellvaluebyid', rowID, dataField);
   }

   getcellvalue(rowBoundIndex: number, dataField: string): any {
      return this.host.jqxGrid('getcellvalue', rowBoundIndex, dataField);
   }

   isBindingCompleted(): boolean {
      return this.host.jqxGrid('isBindingCompleted');
   }

   openmenu(dataField: string): void {
      this.host.jqxGrid('openmenu', dataField);
   }

   setcellvalue(rowBoundIndex: number, dataField: string, value: any): void {
      this.host.jqxGrid('setcellvalue', rowBoundIndex, dataField, value);
   }

   setcellvaluebyid(rowID: string, dataField: string, value: any): void {
      this.host.jqxGrid('setcellvaluebyid', rowID, dataField, value);
   }

   showvalidationpopup(rowBoundIndex: number, dataField: string, validationMessage: string): void {
      this.host.jqxGrid('showvalidationpopup', rowBoundIndex, dataField, validationMessage);
   }

   updaterow(rowIds: String | Number | Array<Number | String>, data: any): void {
      this.host.jqxGrid('updaterow', rowIds, data);
   }

   clearselection(): void {
      this.host.jqxGrid('clearselection');
   }

   getselectedrowindex(): number {
      return this.host.jqxGrid('getselectedrowindex');
   }

   getselectedrowindexes(): Array<Number> {
      return this.host.jqxGrid('getselectedrowindexes');
   }

   getselectedcell(): jqwidgets.GridGetSelectedCell {
      return this.host.jqxGrid('getselectedcell');
   }

   getselectedcells(): Array<jqwidgets.GridGetSelectedCell> {
      return this.host.jqxGrid('getselectedcells');
   }

   selectcell(rowBoundIndex: number, dataField: string): void {
      this.host.jqxGrid('selectcell', rowBoundIndex, dataField);
   }

   selectallrows(): void {
      this.host.jqxGrid('selectallrows');
   }

   selectrow(rowBoundIndex: number): void {
      this.host.jqxGrid('selectrow', rowBoundIndex);
   }

   unselectrow(rowBoundIndex: number): void {
      this.host.jqxGrid('unselectrow', rowBoundIndex);
   }

   unselectcell(rowBoundIndex: number, dataField: string): void {
      this.host.jqxGrid('unselectcell', rowBoundIndex, dataField);
   }

   getcolumnaggregateddata(dataField: string, aggregates: Array<any>): string {
      return this.host.jqxGrid('getcolumnaggregateddata', dataField, aggregates);
   }

   refreshaggregates(): void {
      this.host.jqxGrid('refreshaggregates');
   }

   renderaggregates(): void {
      this.host.jqxGrid('renderaggregates');
   }

   exportdata(dataType: string, fileName?: string, exportHeader?: boolean, rows?: Array<Number>, exportHiddenColumns?: boolean, serverURL?: string, charSet?: string): undefined {
      return this.host.jqxGrid('exportdata', dataType, fileName, exportHeader, rows, exportHiddenColumns, serverURL, charSet);
   }

   getstate(): jqwidgets.GridGetState {
      return this.host.jqxGrid('getstate');
   }

   loadstate(stateObject: any): void {
      this.host.jqxGrid('loadstate', stateObject);
   }

   savestate(): jqwidgets.GridGetState {
      return this.host.jqxGrid('savestate');
   }


   // jqxGridComponent events
   @Output() onBindingcomplete = new EventEmitter();
   @Output() onColumnresized = new EventEmitter();
   @Output() onColumnreordered = new EventEmitter();
   @Output() onColumnclick = new EventEmitter();
   @Output() onCellclick = new EventEmitter();
   @Output() onCelldoubleclick = new EventEmitter();
   @Output() onCellselect = new EventEmitter();
   @Output() onCellunselect = new EventEmitter();
   @Output() onCellvaluechanged = new EventEmitter();
   @Output() onCellbeginedit = new EventEmitter();
   @Output() onCellendedit = new EventEmitter();
   @Output() onFilter = new EventEmitter();
   @Output() onGroupschanged = new EventEmitter();
   @Output() onGroupexpand = new EventEmitter();
   @Output() onGroupcollapse = new EventEmitter();
   @Output() onPagechanged = new EventEmitter();
   @Output() onPagesizechanged = new EventEmitter();
   @Output() onRowclick = new EventEmitter();
   @Output() onRowdoubleclick = new EventEmitter();
   @Output() onRowselect = new EventEmitter();
   @Output() onRowunselect = new EventEmitter();
   @Output() onRowexpand = new EventEmitter();
   @Output() onRowcollapse = new EventEmitter();
   @Output() onSort = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('bindingcomplete', (eventData: any) => { this.onBindingcomplete.emit(eventData); });
      this.host.on('columnresized', (eventData: any) => { this.onColumnresized.emit(eventData); });
      this.host.on('columnreordered', (eventData: any) => { this.onColumnreordered.emit(eventData); });
      this.host.on('columnclick', (eventData: any) => { this.onColumnclick.emit(eventData); });
      this.host.on('cellclick', (eventData: any) => { this.onCellclick.emit(eventData); });
      this.host.on('celldoubleclick', (eventData: any) => { this.onCelldoubleclick.emit(eventData); });
      this.host.on('cellselect', (eventData: any) => { this.onCellselect.emit(eventData); });
      this.host.on('cellunselect', (eventData: any) => { this.onCellunselect.emit(eventData); });
      this.host.on('cellvaluechanged', (eventData: any) => { this.onCellvaluechanged.emit(eventData); });
      this.host.on('cellbeginedit', (eventData: any) => { this.onCellbeginedit.emit(eventData); });
      this.host.on('cellendedit', (eventData: any) => { this.onCellendedit.emit(eventData); });
      this.host.on('filter', (eventData: any) => { this.onFilter.emit(eventData); });
      this.host.on('groupschanged', (eventData: any) => { this.onGroupschanged.emit(eventData); });
      this.host.on('groupexpand', (eventData: any) => { this.onGroupexpand.emit(eventData); });
      this.host.on('groupcollapse', (eventData: any) => { this.onGroupcollapse.emit(eventData); });
      this.host.on('pagechanged', (eventData: any) => { this.onPagechanged.emit(eventData); });
      this.host.on('pagesizechanged', (eventData: any) => { this.onPagesizechanged.emit(eventData); });
      this.host.on('rowclick', (eventData: any) => { this.onRowclick.emit(eventData); });
      this.host.on('rowdoubleclick', (eventData: any) => { this.onRowdoubleclick.emit(eventData); });
      this.host.on('rowselect', (eventData: any) => { this.onRowselect.emit(eventData); });
      this.host.on('rowunselect', (eventData: any) => { this.onRowunselect.emit(eventData); });
      this.host.on('rowexpand', (eventData: any) => { this.onRowexpand.emit(eventData); });
      this.host.on('rowcollapse', (eventData: any) => { this.onRowcollapse.emit(eventData); });
      this.host.on('sort', (eventData: any) => { this.onSort.emit(eventData); });
   }

} //jqxGridComponent


