import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { ListComponent }        from './list.component';
import { DetailComponent }      from './detail.component';
import { EditComponent }        from './edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'edit/:id',   component: EditComponent },
  { path: 'new',        component: EditComponent },
  { path: 'list',       component: ListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}