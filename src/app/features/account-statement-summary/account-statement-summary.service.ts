import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createApiRoute} from '../../shared/utility/create-api-route';
import {BasicPaginatedResponse} from '../../shared/basic-paginated-response';

@Injectable({
  providedIn: 'root'
})
export class AccountStatementSummaryService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getQueryForm(): Observable<AccountStatementSummaryForm> {
    const url = createApiRoute(['Webapp', 'AccountSummaryList', 'Form']);

    return this.http.get<AccountStatementSummaryForm>(url.toString());
  }

  getSelection(firmId: EntityId, summaryTypeId: EntityId): Observable<AccountStatementSummarySelection> {
    const url = createApiRoute(['Webapp', 'AccountSummaryList', 'Selection']);
    const requestParams = new HttpParams({fromObject: {firmId: firmId.toString(), assetTypeId: summaryTypeId.toString()}});

    return this.http.get<AccountStatementSummarySelection>(url.toString(), {params: requestParams});
  }

  getList(page: number, pageSize: number, firmId: EntityId, assetTypeId: EntityId, date: Date, bank?: string):
    Observable<AccountStatementSummaryListResponse> {
    const url = createApiRoute(['Webapp', 'AccountSummaryList']);
    const requestParams = new HttpParams({
      fromObject:
        {
          firmID: firmId.toString(),
          assetTypeId: assetTypeId.toString(),
          page: page.toString(),
          pageSize: pageSize.toString(),
          date: date.toISOString(),
          bank: bank ?? ''
        }
    });

    return this.http.get<AccountStatementSummaryListResponse>(url.toString(), {params: requestParams});
  }

}

export type EntityId = string | number | bigint;

export interface AccountStatementSummaryForm {
  firms: MVEntityLookup[];
  assetTypes: MVEntityLookup[];
  banks: MVEntityLookup[];
}

export interface AccountStatementSummarySelection {
  firmName: string;
  assetTypeName: string;
}

export type AccountStatementSummaryListResponse = BasicPaginatedResponse<AccountStatementSummaryEntry>;

/*
data
count
totalCount -> after filtering
 */

export interface AccountStatementSummaryEntry {
  readonly bankId: EntityId;
  readonly bankName: string;
  readonly accountId: EntityId;
  readonly iban: string;
  readonly hrkAmount: number;
  readonly eurAmountAsHrk: number;
  readonly usdAmountAsHrk: number;
  readonly gbpAmountAsHrk: number;
  readonly total: number;
}

export interface EntityLookup<TKey> {
  readonly id: TKey;
  readonly name: string;
  readonly tag?: string;
}

export type MVEntityLookup = EntityLookup<EntityId>;
