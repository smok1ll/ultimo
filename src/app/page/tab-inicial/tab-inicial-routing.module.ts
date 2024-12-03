import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabInicialPage } from './tab-inicial.page';

const routes: Routes = [
  {
    path: '',
    component: TabInicialPage,
    children: [
      {
        path: 'libro',
        loadChildren: () => import('./../../page/libro/libro.module').then( m => m.LibroPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./../../page/perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'inicio',
        loadChildren: () => import('./../../page/inicio/inicio.module').then( m => m.InicioPageModule)
      },
      //sacar x siacaso
      {
        path: '',
        redirectTo: '/tab-inicial/inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tab-inicial/inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabInicialPageRoutingModule {}
