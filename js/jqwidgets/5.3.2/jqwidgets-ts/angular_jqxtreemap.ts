/*
jQWidgets v5.3.2 (2017-Sep)
Copyright (c) 2011-2017 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import { Component, Input, Output, EventEmitter, ElementRef, forwardRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxTreeMap',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxTreeMapComponent implements OnChanges
{
   @Input('baseColor') attrBaseColor: any;
   @Input('colorRanges') attrColorRanges: any;
   @Input('colorRange') attrColorRange: any;
   @Input('colorMode') attrColorMode: any;
   @Input('displayMember') attrDisplayMember: any;
   @Input('hoverEnabled') attrHoverEnabled: any;
   @Input('headerHeight') attrHeaderHeight: any;
   @Input('legendLabel') attrLegendLabel: any;
   @Input('legendPosition') attrLegendPosition: any;
   @Input('legendScaleCallback') attrLegendScaleCallback: any;
   @Input('renderCallbacks') attrRenderCallbacks: any;
   @Input('selectionEnabled') attrSelectionEnabled: any;
   @Input('showLegend') attrShowLegend: any;
   @Input('source') attrSource: any;
   @Input('theme') attrTheme: any;
   @Input('valueMember') attrValueMember: any;
   @Input('width') attrWidth: any;
   @Input('height') attrHeight: any;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['baseColor','colorRanges','colorRange','colorMode','displayMember','height','hoverEnabled','headerHeight','legendLabel','legendPosition','legendScaleCallback','renderCallbacks','selectionEnabled','showLegend','source','theme','valueMember','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxTreeMap;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxTreeMap(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxTreeMap(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxTreeMap(this.properties[i])) {
                  this.host.jqxTreeMap(this.properties[i], this[attrName]); 
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

      this.host[0].style.marginLeft = '1px';
      this.__wireEvents__();
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTreeMap', options);

      this.__updateRect__();
   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxTreeMap('setOptions', options);
   }

   // jqxTreeMapComponent properties
   baseColor(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxTreeMap('baseColor', arg);
      } else {
          return this.host.jqxTreeMap('baseColor');
      }
   }

   colorRanges(arg?: Array<jqwidgets.TreeMapColorRanges>) : any {
      if (arg !== undefined) {
          this.host.jqxTreeMap('colorRanges', arg);
      } else {
          return this.host.jqxTreeMap('colorRanges');
      }
   }

   colorRange(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxTreeMap('colorRange', arg);
      } else {
          return this.host.jqxTreeMap('colorRange');
      }
   }

   colorMode(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxTreeMap('colorMode', arg);
      } else {
          return this.host.jqxTreeMap('colorMode');
      }
   }

   displayMember(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxTreeMap('displayMember', arg);
      } else {
          return this.host.jqxTreeMap('displayMember');
      }
   }

   height(arg?: String | Number) : any {
      if (arg !== undefined) {
          this.host.jqxTreeMap('height', arg);
      } else {
          return this.host.jqxTreeMap('height');
      }
   }

   hoverEnabled(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxTreeMap('hoverEnabled', arg);
      } else {
          return this.host.jqxTreeMap('hoverEnabled');
      }
   }

   headerHeight(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxTreeMap('headerHeight', arg);
      } else {
          return this.host.jqxTreeMap('headerHeight');
      }
   }

   legendLabel(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxTreeMap('legendLabel', arg);
      } else {
          return this.host.jqxTreeMap('legendLabel');
      }
   }

   legendPosition(arg?: jqwidgets.TreeMapLegendPosition) : any {
      if (arg !== undefined) {
          this.host.jqxTreeMap('legendPosition', arg);
      } else {
          return this.host.jqxTreeMap('legendPosition');
      }
   }

   legendScaleCallback(arg?: any) : any {
      if (arg !== undefined) {
          this.host.jqxTreeMap('legendScaleCallback', arg);
      } else {
          return this.host.jqxTreeMap('legendScaleCallback');
      }
   }

   renderCallbacks(arg?: any) : any {
      if (arg !== undefined) {
          this.host.jqxTreeMap('renderCallbacks', arg);
      } else {
          return this.host.jqxTreeMap('renderCallbacks');
      }
   }

   selectionEnabled(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxTreeMap('selectionEnabled', arg);
      } else {
          return this.host.jqxTreeMap('selectionEnabled');
      }
   }

   showLegend(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxTreeMap('showLegend', arg);
      } else {
          return this.host.jqxTreeMap('showLegend');
      }
   }

   source(arg?: any) : any {
      if (arg !== undefined) {
          this.host.jqxTreeMap('source', arg);
      } else {
          return this.host.jqxTreeMap('source');
      }
   }

   theme(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxTreeMap('theme', arg);
      } else {
          return this.host.jqxTreeMap('theme');
      }
   }

   valueMember(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxTreeMap('valueMember', arg);
      } else {
          return this.host.jqxTreeMap('valueMember');
      }
   }

   width(arg?: String | Number) : any {
      if (arg !== undefined) {
          this.host.jqxTreeMap('width', arg);
      } else {
          return this.host.jqxTreeMap('width');
      }
   }


   // jqxTreeMapComponent functions
   destroy(): void {
      this.host.jqxTreeMap('destroy');
   }

   render(): void {
      this.host.jqxTreeMap('render');
   }


   // jqxTreeMapComponent events
   @Output() onBindingComplete = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('bindingComplete', (eventData: any) => { this.onBindingComplete.emit(eventData); });
   }

} //jqxTreeMapComponent


