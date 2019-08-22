import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { AddNumber, GetNumber } from '../store/actions/appActions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { CartService } from '../sharedServices/cart.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  serverError;
  constructor(private userService: UserService, private cartService: CartService,private router: Router, private store: Store<AppState>) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let payload = this.userService.getUserPayload();
    if (payload.role !== "customer") {
      this.router.navigateByUrl('/invalid');
      return false;
    }
    else{
      this.cartService.getProdNumbINCart().subscribe(
        res => {
          console.log(res)
          this.store.dispatch(new GetNumber({Number: res}))
        },
        err => {
          this.serverError = err.message;
        }
      );

    
      return true;

    }
    

  }

}
