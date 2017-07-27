import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Goat } from './goat';
import { environment } from '../environments/environment';

@Injectable()
export class SearchService {

   constructor(private http: Http) { }

   search(term: string): Observable<Goat[]> {
      var query_url = "";
      if (environment.production) {
         query_url = `${environment.api_endpoint}/search/${term}`;
      } else {
         query_url = `${environment.api_endpoint}/?name=${term}`
      }
      return this.http
         .get(query_url)
         .map(response => response.json().data as Goat[]);
   }
}