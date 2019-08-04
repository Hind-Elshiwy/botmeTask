import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class wishlistService {

  constructor(private http: HttpClient) { }

  addToCart(product) {
    return this.http.post(environment.apiBaseUrl + '/api/wishlistcart/add', product);
  };

  remove(product) {
    return this.http.post(environment.apiBaseUrl + '/api/wishlistcart/remove', product);
  };

  empty() {
    return this.http.post(environment.apiBaseUrl + '/api/wishlistcart/empty', {});
  };
  get() {
    return this.http.get(environment.apiBaseUrl + '/api/wishlistcart');
  };

}
