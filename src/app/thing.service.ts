import { Observable } from "rxjs/Observable";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Thing } from './thing';
import { environment } from '../environments/environment';

@Injectable()
export class ThingService {

  // URL to web api - can be remote or local in memory 
  private apiUrl = environment.api_endpoint;
  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(private http: HttpClient) { }

  list(): Observable<Thing[]> {
    console.log(`### API GET ${this.apiUrl}`);
    return this.http.get<Thing[]>(`/api/things`);
  }

  get(RowKey: number): Observable<Thing> {
    return this.http.get<Thing>(`${this.apiUrl}/${RowKey}`);
  }

  update(thing: Thing): Observable<Thing> {
    return this.http.put<Thing>(`${this.apiUrl}/${thing.RowKey}`, thing, {headers:this.headers});
  }

  create(thing: Thing): Observable<Thing> {
    // Slightly cludgy - when in dev using InMemoryDbService, we fudge IDs on new Things
    if(!environment.production) {
      var rand_id = Math.floor((Math.random() * 1000000) + 1);
      thing.RowKey = rand_id;
      thing['id'] = rand_id;
    }
    return this.http.post<Thing>(`${this.apiUrl}/${thing.RowKey}`, thing, {headers:this.headers});
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}/${id}`, {headers:this.headers});
  }
}