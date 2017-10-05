/*
jQWidgets v5.3.2 (2017-Sep)
Copyright (c) 2011-2017 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import { Component, Input, Output, EventEmitter, ElementRef, forwardRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxLoader',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxLoaderComponent implements OnChanges
{
   @Input('autoOpen') attrAutoOpen: any;
   @Input('html') attrHtml: any;
   @Input('isModal') attrIsModal: any;
   @Input('imagePosition') attrImagePosition: any;
   @Input('rtl') attrRtl: any;
   @Input('text') attrText: any;
   @Input('textPosition') attrTextPosition: any;
   @Input('theme') attrTheme: any;
   @Input('width') attrWidth: any;
   @Input('height') attrHeight: any;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['autoOpen','height','html','isModal','imagePosition','rtl','text','textPosition','theme','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxLoader;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxLoader(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxLoader(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxLoader(this.properties[i])) {
                  this.host.jqxLoader(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxLoader', options);

      this.__updateRect__();
   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxLoader('setOptions', options);
   }

   // jqxLoaderComponent properties
   autoOpen(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxLoader('autoOpen', arg);
      } else {
          return this.host.jqxLoader('autoOpen');
      }
   }

   height(arg?: String | Number) : any {
      if (arg !== undefined) {
          this.host.jqxLoader('height', arg);
      } else {
          return this.host.jqxLoader('height');
      }
   }

   html(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxLoader('html', arg);
      } else {
          return this.host.jqxLoader('html');
      }
   }

   isModal(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxLoader('isModal', arg);
      } else {
          return this.host.jqxLoader('isModal');
      }
   }

   imagePosition(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxLoader('imagePosition', arg);
      } else {
          return this.host.jqxLoader('imagePosition');
      }
   }

   rtl(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxLoader('rtl', arg);
      } else {
          return this.host.jqxLoader('rtl');
      }
   }

   text(arg?: String | Number) : any {
      if (arg !== undefined) {
          this.host.jqxLoader('text', arg);
      } else {
          return this.host.jqxLoader('text');
      }
   }

   textPosition(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxLoader('textPosition', arg);
      } else {
          return this.host.jqxLoader('textPosition');
      }
   }

   theme(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxLoader('theme', arg);
      } else {
          return this.host.jqxLoader('theme');
      }
   }

   width(arg?: String | Number) : any {
      if (arg !== undefined) {
          this.host.jqxLoader('width', arg);
      } else {
          return this.host.jqxLoader('width');
      }
   }


   // jqxLoaderComponent functions
   close(): void {
      this.host.jqxLoader('close');
   }

   open(): void {
      this.host.jqxLoader('open');
   }


   // jqxLoaderComponent events
   @Output() onCreate = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('create', (eventData: any) => { this.onCreate.emit(eventData); });
   }

} //jqxLoaderComponent


