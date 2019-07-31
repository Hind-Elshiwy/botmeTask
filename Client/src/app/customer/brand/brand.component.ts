import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/sharedServices/product.service';
// import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandPlaygroundsComponent implements OnInit {
  
  serverError;
  ProductList = [];
  constructor(private productService: ProductService, private router: Router) { }

  list() {
    this.productService.getAll().subscribe((list) => {
      this.ProductList = <any>list;
    },
      err => {
        this.serverError = err;
      }

    );
  }

  ngOnInit() {
    this.list();
  }

}
