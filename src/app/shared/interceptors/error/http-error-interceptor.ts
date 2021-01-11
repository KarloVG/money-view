import {
 HttpEvent,
 HttpInterceptor,
 HttpHandler,
 HttpRequest,
 HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NotificationService } from '../../services/swal-notification/notification.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

 /* #region  constructor */
 constructor(
   private _notificationService: NotificationService
 ) { }
 /* #endregion */

 /* #region  intercept */
 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   return next.handle(request)
     .pipe(
       catchError((error) => {
        console.log(error)
        this._notificationService.fireErrorNotification(error.name);
        return throwError(error.name);
       })
     )
 }
 /* #endregion */
}
