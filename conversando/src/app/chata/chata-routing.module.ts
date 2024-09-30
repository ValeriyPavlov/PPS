import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChataPage } from './chata.page';

const routes: Routes = [
  {
    path: '',
    component: ChataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChataPageRoutingModule {}
