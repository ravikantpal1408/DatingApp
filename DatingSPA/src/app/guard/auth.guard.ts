import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { AlertifyService } from '../services/alertify.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private service: AccountService,
               private router: Router,
               private alertify: AlertifyService
               ) {

  }
  canActivate(): boolean {
    if (this.service.loggedIn()) {
      return true;
    }

    this.alertify.error('You shall not pass !!');
    this.router.navigate(['/home']);
    return false;
  }
}
