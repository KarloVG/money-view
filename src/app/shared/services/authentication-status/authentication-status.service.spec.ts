import {TestBed} from '@angular/core/testing';

import {AuthenticationStatusService} from './authentication-status.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

describe('AuthenticationStatusService', () => {
  let service: AuthenticationStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient]
    });
    service = TestBed.inject(AuthenticationStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
