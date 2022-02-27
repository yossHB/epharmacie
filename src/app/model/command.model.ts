import {Client} from './client.model';
import {ItemProduct} from './item-product.model';

export class Order {
  public id:number;
  public client:Client={
    id:undefined,
    username: "",
    password: undefined
  };
  public products:Array<ItemProduct>=[];
}