/* tslint:disable:no-any */
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {App} from '../../shared/app.config';
import {fromFetch} from 'rxjs/fetch';

@Injectable({
  providedIn: 'root'
})
export class AccountStatementSummaryService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getQueryForm(): Observable<AccountStatementSummaryForm> {
    const url = new URL('/api/AccountStatementSummaries/Form', App.Api.rootUrl);
    return this.http.get<AccountStatementSummaryForm>(url.toString());
  }

  getSelection(firmId: EntityId, summaryTypeId: EntityId): Observable<AccountStatementSummarySelection> {
    const url = new URL('/api/AccountStatementSummaries/Selection', App.Api.rootUrl);
    const requestParams = new HttpParams({fromObject: {firmId: firmId.toString(), summaryTypeId: summaryTypeId.toString()}});
    return this.http.get<AccountStatementSummarySelection>(url.toString(), {params: requestParams});
  }

  testHost(): Observable<any> {
    return fromFetch('https://localhost:5021/api/user/info');
    const url = new URL('/api/user/info', App.Api.rootUrl);
    // @ts-ignore
    return this.http.get<any>(url.toString());
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
