import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeMosqueesPage } from './liste-mosquees.page';

const routes: Routes = [
  {
    path: '',
    component: ListeMosqueesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeMosqueesPageRoutingModule {}
