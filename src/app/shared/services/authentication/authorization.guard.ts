import { Injectable } from '@angular/core';
import { Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ApiClientService } from '../api-client/api-client.service';
import { NotificationService } from '../swal-notification/notification.service';

@Injectable()
export class AuthorizationGuardService implements CanLoad {

    constructor(
      private _router: Router,
      private _apiClient: ApiClientService,
      private _notificationService: NotificationService
    ) {  }

    canLoad(route: Route):Observable<boolean>|boolean {
      return this._apiClient.userInfo().pipe(map(
        response => {
          if (response?.role == 'admin')  {
            // admin
            if(route.path === '') {
              this._router.navigate(['codeboook/user-panel']);
              return false;
            }
            return true;
          } else if(response?.role == 'group-manager' || response?.role == 'firm-manager') {
            //manager groupe ili firme
            if(route.path !== '') {
              this._router.navigate(['']);
              return false;
            }
            return true;
          } else {
              this._notificationService.fireErrorNotification("Ne možete pristupiti navedenoj stranici");
              return false;
          }
        }
      ),
      first())
    }
}
