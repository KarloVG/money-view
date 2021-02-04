export interface IResponseActiveLicence {
  isActive: boolean;
  expirationDate: string;
  expirationDays: number;
  isValid: boolean;
  identifier: string;
}
