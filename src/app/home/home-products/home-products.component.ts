import { Component, OnInit } from '@angular/core';
import { CatalogueService } from 'src/app/_services/catalogue.service';
import { productsDB } from '../../shared/data/products'; 
@Component({
  selector: 'll-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {
  products: any;
  isLoaded: boolean;
  constructor(public catalService:CatalogueService,) {}

  ngOnInit(): void {
    this.getProducts();}

  private getProducts() {
    this.catalService.getResource(this.catalService.host+"/articles")
      .subscribe((data:any)=>{
        this.products=data._embedded.articles.slice(0,3);
        console.log(data._embedded.articles)
      },err=>{
        console.log(err);
      })
      this.isLoaded= true;
  }
}
