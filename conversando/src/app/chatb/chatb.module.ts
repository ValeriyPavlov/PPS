import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatbPageRoutingModule } from './chatb-routing.module';

import { ChatbPage } from './chatb.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatbPageRoutingModule
  ],
  declarations: [ChatbPage]
})
export class ChatbPageModule {}
