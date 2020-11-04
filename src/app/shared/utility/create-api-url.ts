import {App} from '../../config/app.config';

export const createApiUrl = (path: string | string[] = '',
                             appOrigin: URL = App?.Origin ?? 'http://localhost:4200',
                             apiRoot: string = '/api/'): URL => {
  return new URL(Array.isArray(path) ? apiRoot + path.join('/') : apiRoot + path, appOrigin);
};
