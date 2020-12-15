import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError,  tap} from 'rxjs/operators';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { AppRouteService } from 'src/app/shared/services/route/app-route.service';
import { IRequestGroup } from '../models/request/request-group';
import { IResponseGroup } from '../models/response/response-group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

 /* #region  Variables */
  private readonly CONTROLLER_NAME = 'api/group';
 /* #endregion */

 /* #region  Constructor */
  constructor(
    private readonly _http: HttpClient,
    private readonly _appRoute: AppRouteService
  ) { }
 /* #endregion */

 /* #region  Methods */

  // Get All
  get(): Observable<IFleksbitResponse<IResponseGroup>> {
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    return this._http.get<IFleksbitResponse<IResponseGroup>>(url.toString())
      .pipe(
        tap(data => console.log('Get Grupa',data)),
        catchError(this.handleError)
      );
  }

  // Add new
  add(formGroup: IRequestGroup): Observable<IFleksbitResponse<IResponseGroup>> {
    const request = {...formGroup};
     const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
     console.log(url);
    return this._http.post<IFleksbitResponse<IResponseGroup>>(url.toString(), request)
        .pipe(
          tap(data => this.get()),
          catchError(this.handleError)
        );
  }

  // Edit existing
  put(formGroup: IRequestGroup): Observable<IFleksbitResponse<IResponseGroup>> {
    const request = {...formGroup};
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME, formGroup.id.toString()]);
    return this._http.put<IFleksbitResponse<IResponseGroup>>(url.toString(), request)
        .pipe(
          tap(data => this.get()),
          catchError(this.handleError)
        );
  }

  // Remove before production
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
 /* #endregion */
}
