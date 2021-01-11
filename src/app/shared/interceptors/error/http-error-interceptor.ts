import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {NotificationService} from '../../services/swal-notification/notification.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  /* #region  constructor */
  constructor(
    private _notificationService: NotificationService,
    private _authenticationService: AuthenticationService
  ) {
  }

  /* #endregion */

  /* #region  intercept */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this._authenticationService.login();
          }

          this._notificationService.fireErrorNotification(error.message);
          return throwError(error.message);
        })
      );
  }

  /* #endregion */
}
