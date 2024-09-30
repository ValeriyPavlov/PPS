import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphEncuestasPage } from './graph-encuestas.page';

const routes: Routes = [
  {
    path: '',
    component: GraphEncuestasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphEncuestasPageRoutingModule {}
