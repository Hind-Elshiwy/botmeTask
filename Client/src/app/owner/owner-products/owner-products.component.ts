import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/sharedServices/product.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-owner-products',
  templateUrl: './owner-products.component.html',
  styleUrls: ['./owner-products.component.css']
})
export class OwnerProductsComponent implements OnInit {

  serverError;
  ProductList = [];
  count=0;
  show = true
  weburl = environment.apiBaseUrl
  constructor(private productService: ProductService, private router: Router) { }

  list() {
    this.productService.getOwner().subscribe((list) => {
      this.ProductList = <any>list;
    },
      err => {
        this.serverError = err;
      }

    );
  }



  lodemore(){
    
    this.productService.lodemore(this.count).subscribe(res=>{
      this.ProductList = this.ProductList.concat(<any>res);
      this.count=this.count+1
      if(res.length < 5)
        this.show = false
      console.log(this.show)
    },
      err => {
        this.serverError = err;
      
    })
  }

  delete(id) {
    this.productService.delete(id).subscribe(data => {
      this.list();
    }, err => {
      this.serverError = err;
    })
  }

  edit(id) {
    this.router.navigateByUrl('/owners/owner/editproduct/' + id);
  }

  ngOnInit() {
    // this.list();
    this.lodemore();

  }

}
