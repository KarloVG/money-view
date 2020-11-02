import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {App} from '../../shared/app.config';

@Injectable({
  providedIn: 'root'
})
export class AccountStatementSummaryService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getQueryForm(): Observable<AccountStatementSummaryForm> {
    const url = `${App.Api.rootUrl}/api/Webapp/AccountSummaryList/Form`;

    return this.http.get<AccountStatementSummaryForm>(url.toString(), {withCredentials: true});
  }

  getSelection(firmId: EntityId, summaryTypeId: EntityId): Observable<AccountStatementSummarySelection> {
    const url = `${App.Api.rootUrl}/api/Webapp/AccountSummaryList/Selection`;
    const requestParams = new HttpParams({fromObject: {firmId: firmId.toString(), assetTypeId: summaryTypeId.toString()}});

    return this.http.get<AccountStatementSummarySelection>(url.toString(), {params: requestParams, withCredentials: true});
  }

  getList(page: number, pageSize: number, firmId: EntityId, assetTypeId: EntityId, date: Date, bank?: string):
    Observable<AccountStatementSummaryListResponse> {
    const url = `${App.Api.rootUrl}/api/Webapp/AccountSummaryList`;
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

    return this.http.get<AccountStatementSummaryListResponse>(url.toString(), {params: requestParams, withCredentials: true});
  }

}

export type EntityId = string | number | bigint;

export interface AccountStatementSummaryForm {
  firms: [{ id: EntityId, name: string }];
  summaryTypes: [{ id: EntityId, name: string }];
  banks: [{ id: EntityId, name: string }];
}

export interface AccountStatementSummarySelection {
  selectedFirm: { id: EntityId, name: string };
  selectedSummaryType: { id: EntityId, name: string };
}

export type AccountStatementSummaryListResponse = AccountStatementSummaryEntry[];

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
