import {App} from '../../config/app.config';

export const createApiRoute = (path: string | string[] = '', apiRoot: string = '/api/'): URL => {
  return new URL(`${App.Origin}${apiRoot}${Array.isArray(path) ? path.join('/') : path}`);
};
