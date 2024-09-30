import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltaEncuestasPage } from './alta-encuestas.page';

const routes: Routes = [
  {
    path: '',
    component: AltaEncuestasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltaEncuestasPageRoutingModule { }
