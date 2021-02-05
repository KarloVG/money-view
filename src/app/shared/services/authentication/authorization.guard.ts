import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LicenceService } from 'src/app/features/codebook/licence/services/licence.service';
import { NavigationService } from 'src/app/layout/sidenav/services/navigation.service';
import { ApiClientService } from '../api-client/api-client.service';
import { NotificationService } from '../swal-notification/notification.service';

@Injectable()
export class AuthorizationGuardService implements CanActivateChild {

  constructor(
    private _router: Router,
    private _apiClient: ApiClientService,
    private _notificationService: NotificationService,
    private _navService: NavigationService,
    private _licenceService: LicenceService
  ) { }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    console.log('ruta za pristup', route, state)
    if (state.url === '/user/logout' || state.url.indexOf('/user/login') !== -1) {
      return true;
    } else {
      return forkJoin([
        this._apiClient.userInfo().pipe(
          take(1)
        ),
        this._licenceService.getLatest().pipe(
          take(1)
        )
      ]).pipe(map(result => {
        if (result[0]?.role === 'admin') {
          // admin
          if (result[1].response.isValid) {
            this._navService.publishNavigationChange(true);
            if (state.url === '/') {
              this._router.navigate(['/codebook/user-panel']);
              return false;
            }
            return true;
          } else {
            this._navService.publishNavigationChange(false);
            this._router.navigate(['/codebook/licence']);
            return false;
          }
        } else if (result[0]?.role === 'group-manager' || result[0]?.role === 'firm-manager') {
          this._navService.publishNavigationChange(false);
          //manager groupe ili firme
          if (state.url !== '/' && state.url !== '/user/login' && state.url !== '/user/logout') {
            this._router.navigate(['/']);
            return false;
          }
          return true;
        } else {
          this._navService.publishNavigationChange(false);
          this._notificationService.fireErrorNotification("Ne možete pristupiti navedenoj stranici");
          return false;
        }
      }));
    }
  }
}
