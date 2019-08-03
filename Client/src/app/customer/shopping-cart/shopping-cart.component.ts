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
  private mycart : Cart
  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.cartService.get().subscribe(res => {
      this.mycart = <any>res
      console.log(this.mycart)
    },
    err => {
      console.log(err)
    })
  }

}
