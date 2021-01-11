import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { tap} from 'rxjs/operators';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { AppRouteService } from 'src/app/shared/services/route/app-route.service';
import {environment} from '../../../../../../environments/environment';
import { IRequestGroup } from '../models/request/request-group';
import { IResponseGroup } from '../models/response/response-group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

 /* #region  Variables */
  private readonly CONTROLLER_NAME = environment.production ? 'api/api/group' : 'api/group';
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
        tap(data => console.log('Get Grupa',data))
      );
  }

  // Add new
  add(formGroup: IRequestGroup): Observable<IFleksbitResponse<IResponseGroup>> {
    const request = {...formGroup};
     const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
     console.log(url);
    return this._http.post<IFleksbitResponse<IResponseGroup>>(url.toString(), request)
        .pipe(
          tap(data => this.get())
        );
  }

  // Edit existing
  put(formGroup: IRequestGroup): Observable<IFleksbitResponse<IResponseGroup>> {
    const request = {...formGroup};
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME, formGroup.id.toString()]);
    return this._http.put<IFleksbitResponse<IResponseGroup>>(url.toString(), request)
        .pipe(
          tap(data => this.get())
        );
  }
 /* #endregion */
}
