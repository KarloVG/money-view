import { IRequestCompany } from '../../../group-and-company/company/models/request/request-company';
import { IRequestRole } from './role-request';

export interface IRequestUSerPanel{
    id: number,
    role: IRequestRole,
    company: IRequestCompany,
    email: string,
    username: string
}