import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppRouteService } from 'src/app/shared/services/route/app-route.service';
import { NotificationService } from 'src/app/shared/services/swal-notification/notification.service';
import { IRequestUSerPanel } from '../models/request/request-user-panel';
import { IResponseUserPanel } from '../models/response/response-user-panel';

@Injectable({
  providedIn: 'root'
})
export class UserPanelService {

  private readonly CONTROLLER_NAME = 'api/user-panel';

  group$: Observable<IResponseUserPanel> = this.get();


  constructor(
    private readonly _http: HttpClient,
    private readonly _appRoute: AppRouteService,
    private readonly _notificationService: NotificationService
  ) { }

  private get(): Observable<IResponseUserPanel>{
    return this._http.get<IResponseUserPanel>(this.CONTROLLER_NAME)
     .pipe(
       tap(data => console.log('Get ', JSON.stringify(data))),
       catchError(this.handleError)
     );
  }

  add(formGroup: IRequestUSerPanel): Observable<IResponseUserPanel>{
    const request = {...formGroup};
    return this._http.post<IResponseUserPanel>(this.CONTROLLER_NAME, request)
     .pipe(
       tap(data => console.log('Add', JSON.stringify(data))),
       catchError(this.handleError)
     )
  }
  put(formGroup: IRequestUSerPanel): Observable<IResponseUserPanel>{
    const request ={...formGroup};
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME, formGroup.id.toString()]);
    return this._http.put<IResponseUserPanel>(url.toString(), request)
      .pipe(
        tap(data => console.log('Add Company', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

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
}
