import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LindasPageRoutingModule } from './lindas-routing.module';

import { LindasPage } from './lindas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LindasPageRoutingModule
  ],
  declarations: [LindasPage]
})
export class LindasPageModule {}
