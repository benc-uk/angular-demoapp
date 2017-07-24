import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { Goat } from './goat';
import { GoatService } from './goat.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
})

export class DashboardComponent implements OnInit {

  goats: Goat[] = [];

  constructor(private service: GoatService, public snackBar: MdSnackBar) { }

  ngOnInit(): void {
    this.service.list()
      .then(g => this.goats = g.sort( function(a, b){return b.likes - a.likes} ))
      .then(g => this.goats = g.splice(0,6))
  }
  
  likeGoat(goat: Goat, event): void {
    let snackBarRef = this.snackBar.open(`${goat.name} is a great goat!`, null, {duration: 2000});

    goat.likes++;
    this.service.update(goat);
    event.stopPropagation();
  }
  
}