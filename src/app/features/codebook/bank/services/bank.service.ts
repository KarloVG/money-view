import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BasicPaginatedResponse } from 'src/app/shared/basic-paginated-response';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { AppRouteService } from 'src/app/shared/services/route/app-route.service';
import { IRequestBank } from '../models/request/request-bank';
import { IResponseBank } from '../models/response/response-bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  /* #region  Variables */
  private readonly CONTROLLER_NAME = 'api/bank';
  /* #endregion */

 /* #region  Constructor */
  constructor(
    private readonly _http: HttpClient,
    private readonly _appRoute: AppRouteService
  ) { }

  // Get All
  get(page: number, pageSize: number): Observable<IFleksbitResponse<BasicPaginatedResponse<IResponseBank>>> {
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    const requestParams = new HttpParams({
      fromObject:
        {
          offset: page.toString(),
          pageSize: pageSize.toString()
        }
    });
    return this._http.get<IFleksbitResponse<BasicPaginatedResponse<IResponseBank>>>(url.toString(), {params: requestParams})
      .pipe(
        tap(data => console.log('Get bank',data)),
        catchError(this.handleError)
      );
  }

  add(formGroup: IRequestBank): Observable<IFleksbitResponse<IResponseBank>>{
    const request = {...formGroup};
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    return this._http.post<IFleksbitResponse<IResponseBank>>(url.toString(), request)
      .pipe(
        tap(data => console.log('Add bank', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  put(formGroup: IRequestBank): Observable<IFleksbitResponse<IResponseBank>>{
    const request ={...formGroup};
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME, formGroup.id.toString()]);
    return this._http.put<IFleksbitResponse<IResponseBank>>(url.toString(), request)
      .pipe(
        tap(data => console.log('Add bank', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  delete(id: number): Observable<IFleksbitResponse<IResponseBank>>{
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME, id.toString()]);
    return this._http.delete<IFleksbitResponse<IResponseBank>>(url.toString())
      .pipe(
        tap(data => console.log('Delete bank', JSON.stringify(data))),
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
}
