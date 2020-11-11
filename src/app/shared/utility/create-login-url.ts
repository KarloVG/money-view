import {createReturnUrl} from './create-return-url';
import {createAppRoute} from './create-app-route';

export const createLoginUrl = (returnUrl?: string): URL => {
  return createAppRoute(['user', `login?returnUrl=${createReturnUrl(returnUrl)}`]);
};
