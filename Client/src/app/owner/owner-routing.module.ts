import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerComponent } from './owner/owner.component';
import { AuthGuard } from '../auth/auth.guard';
import { OwnerGuard } from '../auth/owner.guard';
import { OwnerProfileComponent } from './owner-profile/owner-profile.component';
import { OwnerProductsComponent } from './owner-products/owner-products.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
    {
    path: 'owner', component: OwnerComponent, canActivate: [AuthGuard, OwnerGuard],
    children: [{ path: 'profile', component: OwnerProfileComponent },
    { path: 'products', component: OwnerProductsComponent },
    { path: 'newproduct', component: NewProductComponent },
    { path: 'editproduct/:id', component: EditProductComponent },
    { path: '', redirectTo: '/owners/owner/profile', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
