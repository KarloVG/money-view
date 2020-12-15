import {APP_BASE_HREF} from '@angular/common';
import {Inject, Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';

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
    // TODO: zamijeni environment sa window.location.origin -> prije porodukcije
    return new URL(`${this.baseHref}${paths.join('/')}`, environment.baseUrl);
  }

  createAppRouteURLWithParams(paths: string[], params: URLSearchParams): URL {
    // TODO: zamijeni environment sa window.location.origin -> prije porodukcije
    return new URL(`${this.baseHref}${paths.join('/')}?${params.toString()}`,environment.baseUrl);
  }

}
