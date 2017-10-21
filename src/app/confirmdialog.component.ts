import { Component, OnInit } from '@angular/core';

@Component({
  template: `
  <h2 mat-dialog-title>Delete...</h2>
  <mat-dialog-content class='dc'>Are you sure?</mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close><mat-icon>reply</mat-icon>&nbsp;No</button>
    <button mat-button [mat-dialog-close]="true"><mat-icon>delete_forever</mat-icon>&nbsp;Yes</button>
  </mat-dialog-actions>`,
  styles: ['.mat-dialog-content {font-family: Roboto,"Helvetica Neue",sans-serif !important}']
})
export class ConfirmDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}