import {Component} from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';
import {UserInfoService} from '../../shared/services/user-info/user-info.service';

@Component({
  selector: 'mv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public readonly auth: AuthenticationService,
    public readonly userInfo: UserInfoService
  ) {
  }

}
