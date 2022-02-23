import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'll-Basket-index',
  templateUrl: './Basket-index.component.html',
  styleUrls: ['./Basket-index.component.scss']
})
export class BasketIndexComponent implements OnInit {
  orders = [];
  constructor() {}

  ngOnInit(): void {
    this.orders = [
      {
        id: 'e5dcdfsf',
        productImage: '02-1.jpg',
        productName: 'CadioConfort Omega3',
        quantity: 2,
        price: 2145.0
      },
      {
        id: 'e5dcdfsf',
        productImage: '01-3.png',
        productName: 'Vitalogink',
        quantity: 5,
        price: 2145.0
      },
      {
        id: 'e5dcdfsf',
        productImage: '01-4.png',
        productName: 'Oméga3',
        quantity: 1,
        price: 2145.0
      }
    ];
  }

  // tslint:disable-next-line:typedef
  protected Decrease(order: any) {
    order.quantity -= 1;
    if (order.quantity <= 0){
      order.quantity = 1;
    }
  }

  // tslint:disable-next-line:typedef
  Increase(order: any) {
    order.quantity += 1;
  }

  // tslint:disable-next-line:typedef
  Total() {
    let total = 0;
    for (const order of this.orders){
      total += order?.price;
    }
    return total;
  }
}
