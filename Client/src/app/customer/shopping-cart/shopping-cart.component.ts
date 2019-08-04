import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/sharedServices/cart.service';
import { Router } from '@angular/router';
import { Cart } from 'src/app/sharedServices/cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private myCart : Cart
  constructor(private cartService: CartService, private router: Router) { }

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
        this.myCart = <any>res
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
