import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {App} from '../../../config/app.config';
import {
  AccountStatementSummaryForm,
  AccountStatementSummaryService
} from '../../account-statement-summary/account-statement-summary.service';
import {NgbDateNativeAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {currentDateISOString} from '../../../shared/utility/current-date-iso-string';

@Component({
  selector: 'mv-account-statement-summary-list-query-form',
  templateUrl: './account-statement-summary-list-query-form.component.html',
  styleUrls: ['./account-statement-summary-list-query-form.component.scss']
})
export class AccountStatementSummaryListQueryFormComponent implements OnInit, OnDestroy {

  @Output() FormUpdated = new EventEmitter<AccountStatementSummaryListQueryRequest>();
  readonly form!: FormGroup;

  private readonly ngbDateNativeAdapter = new NgbDateNativeAdapter();

  private readonly subscriptions = new Subscription();
  formData?: AccountStatementSummaryForm;

  constructor(
    private readonly accountSummaryService: AccountStatementSummaryService
  ) {
    const todayNgbDate = new NgbDateNativeAdapter().fromModel(new Date());

    this.form = new FormGroup({
      firm: new FormControl(null, [Validators.required]),
      assetType: new FormControl(null, [Validators.required]),
      date: new FormControl(todayNgbDate, [Validators.required]),
      bank: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.form.valueChanges
        .pipe(
          filter((val) => !!val),
          debounceTime(App.DefaultDebounce_ms),
          distinctUntilChanged((prev: AccountStatementSummaryFormValue, curr: AccountStatementSummaryFormValue) => {
            return prev.assetType === curr.assetType
              && prev.bank === curr.bank
              && prev.date === curr.date
              && prev.firm === curr.firm;
          }),
          map((formValue: AccountStatementSummaryFormValue) => {
            const ngbDate = formValue.date as NgbDateStruct;
            const nativeDate = (this.ngbDateNativeAdapter.toModel(ngbDate) ?? new Date()) as Date;

            return new AccountStatementSummaryListQueryRequest(this.form.value.firm,
              this.form.value.assetType, nativeDate, this.form.value.bank);
          }),
        ).subscribe((queryRequest) => {
        this.FormUpdated.emit(queryRequest);
      })
    );

    this.accountSummaryService.getQueryForm()
      .subscribe((x) => {
        this.formData = x;
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get maxDateRestriction(): NgbDateStruct {
    const currDate = new Date();
    return {day: currDate.getDate(), month: currDate.getMonth() + 1, year: currDate.getFullYear()};
  }

  onDatePickerKeyDown(e: KeyboardEvent): void {
    const key = e.key || e.code;

    const isDigit = key >= '0' && key <= '9';
    const isDelimiter = key === '.';

    const keyIsValid = isDigit || isDelimiter;

    if (keyIsValid) {
      return;
    }

    if (e.preventDefault) {
      e.preventDefault();
    }

    e.returnValue = false;
  }

}

interface AccountStatementSummaryFormValue {
  readonly firm: string | null;
  readonly assetType: string | null;
  readonly date: NgbDateStruct;
  readonly bank: string | null;
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

  get valid(): boolean {
    return !!this.firm && !!this.assetType && !!this.date;
  }
}
