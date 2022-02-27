import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { CatalogueService } from 'src/app/_services/catalogue.service';
import { productsDB } from '../../shared/data/products';

@Component({
  selector: 'll-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  isLoaded: boolean;
  advanceSearchExpanded: boolean = false;
  products :Array<Product>;

  constructor(public catalService:CatalogueService,) {}

  ngOnInit(): void {
    this.getProducts();

    
  }

  private getProducts() {
    this.catalService.getResource(this.catalService.host+"/articles")
      .subscribe((data:any)=>{
        this.products=data._embedded.articles;
        console.log(data._embedded.articles)
      },err=>{
        console.log(err);
      })
      this.isLoaded= true;
  }
}
