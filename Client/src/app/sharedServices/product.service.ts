import { Product } from './product';
import{Item} from './items';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[];
  myProduct: Product;
  constructor(private http: HttpClient) { }

  add(product) {
    return this.http.post(environment.apiBaseUrl + '/api/product', product);
  };

  edit(product, id) {
    return this.http.put(environment.apiBaseUrl + '/api/product/' + id, product);
  };

  delete(id) {
    return this.http.delete(environment.apiBaseUrl + '/api/product/' + id);
  };

  getOwner() {
    return this.http.get(environment.apiBaseUrl + '/api/product/owner');
  };

  getAll() {
    return this.http.get(environment.apiBaseUrl + '/api/shop');
  }

  details(id) {
    return this.http.get(environment.apiBaseUrl + '/api/product/' + id);
  }

  
  // helper
  reset() {
    this.myProduct = null;
  }

}
