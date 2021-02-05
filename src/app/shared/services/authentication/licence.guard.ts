import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { LicenceService } from 'src/app/features/codebook/licence/services/licence.service';
import { NavigationService } from 'src/app/layout/sidenav/services/navigation.service';

@Injectable()
export class LicenceGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _navService: NavigationService,
    private _licenceService: LicenceService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this._licenceService.getLatest().pipe(
      first(),
      // catch error solved directly on service method
      map(
        response => {
          if (response.response.isValid === false) {
            this._navService.publishNavigationChange(false);
            if (state.url.indexOf('licence') > -1) {
              return true;
            } else {
              this._router.navigate(['/codebook/licence']);
              return false;
            }
          } else {
            return true;
          }
        }
      )
    )
  }
}
