import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeMosqueesPageRoutingModule } from './liste-mosquees-routing.module';

import { ListeMosqueesPage } from './liste-mosquees.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeMosqueesPageRoutingModule
  ],
  declarations: [ListeMosqueesPage]
})
export class ListeMosqueesPageModule {}
