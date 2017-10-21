import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Thing } from './thing';
import { environment } from '../environments/environment';

@Injectable()
export class SearchService {

   constructor(private http: HttpClient) { }

   search(term: string): Observable<Thing[]> {
      var query_url = "";
      if (environment.production) {
         query_url = `${environment.api_endpoint}/search/${term}`;
      } else {
         query_url = `${environment.api_endpoint}/?name=${term}`
      }
      return this.http
         .get(query_url)
         .map(response => response as Thing[]);
   }
}