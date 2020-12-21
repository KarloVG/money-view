import { IResponseCompany } from '../../../group-and-company/company/models/response/response-company';
import { IResponseRole } from './role-response';

export interface IResponseUserPanel{
    id: number,
    role: IResponseRole,
    company: IResponseCompany,
    email: string,
    username: string
}