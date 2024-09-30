import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewEncuestasPageRoutingModule } from './view-encuestas-routing.module';

import { ViewEncuestasPage } from './view-encuestas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewEncuestasPageRoutingModule
  ],
  declarations: [ViewEncuestasPage]
})
export class ViewEncuestasPageModule {}
