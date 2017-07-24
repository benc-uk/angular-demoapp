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
          MdDialogModule,
          MdProgressSpinnerModule } from '@angular/material';


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
    MdDialogModule,
    MdProgressSpinnerModule
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
    MdDialogModule,
    MdProgressSpinnerModule
  ],
  declarations: []
})
export class MaterialModule { }
