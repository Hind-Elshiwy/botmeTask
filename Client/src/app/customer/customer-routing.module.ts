import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { AuthGuard } from '../auth/auth.guard';
import { CustomerGuard } from '../auth/customer.guard';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { BrandPlaygroundsComponent } from './brand/brand.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [

  {
    path: 'customer', component: CustomerComponent, canActivate: [AuthGuard, CustomerGuard],
    children: [{ path: 'profile', component: CustomerProfileComponent },
    { path: 'brand', component: BrandPlaygroundsComponent },
    { path: 'shoppingCart', component: ShoppingCartComponent },
    { path: 'wishlist', component: WishlistComponent },
    { path: '', redirectTo: '/customers/customer/profile', pathMatch: 'full' }
    ]
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
