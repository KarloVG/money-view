export const createReturnUrl = (returnUrl?: string): string => {
  return encodeURIComponent(returnUrl ?? `${window.location.pathname}${window.location.search}`);
};
