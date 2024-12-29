import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { match } from 'assert';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export enum STATUS {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private readonly router = inject(Router);
  private readonly toast = inject(ToastrService);

  private readonly errorPages = [STATUS.FORBIDDEN, STATUS.NOT_FOUND, STATUS.INTERNAL_SERVER_ERROR];

  private getMessage = (error: HttpErrorResponse) => {
    if (error.error?.message) {
      return error.error.message;
    }

    if (error.error?.msg) {
      return error.error.msg;
    }

    return `${error.status} ${error.statusText}`;
  };

  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    console.log('error', error);

    if (this.errorPages.includes(error.status)) {
      switch (error.status) {
        case STATUS.FORBIDDEN:
          this.toast.error(error.error);
          break;
        case STATUS.UNAUTHORIZED:
          this.router.navigateByUrl(`/${error.status}`, {
            skipLocationChange: true,
          });
          break;
        case STATUS.NOT_FOUND:
          this.router.navigateByUrl(`/${error.status}`, {
            skipLocationChange: true,
          });
          break;
        case STATUS.INTERNAL_SERVER_ERROR:
          this.toast.error(error.error);
          break;
        default:
          console.error('ERROR', error);
          this.toast.error(this.getMessage(error));
      }
    } else {
      console.error('ERROR', error);
      this.toast.error(this.getMessage(error));
    }

    return throwError(() => error);
  }
}
