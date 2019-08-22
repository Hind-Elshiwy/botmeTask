import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';
// import { stat } from 'fs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { from } from 'rxjs';
import { AddNumber } from 'src/app/store/actions/appActions';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  BrandsInCart;
  constructor(private userService: UserService, private router: Router, private store: Store<AppState>) { }
  error;
  state;

getingState(){
// this.userService.getAllState().subscribe(
//   state=>{ this.BrandsInCart=state}
// )





}

  ngOnInit() {
    this.store.select('Number').subscribe(res => {
      this.BrandsInCart=res.Number
      // console.log(res)
    })


    //this.store.dispatch(new AddNumber({}))
    // this.store.select('reducer').map((data: AppState) => this.state = data );
    this.userService.getUser().subscribe(
      res => {
        this.userService.user = <any>res;
      },
      err => {
        this.error = err.message;
      }
    );

  }
  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }


}
