import {App} from '../../config/app.config';
import {createReturnUrl} from './create-return-url';

export const createLogoutUrl = (returnUrl?: string): URL => {
  return new URL(`${App.Origin}/user/logout?returnUrl=${createReturnUrl(returnUrl)}`);
};
