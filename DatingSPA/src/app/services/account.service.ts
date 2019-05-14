import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  BASE_URI = 'http://localhost:5000/api/Auth';

  constructor(private http: HttpClient) {}

  loginService(loginFormValues: any) {
    return this.http.post(this.BASE_URI + '/login', loginFormValues).pipe(
      map((res: any) => {
        console.log(res);
        const user = res;
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }



  registerService(registerFormvalue: any) {
    return this.http.post(this.BASE_URI + '/register', registerFormvalue);
  }
}
