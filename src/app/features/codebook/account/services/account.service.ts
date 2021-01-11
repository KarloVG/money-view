import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BasicPaginatedResponse } from 'src/app/shared/basic-paginated-response';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { AppRouteService } from 'src/app/shared/services/route/app-route.service';
import { environment } from '../../../../../environments/environment';
import { IRequestAccount } from '../models/request/request-account';
import { IResponseAccount } from '../models/response/response-account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  /* #region  Variables */
  private readonly CONTROLLER_NAME = environment.production
    ? 'api/api/accounts'
    : 'api/accounts';
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private readonly _http: HttpClient,
    private readonly _appRoute: AppRouteService
  ) {}

  // Get All
  get(
    page: number,
    pageSize: number
  ): Observable<IFleksbitResponse<BasicPaginatedResponse<IResponseAccount>>> {
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    const requestParams = new HttpParams({
      fromObject: {
        offset: page.toString(),
        pageSize: pageSize.toString(),
      },
    });
    return this._http
      .get<IFleksbitResponse<BasicPaginatedResponse<IResponseAccount>>>(
        url.toString(),
        { params: requestParams }
      )
      .pipe(
        tap((data) => console.log('Get bank', data))
      );
  }
  add(
    formGroup: IRequestAccount
  ): Observable<IFleksbitResponse<IResponseAccount>> {
    console.log(formGroup.iban);
    const request = { ...formGroup, iban: 'HR' + formGroup.iban };
    console.log(request);
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    return this._http
      .post<IFleksbitResponse<IResponseAccount>>(url.toString(), request)
      .pipe(
        tap((data) => console.log('Add bank', JSON.stringify(data)))
      );
  }

  put(
    formGroup: IRequestAccount
  ): Observable<IFleksbitResponse<IResponseAccount>> {
    const request = { ...formGroup, iban: 'HR' + formGroup.iban };
    const url = this._appRoute.createAppRouteURL([
      this.CONTROLLER_NAME,
      formGroup.id.toString(),
    ]);
    return this._http
      .put<IFleksbitResponse<IResponseAccount>>(url.toString(), request)
      .pipe(
        tap((data) => console.log('Add bank', JSON.stringify(data)))
      );
  }

  delete(id: number): Observable<IFleksbitResponse<IResponseAccount>> {
    const url = this._appRoute.createAppRouteURL([
      this.CONTROLLER_NAME,
      id.toString(),
    ]);
    return this._http
      .delete<IFleksbitResponse<IResponseAccount>>(url.toString())
      .pipe(
        tap((data) => console.log('Delete bank', JSON.stringify(data)))
      );
  }
}
