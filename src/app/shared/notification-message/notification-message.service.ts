import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IFleksbitResponse } from '../models/fleksbit-response';
import { INotificationLicenceResponse } from '../models/notification-licence-response';
import { AppRouteService } from '../services/route/app-route.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationMessageService {

  private readonly CONTROLLER_NAME = environment.production
    ? 'api/api/licenses/active'
    : 'api/licenses/active';

  constructor(
    private readonly _http: HttpClient,
    private readonly _appRoute: AppRouteService
  ) { }

  get(): Observable<IFleksbitResponse<INotificationLicenceResponse>> {
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    return this._http.get<IFleksbitResponse<INotificationLicenceResponse>>(url.toString())
      .pipe(
        tap(data => console.log('Get Licence Notification', data))
      );
  }
}
