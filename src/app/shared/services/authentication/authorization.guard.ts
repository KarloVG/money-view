import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot,RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { UserInfoResponse } from '../api-client/api-client.service';
import { NotificationService } from '../swal-notification/notification.service';
import { UserInfoService } from '../user-info/user-info.service';

@Injectable()
export class AuthorizationGuardService implements CanActivateChild {

  public readonly userInfo = this._userInfoService.userInfo;
  private userInformations!: UserInfoResponse | null;

    constructor(
      private _router: Router,
      private _userInfoService: UserInfoService,
      private _notificationService: NotificationService
    ) {
      this.userInfo.subscribe(response => this.userInformations = response);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.userInformations?.role == 'admin')  {
        // admin
        if(!route?.url.length) {
          this._router.navigate(['codeboook/user-panel']);
          return false;
        }
        return true;
      } else if(this.userInformations?.role == 'group-manager' || this.userInformations?.role == 'firm-manager') {
        //manager groupe ili firme
        if(route?.url.length) {
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
