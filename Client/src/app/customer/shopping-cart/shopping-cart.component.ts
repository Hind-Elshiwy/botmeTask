import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/sharedServices/cart.service';
import { Router } from '@angular/router';
import { Cart } from 'src/app/sharedServices/cart';
import { RemoveNumber } from 'src/app/store/actions/appActions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private myCart : Cart
  constructor(private cartService: CartService, private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.cartService.get().subscribe(res => {
      this.myCart = <any>res
    },
    err => {
      console.log(err)
    })
  }

  subtract(product){
    let Prod = {
      product_id : product._id,
      quantity:1
    }
    this.cartService.subtract(Prod).subscribe(
      res => {
        console.log(res)
        this.myCart = <any>res.cart
        if(res.removed==1){
          this.store.dispatch(new RemoveNumber())
        }
      },
      err => {
        console.log(err)
      }
    )
 }



 empty(){
  this.cartService.empty().subscribe(
    res => {
      this.myCart = <any>res
    },
    err => {
      console.log(err)
    }
  )
 }

}
