import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateTypePage } from './update-type.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateTypePageRoutingModule {}
