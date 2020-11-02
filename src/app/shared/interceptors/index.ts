import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {UrlFollowInterceptor} from './url-follow.interceptor';
import {Provider} from '@angular/core';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UrlFollowInterceptor,
    multi: true,
  },
];
