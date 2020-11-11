import {App} from '../../config/app.config';

export const createAppRoute = (path: string | string[] = ''): URL => {
  return new URL(`${App.BaseHref}${Array.isArray(path) ? path.join('/') : path}`, window.location.origin);
};
