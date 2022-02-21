import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';

import { BasketRoutingModule } from './Basket-routing.module';
import { BasketLayoutComponent } from './Basket-layout/Basket-layout.component';
import { BasketIndexComponent } from './Basket-index/Basket-index.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BasketLayoutComponent,
    BasketIndexComponent
  ],
  imports: [CommonModule, BasketRoutingModule, SharedModule, MatMenuModule]
})
export class BasketModule {}
