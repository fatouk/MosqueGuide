import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeSouratesPage } from './liste-sourates.page';

const routes: Routes = [
  {
    path: '',
    component: ListeSouratesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeSouratesPageRoutingModule {}
