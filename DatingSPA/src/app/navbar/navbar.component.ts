import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  model: any = {};


  constructor(private fb: FormBuilder, private account: AccountService) {

  }

  ngOnInit() {

  }


  onSubmit() {

    console.log(this.model);

    this.account.loginService(this.model).subscribe((res: any) => {
      console.log(res);
      this.model = {};
    }, error => {
      console.log(error);
    });

  }


  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }


  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }

}
