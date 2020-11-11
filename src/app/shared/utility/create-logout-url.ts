import {createReturnUrl} from './create-return-url';
import {createAppRoute} from './create-app-route';

export const createLogoutUrl = (returnUrl?: string): URL => {
  return createAppRoute(['user', `logout?returnUrl=${createReturnUrl(returnUrl)}`]);
};
