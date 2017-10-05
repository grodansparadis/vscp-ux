/*
jQWidgets v5.3.2 (2017-Sep)
Copyright (c) 2011-2017 jQWidgets.
License: http://jqwidgets.com/license/
*/
/// <reference path="jqwidgets.d.ts" />
import { Component, Input, Output, EventEmitter, ElementRef, forwardRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => { };
declare let JQXLite: any;

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => jqxInputComponent),
    multi: true
}

@Component({
    selector: 'jqxInput',
    template: '<input type="text" [(ngModel)]="ngValue">',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class jqxInputComponent implements ControlValueAccessor, OnChanges 
{
   @Input('disabled') attrDisabled: any;
   @Input('dropDownWidth') attrDropDownWidth: any;
   @Input('displayMember') attrDisplayMember: any;
   @Input('items') attrItems: any;
   @Input('minLength') attrMinLength: any;
   @Input('maxLength') attrMaxLength: any;
   @Input('opened') attrOpened: any;
   @Input('placeHolder') attrPlaceHolder: any;
   @Input('popupZIndex') attrPopupZIndex: any;
   @Input('query') attrQuery: any;
   @Input('renderer') attrRenderer: any;
   @Input('rtl') attrRtl: any;
   @Input('searchMode') attrSearchMode: any;
   @Input('source') attrSource: any;
   @Input('theme') attrTheme: any;
   @Input('valueMember') attrValueMember: any;
   @Input('value') attrValue: any;
   @Input('width') attrWidth: any;
   @Input('height') attrHeight: any;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['disabled','dropDownWidth','displayMember','height','items','minLength','maxLength','opened','placeHolder','popupZIndex','query','renderer','rtl','searchMode','source','theme','valueMember','width','value'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxInput;

   private onTouchedCallback: () => void = noop;
   private onChangeCallback: (_: any) => void = noop;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxInput(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxInput(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxInput(this.properties[i])) {
                  this.host.jqxInput(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxInput', options);

      this.__updateRect__();
   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   get ngValue(): any {
       if (this.widgetObject)
           return this.host.val();
       return '';
   }

   set ngValue(value: any) {
       if (this.widgetObject) {
           this.onChangeCallback(value);
       }
   }

   writeValue(value: any): void {
       if(this.widgetObject) {
           this.host.jqxInput('val', value);
       }
   }

   registerOnChange(fn: any): void {
       this.onChangeCallback = fn;
   }

   registerOnTouched(fn: any): void {
       this.onTouchedCallback = fn;
   }

   setOptions(options: any) : void {
      this.host.jqxInput('setOptions', options);
   }

   // jqxInputComponent properties
   disabled(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxInput('disabled', arg);
      } else {
          return this.host.jqxInput('disabled');
      }
   }

   dropDownWidth(arg?: String | Number) : any {
      if (arg !== undefined) {
          this.host.jqxInput('dropDownWidth', arg);
      } else {
          return this.host.jqxInput('dropDownWidth');
      }
   }

   displayMember(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxInput('displayMember', arg);
      } else {
          return this.host.jqxInput('displayMember');
      }
   }

   height(arg?: String | Number) : any {
      if (arg !== undefined) {
          this.host.jqxInput('height', arg);
      } else {
          return this.host.jqxInput('height');
      }
   }

   items(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxInput('items', arg);
      } else {
          return this.host.jqxInput('items');
      }
   }

   minLength(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxInput('minLength', arg);
      } else {
          return this.host.jqxInput('minLength');
      }
   }

   maxLength(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxInput('maxLength', arg);
      } else {
          return this.host.jqxInput('maxLength');
      }
   }

   opened(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxInput('opened', arg);
      } else {
          return this.host.jqxInput('opened');
      }
   }

   placeHolder(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxInput('placeHolder', arg);
      } else {
          return this.host.jqxInput('placeHolder');
      }
   }

   popupZIndex(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxInput('popupZIndex', arg);
      } else {
          return this.host.jqxInput('popupZIndex');
      }
   }

   query(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxInput('query', arg);
      } else {
          return this.host.jqxInput('query');
      }
   }

   renderer(arg?: (itemValue?: String, inputValue?: String) => String) : any {
      if (arg !== undefined) {
          this.host.jqxInput('renderer', arg);
      } else {
          return this.host.jqxInput('renderer');
      }
   }

   rtl(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxInput('rtl', arg);
      } else {
          return this.host.jqxInput('rtl');
      }
   }

   searchMode(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxInput('searchMode', arg);
      } else {
          return this.host.jqxInput('searchMode');
      }
   }

   source(arg?: Array<any>) : any {
      if (arg !== undefined) {
          this.host.jqxInput('source', arg);
      } else {
          return this.host.jqxInput('source');
      }
   }

   theme(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxInput('theme', arg);
      } else {
          return this.host.jqxInput('theme');
      }
   }

   valueMember(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxInput('valueMember', arg);
      } else {
          return this.host.jqxInput('valueMember');
      }
   }

   width(arg?: String | Number) : any {
      if (arg !== undefined) {
          this.host.jqxInput('width', arg);
      } else {
          return this.host.jqxInput('width');
      }
   }

   value(arg?: String | Number) : any {
      if (arg !== undefined) {
          this.host.jqxInput('value', arg);
      } else {
          return this.host.jqxInput('value');
      }
   }


   // jqxInputComponent functions
   destroy(): void {
      this.host.jqxInput('destroy');
   }

   focus(): void {
      this.host.jqxInput('focus');
   }

   selectAll(): void {
      this.host.jqxInput('selectAll');
   }

   val(value?: String | Number): any {
      if (value !== undefined) {
         return this.host.jqxInput("val", value);
      } else {
         return this.host.jqxInput("val");
      }
   };


   // jqxInputComponent events
   @Output() onChange = new EventEmitter();
   @Output() onClose = new EventEmitter();
   @Output() onOpen = new EventEmitter();
   @Output() onSelect = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); });
      this.host.on('close', (eventData: any) => { this.onClose.emit(eventData); });
      this.host.on('open', (eventData: any) => { this.onOpen.emit(eventData); });
      this.host.on('select', (eventData: any) => { this.onSelect.emit(eventData); if (eventData.args) this.onChangeCallback(eventData.args.value); });
   }

} //jqxInputComponent


