import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {ApiClientService} from '../api-client/api-client.service';
import {UserInfoService} from '../user-info/user-info.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public readonly isAuthenticated = this.userInfoService.userInfo.pipe(map((userInfo) => !!userInfo));

  constructor(
    private readonly apiClient: ApiClientService,
    private readonly userInfoService: UserInfoService
  ) {
  }

  login(returnUrl?: string): void {
    this.apiClient.login(returnUrl);
  }

  logout(): void {
    this.apiClient.logout();
  }

  updateAuthenticationStatus(): void {
    this.userInfoService.updateUserInfo();
  }

}
