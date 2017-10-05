﻿import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { TreeModule } from '../../modules/tree.module';
import { SplitterModule } from '../../modules/splitter.module';

@NgModule({
    declarations: [
        AppComponent
  ],
  imports: [
      BrowserModule, CommonModule, TreeModule, SplitterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
