import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'log',
    loadChildren: () => import('./log/log.module').then(m => m.LogPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'alta-empleado',
    loadChildren: () => import('./alta-empleado/alta-empleado.module').then(m => m.AltaEmpleadoPageModule)
  },
  {
    path: 'alta-cliente',
    loadChildren: () => import('./alta-cliente/alta-cliente.module').then(m => m.AltaClientePageModule)
  },
  {
    path: 'alta-anonimo',
    loadChildren: () => import('./alta-anonimo/alta-anonimo.module').then(m => m.AltaAnonimoPageModule)
  },
  {
    path: 'home-cliente',
    loadChildren: () => import('./home-cliente/home-cliente.module').then(m => m.HomeClientePageModule)
  },
  {
    path: 'home-maitre',
    loadChildren: () => import('./home-maitre/home-maitre.module').then(m => m.HomeMaitrePageModule)
  },
  {
    path: 'alta-encuentas',
    loadChildren: () => import('./alta-encuestas/alta-encuestas.module').then(m => m.AltaEncuestasPageModule)
  },
  {
    path: 'view-encuestas',
    loadChildren: () => import('./view-encuestas/view-encuestas.module').then(m => m.ViewEncuestasPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'home-cocinero-barman',
    loadChildren: () => import('./home-cocinero-barman/home-cocinero-barman.module').then(m => m.HomeCocineroBarmanPageModule)
  },
  {
    path: 'home-mozo',
    loadChildren: () => import('./home-mozo/home-mozo.module').then(m => m.HomeMozoPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule)
  },
  {
    path: 'graph-encuestas',
    loadChildren: () => import('./graph-encuestas/graph-encuestas.module').then(m => m.GraphEncuestasPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
