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
    path: 'customers', loadChildren: './customer/customer.module#CustomerModule'
  },
  {
    path: 'owners', loadChildren: './owner/owner.module#OwnerModule'
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
