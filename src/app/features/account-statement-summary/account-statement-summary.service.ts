/* tslint:disable:no-any */
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
    const url = `${App.Api.rootUrl.toString()}/AccountStatementSummaries/Form`;
    return this.http.get<AccountStatementSummaryForm>(url);
  }

  getSelection(firmId: EntityId, summaryTypeId: EntityId): Observable<AccountStatementSummarySelection> {
    const url = `${App.Api.rootUrl.toString()}/AccountStatementSummaries/Selection`;
    const requestParams = new HttpParams({fromObject: {firmId: firmId.toString(), summaryTypeId: summaryTypeId.toString()}});
    return this.http.get<AccountStatementSummarySelection>(url, {params: requestParams});
  }

  testHost(): Observable<any> {
    const url = App.Api.rootUrl;
    url.pathname += '/user/info';
    console.log(url);
    // @ts-ignore
    return this.http.get<any>(url);
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
