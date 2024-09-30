import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GraficosPageRoutingModule } from './graficos-routing.module';
import { GraficosPage } from './graficos.page';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraficosPageRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  declarations: [GraficosPage]
})
export class GraficosPageModule {}
