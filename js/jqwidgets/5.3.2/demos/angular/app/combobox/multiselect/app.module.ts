﻿import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ComboBoxModule } from '../../modules/combobox.module';
import { ButtonModule } from '../../modules/button.module';

@NgModule({
  declarations: [
      AppComponent
  ],
  imports: [
      BrowserModule, ComboBoxModule, ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }


