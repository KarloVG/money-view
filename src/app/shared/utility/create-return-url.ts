export const createReturnUrl = (returnUrl?: string): string => {
  if (!!returnUrl) {
    return encodeURI(returnUrl);
  }

  return encodeURIComponent(`${window.location.pathname}${window.location.search}`);
};
