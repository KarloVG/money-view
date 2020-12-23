import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IResponseLicence } from 'src/app/features/codebook/licence/models/response/response-licence';
import { environment } from 'src/environments/environment';
import { IFleksbitResponse } from '../models/fleksbit-response';
import { INotificationLicenceResponse } from '../models/notification-licence-response';
import { AppRouteService } from '../services/route/app-route.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationMessageService {

  private readonly CONTROLLER_NAME = environment.production
    ? 'api/api/licenses/active'
    : 'api/licenses/active';

  constructor(
    private readonly _http: HttpClient,
    private readonly _appRoute: AppRouteService
  ) {}

  get(): Observable<IFleksbitResponse<INotificationLicenceResponse>>{
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    return this._http.get<IFleksbitResponse<INotificationLicenceResponse>>(url.toString())
    .pipe(
      tap(data => console.log('Get Licence Notification', data)),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const {error} = err;
    // instead of logging infrastructore on BE, just log it to the console
    let errorMessage: string;
    if (error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `Došlo je do frontend pogreške: ${error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = error.error.message;
    }
    return throwError(errorMessage);
  }
}
