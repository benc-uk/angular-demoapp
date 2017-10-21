import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule }    from '@angular/common/http';

// Imports for loading & configuring the in-memory web api
//import { HttpInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemService } from './in-mem-api';

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
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemService, { passThruUnknownUrl: true }),
    MaterialModule, FlexLayoutModule ],
  providers: [ ThingService ],
  bootstrap: [ AppComponent ], 
  entryComponents: [ ConfirmDialogComponent ]
})

export class AppModule { }

