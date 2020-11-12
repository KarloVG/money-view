export const currentDateISOString = (): string => {
  return new Date().toISOString().slice(0, 10);
};
