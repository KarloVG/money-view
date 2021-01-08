import { Injectable } from '@angular/core';
import { Router, CanLoad, Route } from '@angular/router';
import { first } from 'rxjs/operators';
import { ApiClientService, UserInfoResponse } from '../api-client/api-client.service';
import { NotificationService } from '../swal-notification/notification.service';

@Injectable()
export class AuthorizationGuardService implements CanLoad {
    userInformations!: UserInfoResponse | null;
    constructor(
      private _router: Router,
      private _apiClient: ApiClientService,
      private _notificationService: NotificationService
    ) {
      this._apiClient.userInfo().pipe(first()).subscribe(response => this.userInformations = response);
    }

    canLoad(route: Route): boolean {
      if (this.userInformations?.role == 'admin')  {
        // admin
        if(route.path === '') {
          this._router.navigate(['codeboook/user-panel']);
          return false;
        }
        return true;
      } else if(this.userInformations?.role == 'group-manager' || this.userInformations?.role == 'firm-manager') {
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
}
