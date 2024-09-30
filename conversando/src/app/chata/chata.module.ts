import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChataPageRoutingModule } from './chata-routing.module';

import { ChataPage } from './chata.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChataPageRoutingModule
  ],
  declarations: [ChataPage]
})
export class ChataPageModule {}
