import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  return next(req).pipe(
    catchError(err => {
      if (err) {
        switch (err.status) {
          case 400:
            if (err.error.errors) {
              const modalStateError = [];
              for (const key in err.error.errors) {
                if (err.error.errors[key]) {
                  modalStateError.push(err.error.errors[key]);
                }
              }
              throw modalStateError.flat();
            } else {
              toastr.error(err.error, err.status);
            }
            break;
          case 401:
            toastr.error('Un-Authorised', err.status);
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtras: NavigationExtras = { state: { error: err.error } };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            toastr.error('Something un-expected went wrong');
            break;

        }
      }
      throw err;
    })
  );
};