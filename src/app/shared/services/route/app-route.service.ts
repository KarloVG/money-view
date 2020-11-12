import {APP_BASE_HREF} from '@angular/common';
import {Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppRouteService {

  constructor(
    @Inject(APP_BASE_HREF)
    private readonly baseHref: string
  ) {
  }

  createAppRouteURL(paths: string[]): URL {
    return new URL(`${this.baseHref}${paths.join('/')}`, window.location.origin);
  }

  createAppRouteURLWithParams(paths: string[], params: URLSearchParams): URL {
    return new URL(`${this.baseHref}${paths.join('/')}?${params.toString()}`, window.location.origin);
  }

}
