import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdIconModule, MdMenuModule, MdToolbarModule, MdSidenavModule, MdGridListModule, MdButtonModule, MdCardModule } from '@angular/material';


@NgModule({
  imports: [
    MdIconModule, MdMenuModule, MdToolbarModule, MdSidenavModule, MdGridListModule, MdButtonModule, MdCardModule
  ],
  exports: [
    MdIconModule, MdMenuModule, MdToolbarModule, MdSidenavModule, MdGridListModule, MdButtonModule, MdCardModule
  ],
  declarations: []
})
export class MaterialModule { }
