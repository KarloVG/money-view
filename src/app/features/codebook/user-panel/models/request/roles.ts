import { IRequestRole } from "./role-request";

export const ROLES: IRequestRole[] = [
  {
    id: 1,
    name: 'Admin',
    baseName: "admin"
  },
  {
    id: 2,
    name: 'Menadžer firme',
    baseName: "firm-manager"
  },
  {
    id: 3,
    name: 'Menadžer grupe',
    baseName: "group-manager"
  }
];
