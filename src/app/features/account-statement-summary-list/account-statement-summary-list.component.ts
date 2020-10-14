import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TableColumn} from '@swimlane/ngx-datatable/lib/types/table-column.type';
import {CurrencyTabularDisplayPipe} from '../../shared/pipes/currency-tabular-display/currency-tabular-display.pipe';

@Component({
  selector: 'mv-account-statement-summary-list',
  templateUrl: './account-statement-summary-list.component.html',
  styleUrls: ['./account-statement-summary-list.component.scss']
})
export class AccountStatementSummaryListComponent implements OnInit {

  readonly tableColumns: TableColumn[] = [
    {
      name: 'Banka',
      prop: 'bank',
      flexGrow: 1
    },
    {
      name: 'IBAN',
      prop: 'iban',
      flexGrow: 1
    },
    {
      name: 'HRK',
      prop: 'hrk',
      flexGrow: 1
    },
    {
      name: 'EUR → HRK',
      prop: 'eurAsHrk',
      flexGrow: 1
    },
    {
      name: 'USD → HRK',
      prop: 'usdAsHrk',
      flexGrow: 1
    },
    {
      name: 'GBP → HRK',
      prop: 'gbpAsHrk',
      flexGrow: 1
    },
    {
      name: 'Ukupno',
      prop: 'total',
      flexGrow: 1,
      cellClass: 'text-right',
      headerClass: 'text-right',
      pipe: new CurrencyTabularDisplayPipe()
    }
  ];

  readonly rows: AccountStatementSummaryEntry[] = [
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

  constructor() {
  }

  ngOnInit(): void {
  }

  onQueryFormUpdated(form: FormGroup): void {
    console.log(form.value);
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
