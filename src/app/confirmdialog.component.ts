import { Component, OnInit } from '@angular/core';

@Component({
  template: `
  <h2 md-dialog-title>Delete...</h2>
  <md-dialog-content class='dc'>Are you sure?</md-dialog-content>
  <md-dialog-actions>
    <button md-button md-dialog-close>No</button>
    <button md-button [md-dialog-close]="true">Yes</button>
  </md-dialog-actions>`,
  styles: ['.mat-dialog-content {font-family: Roboto,"Helvetica Neue",sans-serif !important}']
})
export class ConfirmDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}