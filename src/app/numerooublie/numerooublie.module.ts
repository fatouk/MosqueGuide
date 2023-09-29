import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NumerooubliePageRoutingModule } from './numerooublie-routing.module';

import { NumerooubliePage } from './numerooublie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NumerooubliePageRoutingModule
  ],
  declarations: [NumerooubliePage]
})
export class NumerooubliePageModule {}
