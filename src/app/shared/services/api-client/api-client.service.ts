import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {backoff} from '../../utility/backoff';
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

  userInfo(): Observable<HttpResponse<UserInfoResponse>> {
    const url = this.appRoute.createAppRouteURL(['user', 'info']);
    return this.http.get<UserInfoResponse>(url.toString(), {observe: 'response', responseType: 'json'})
      .pipe(
        backoff(3, 250),
        catchError((err: HttpErrorResponse, caught) => {
          if ([301, 302, 401, 200].includes(err.status)) {
            this.login();
          }
          throw new Error('Not Authenticated');
        })
      );
  }

}

export interface UserInfoResponse {
  readonly name: string;
}
