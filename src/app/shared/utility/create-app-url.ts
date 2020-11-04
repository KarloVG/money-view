import {App} from '../../config/app.config';

export const createAppUrl = (path: string | string[] = '',
                             appOrigin: URL = App.Origin ?? 'http://localhost:4200',
                             appRoot: string = '/app/'): URL => {
  return new URL(Array.isArray(path) ? `${appRoot}${path.join('/')}` : `${appRoot}${path}`, appOrigin);
};
