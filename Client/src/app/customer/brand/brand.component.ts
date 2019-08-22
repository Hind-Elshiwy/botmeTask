import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/sharedServices/product.service';
// import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CartService } from 'src/app/sharedServices/cart.service';
import { wishlistService } from 'src/app/sharedServices/wishlist.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { AddNumber } from 'src/app/store/actions/appActions';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandPlaygroundsComponent implements OnInit {
 
  serverError;
  ProductList = [];
  successMsg;
  productsNumber;

  constructor(private productService: ProductService,private cartService: CartService,private wishlistservice:wishlistService, private router: Router , private store: Store<AppState> ) { }

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
    this.serverError=""
    this.successMsg=""
    let newProd = {
      product_id : product._id,
      price : product.price,
      quantity : 1 //Make it 1 now 
    }
    this.cartService.addToCart(newProd).subscribe(res => {
      console.log(res)
      this.successMsg = "Product Was Successfully Added";
      console.log("Product Was Successfully Added")
      if(res==1){
        this.store.dispatch(new AddNumber())
      }
    },
    err => {
      console.log(err)
    })
  }


  wishList(product){
    this.serverError = ""
    this.successMsg=""
    let newProd = {
      product_id : product._id,
    }
    this.wishlistservice.addToCart(newProd).subscribe(res => {
      this.successMsg = "Product Was Successfully Added";
      console.log("Product Was Successfully Added")
    },
    err => {
      this.serverError = err.error;
      console.log(err)
    })
  }

  ngOnInit() {
    this.store.select('Number').subscribe(res => {
      console.log(res)
    })
    //this.store.dispatch(new AddNumber({}))
    this.list();
  }

}
