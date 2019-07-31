import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/sharedServices/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/sharedServices/product';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router, private activeRoute: ActivatedRoute) { }

  image;
  newPlayground: Product = {
    name: '',
    mainImg: '',
    price: null,
    desc: '',
  };
  serverError;
  id;
  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id'];
    this.productService.details(this.id).subscribe(result => {
      this.newPlayground = <any>result;
    })
  }

  processFile(imageInput) {
    this.image = imageInput.files[0];
  }

  onSubmit(form: NgForm) {
    console.log(form);
    form.value.mainImg = this.image;
    const fd = new FormData();
    Object.entries(form.value).forEach(
      ([key, value]: any[]) => {
        if (value) {
          fd.set(key, value);
        }
      });

    this.productService.edit(fd, this.id).subscribe(
      res => {
        this.router.navigateByUrl('/owner/playground');
      },
      err => {
        if (err.status === 422) {
          console.log(err);
          this.serverError = err.error;
        }
        else
          this.serverError = 'Something went wrong.Please contact admin.';
      }
    );
  }
}
