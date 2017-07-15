import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdIconModule, MdMenuModule, MdToolbarModule, MdSidenavModule, MdGridListModule, MdButtonModule, MdCardModule, MdListModule } from '@angular/material';


@NgModule({
  imports: [
    BrowserAnimationsModule, MdIconModule, MdMenuModule, MdToolbarModule, MdSidenavModule, MdGridListModule, MdButtonModule, MdCardModule, MdListModule
  ],
  exports: [
    BrowserAnimationsModule, MdIconModule, MdMenuModule, MdToolbarModule, MdSidenavModule, MdGridListModule, MdButtonModule, MdCardModule, MdListModule
  ],
  declarations: []
})
export class MaterialModule { }
