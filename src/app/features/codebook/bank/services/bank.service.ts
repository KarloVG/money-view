import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  tap } from 'rxjs/operators';
import { BasicPaginatedResponse } from 'src/app/shared/basic-paginated-response';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { AppRouteService } from 'src/app/shared/services/route/app-route.service';
import {environment} from '../../../../../environments/environment';
import { IRequestBank } from '../models/request/request-bank';
import { IResponseBank } from '../models/response/response-bank';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  /* #region  Variables */
  private readonly CONTROLLER_NAME = environment.production ? 'api/api/bank' : 'api/bank';
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private readonly _http: HttpClient,
    private readonly _appRoute: AppRouteService
  ) {}

  //Get All Dropdown
  getDropdown(): Observable<
    IFleksbitResponse<BasicPaginatedResponse<IResponseBank>>
  > {
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    const requestParams = new HttpParams({
      fromObject: {
        enumerate: 'true',
      },
    });
    return this._http
      .get<IFleksbitResponse<BasicPaginatedResponse<IResponseBank>>>(
        url.toString(),
        {
          params: requestParams,
        }
      )
      .pipe(
        tap((data) => console.log('Get Dropdown Company', data))
      );
  }

  // Get All
  get(
    page: number,
    pageSize: number
  ): Observable<IFleksbitResponse<BasicPaginatedResponse<IResponseBank>>> {
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    const requestParams = new HttpParams({
      fromObject: {
        offset: page.toString(),
        pageSize: pageSize.toString(),
      },
    });
    return this._http
      .get<IFleksbitResponse<BasicPaginatedResponse<IResponseBank>>>(
        url.toString(),
        { params: requestParams }
      )
      .pipe(
        tap((data) => console.log('Get bank', data))
      );
  }

  add(formGroup: IRequestBank): Observable<IFleksbitResponse<IResponseBank>> {
    const request = { ...formGroup };
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    return this._http
      .post<IFleksbitResponse<IResponseBank>>(url.toString(), request)
      .pipe(
        tap((data) => console.log('Add bank', JSON.stringify(data)))
      );
  }

  put(formGroup: IRequestBank): Observable<IFleksbitResponse<IResponseBank>> {
    const request = { ...formGroup };
    const url = this._appRoute.createAppRouteURL([
      this.CONTROLLER_NAME,
      formGroup.id.toString(),
    ]);
    return this._http
      .put<IFleksbitResponse<IResponseBank>>(url.toString(), request)
      .pipe(
        tap((data) => console.log('Add bank', JSON.stringify(data)))
      );
  }

  delete(id: number): Observable<IFleksbitResponse<IResponseBank>> {
    const url = this._appRoute.createAppRouteURL([
      this.CONTROLLER_NAME,
      id.toString(),
    ]);
    return this._http
      .delete<IFleksbitResponse<IResponseBank>>(url.toString())
      .pipe(
        tap((data) => console.log('Delete bank', JSON.stringify(data)))
      );
  }
}
