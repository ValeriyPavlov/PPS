import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeasPage } from './feas.page';

const routes: Routes = [
  {
    path: '',
    component: FeasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeasPageRoutingModule {}
