import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BasicPaginatedResponse } from 'src/app/shared/basic-paginated-response';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { AppRouteService } from 'src/app/shared/services/route/app-route.service';
import { environment } from '../../../../../environments/environment';
import { IRequestUserPanel } from '../models/request/request-user-panel';
import { IRequestRole } from '../models/request/role-request';
import { ROLES } from '../models/request/roles';
import { IResponseUserPanel } from '../models/response/response-user-panel';

@Injectable({
  providedIn: 'root'
})
export class UserPanelService {

  private readonly CONTROLLER_NAME = environment.production ? 'api/api/user-accounts' : 'api/user-accounts';
  private roles: IRequestRole[] = ROLES;

  constructor(
    private readonly _http: HttpClient,
    private readonly _appRoute: AppRouteService
  ) {
  }

  get(
    page: number,
    pageSize: number
  ):
    Observable<IFleksbitResponse<BasicPaginatedResponse<IResponseUserPanel>>> {
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    const requestParams = new HttpParams({
      fromObject: {
        offset: page.toString(),
        pageSize: pageSize.toString()
      },
    });
    return this._http
      .get<IFleksbitResponse<BasicPaginatedResponse<IResponseUserPanel>>>(
        url.toString(),
        { params: requestParams }
      )
      .pipe(
        tap((data) => console.log('Get user', data))
      );
  }

  getById(id: number | undefined): Observable<IFleksbitResponse<IResponseUserPanel>> {
    if (typeof(id) === "undefined") {
      throw new Error('Invalid User ID');
    }
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME, id.toString()]);
    return this._http
      .get<IFleksbitResponse<IResponseUserPanel>>(url.toString())
      .pipe(
        tap((data) => console.log('Get user', data))
      );
  }

  delete(id: number): Observable<IFleksbitResponse<IResponseUserPanel>> {
    const url = this._appRoute.createAppRouteURL([
      this.CONTROLLER_NAME,
      id.toString(),
    ]);
    return this._http
      .delete<IFleksbitResponse<IResponseUserPanel>>(url.toString()).pipe(
        tap((data) => console.log('Delete user', JSON.stringify(data)))
      );
  }
  add(formGroup: IRequestUserPanel): Observable<IFleksbitResponse<IResponseUserPanel>> {
    const request = {
      email: formGroup.email,
      username: formGroup.userName,
      firmId: +formGroup.company,
      roleNames: [this.roles.find(x => x.id.toString() == formGroup.roleNames)?.name]
    };
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    return this._http.post<IFleksbitResponse<IResponseUserPanel>>(url.toString(), request);
  }

  //Edit existing
  put(formGroup: IRequestUserPanel): Observable<IFleksbitResponse<IResponseUserPanel>> {
    if (!formGroup.id) {
      throw new Error('Invalid User ID');
    }

    const request = {
      email: formGroup.email,
      username: formGroup.userName,
      firmId: formGroup.company,
      roleNames: [this.roles.find(x => x.id.toString() == formGroup.roleNames)?.name]
    };
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME, formGroup.id.toString()]);
    return this._http.put<IFleksbitResponse<IResponseUserPanel>>(url.toString(), request);
  }
}
