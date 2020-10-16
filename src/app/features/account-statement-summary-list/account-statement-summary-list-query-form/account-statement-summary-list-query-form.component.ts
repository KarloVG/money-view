import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {currentDateISOString} from '../../../shared/utility';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';
import {QueryFormDebounceTimeMilliseconds} from '../../../shared/app.config';
import {
  AccountStatementSummaryForm,
  AccountStatementSummaryService
} from '../../account-statement-summary/account-statement-summary.service';

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
      date: new FormControl(currentDateISOString()),
      bank: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.form.valueChanges
        .pipe(
          filter(Boolean),
          debounceTime(QueryFormDebounceTimeMilliseconds),
          distinctUntilChanged()
        ).subscribe(() => this.FormUpdated.emit(this.form))
    );

    this.accountSummaryService.getQueryForm()
      .subscribe((x) => {
        this.formData = x;
      });
  }

}
