import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/sharedServices/product.service';
// import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CartService } from 'src/app/sharedServices/cart.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandPlaygroundsComponent implements OnInit {
  
  serverError;
  ProductList = [];
  constructor(private productService: ProductService,private cartService: CartService, private router: Router) { }

  list() {
    this.productService.getAll().subscribe((list) => {
      this.ProductList = <any>list;
    },
      err => {
        this.serverError = err;
      }

    );
  }

  addToCart(product) {
    let newProd = {
      product_id : product._id,
      price : product.price,
      quantity : 1 //Make it 1 now 
    }
    this.cartService.addToCart(newProd).subscribe(res => {
      console.log("Product Was Successfully Added")
    },
    err => {
      console.log(err)
    })
  }
  ngOnInit() {
    this.list();
  }

}
