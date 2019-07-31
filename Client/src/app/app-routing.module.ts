import { OwnerProfileComponent } from './owner/owner-profile/owner-profile.component';
import { CustomerProfileComponent } from './customer/customer-profile/customer-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';

import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { OwnerGuard } from './auth/owner.guard';
import { CustomerGuard } from './auth/customer.guard';
import { SignGuard } from './auth/sign.guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { OwnerComponent } from './owner/owner/owner.component';
import { OwnerProductsComponent } from './owner/owner-products/owner-products.component';
import { NewProductComponent } from './owner/new-product/new-product.component';
import { EditProductComponent } from './owner/edit-product/edit-product.component';
import { BrandPlaygroundsComponent } from './customer/brand/brand.component';
import { ShoppingCartComponent } from './customer/shopping-cart/shopping-cart.component';
import { WishlistComponent } from './customer/wishlist/wishlist.component';



const routes: Routes = [
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent, canActivate: [SignGuard] }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent, canActivate: [SignGuard] }]
  },
  {
    path: 'customer', component: CustomerComponent, canActivate: [AuthGuard, CustomerGuard],
    children: [{ path: 'profile', component: CustomerProfileComponent },
    { path: 'brand', component: BrandPlaygroundsComponent },
    { path: 'shoppingCart', component: ShoppingCartComponent },
    { path: 'wishlist', component: WishlistComponent },
    { path: '', redirectTo: '/customer/profile', pathMatch: 'full' }
    ]
  },  
  {
    path: 'owner', component: OwnerComponent, canActivate: [AuthGuard, OwnerGuard],
    children: [{ path: 'profile', component: OwnerProfileComponent },
    { path: 'products', component: OwnerProductsComponent },
    { path: 'newproduct', component: NewProductComponent },
    { path: 'editproduct/:id', component: EditProductComponent },
    { path: '', redirectTo: '/owner/profile', pathMatch: 'full' }
    ]
  },
  {
    path: '', redirectTo: '/signup', pathMatch: 'full'
  },
  {
    path: 'invalid', component: NotAuthorizedComponent
  },
  {
    path: '404', component: NotFoundComponent
  },
  {
    path: '**', redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
