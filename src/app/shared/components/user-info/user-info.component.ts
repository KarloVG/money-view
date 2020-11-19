import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {UserInfoService} from '../../services/user-info/user-info.service';

@Component({
  selector: 'mv-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  public readonly isAuthenticated = this.authenticationService.isAuthenticated;
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
