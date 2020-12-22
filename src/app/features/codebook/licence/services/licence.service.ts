import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BasicPaginatedResponse } from 'src/app/shared/basic-paginated-response';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { AppRouteService } from 'src/app/shared/services/route/app-route.service';
import { environment } from 'src/environments/environment';
import { IRequestLicence } from '../models/request/request-licence';
import { IResponseLicence } from '../models/response/response-licence';

@Injectable({
  providedIn: 'root',
})
export class LicenceService {
  /* #region  Variables */
  private readonly CONTROLLER_NAME = environment.production
    ? 'api/api/licenses'
    : 'api/licenses';
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private readonly _http: HttpClient,
    private readonly _appRoute: AppRouteService
  ) {}
  /* #endregion */

  /* #region  Methods */

  // Get All
  get(
    page: number,
    pageSize: number
  ): Observable<IFleksbitResponse<BasicPaginatedResponse<IResponseLicence>>> {
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    const requestParams = new HttpParams({
      fromObject: {
        offset: page.toString(),
        pageSize: pageSize.toString(),
      },
    });
    return this._http
      .get<IFleksbitResponse<BasicPaginatedResponse<IResponseLicence>>>(
        url.toString(),
        {
          params: requestParams,
        }
      )
      .pipe(
        tap((data) => console.log('Get Licence', data)),
        catchError(this.handleError)
      );
  }

  // Add
  add(formGroup: IResponseLicence): Observable<IRequestLicence> {
    const request = {
      id: formGroup.id,
      key: formGroup.identifier,
    };
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    return this._http.post<IRequestLicence>(url.toString(), request).pipe(
      tap((data) => console.log('Add Licence', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // Edit
  put(formGroup: IResponseLicence): Observable<IRequestLicence> {
    const request = {
      key: formGroup.identifier,
    };
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    return this._http.put<IRequestLicence>(url.toString(), request).pipe(
      tap((data) => console.log('Put Licence', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // Delete
  delete(id: number): Observable<IResponseLicence> {
    const url = this._appRoute.createAppRouteURL([
      this.CONTROLLER_NAME,
      id.toString(),
    ]);
    return this._http.delete<IResponseLicence>(url.toString()).pipe(
      tap((data) => console.log('Delete Licence', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // Remove before production
  private handleError(err: HttpErrorResponse): Observable<never> {
    const { error } = err;
    console.log(error);
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
