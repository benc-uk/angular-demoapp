import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MatInputModule } from '@angular/material';

import { Thing } from './thing';
import { ThingService } from './thing.service';
import { ConfirmDialogComponent } from './confirmdialog.component';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  thing: Thing;
  dialogRef;
  photos = [];

  constructor(
    private service: ThingService,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { 
      for (var i = 1; i <= 11; i++) { 
        // This super rubbish, maybe add file upload features later
        this.photos = ["acorn-electron.jpg", "amiga-a500.jpg", "amstrad-cpc-464.jpg", "angular.svg", "atari-520st.jpg", "bbc-micro.jpg", "c64.jpg", "dragon-32.jpg", "github.svg", "sam-coupe.jpg", "vic-20.jpg", "zx-spectrum.jpg", "zx81.jpg"];
    }
  }

  ngOnInit(): void {
    if(this.route.snapshot.url.length > 1) {

    this.route.paramMap
      .switchMap((params: ParamMap) => this.service.get(+params.get('id')))
      .subscribe(g => this.thing = g);
    } else {
      this.thing = new Thing();
      this.thing.photo = 'zx-spectrum.jpg'
      this.thing.likes = 0;
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if(this.thing.RowKey) {
      this.service.update(this.thing).subscribe(() => this.goBack(), err => console.log(err));
    } else {
      this.service.create(this.thing).subscribe(() => this.goBack(), err => console.log(err));
    }
  }

  stub(): void {
    this.snackBar.open(`Not implemented yet!`, null, {duration: 2000});
  }
}