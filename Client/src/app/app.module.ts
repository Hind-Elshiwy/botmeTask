import { UserService } from './user/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { from } from 'rxjs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CustomerProfileComponent } from './customer/customer-profile/customer-profile.component';
import { OwnerProfileComponent } from './owner/owner-profile/owner-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { OwnerComponent } from './owner/owner/owner.component';
import { OwnerProductsComponent } from './owner/owner-products/owner-products.component';
import { NewProductComponent } from './owner/new-product/new-product.component';
import { EditProductComponent } from './owner/edit-product/edit-product.component';
import { BrandPlaygroundsComponent } from './customer/brand/brand.component';
import { ShoppingCartComponent } from './customer/shopping-cart/shopping-cart.component';
import { WishlistComponent } from './customer/wishlist/wishlist.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    CustomerProfileComponent,
    OwnerProfileComponent,
    NotFoundComponent,
    NotAuthorizedComponent,
    BrandPlaygroundsComponent,
    OwnerComponent,
    OwnerProductsComponent,
    NewProductComponent,
    EditProductComponent,
    CustomerComponent,
    ShoppingCartComponent,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // FullCalendarModule // for FullCalendar!
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
