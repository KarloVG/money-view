import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiClientService} from '../api-client/api-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public readonly isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private readonly apiClient: ApiClientService
  ) {
    this.updateAuthenticationStatus();
  }

  login(returnUrl?: string): void {
    this.apiClient.login(returnUrl);
  }

  logout(): void {
    this.apiClient.logout();
  }

  updateAuthenticationStatus(): void {
    this.apiClient.userInfo().pipe(map((x) => x.ok))
      .subscribe((isAuth) => this.isAuthenticatedSubject.next(isAuth));
  }

}
