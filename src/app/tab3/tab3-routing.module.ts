import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryPage } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryPageRoutingModule {}
