export interface IPaginatedResponseCompany{
    data: IResponseCompany[],
    pagination:IPaginationCount
}

export interface IResponseCompany {
  id: number;
  name: string;
  oib: string;
}

export interface IPaginationCount {
  count: number;
  length: number;
}
