import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { Order } from 'src/app/model/command.model';
import { Product } from 'src/app/model/product.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CaddyService } from 'src/app/_services/caddy.service';
import { CatalogueService } from 'src/app/_services/catalogue.service';
@Component({
  selector: 'll-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  currentProduct:any;
  currentCategory: Category;
  order:Order;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private router:Router, private route:ActivatedRoute,
    public catalService:CatalogueService,
    public authService:AuthenticationService,private httpClient:HttpClient,
    public caddyService:CaddyService) { }

  ngOnInit(): void {
    let id=this.route.snapshot.params.id;
    this.catalService.getResource("http://localhost:8080/articles/"+id)
      .subscribe((data:Product)=>{
        console.log("data"+ data);
        this.catalService.getResource(data._links.category.href).subscribe((res:Category)=>
        this.currentCategory=res)
        this.currentProduct=data;
      },err=>{
        console.log(err);
      })
 
  }

  onProductDetails(p) {
    this.router.navigateByUrl("/product/"+p.id);
  }

  onAddProductToCaddy() {
    this.order= {"id":this.currentProduct.ArticleID,"client":{"id":1,
      username: "user1", password:"1234"},"products":[{  id:this.currentProduct.ArticleID,
        name:this.currentProduct.articleNom,
        price:this.currentProduct.articlePrice,
        quantity:1}]}
        console.log("oder "+ this.order.client);
        console.log("oder "+ this.order.id);

        console.log("oder "+ this.order.products);

    this.httpClient.post(this.catalService.host+"/api/addcommandes",this.order,this.httpOptions).subscribe(data => console.log(data));
    
  }

}
