import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountStatementSummaryListRoutingModule} from './account-statement-summary-list-routing.module';
import {AccountStatementSummaryListComponent} from './account-statement-summary-list.component';


@NgModule({
  declarations: [AccountStatementSummaryListComponent],
  imports: [
    CommonModule,
    AccountStatementSummaryListRoutingModule
  ]
})
export class AccountStatementSummaryListModule {
}
