import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeasPageRoutingModule } from './feas-routing.module';

import { FeasPage } from './feas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeasPageRoutingModule
  ],
  declarations: [FeasPage]
})
export class FeasPageModule {}
