import {Component, OnInit} from '@angular/core';
import {createAppUrl} from '../../../shared/utility/create-app-url';

@Component({
  selector: 'mv-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    location.replace(createAppUrl(['user', 'logout']).toString());
  }

}
