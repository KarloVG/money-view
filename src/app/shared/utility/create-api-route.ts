import {App} from '../../config/app.config';

export const createApiRoute = (path: string | string[] = '', apiRoot: string = 'api'): URL => {
  return new URL(`${App.BaseHref}${apiRoot}/${Array.isArray(path) ? path.join('/') : path}`, window.location.origin);
};
