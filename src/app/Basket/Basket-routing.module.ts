import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketIndexComponent } from './Basket-index/Basket-index.component';
import { BasketLayoutComponent } from './Basket-layout/Basket-layout.component';

const BasketChildrenRoute: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BasketIndexComponent
  }
];

const routes: Routes = [
  {
    path: '',
    component: BasketLayoutComponent,
    children: BasketChildrenRoute
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasketRoutingModule {}
