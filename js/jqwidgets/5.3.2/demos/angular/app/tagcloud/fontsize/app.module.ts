﻿import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TagCloudModule } from '../../modules/tagcloud.module';
import { ButtonModule } from '../../modules/button.module';
import { InputModule } from '../../modules/input.module';

@NgModule({
    declarations: [
        AppComponent
  ],
  imports: [
      BrowserModule, CommonModule, FormsModule, 
	  TagCloudModule, ButtonModule, InputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }


