import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';
import {BasicPaginatedResponse} from '../../shared/basic-paginated-response';
import {AppRouteService} from '../../shared/services/route/app-route.service';

@Injectable({
  providedIn: 'root'
})
export class AccountStatementSummaryService {

  constructor(
    private readonly http: HttpClient,
    private readonly appRoute: AppRouteService
  ) {
  }

  getQueryForm(): Observable<AccountStatementSummaryForm> {
    const url = this.appRoute.createAppRouteURL(['api', 'Webapp', 'AccountSummaryList', 'Form']);

    return this.http.get<AccountStatementSummaryForm>(url.toString());
  }

  getSelection(firmId: EntityId, summaryTypeId: EntityId): Observable<AccountStatementSummarySelection> {
    const url = this.appRoute.createAppRouteURL(['api', 'Webapp', 'AccountSummaryList', 'Selection']);
    const requestParams = new HttpParams({fromObject: {firmId: firmId.toString(), assetTypeId: summaryTypeId.toString()}});

    return this.http.get<AccountStatementSummarySelection>(url.toString(), {params: requestParams});
  }

  getList(page: number, pageSize: number, firmId: EntityId, assetTypeId: EntityId, date: Date, bank?: string):
    Observable<AccountStatementSummaryListResponse> {
    const url = this.appRoute.createAppRouteURL(['api', 'Webapp', 'AccountSummaryList']);
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

  async exportData(exportType: ExportType, firmId: EntityId, assetType: EntityId, date: Date | string): Promise<void> {
    const url = this.appRoute.createAppRouteURL(['api', 'api', 'getExportedData']);
    const requestParams = new HttpParams({
      fromObject: {
        exportDateType: exportType === 'pdf' ? '1' : '2',
        firmId: firmId.toString(),
        creditDebit: assetType.toString(),
        date: typeof date === 'string' ? date : date.toISOString()
      }
    });

    const response = await this.http.get(url.toString(), {
      params: requestParams,
      responseType: 'blob',
      observe: 'response'
    }).pipe(first()).toPromise();

    if (response.body) {
      const fileName = `Izvodi-${new Date().toISOString().slice(0, 10)}.${exportType === 'pdf' ? 'pdf' : 'xlsx'}`;
      this.downloadFile(response.body, fileName);
    }
  }

  private downloadFile(fileBlob: Blob, fileName: string): void {
    const binaryData = new Array(fileBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: 'blob'}));
    downloadLink.setAttribute('download', fileName);

    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

}

export type EntityId = string | number | bigint;
export type ExportType = 'xlsx' | 'pdf';

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
