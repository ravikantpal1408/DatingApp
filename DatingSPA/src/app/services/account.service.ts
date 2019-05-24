import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  BASE_URI = environment.apiUrl + 'Auth';

  jwtHelper = new JwtHelperService();

  decodedToken: any;

  constructor(private http: HttpClient) {}

  loginService(loginFormValues: any) {
    return this.http.post(this.BASE_URI + '/login', loginFormValues).pipe(
      map((res: any) => {
        // console.log(res);
        const user = res;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          // console.log(this.decodedToken);
        }
      })
    );
  }



  registerService(registerFormvalue: any) {
    return this.http.post(this.BASE_URI + '/register', registerFormvalue);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }



}
