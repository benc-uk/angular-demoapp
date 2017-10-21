import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Thing } from './thing';
import { ThingService } from './thing.service';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent implements OnInit {
  title = 'Angular4 Demoapp';
  things: Thing[];

  constructor(
    private router: Router,
    private service: ThingService) { }

  ngOnInit(): void {
    this.service.list().subscribe(
      data => this.things = data,
      err => console.log(err)
    );
  }
}