import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaEncuestasPageRoutingModule } from './alta-encuestas-routing.module';

import { AltaEncuestasPage } from './alta-encuestas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaEncuestasPageRoutingModule,
    // ReactiveFormsModule
  ],
  declarations: [AltaEncuestasPage]
})
export class AltaEncuestasPageModule { }
