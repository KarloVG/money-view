import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { AppRouteService } from 'src/app/shared/services/route/app-route.service';
import {environment} from '../../../../../environments/environment';
import { IRequestUSerPanel } from '../models/request/request-user-panel';
import { IResponseUserPanel } from '../models/response/response-user-panel';

@Injectable({
  providedIn: 'root'
})
export class UserPanelService {

  private readonly CONTROLLER_NAME = environment.production ? 'api/api/user-panel' : 'api/user-panel';

  constructor(
    private readonly _http: HttpClient,
    private readonly _appRoute: AppRouteService,
  ) { }

  private get(): Observable<IFleksbitResponse<IResponseUserPanel>>{
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    return this._http.get<IFleksbitResponse<IResponseUserPanel>>(url.toString())
     .pipe(
       tap(data => console.log('Get Users', JSON.stringify(data)))
     );
  }

  //Add new
  add(formGroup: IRequestUSerPanel): Observable<IFleksbitResponse<IResponseUserPanel>>{
    const request = {...formGroup};
     const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
     console.log(url);
    return this._http.post<IFleksbitResponse<IResponseUserPanel>>(url.toString(), request)
        .pipe(
          tap(data => this.get())
        );
  }

  //Edit existing
  put(formGroup: IRequestUSerPanel): Observable<IFleksbitResponse<IResponseUserPanel>>{
    const request ={...formGroup};
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME, formGroup.id.toString()]);
    return this._http.put<IFleksbitResponse<IResponseUserPanel>>(url.toString(), request)
      .pipe(
        tap(data => console.log('Add Company', JSON.stringify(data)))
      );
  }
}
