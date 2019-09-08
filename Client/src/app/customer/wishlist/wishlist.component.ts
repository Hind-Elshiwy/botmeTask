import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/sharedServices/cart';
import { wishlistService } from 'src/app/sharedServices/wishlist.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  private myCart : Cart
  weburl = environment.apiBaseUrl

  constructor(private wishlistservice: wishlistService, private router: Router) { }

  ngOnInit() {
    this.wishlistservice.get().subscribe(res => {
      this.myCart = <any>res
    },
    err => {
      console.log(err)
    })
  }


  remove(product){
    let Prod = {
      product_id : product._id,
    }
    this.wishlistservice.remove(Prod).subscribe(
      res => {
        this.myCart = <any>res
      },
      err => {
        console.log(err)
      }
    )
 }


 empty(){
  this.wishlistservice.empty().subscribe(
    res => {
      this.myCart = <any>res
    },
    err => {
      console.log(err)
    }
  )
 }

}
