﻿import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { ResponsivePanelModule } from '../../modules/responsivepanel.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule, CommonModule, ResponsivePanelModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }


