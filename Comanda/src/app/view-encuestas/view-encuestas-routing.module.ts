import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewEncuestasPage } from './view-encuestas.page';

const routes: Routes = [
  {
    path: '',
    component: ViewEncuestasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewEncuestasPageRoutingModule {}
