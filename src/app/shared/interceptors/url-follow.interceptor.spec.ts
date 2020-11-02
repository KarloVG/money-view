import { TestBed } from '@angular/core/testing';

import { UrlFollowInterceptor } from './url-follow.interceptor';

describe('UrlFollowInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UrlFollowInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: UrlFollowInterceptor = TestBed.inject(UrlFollowInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
