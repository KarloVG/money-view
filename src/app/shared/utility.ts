export const currentDateISOString = (): string => {
  return new Date().toISOString().slice(0, 10);
};

export function lastItem<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

export function firstItem<T>(arr: T[]): T | undefined {
  return arr[0];
}

export function pack<T>(items: T | T[]): T[] {
  return Array<T>().concat(items);
}
