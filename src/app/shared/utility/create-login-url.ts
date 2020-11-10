import {App} from '../../config/app.config';
import {createReturnUrl} from './create-return-url';

export const createLoginUrl = (returnUrl?: string): URL => {
  return new URL(`${App.Origin}/user/login?returnUrl=${createReturnUrl(returnUrl)}`);
};
