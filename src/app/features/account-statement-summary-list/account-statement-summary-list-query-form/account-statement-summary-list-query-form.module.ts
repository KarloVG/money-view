import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountStatementSummaryListQueryFormComponent} from './account-statement-summary-list-query-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AccountStatementSummaryListQueryFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule
  ],
  exports: [
    AccountStatementSummaryListQueryFormComponent
  ]
})
export class AccountStatementSummaryListQueryFormModule {
}
