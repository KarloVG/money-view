import { IResponseCompany } from '../../../group-and-company/company/models/response/response-company';
import { IResponseRole } from './role-response';

export interface IResponseUserPanel {
    id: number,
    roleNames: IResponseRole,
    company: IResponseCompany,
    email: string,
    userName: string
}