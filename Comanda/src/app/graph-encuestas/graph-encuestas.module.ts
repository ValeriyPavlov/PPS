import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraphEncuestasPageRoutingModule } from './graph-encuestas-routing.module';

import { GraphEncuestasPage } from './graph-encuestas.page';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraphEncuestasPageRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),

  ],
  declarations: [GraphEncuestasPage]
})
export class GraphEncuestasPageModule { }
