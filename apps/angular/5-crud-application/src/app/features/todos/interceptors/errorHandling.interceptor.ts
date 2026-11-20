import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse): Observable<never> => {
      let message = '';
      switch (err.status) {
        case 400:
          message = 'Bad request';
          break;
        case 401:
          message = 'Unauthorized';
          break;
        case 403:
          message = 'Forbidden';
          break;
        case 404:
          message = 'Resource not found';
          break;
        case 500:
          message = 'Internal server error';
          break;
        default:
          message = 'Something wrong occured';
      }
      return throwError(() => Error(message));
    }),
  );
};
