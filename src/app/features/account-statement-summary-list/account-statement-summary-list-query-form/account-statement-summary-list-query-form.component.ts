import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';
import {App} from '../../../shared/app.config';
import {
  AccountStatementSummaryForm,
  AccountStatementSummaryService
} from '../../account-statement-summary/account-statement-summary.service';
import {NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'mv-account-statement-summary-list-query-form',
  templateUrl: './account-statement-summary-list-query-form.component.html',
  styleUrls: ['./account-statement-summary-list-query-form.component.scss']
})
export class AccountStatementSummaryListQueryFormComponent implements OnInit {

  @Output() FormUpdated = new EventEmitter<FormGroup>();
  readonly form!: FormGroup;

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
          debounceTime(App.DefaultDebounce_ms),
          distinctUntilChanged()
        ).subscribe(() => {
        const newFormGroup = new FormGroup({});
        Object.assign(newFormGroup, this.form);
      })
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
