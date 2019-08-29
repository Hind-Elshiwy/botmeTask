import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cart } from './cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart;
  constructor(private http: HttpClient) { }

  addToCart(product) {
    return this.http.post(environment.apiBaseUrl + '/api/cart/add', product);
  };

  subtract(product) {
    return this.http.post<any>(environment.apiBaseUrl + '/api/cart/subtract', product);
  };

  empty() {
    return this.http.post(environment.apiBaseUrl + '/api/cart/empty', {});
  };
  get() {
    return this.http.get(environment.apiBaseUrl + '/api/cart');
  };

  getProdNumbINCart(){
    return this.http.get(environment.apiBaseUrl + '/api/cart/numberOfProdCart');

  }

}
