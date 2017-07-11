import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { DashboardComponent } from './dashboard.component';
import { AppRoutingModule }     from './app-routing.module';
import { HeroSearchComponent }     from './hero-search.component';
import { environment } from '../environments/environment';

var app_imports = [];

// This is terrible but alternatives didn't look much better
if(!environment.production) {
  app_imports = [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ];
} else {
  app_imports = [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
  ]
}

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: app_imports,
  providers: [ HeroService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }

