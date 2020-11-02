import {Component, OnInit} from '@angular/core';
import {AuthenticationStatusService} from '../../shared/services/authentication-status/authentication-status.service';
import {debounceTime} from 'rxjs/operators';
import {backoff} from '../../shared/backoff';

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

  constructor(
    private readonly authStatusService: AuthenticationStatusService
  ) {
  }

  ngOnInit(): void {
  }

}
