import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    private readonly _appRoute: AppRouteService,
  ) { }

  add(formGroup: IRequestUserPanel): Observable<IFleksbitResponse<IResponseUserPanel>> {
    const request = {
      email: formGroup.email,
      username: formGroup.username,
      firmId: +formGroup.company,
      roleNames: [this.roles.find(x => x.id == formGroup.role)?.name]
    };
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    return this._http.post<IFleksbitResponse<IResponseUserPanel>>(url.toString(), request);
  }

  //Edit existing
  put(formGroup: IRequestUserPanel): Observable<IFleksbitResponse<IResponseUserPanel>> {
    const request = {
      email: formGroup.email,
      username: formGroup.username,
      firmId: formGroup.company,
      roleNames: [this.roles.find(x => x.id == formGroup.role)?.name]
    };
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME, formGroup.id.toString()]);
    return this._http.put<IFleksbitResponse<IResponseUserPanel>>(url.toString(), request);
  }
}
