import {Component, Inject, LOCALE_ID} from '@angular/core';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {TableColumn} from '@swimlane/ngx-datatable/lib/types/table-column.type';
import {BehaviorSubject} from 'rxjs';
import {PageInfo} from '../../shared/page-info';
import {CurrencyTabularDisplayPipe} from '../../shared/pipes/currency-tabular-display/currency-tabular-display.pipe';
import {
  AccountStatementSummaryEntry,
  AccountStatementSummarySelection,
  AccountStatementSummaryService,
  ExportType
} from '../account-statement-summary/account-statement-summary.service';
import {AccountStatementSummaryListQueryRequest} from './account-statement-summary-list-query-form/account-statement-summary-list-query-form.component';

@Component({
  selector: 'mv-account-statement-summary-list',
  templateUrl: './account-statement-summary-list.component.html',
  styleUrls: ['./account-statement-summary-list.component.scss']
})
export class AccountStatementSummaryListComponent {

  get isQueryFormValid(): boolean {
    return !!(this.currentListRequest?.valid);
  }

  get isQueryFormInvalid(): boolean {
    return !this.isQueryFormValid;
  }

  private readonly currencyTransformPipe = new CurrencyTabularDisplayPipe();
  readonly columnMode: ColumnMode = ColumnMode.standard;
  private currentListRequest?: AccountStatementSummaryListQueryRequest;

  desiredPageOffset = 0;
  desiredPageSize = 20;

  get desiredPage(): number {
    return this.desiredPageOffset + 1;
  }

  get entryCount(): number {
    return this.currentEntryCount ?? 0;
  }

  get loadingIndicator(): boolean {
    return !this.currentEntryLength;
  }

  currentEntryLength?: number;
  currentEntryCount?: number;

  readonly tableColumns: TableColumn[] = [
    {
      name: 'Banka',
      prop: 'bankName',
      draggable: false,
      resizeable: false,
      minWidth: 270,
      maxWidth: 320,
      comparator: (curr: string, other: string) => {
        return curr.localeCompare(other, this.localeId);
      }
    },
    {
      name: 'IBAN',
      prop: 'iban',
      cellClass: 'text-left',
      headerClass: 'text-left',
      draggable: false,
      resizeable: false,
      minWidth: 190,
      maxWidth: 250
    },
    {
      name: 'HRK',
      prop: 'hrkAmount',
      cellClass: 'text-right',
      headerClass: 'text-right',
      pipe: this.currencyTransformPipe,
      draggable: false,
      resizeable: false,
      minWidth: 130,
      maxWidth: 150
    },
    {
      name: 'EUR → HRK',
      prop: 'eurAmountAsHrk',
      cellClass: 'text-right',
      headerClass: 'text-right',
      pipe: this.currencyTransformPipe,
      draggable: false,
      resizeable: false,
      minWidth: 130,
      maxWidth: 150
    },
    {
      name: 'USD → HRK',
      prop: 'usdAmountAsHrk',
      cellClass: 'text-right',
      headerClass: 'text-right',
      pipe: this.currencyTransformPipe,
      draggable: false,
      resizeable: false,
      minWidth: 130,
      maxWidth: 150
    },
    {
      name: 'GBP → HRK',
      prop: 'gbpAmountAsHrk',
      cellClass: 'text-right',
      headerClass: 'text-right',
      pipe: this.currencyTransformPipe,
      draggable: false,
      resizeable: false,
      minWidth: 130,
      maxWidth: 150
    },
    {
      name: 'Ukupno',
      prop: 'total',
      cellClass: 'text-right',
      headerClass: 'text-right',
      pipe: this.currencyTransformPipe,
      draggable: false,
      resizeable: false,
      minWidth: 130,
      maxWidth: 200
    }
  ];

  readonly rows = new BehaviorSubject<AccountStatementSummaryEntry[]>([]);
  selectionData?: AccountStatementSummarySelection;

  constructor(
    @Inject(LOCALE_ID) private readonly localeId: string,
    private readonly accountStatementService: AccountStatementSummaryService
  ) {
  }

  onQueryFormUpdated(form: AccountStatementSummaryListQueryRequest): void {
    this.currentListRequest = form;

    if (!form.valid) {
      return;
    }

    this.accountStatementService.getSelection(form.firm, form.assetType)
      .subscribe((x) => {
        this.selectionData = x;
      });

    this.updateList();
  }

  public setPage(pageInfo: PageInfo): void {
    this.desiredPageOffset = pageInfo.offset;
    this.desiredPageSize = pageInfo.pageSize;

    this.updateList();
  }

  private updateList(): void {
    if (!this.currentListRequest) {
      return;
    }

    this.rows.next([]);

    this.currentEntryLength = undefined;
    this.currentEntryCount = undefined;

    const form = this.currentListRequest;
    this.accountStatementService.getList(this.desiredPage, this.desiredPageSize, form.firm, form.assetType,
      new Date(form.date), form.bank)
      .subscribe((x) => {
        this.rows.next(x.data);

        this.currentEntryCount = x.pagination.count;
        this.currentEntryLength = x.pagination.length;
      });
  }

  onExportButtonClicked(exportType: ExportType = 'xlsx'): void {
    if (this.currentListRequest) {
      this.accountStatementService.exportData(
        exportType,
        this.currentListRequest.firm,
        this.currentListRequest.assetType,
        this.currentListRequest.date
      );
    }
  }

  // TODO: I should really start adding localization services
  convertAssetTypeStringToCorrectCroatianForm(noun?: string): string {
    if (!noun) {
      return '';
    }

    noun = noun.toLowerCase();

    switch (noun) {
      case 'uplata':
        return 'uplate';
      case 'isplata':
        return 'isplate';
      default:
        return noun;
    }
  }

}
