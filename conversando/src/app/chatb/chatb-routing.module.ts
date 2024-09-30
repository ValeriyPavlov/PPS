import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatbPage } from './chatb.page';

const routes: Routes = [
  {
    path: '',
    component: ChatbPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatbPageRoutingModule {}
