import { Component, OnInit } from '@angular/core';

import { Goat } from './goat';
import { GoatService } from './goat.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {

  goats: Goat[] = [];

  constructor(private service: GoatService) { }

  ngOnInit(): void {
    this.service.list()
      .then(g => this.goats = g.sort( function(a, b){return b.likes - a.likes} ))
      .then(g => this.goats = g.splice(0,6));
  }
  
  likeGoat(goat: Goat, event): void {
    goat.likes++;
    event.stopPropagation();
  }
  
}