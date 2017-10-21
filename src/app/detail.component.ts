import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Thing } from './thing';
import { ThingService } from './thing.service';
import { ConfirmDialogComponent } from './confirmdialog.component';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
  thing: Thing;
  dialogRef;

  constructor(
    private service: ThingService,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.service.get(+params.get('id')))
      .subscribe(g => this.thing = g);
  }

  goBack(): void {
    this.location.back();
  }

  delete(): void {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.snackBar.open(`Oh no, ${this.thing.name} Deleted!`, null, {duration: 2000});
        this.service.delete(this.thing.RowKey).subscribe(() => this.goBack(), err => console.log(err));
      }
    });
  }

  stub(): void {
    this.snackBar.open(`Not implemented yet!`, null, {duration: 2000});
  }

  like(thing: Thing): void {
    let snackBarRef = this.snackBar.open(`Yeah, ${thing.name} is great!`, null, {duration: 2000});

    thing.likes++;
    this.service.update(thing).subscribe();
  }
}