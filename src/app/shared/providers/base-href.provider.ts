import {APP_BASE_HREF, PlatformLocation} from '@angular/common';
import {Provider} from '@angular/core';

export const baseHref: Provider = {
  provide: APP_BASE_HREF,
  useFactory: (x: PlatformLocation) => x.getBaseHrefFromDOM(),
  deps: [PlatformLocation]
};
