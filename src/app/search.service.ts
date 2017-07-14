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
      return this.http
         .get(`${environment.api_endpoint}/?name=${term}`)
         .map(response => response.json().data as Goat[]);
   }
}