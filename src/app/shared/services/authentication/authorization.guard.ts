import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ApiClientService } from '../api-client/api-client.service';
import { NotificationService } from '../swal-notification/notification.service';

@Injectable()
export class AuthorizationGuardService implements CanActivate {

  constructor(
    private _router: Router,
    private _apiClient: ApiClientService,
    private _notificationService: NotificationService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    console.log('ruta za pristup', route, state)
    if (state.url === '/user/logout' || state.url.indexOf('/user/login') !== -1) {
      return true;
    } else {
      return this._apiClient.userInfo().pipe(map(
        response => {
          if (response?.role === 'admin') {
            // admin
            if (state.url === '/') {
              this._router.navigate(['/codebook/user-panel']);
              return false;
            }
            return true;
          } else if (response?.role === 'group-manager' || response?.role === 'firm-manager') {
            //manager groupe ili firme
            if (state.url !== '/' && state.url !== '/user/login' && state.url !== '/user/logout') {
              this._router.navigate(['/']);
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
}
