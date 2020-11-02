import {Component, OnInit} from '@angular/core';
import {AuthenticationStatusService} from '../../shared/services/authentication-status/authentication-status.service';

@Component({
  selector: 'mv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public readonly authStatusService: AuthenticationStatusService
  ) {
  }

  ngOnInit(): void {
  }

}
