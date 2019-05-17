import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  model: any = {};


  constructor(private fb: FormBuilder, public account: AccountService, private alertify: AlertifyService) {

  }

  ngOnInit() {

  }


  onSubmit() {

    console.log(this.model);

    this.account.loginService(this.model).subscribe((res: any) => {
      console.log(res);
      this.model = {};
      this.alertify.success('Logged in Successfully');
    }, error => {
      console.log(error);
      this.alertify.error(error);
    });

  }


  loggedIn() {
    // const token = localStorage.getItem('token');
    // return !!token;
    return this.account.loggedIn();
  }


  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
    this.alertify.error('You are logged out');

  }

}
