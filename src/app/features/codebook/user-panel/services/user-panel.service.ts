import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { AppRouteService } from 'src/app/shared/services/route/app-route.service';
import { NotificationService } from 'src/app/shared/services/swal-notification/notification.service';
import { IRequestUSerPanel } from '../models/request/request-user-panel';
import { IResponseUserPanel } from '../models/response/response-user-panel';

@Injectable({
  providedIn: 'root'
})
export class UserPanelService {

  private readonly CONTROLLER_NAME = 'api/user-panel';

  constructor(
    private readonly _http: HttpClient,
    private readonly _appRoute: AppRouteService,
  ) { }

  private get(): Observable<IFleksbitResponse<IResponseUserPanel>>{
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    return this._http.get<IFleksbitResponse<IResponseUserPanel>>(url.toString())
     .pipe(
       tap(data => console.log('Get Users', JSON.stringify(data))),
       catchError(this.handleError)
     );
  }

  //Add new
  add(formGroup: IRequestUSerPanel): Observable<IFleksbitResponse<IResponseUserPanel>>{
    const request = {...formGroup};
     const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
     console.log(url);
    return this._http.post<IFleksbitResponse<IResponseUserPanel>>(url.toString(), request)
        .pipe(
          tap(data => this.get()),
          catchError(this.handleError)
        );
  }

  //Edit existing
  put(formGroup: IRequestUSerPanel): Observable<IFleksbitResponse<IResponseUserPanel>>{
    const request ={...formGroup};
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME, formGroup.id.toString()]);
    return this._http.put<IFleksbitResponse<IResponseUserPanel>>(url.toString(), request)
      .pipe(
        tap(data => console.log('Add Company', JSON.stringify(data))),
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
