import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountStatementSummaryListRoutingModule} from './account-statement-summary-list-routing.module';
import {AccountStatementSummaryListComponent} from './account-statement-summary-list.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [AccountStatementSummaryListComponent],
  imports: [
    CommonModule,
    AccountStatementSummaryListRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountStatementSummaryListModule {
}
