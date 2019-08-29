import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerComponent } from './owner/owner.component';
import { OwnerProductsComponent } from './owner-products/owner-products.component';
import { OwnerProfileComponent } from './owner-profile/owner-profile.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OwnerRoutingModule } from './owner-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    OwnerComponent,
    OwnerProductsComponent,
    NewProductComponent,
    EditProductComponent,
    OwnerProfileComponent,

  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class OwnerModule { }
