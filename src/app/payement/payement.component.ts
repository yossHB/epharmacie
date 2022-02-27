import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Order } from '../model/command.model';
import {OrderService} from '../_services/command.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentAmount:number;
  currentOrder:Order;
  constructor(private router:Router, private route:ActivatedRoute,
              private orderService:OrderService) { }

  ngOnInit() {
    let id=this.route.snapshot.params.orderID
    this.orderService.getOrder(id).subscribe(data=>{
      this.currentOrder=data;
    },err=>{
      console.log(err);
    })
  }

  onParOrder(data) {
    console.log(data);
  }
}