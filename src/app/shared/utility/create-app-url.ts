import {App} from '../../config/app.config';

export const createAppUrl = (path: string | string[] = '',
                             appOrigin: URL = App.Origin ?? 'http://localhost:4200'): URL => {
  return new URL(Array.isArray(path) ? path.join('/') : path, appOrigin);
};
