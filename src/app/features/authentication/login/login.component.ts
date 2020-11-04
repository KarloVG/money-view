import {Component, OnInit} from '@angular/core';
import {createAppUrl} from '../../../shared/utility/create-app-url';

@Component({
  selector: 'mv-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    // TODO: Create return URL by appending '/app' to the previous route
    location.replace(createAppUrl(['user', 'login?returnUrl=/app']).toString());
  }

}
