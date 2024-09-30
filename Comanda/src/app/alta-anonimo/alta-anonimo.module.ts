import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaAnonimoPageRoutingModule } from './alta-anonimo-routing.module';

import { AltaAnonimoPage } from './alta-anonimo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaAnonimoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AltaAnonimoPage]
})
export class AltaAnonimoPageModule {}
