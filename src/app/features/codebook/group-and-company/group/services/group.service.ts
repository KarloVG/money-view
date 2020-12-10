import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError,  tap} from 'rxjs/operators';
import { AppRouteService } from 'src/app/shared/services/route/app-route.service';
import { NotificationService } from 'src/app/shared/services/swal-notification/notification.service';
import { IRequestGroup } from '../models/request/request-group';
import { IResponseGroup } from '../models/response/response-group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

 /* #region  Variables */
  private readonly CONTROLLER_NAME = 'api/group';
  // All products
  group$: Observable<IResponseGroup> = this.get();
 /* #endregion */

 /* #region  Constructor */
  constructor(
    private readonly _http: HttpClient,
    private readonly _appRoute: AppRouteService,
    private readonly _notificationService: NotificationService
  ) { }
 /* #endregion */

 /* #region  Methods */

 private get(): Observable<IResponseGroup> {
   return this._http.get<IResponseGroup>(this.CONTROLLER_NAME)
    .pipe(
      tap(data => console.log('Get Grupa', JSON.stringify(data))),
      catchError(this.handleError)
    );
 }

  add(formGroup: IRequestGroup): Observable<IResponseGroup> {
    const request = {...formGroup};
    return this._http.post<IResponseGroup>(this.CONTROLLER_NAME, request)
        .pipe(
          tap(data => console.log('Add Grupa', JSON.stringify(data))),
          catchError(this.handleError)
        );
  }

  put(formGroup: IRequestGroup): Observable<IResponseGroup> {
    const request = {...formGroup};
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME, formGroup.id.toString()]);
    return this._http.put<IResponseGroup>(url.toString(), request)
        .pipe(
          tap(data => console.log('Add Grupa', JSON.stringify(data))),
          catchError(this.handleError)
        );
  }

 // Remove before production
 private handleError(err: any): Observable<never> {
    // instead of logging infrastructore on BE, just log it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `Došlo je do frontend pogreške: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Došlo je do backend pogreške ${err.status}: ${err.body.error}`;
    }
    this._notificationService.fireErrorNotification(errorMessage)
    return throwError(errorMessage);
  }
 /* #endregion */
}
