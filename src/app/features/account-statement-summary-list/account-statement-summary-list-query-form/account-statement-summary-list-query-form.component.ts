import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {currentDateISOString} from '../../../shared/utility';

@Component({
  selector: 'mv-account-statement-summary-list-query-form',
  templateUrl: './account-statement-summary-list-query-form.component.html',
  styleUrls: ['./account-statement-summary-list-query-form.component.scss']
})
export class AccountStatementSummaryListQueryFormComponent implements OnInit {

  readonly form!: FormGroup;

  constructor() {
    this.form = new FormGroup({
      firm: new FormControl(null, [Validators.required]),
      assetType: new FormControl(null, [Validators.required]),
      date: new FormControl(currentDateISOString()),
      bank: new FormControl(null)
    });
  }

  ngOnInit(): void {
  }

}
