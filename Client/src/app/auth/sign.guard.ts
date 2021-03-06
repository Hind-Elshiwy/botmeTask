import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SignGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let payload = this.userService.getUserPayload();
    if (this.userService.isLoggedIn()) {
      if (payload.role === "owner") { this.router.navigateByUrl('owners/owner/profile'); }
      else if (payload.role === "customer") { this.router.navigateByUrl('customers/customer/profile'); }
      return false;
    }
    return true;
  }

}
