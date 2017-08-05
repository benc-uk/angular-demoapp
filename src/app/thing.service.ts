import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Thing } from './thing';
import { environment } from '../environments/environment';

@Injectable()
export class ThingService {

  // URL to web api - can be remote or local in memory 
  private apiUrl = environment.api_endpoint;
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  list(): Promise<Thing[]> {
    //console.log(`### API GET ${this.apiUrl}`)
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response.json().data as Thing[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  get(RowKey: number): Promise<Thing> {
    const url = `${this.apiUrl}/${RowKey}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Thing)
      .catch(this.handleError);
  }

  update(Thing: Thing): Promise<Thing> {
    const url = `${this.apiUrl}/${Thing.RowKey}`;
    return this.http
      .put(url, JSON.stringify(Thing), { headers: this.headers })
      .toPromise()
      .then(() => Thing)
      .catch(this.handleError);
  }

  create(Thing: Thing): Promise<Thing> {
    // Slightly cludgy - when in dev using InMemoryDbService, we fudge IDs on new Things
    if(!environment.production) {
      var rand_id = Math.floor((Math.random() * 1000000) + 1);
      Thing.RowKey = rand_id;
      Thing['id'] = rand_id;
    }
    return this.http
      .post(this.apiUrl, JSON.stringify(Thing), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data as Thing)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}