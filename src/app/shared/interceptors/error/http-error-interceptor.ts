import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { NotificationService } from '../../services/swal-notification/notification.service';

interface FleksbitError {
  code: number;
  response: object;
  error: {
    message: string
  };
}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  urlWithoutErrInterceptor: Array<string>;

  /* #region  constructor */
  constructor(
    private _notificationService: NotificationService,
    private _authenticationService: AuthenticationService
  ) {
    this.urlWithoutErrInterceptor = [
      'company',
      'accounts'
    ];
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
          console.log('err', error)
          const fleksbitError = error.error as FleksbitError;
          // Don't fire notification service
          if (this.isValidRequestForInterceptor(request.url, request.method)) {
            const errorMsg = error.error instanceof Blob ? 'Nema podataka za prikaz za navedeni datum.' : fleksbitError?.error?.message ?? 'Došlo je do pogreške. Molimo kontaktirajte administratora.';
            console.log(error.error.text().message)
            this._notificationService.fireErrorNotification(errorMsg);
          }
          return throwError(fleksbitError?.error?.message ?? error.message);
        })
      );
  }

  private isValidRequestForInterceptor(requestUrl: string, method: string): boolean {
    let positionIndicator: string = environment.production ? 'api/api/' : 'api/';
    let position = requestUrl.indexOf(positionIndicator);
    if (position > 0 && (method === 'POST' || method === 'PUT')) {
      let destination: string = requestUrl.substr(position + positionIndicator.length);
      for (let address of this.urlWithoutErrInterceptor) {
        if (new RegExp(address).test(destination)) {
          return false;
        }
      }
    }
    return true;
  }

  /* #endregion */
}
