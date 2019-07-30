import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/sharedServices/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-playgrounds',
  templateUrl: './owner-playgrounds.component.html',
  styleUrls: ['./owner-playgrounds.component.css']
})
export class OwnerPlaygroundsComponent implements OnInit {

  serverError;
  ProductList = [];
  constructor(private productService: ProductService, private router: Router) { }

  list() {
    this.productService.getOwner().subscribe((list) => {
      this.ProductList = <any>list;
    },
      err => {
        this.serverError = err;
      }

    );
  }

  delete(id) {
    this.productService.delete(id).subscribe(data => {
      this.list();
    }, err => {
      this.serverError = err;
    })
  }

  edit(id) {
    this.router.navigateByUrl('/owner/editplayground/' + id);
  }

  ngOnInit() {
    this.list();
  }

}
