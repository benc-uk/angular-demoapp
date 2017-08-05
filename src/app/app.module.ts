import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryThingService }  from './in-memory-data.service';

// Flexlayout
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { ListComponent } from './list.component';
import { DetailComponent } from './detail.component';
import { EditComponent } from './edit.component';
import { ThingService } from './thing.service';
import { DashboardComponent } from './dashboard.component';
import { RoutingModule }     from './routing.module';
import { SearchComponent }     from './search.component';
import { environment } from '../environments/environment';
// Material
import { MaterialModule } from './material.module';
import { ConfirmDialogComponent } from './confirmdialog.component';

// This is terrible but alternatives didn't look much better
var app_imports = [];
if(!environment.production) {
  app_imports = [
    BrowserModule,
    FormsModule,
    RoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryThingService, {passThruUnknownUrl:true}),
    MaterialModule, FlexLayoutModule ];
} else {
  app_imports = [
    BrowserModule,
    FormsModule,
    RoutingModule,
    HttpModule,
    MaterialModule, FlexLayoutModule ]
}

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailComponent,
    EditComponent,
    DashboardComponent,
    SearchComponent,
    ConfirmDialogComponent
  ],
  imports: app_imports,
  providers: [ ThingService ],
  bootstrap: [ AppComponent ], 
  entryComponents: [ ConfirmDialogComponent ]
})

export class AppModule { }

