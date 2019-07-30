import { Product } from './product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  myProduct: Product;
  constructor(private http: HttpClient) { }

  add(product) {
    return this.http.post(environment.apiBaseUrl + '/product', product);
  };

  edit(product, id) {
    return this.http.put(environment.apiBaseUrl + '/product/' + id, product);
  };

  delete(id) {
    return this.http.delete(environment.apiBaseUrl + '/product/' + id);
  };

  getOwner() {
    return this.http.get(environment.apiBaseUrl + '/product/owner');
  };

  getAll() {
    return this.http.get(environment.apiBaseUrl + '/product');
  }

  details(id) {
    return this.http.get(environment.apiBaseUrl + '/product/' + id);
  }

  // helper
  reset() {
    this.myProduct = null;
  }

}
