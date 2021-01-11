import { Injectable } from '@angular/core';
import { Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { NavigationService } from 'src/app/layout/sidenav/services/navigation.service';
import { ApiClientService } from '../api-client/api-client.service';
import { NotificationService } from '../swal-notification/notification.service';

@Injectable()
export class AuthorizationGuardService implements CanLoad {

    constructor(
      private _router: Router,
      private _apiClient: ApiClientService,
      private _notificationService: NotificationService,
      private _navService: NavigationService
    ) {  }

    canLoad(route: Route):Observable<boolean>|boolean {
      console.log('ruta za pristup', route)
      return this._apiClient.userInfo().pipe(map(
        response => {
          if (response?.role == 'admin')  {
            this._navService.publishNavigationChange(false);
            // admin
            if(route.path === '') {
              this._router.navigate(['app/codeboook/user-panel']);
              return false;
            }
            return true;
          } else if(response?.role == 'group-manager' || response?.role == 'firm-manager') {
            this._navService.publishNavigationChange(true);
            //manager groupe ili firme
            if(route.path !== '') {
              this._router.navigate(['app']);
              return false;
            }
            return true;
          } else {
              this._navService.publishNavigationChange(false);
              this._notificationService.fireErrorNotification("Ne možete pristupiti navedenoj stranici");
              return false;
          }
        }
      ),
      first())
    }
}
