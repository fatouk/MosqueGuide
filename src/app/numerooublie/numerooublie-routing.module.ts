import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NumerooubliePage } from './numerooublie.page';

const routes: Routes = [
  {
    path: '',
    component: NumerooubliePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NumerooubliePageRoutingModule {}
