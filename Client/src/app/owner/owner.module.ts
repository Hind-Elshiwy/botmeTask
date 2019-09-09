import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerComponent } from './owner/owner.component';
import { OwnerProductsComponent } from './owner-products/owner-products.component';
import { OwnerProfileComponent } from './owner-profile/owner-profile.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OwnerRoutingModule } from './owner-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TranslateModule , TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';






// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
} 


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
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
        }
    })
  ]
})
export class OwnerModule { }
