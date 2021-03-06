import {Client} from '../model/client.model';
import {ItemProduct} from '../model/item-product.model';
import {CaddyService} from './caddy.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CatalogueService} from './catalogue.service';
import {Order} from '../model/command.model';
import {Observable} from 'rxjs';
@Injectable({
  providedIn:'root'
})
export class OrderService {
  public order:Order=new Order();

  constructor(private caddyService:CaddyService,
              private httpClient:HttpClient,
              private catalService:CatalogueService){}

  public setClient(client:Client){
    this.order.client=client;
  }

  public getTotal():number{
    let total:number=0;
    this.order.products.forEach(p=>{
      total+=p.price*p.quantity;
    });
    return total;
  }

  submitOrder() {
    return this.httpClient.post(this.catalService.host+"/commandes",this.order);
  }

  public getOrder(id:number):Observable<Order>{
    return this.httpClient.get<Order>(this.catalService.host+"/commandes/"+id);
  }

  public getCommandes():Observable<Order>{
    return this.httpClient.get<Order>(this.catalService.host+"/commandes");
  }
}