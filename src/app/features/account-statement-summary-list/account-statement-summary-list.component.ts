import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TableColumn} from '@swimlane/ngx-datatable/lib/types/table-column.type';
import {CurrencyTabularDisplayPipe} from '../../shared/pipes/currency-tabular-display/currency-tabular-display.pipe';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {AccountStatementSummaryService} from '../account-statement-summary/account-statement-summary.service';

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

  readonly tableColumns: TableColumn[] = [
    {
      name: 'Banka',
      prop: 'bank',
      minWidth: 150,
      maxWidth: 200,
      flexGrow: 1
    },
    {
      name: 'IBAN',
      prop: 'iban',
      cellClass: 'text-right',
      headerClass: 'text-right',
      minWidth: 150,
      maxWidth: 200,
      flexGrow: 1
    },
    {
      name: 'HRK',
      prop: 'hrk',
      cellClass: 'text-right',
      headerClass: 'text-right',
      pipe: this.currencyTransformPipe,
      minWidth: 100,
      maxWidth: 150,
      flexGrow: 1
    },
    {
      name: 'EUR → HRK',
      prop: 'eurAsHrk',
      cellClass: 'text-right',
      headerClass: 'text-right',
      pipe: this.currencyTransformPipe,
      minWidth: 100,
      maxWidth: 150,
      flexGrow: 1
    },
    {
      name: 'USD → HRK',
      prop: 'usdAsHrk',
      cellClass: 'text-right',
      headerClass: 'text-right',
      pipe: this.currencyTransformPipe,
      minWidth: 100,
      maxWidth: 150,
      flexGrow: 1
    },
    {
      name: 'GBP → HRK',
      prop: 'gbpAsHrk',
      cellClass: 'text-right',
      headerClass: 'text-right',
      pipe: this.currencyTransformPipe,
      minWidth: 100,
      maxWidth: 150,
      flexGrow: 1
    },
    {
      name: 'Ukupno',
      prop: 'total',
      cellClass: 'text-right',
      headerClass: 'text-right',
      pipe: this.currencyTransformPipe,
      minWidth: 100,
      maxWidth: 150,
      flexGrow: 1
    }
  ];

  rows: AccountStatementSummaryEntry[] = [
    {
      bank: 'OTP Banka',
      iban: 'HR4520023664654654',
      hrk: 12345.55,
      eurAsHrk: 654,
      gbpAsHrk: 132.2,
      usdAsHrk: 455.87,
      total: 31321.44
    }
  ];

  constructor(
    private readonly accountStatementService: AccountStatementSummaryService
  ) {
  }

  onQueryFormUpdated(form: FormGroup): void {
    this.isQueryFormValid.next(form?.valid ?? false);
  }

}

interface AccountStatementSummaryEntry {
  bank: string;
  iban: string;
  hrk: number;
  eurAsHrk: number;
  usdAsHrk: number;
  gbpAsHrk: number;
  total: number;
}
