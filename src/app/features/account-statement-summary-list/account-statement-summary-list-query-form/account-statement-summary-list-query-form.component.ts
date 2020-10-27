import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';
import {App} from '../../../shared/app.config';
import {
  AccountStatementSummaryForm,
  AccountStatementSummaryService
} from '../../account-statement-summary/account-statement-summary.service';
import {NgbDateNativeAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {currentDateISOString} from '../../../shared/utility';

@Component({
  selector: 'mv-account-statement-summary-list-query-form',
  templateUrl: './account-statement-summary-list-query-form.component.html',
  styleUrls: ['./account-statement-summary-list-query-form.component.scss']
})
export class AccountStatementSummaryListQueryFormComponent implements OnInit {

  @Output() FormUpdated = new EventEmitter<AccountStatementSummaryListQueryRequest>();
  readonly form!: FormGroup;

  private readonly ngbDateNativeAdapter = new NgbDateNativeAdapter();

  private readonly subscriptions = new Subscription();
  formData?: AccountStatementSummaryForm;

  constructor(
    private readonly accountSummaryService: AccountStatementSummaryService
  ) {
    this.form = new FormGroup({
      firm: new FormControl(null, [Validators.required]),
      assetType: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      bank: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.form.valueChanges
        .pipe(
          filter(Boolean),
          filter((val, idx) => this.form.valid),
          debounceTime(App.DefaultDebounce_ms),
          distinctUntilChanged(),
          tap(() => {
            const ngbDate = this.form.value.date as NgbDateStruct;
            const nativeDate = (this.ngbDateNativeAdapter.toModel(ngbDate) ?? new Date()) as Date;

            const queryRequest = new AccountStatementSummaryListQueryRequest(this.form.value.firm,
              this.form.value.assetType, nativeDate, this.form.value.bank);

            this.FormUpdated.emit(queryRequest);
          })
        ).subscribe()
    );

    this.accountSummaryService.getQueryForm()
      .subscribe((x) => {
        this.formData = x;
      });

    this.accountSummaryService.testHost()
      .subscribe((x) => {
        console.log(x);
      });
  }

  get maxDateRestriction(): NgbDateStruct {
    const currDate = new Date();
    return {day: currDate.getDate(), month: currDate.getMonth() + 1, year: currDate.getFullYear()};
  }

}

// prop: valid: undefined | boolean

export class AccountStatementSummaryListQueryRequest {

  readonly firm: string;
  readonly assetType: string;
  readonly date: string = currentDateISOString();
  readonly bank?: string;

  constructor(firm: string, assetType: string, date: Date, bank?: string) {
    this.firm = firm;
    this.assetType = assetType;
    this.date = date.toISOString();
    this.bank = bank;
  }

  get valid(): boolean | undefined {
    return !!this.firm && !!this.assetType && !!this.date;
  }
}

