import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Thing } from './thing';
import { ThingService } from './thing.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
})

export class DashboardComponent implements OnInit {

  things: Thing[] = [];

  constructor(private service: ThingService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.service.list().subscribe(
      data => {
        this.things = data.sort( function(a, b){return b.likes - a.likes} );
        this.things = this.things.splice(0,6);
      },
      err => {console.log(err)})
  }
  
  like(thing: Thing, event): void {
    let snackBarRef = this.snackBar.open(`Yeah, ${thing.name} is great!`, null, {duration: 2000});

    thing.likes++;
    this.service.update(thing).subscribe(()=>{}, err => console.log(err));
    event.stopPropagation();
  }
  
}