import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AppRouteService} from '../route/app-route.service';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  constructor(
    private readonly http: HttpClient,
    private readonly appRoute: AppRouteService
  ) {
  }

  private static createDefaultReturnUrl(): string {
    return window.location.pathname + window.location.search;
  }

  private static createReturnUrlParameter(returnUrl: string = this.createDefaultReturnUrl(),
                                          paramName: string = 'returnUrl'): URLSearchParams {
    return new URLSearchParams(`${paramName}=${encodeURIComponent(returnUrl)}`);
  }

  login(returnUrl?: string): void {
    const url = this.appRoute.createAppRouteURLWithParams(['user', 'login'], ApiClientService.createReturnUrlParameter(returnUrl));

    window.location.replace(url.toString());
  }

  logout(): void {
    const url = this.appRoute.createAppRouteURL(['user', 'logout']);

    window.location.replace(url.toString());
  }

  userInfo(): Observable<UserInfoResponse | null> {
    const url = this.appRoute.createAppRouteURL(['user', 'info']);
    const requestHeaders = new HttpHeaders({'X-Requested-With': 'XMLHttpRequest'});

    return this.http.get<UserInfoResponse>(url.toString(), {observe: 'response', responseType: 'json', headers: requestHeaders})
      .pipe(
        catchError((err: HttpErrorResponse, caught) => {
          if (err.status === 401) {
            this.login();
          }

          return throwError(err);
        }),
        map((response) => response.ok ? response.body : null));
  }

}

export interface UserInfoResponse {
  readonly name: string;
}
