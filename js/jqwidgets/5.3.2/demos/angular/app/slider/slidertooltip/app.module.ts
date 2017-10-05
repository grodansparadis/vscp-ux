﻿import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { SliderModule } from '../../modules/slider.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule, CommonModule, SliderModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }


