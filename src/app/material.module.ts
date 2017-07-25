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
          MdProgressSpinnerModule,
          MdInputModule,
          MdSelectModule } from '@angular/material';


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
    MdProgressSpinnerModule,
    MdInputModule,
    MdSelectModule
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
    MdProgressSpinnerModule,
    MdInputModule,
    MdSelectModule
  ],
  declarations: []
})
export class MaterialModule { }
