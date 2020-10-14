import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {currentDateISOString} from '../../shared/utility';

@Component({
  selector: 'mv-account-statement-summary-list',
  templateUrl: './account-statement-summary-list.component.html',
  styleUrls: ['./account-statement-summary-list.component.scss']
})
export class AccountStatementSummaryListComponent implements OnInit {

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
