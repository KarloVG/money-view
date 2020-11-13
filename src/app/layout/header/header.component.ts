import {Component, OnInit} from '@angular/core';
import {tap} from 'rxjs/operators';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';
import {UserInfoService} from '../../shared/services/user-info/user-info.service';

@Component({
  selector: 'mv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public readonly isAuthenticated = this.authenticationService.isAuthenticated
    .pipe(tap((isAuth) => {
      if (isAuth) {
        this.userInfoService.updateUserInfo();
      }
    }));

  public readonly userInfo = this.userInfoService.userInfo;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userInfoService: UserInfoService
  ) {
  }

  ngOnInit(): void {
    this.authenticationService.updateAuthenticationStatus();
  }

  onLogoutClicked(): void {
    this.authenticationService.logout();
  }

}
