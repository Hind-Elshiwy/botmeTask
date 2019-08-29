import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { BrandPlaygroundsComponent } from './brand/brand.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CustomerComponent } from './customer/customer.component';

import { CustomerRoutingModule } from './customer-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    BrandPlaygroundsComponent,
    CustomerProfileComponent,
    CustomerComponent,
    ShoppingCartComponent,
    WishlistComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class CustomerModule { }
