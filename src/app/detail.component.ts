import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog } from '@angular/material';
import { MdSnackBar } from '@angular/material';

import { Goat } from './goat';
import { GoatService } from './goat.service';
import { StubdialogComponent } from './stubdialog.component';

@Component({
  selector: 'goat-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
  goat: Goat;
  dialogRef;

  constructor(
    private service: GoatService,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MdDialog,
    public snackBar: MdSnackBar
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

  delete(): void {
    this.dialogRef = this.dialog.open(StubdialogComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.snackBar.open(`${this.goat.name} Deleted!`, null, {duration: 2000});
        this.service.delete(this.goat.RowKey).then(() => this.goBack());
      }
    });
  }

  stub(): void {
    //this.service.delete(this.goat.RowKey).then(() => this.goBack());
  }
}