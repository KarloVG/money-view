import {Component, OnInit} from '@angular/core';
import {AuthenticationStatusService} from '../../shared/services/authentication-status/authentication-status.service';
import {debounceTime} from 'rxjs/operators';
import {backoff} from '../../shared/utility/backoff';
import {UserInfoService} from '../../shared/services/user-info/user-info.service';

@Component({
  selector: 'mv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  readonly isAuthenticated = this.authStatusService.isAuthenticated()
    .pipe(
      debounceTime(250),
      backoff(3, 250)
    );

  readonly userInfo = this.userInfoService.getUserInfo();

  constructor(
    private readonly authStatusService: AuthenticationStatusService,
    private readonly userInfoService: UserInfoService
  ) {
  }

  ngOnInit(): void {
  }

}
