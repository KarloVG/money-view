import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BasicPaginatedResponse } from 'src/app/shared/basic-paginated-response';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { AppRouteService } from 'src/app/shared/services/route/app-route.service';
import { environment } from 'src/environments/environment';
import { IRequestLicence } from '../models/request/request-licence';
import { IResponseActiveLicence } from '../models/response/response-active-licence';
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
  ) { }
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
        tap((data) => console.log('Get Licence', data))
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
      tap((data) => console.log('Add Licence', JSON.stringify(data)))
    );
  }

  // Edit
  put(formGroup: IResponseLicence): Observable<IRequestLicence> {
    const request = {
      key: formGroup.identifier,
    };
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    return this._http.put<IRequestLicence>(url.toString(), request).pipe(
      tap((data) => console.log('Put Licence', JSON.stringify(data)))
    );
  }

  // Delete
  delete(id: number): Observable<IResponseLicence> {
    const url = this._appRoute.createAppRouteURL([
      this.CONTROLLER_NAME,
      id.toString(),
    ]);
    return this._http.delete<IResponseLicence>(url.toString()).pipe(
      tap((data) => console.log('Delete Licence', JSON.stringify(data)))
    );
  }

  // Get latest active
  getLatest(): Observable<IFleksbitResponse<IResponseActiveLicence>> {
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME, 'active']);
    return this._http.get<IFleksbitResponse<IResponseActiveLicence>>(url.toString().replace('/app',''));
  }

  /* #endregion */
}
