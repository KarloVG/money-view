import { IResponseBank } from '../../../bank/models/response/response-bank';
import { IResponseCompany } from '../../../group-and-company/company/models/response/response-company';

export interface IResponseAccount {
  id: number;
  name: string;
  iban: string;
  company: IResponseCompany;
  bank: IResponseBank;
}
