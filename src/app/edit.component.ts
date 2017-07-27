import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog } from '@angular/material';
import { MdSnackBar } from '@angular/material';

import { Goat } from './goat';
import { GoatService } from './goat.service';
import { ConfirmDialogComponent } from './confirmdialog.component';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  goat: Goat;
  dialogRef;
  photos = [];

  constructor(
    private service: GoatService,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MdDialog,
    public snackBar: MdSnackBar
  ) { 
      for (var i = 1; i <= 11; i++) { 
        this.photos.push({name:`goat${i}.jpg`});
    }
  }

  ngOnInit(): void {
    if(this.route.snapshot.url.length > 1) {

    this.route.paramMap
      .switchMap((params: ParamMap) => this.service.get(+params.get('id')))
      .subscribe(g => this.goat = g);
    } else {
      this.goat = new Goat();
      this.goat.photo = 'goat1.jpg'
      this.goat.likes = 0;
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if(this.goat.RowKey) {
      this.service.update(this.goat).then(() => this.goBack());
    } else {
      this.service.create(this.goat).then(() => this.goBack());
    }
  }

  stub(): void {
    this.snackBar.open(`Not implemented yet!`, null, {duration: 2000});
  }
}