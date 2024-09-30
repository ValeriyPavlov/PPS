import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeCocineroBarmanPage } from './home-cocinero-barman.page';

const routes: Routes = [
  {
    path: '',
    component: HomeCocineroBarmanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeCocineroBarmanPageRoutingModule {}
