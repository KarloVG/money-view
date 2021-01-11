import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { NavigationService } from 'src/app/layout/sidenav/services/navigation.service';
import { ApiClientService } from '../api-client/api-client.service';
import { NotificationService } from '../swal-notification/notification.service';

@Injectable()
export class AuthorizationGuardService implements CanActivateChild {

    constructor(
      private _router: Router,
      private _apiClient: ApiClientService,
      private _notificationService: NotificationService,
      private _navService: NavigationService
    ) {  }

    canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
      console.log('ruta za pristup', route, state)
      return this._apiClient.userInfo().pipe(map(
        response => {
          if (response?.role ===  'admin')  {
            this._navService.publishNavigationChange(true);
            // admin
            if(state.url === '/') {
              this._router.navigate(['/codebook/user-panel']);
              return false;
            }
            return true;
          } else if(response?.role ===  'group-manager' || response?.role ===  'firm-manager') {
            this._navService.publishNavigationChange(false);
            //manager groupe ili firme
            if(state.url !== '/'  &&  state.url !== '/user/login' && state.url !== '/user/logout') {
              this._router.navigate(['/']);
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
