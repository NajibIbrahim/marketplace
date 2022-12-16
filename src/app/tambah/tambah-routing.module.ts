import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TambahPage } from './tambah.page';

const routes: Routes = [
  {
    path: '',
    component: TambahPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TambahPageRoutingModule {}
