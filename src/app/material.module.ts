import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MdIconModule,
          MdMenuModule,
          MdToolbarModule,
          MdSidenavModule,
          MdGridListModule,
          MdButtonModule,
          MdCardModule,
          MdListModule,
          MdSnackBarModule,
          MdTooltipModule, 
          MdDialogModule } from '@angular/material';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    MdIconModule,
    MdMenuModule,
    MdToolbarModule,
    MdSidenavModule,
    MdGridListModule,
    MdButtonModule,
    MdCardModule,
    MdListModule,
    MdSnackBarModule,
    MdTooltipModule,
    MdDialogModule
  ],
  exports: [
    BrowserAnimationsModule,
    MdIconModule,
    MdMenuModule,
    MdToolbarModule,
    MdSidenavModule,
    MdGridListModule,
    MdButtonModule,
    MdCardModule,
    MdListModule,
    MdSnackBarModule,
    MdTooltipModule,
    MdDialogModule
  ],
  declarations: []
})
export class MaterialModule { }
