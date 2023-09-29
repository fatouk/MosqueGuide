import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeSouratesPageRoutingModule } from './liste-sourates-routing.module';

import { ListeSouratesPage } from './liste-sourates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeSouratesPageRoutingModule
  ],
  declarations: [ListeSouratesPage]
})
export class ListeSouratesPageModule {}
