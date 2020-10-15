import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountStatementSummaryListQueryFormComponent} from './account-statement-summary-list-query-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AccountStatementSummaryListQueryFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AccountStatementSummaryListQueryFormComponent
  ]
})
export class AccountStatementSummaryListQueryFormModule {
}
