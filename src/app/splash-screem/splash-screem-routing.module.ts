import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashScreemPage } from './splash-screem.page';

const routes: Routes = [
  {
    path: '',
    component: SplashScreemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplashScreemPageRoutingModule {}
