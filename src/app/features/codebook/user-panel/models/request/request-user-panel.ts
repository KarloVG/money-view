import { IRequestCompany } from '../../../group-and-company/company/models/request/request-company';

export interface IRequestUserPanel {
  id?: number,
  role: number | undefined,
  company: IRequestCompany,
  email: string,
  username: string
  firmId?: number;
  roleNames?: string[] | undefined;
}
