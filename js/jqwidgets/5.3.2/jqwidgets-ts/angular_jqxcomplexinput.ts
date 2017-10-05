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
    useExisting: forwardRef(() => jqxComplexInputComponent),
    multi: true
}

@Component({
    selector: 'jqxComplexInput',
    template: '<div style="display: inline-flex"><input [(ngModel)]="ngValue"><div></div></div>',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class jqxComplexInputComponent implements ControlValueAccessor, OnChanges 
{
   @Input('decimalNotation') attrDecimalNotation: any;
   @Input('disabled') attrDisabled: any;
   @Input('placeHolder') attrPlaceHolder: any;
   @Input('roundedCorners') attrRoundedCorners: any;
   @Input('rtl') attrRtl: any;
   @Input('spinButtons') attrSpinButtons: any;
   @Input('spinButtonsStep') attrSpinButtonsStep: any;
   @Input('template') attrTemplate: any;
   @Input('theme') attrTheme: any;
   @Input('value') attrValue: any;
   @Input('width') attrWidth: any;
   @Input('height') attrHeight: any;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['decimalNotation','disabled','height','placeHolder','roundedCorners','rtl','spinButtons','spinButtonsStep','template','theme','value','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxComplexInput;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxComplexInput(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxComplexInput(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxComplexInput(this.properties[i])) {
                  this.host.jqxComplexInput(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxComplexInput', options);

      this.__updateRect__();
      setTimeout(_=> {
         let valueWithWS = `JQXLite{options.value}`;
         this.host.jqxComplexInput({ value: valueWithWS });
      });
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
           this.onChangeCallback(this.host.val());
           this.host.jqxComplexInput('val', value);
       }
   }

   registerOnChange(fn: any): void {
       this.onChangeCallback = fn;
   }

   registerOnTouched(fn: any): void {
       this.onTouchedCallback = fn;
   }

   setOptions(options: any) : void {
      this.host.jqxComplexInput('setOptions', options);
   }

   // jqxComplexInputComponent properties
   decimalNotation(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxComplexInput('decimalNotation', arg);
      } else {
          return this.host.jqxComplexInput('decimalNotation');
      }
   }

   disabled(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxComplexInput('disabled', arg);
      } else {
          return this.host.jqxComplexInput('disabled');
      }
   }

   height(arg?: String | Number) : any {
      if (arg !== undefined) {
          this.host.jqxComplexInput('height', arg);
      } else {
          return this.host.jqxComplexInput('height');
      }
   }

   placeHolder(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxComplexInput('placeHolder', arg);
      } else {
          return this.host.jqxComplexInput('placeHolder');
      }
   }

   roundedCorners(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxComplexInput('roundedCorners', arg);
      } else {
          return this.host.jqxComplexInput('roundedCorners');
      }
   }

   rtl(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxComplexInput('rtl', arg);
      } else {
          return this.host.jqxComplexInput('rtl');
      }
   }

   spinButtons(arg?: boolean) : any {
      if (arg !== undefined) {
          this.host.jqxComplexInput('spinButtons', arg);
      } else {
          return this.host.jqxComplexInput('spinButtons');
      }
   }

   spinButtonsStep(arg?: number) : any {
      if (arg !== undefined) {
          this.host.jqxComplexInput('spinButtonsStep', arg);
      } else {
          return this.host.jqxComplexInput('spinButtonsStep');
      }
   }

   template(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxComplexInput('template', arg);
      } else {
          return this.host.jqxComplexInput('template');
      }
   }

   theme(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxComplexInput('theme', arg);
      } else {
          return this.host.jqxComplexInput('theme');
      }
   }

   value(arg?: string) : any {
      if (arg !== undefined) {
          this.host.jqxComplexInput('value', arg);
      } else {
          return this.host.jqxComplexInput('value');
      }
   }

   width(arg?: String | Number) : any {
      if (arg !== undefined) {
          this.host.jqxComplexInput('width', arg);
      } else {
          return this.host.jqxComplexInput('width');
      }
   }


   // jqxComplexInputComponent functions
   destroy(): void {
      this.host.jqxComplexInput('destroy');
   }

   getReal(complexNumber?: number): number {
      return this.host.jqxComplexInput('getReal', complexNumber);
   }

   getImaginary(complexNumber?: number): number {
      return this.host.jqxComplexInput('getImaginary', complexNumber);
   }

   getDecimalNotation(part?: string, type?: string): string {
      return this.host.jqxComplexInput('getDecimalNotation', part, type);
   }

   render(): void {
      this.host.jqxComplexInput('render');
   }

   refresh(): void {
      this.host.jqxComplexInput('refresh');
   }

   val(value?: any): any {
      if (value !== undefined) {
         return this.host.jqxComplexInput("val", value);
      } else {
         return this.host.jqxComplexInput("val");
      }
   };


   // jqxComplexInputComponent events
   @Output() onChange = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); if (eventData.args) this.onChangeCallback(eventData.args.value); });
   }

} //jqxComplexInputComponent


