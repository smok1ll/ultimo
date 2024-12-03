import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibroPage } from './libro.page';

const routes: Routes = [
  {
    path: '',
    component: LibroPage
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('../../page/detail/detail.module').then(m => m.DetailPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibroPageRoutingModule {}
