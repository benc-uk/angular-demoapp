import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Goat } from './goat';
import { environment } from '../environments/environment';

@Injectable()
export class GoatService {

  // URL to web api - can be remote or local in memory 
  private apiUrl = environment.api_endpoint;
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  list(): Promise<Goat[]> {
    //console.log(`### API GET ${this.apiUrl}`)
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response.json().data as Goat[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  get(RowKey: number): Promise<Goat> {
    const url = `${this.apiUrl}/${RowKey}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Goat)
      .catch(this.handleError);
  }

  update(goat: Goat): Promise<Goat> {
    const url = `${this.apiUrl}/${goat.RowKey}`;
    return this.http
      .put(url, JSON.stringify(goat), { headers: this.headers })
      .toPromise()
      .then(() => goat)
      .catch(this.handleError);
  }

  create(goat: Goat): Promise<Goat> {
    // Slightly cludgy - when in dev using InMemoryDbService, we fudge IDs on new goats
    if(!environment.production) {
      var rand_id = Math.floor((Math.random() * 1000000) + 1);
      goat.RowKey = rand_id;
      goat['id'] = rand_id;
    }
    return this.http
      .post(this.apiUrl, JSON.stringify(goat), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data as Goat)
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