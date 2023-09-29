import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashScreemPageRoutingModule } from './splash-screem-routing.module';

import { SplashScreemPage } from './splash-screem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashScreemPageRoutingModule
  ],
  declarations: [SplashScreemPage]
})
export class SplashScreemPageModule {}
