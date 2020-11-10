import {Component} from '@angular/core';
import {TableColumn} from '@swimlane/ngx-datatable/lib/types/table-column.type';
import {CurrencyTabularDisplayPipe} from '../../shared/pipes/currency-tabular-display/currency-tabular-display.pipe';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  AccountStatementSummaryEntry,
  AccountStatementSummarySelection,
  AccountStatementSummaryService
} from '../account-statement-summary/account-statement-summary.service';
import {AccountStatementSummaryListQueryRequest} from './account-statement-summary-list-query-form/account-statement-summary-list-query-form.component';
import {PageInfo} from '../../shared/page-info';

@Component({
  selector: 'mv-account-statement-summary-list',
  templateUrl: './account-statement-summary-list.component.html',
  styleUrls: ['./account-statement-summary-list.component.scss']
})
export class AccountStatementSummaryListComponent {

  readonly isQueryFormValid = new BehaviorSubject<boolean>(false);
  readonly isQueryFormInvalid = this.isQueryFormValid.pipe(map(x => !x));

  private readonly currencyTransformPipe = new CurrencyTabularDisplayPipe();
  readonly columnMode: ColumnMode = ColumnMode.flex;
  private currentListRequest?: AccountStatementSummaryListQueryRequest;

  desiredPageOffset = 0;
  desiredPageSize = 20;

  get desiredPage(): number {
    return this.desiredPageOffset + 1;
  }

  currentEntryLength?: number;
  currentEntryCount?: number;

  readonly tableColumns: TableColumn[] = [
    {
      name: 'Banka',
      prop: 'bankName',
      minWidth: 250,
      maxWidth: 300,
      flexGrow: 1
    },
    {
      name: 'IBAN',
      prop: 'iban',
      cellClass: 'text-right',
      headerClass: 'text-right',
      minWidth: 160,
      maxWidth: 180,
      flexGrow: 1
    },
    {
      name: 'HRK',
      prop: 'hrkAmount',
      cellClass: 'text-right',
      headerClass: 'text-right',
      pipe: this.currencyTransformPipe,
      minWidth: 80,
      maxWidth: 100,
      flexGrow: 1
    },
    {
      name: 'EUR → HRK',
      prop: 'eurAmountAsHrk',
      cellClass: 'text-right',
      headerClass: 'text-right',
      pipe: this.currencyTransformPipe,
      minWidth: 80,
      maxWidth: 100,
      flexGrow: 1
    },
    {
      name: 'USD → HRK',
      prop: 'usdAmountAsHrk',
      cellClass: 'text-right',
      headerClass: 'text-right',
      pipe: this.currencyTransformPipe,
      minWidth: 80,
      maxWidth: 100,
      flexGrow: 1
    },
    {
      name: 'GBP → HRK',
      prop: 'gbpAmountAsHrk',
      cellClass: 'text-right',
      headerClass: 'text-right',
      pipe: this.currencyTransformPipe,
      minWidth: 80,
      maxWidth: 100,
      flexGrow: 1
    },
    {
      name: 'Ukupno',
      prop: 'total',
      cellClass: 'text-right',
      headerClass: 'text-right',
      pipe: this.currencyTransformPipe,
      minWidth: 80,
      maxWidth: 100,
      flexGrow: 1
    }
  ];

  rows: AccountStatementSummaryEntry[] = [];
  selectionData?: AccountStatementSummarySelection;

  constructor(
    private readonly accountStatementService: AccountStatementSummaryService
  ) {
  }

  onQueryFormUpdated(form: AccountStatementSummaryListQueryRequest): void {
    this.currentListRequest = form;

    this.isQueryFormValid.next(!!form.valid);

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

    this.currentEntryLength = undefined;
    this.currentEntryCount = undefined;

    const form = this.currentListRequest;
    this.accountStatementService.getList(this.desiredPage, this.desiredPageSize, form.firm, form.assetType,
      new Date(form.date), form.bank)
      .subscribe((x) => {
        this.rows = x.data;

        this.currentEntryCount = x.pagination.count;
        this.currentEntryLength = x.pagination.length;
      });
  }

}
