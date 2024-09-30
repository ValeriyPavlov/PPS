import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeCocineroBarmanPageRoutingModule } from './home-cocinero-barman-routing.module';

import { HomeCocineroBarmanPage } from './home-cocinero-barman.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeCocineroBarmanPageRoutingModule
  ],
  declarations: [HomeCocineroBarmanPage]
})
export class HomeCocineroBarmanPageModule {}
