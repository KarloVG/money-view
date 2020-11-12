import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
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
    return this.http.get<UserInfoResponse>(url.toString(), {observe: 'response', responseType: 'json'});
  }

}

export interface UserInfoResponse {
  readonly name: string;
}
