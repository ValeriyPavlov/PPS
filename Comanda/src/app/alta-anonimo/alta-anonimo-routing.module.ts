import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltaAnonimoPage } from './alta-anonimo.page';

const routes: Routes = [
  {
    path: '',
    component: AltaAnonimoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltaAnonimoPageRoutingModule {}
