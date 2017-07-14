import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { SearchService } from './search.service';
import { Goat } from './goat';

@Component({
  selector: 'goat-search',
  templateUrl: './search.component.html',
  providers: [SearchService]
})
export class SearchComponent implements OnInit {
  goats: Observable<Goat[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private searchSvc: SearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.goats = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.searchSvc.search(term)
        // or the observable of empty goats if there was no search term
        : Observable.of<Goat[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Goat[]>([]);
      });
  }

  gotoDetail(goat: Goat): void {
    let link = ['/detail', goat.id];
    this.router.navigate(link);
  }
}