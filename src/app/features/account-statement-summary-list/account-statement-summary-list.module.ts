import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountStatementSummaryListRoutingModule} from './account-statement-summary-list-routing.module';
import {AccountStatementSummaryListComponent} from './account-statement-summary-list.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccountStatementSummaryListQueryFormModule} from './account-statement-summary-list-query-form/account-statement-summary-list-query-form.module';
import {CurrencyTabularDisplayModule} from '../../shared/pipes/currency-tabular-display/currency-tabular-display.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AccountStatementSummaryListComponent
  ],
  imports: [
    CommonModule,
    AccountStatementSummaryListRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    AccountStatementSummaryListQueryFormModule,
    CurrencyTabularDisplayModule,
    NgbDropdownModule
  ]
})
export class AccountStatementSummaryListModule {
}
