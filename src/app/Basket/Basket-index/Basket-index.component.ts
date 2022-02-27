import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Caddy } from 'src/app/model/caddy.model';
import { Client } from 'src/app/model/client.model';
import { ItemProduct } from 'src/app/model/item-product.model';
import { Product } from 'src/app/model/product.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CaddyService } from 'src/app/_services/caddy.service';
import { OrderService } from 'src/app/_services/command.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'll-Basket-index',
  templateUrl: './Basket-index.component.html',
  styleUrls: ['./Basket-index.component.scss']
})
export class BasketIndexComponent implements OnInit {
  orders = [
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
  ];;
  public caddy:Caddy;
  public currentCaddyName:string="Basket1";
  public listCaddies:Array<{num:number,name:string}>=[{num:1,name:'Basket1'}];
  public caddies:Map<string,Caddy>=new Map();
  isLoaded: boolean;
  constructor(private authService:AuthenticationService, private caddyService:CaddyService,private router:Router,private orderService:OrderService){
    if(this.authService.isAuthenticated()) {
      this.caddyService.loadCaddyFromLocalStorage();
    }
    else{
      this.caddies[this.currentCaddyName]=new Caddy(this.currentCaddyName);
  }
 }

  ngOnInit(): void {
   // if(!this.authService.isAuthenticated())
    //this.router.navigateByUrl('/auth/login');
  console.log(this.caddy);
this.onAllCommandes();
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


  onRemoveProductFromCaddy(p: ItemProduct) {
    this.caddyService.removeProduct(p.id);
  }



  onAllCommandes() {
    this.orderService.getCommandes().subscribe((data:any)=>{
      this.orders=data;
      console.log(data)
    },err=>{
      console.log(err);
    })
    this.isLoaded= true;
};
  }













