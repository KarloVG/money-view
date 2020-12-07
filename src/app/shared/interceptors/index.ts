import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {Provider} from '@angular/core';
import { HttpErrorInterceptor } from './error/http-error-interceptor';

/**
 * Http interceptor providers in outside-in order
 */
export const httpInterceptorProviders: Provider[] = [
  {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
   }
];
