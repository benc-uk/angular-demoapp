import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Goat } from './goat';
import { GoatService } from './goat.service';

@Component({
  selector: 'goat-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
  goat: Goat;

  constructor(
    private service: GoatService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.service.get(+params.get('id')))
      .subscribe(g => this.goat = g);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.service.update(this.goat).then(() => this.goBack());
  }
}