import { environment } from 'src/environments/environment';
import { ProductService } from '../../sharedServices/product.service';
import { Product } from '../../sharedServices/product';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  image;
  newProduct: Product = {
    name: '',
    mainImg: '',
    price: null,
    quantity:null,
    desc: '',
  };
  serverError;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {

  }

  processFile(imageInput) {
    this.image = imageInput.files[0];
  }

  onSubmit(form: NgForm) {
    form.value.mainImg = this.image;
    console.log(form.value)
    const fd = new FormData();
    Object.entries(form.value).forEach(
      ([key, value]: any[]) => {
        if (value) {
          fd.set(key, value);
        }
      });
    console.log(fd);
    this.productService.add(fd).subscribe(
      res => {
        this.router.navigateByUrl('/owner/products');
      },
      err => {
        if (err.status === 422) {
          console.log("Bad" + err)
          //this.serverError = err.error.join('<br/>');
        }
        else
          this.serverError = 'Something went wrong.Please contact admin.';
      }
    );
  }
}
