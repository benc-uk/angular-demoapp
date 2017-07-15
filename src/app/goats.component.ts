import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Goat } from './goat';
import { GoatService } from './goat.service';

@Component({
  selector: 'my-goats',
  templateUrl: './goats.component.html',
  styleUrls: ['./goats.component.css'],
})

export class GoatsComponent implements OnInit {
  title = 'Angular4 Demoapp';
  goats: Goat[];
  selectedGoat: Goat;

  constructor(
    private router: Router,
    private service: GoatService) { }

  getGoats(): void {
    this.service.list().then(g => this.goats = g);
  }

  onSelect(goat: Goat): void {
    this.selectedGoat = goat;
  }

  ngOnInit(): void {
    this.getGoats();
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedGoat.RowKey]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.service.create(name)
      .then(g => {
        this.goats.push(g);
        this.selectedGoat = null;
      });
  }

  delete(goat: Goat): void {
    this.service
      .delete(goat.RowKey)
      .then(() => {
        this.goats = this.goats.filter(g => g !== goat);
        if (this.selectedGoat === goat) { this.selectedGoat = null; }
      });
  }
}