import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountStatementSummaryListComponent} from './account-statement-summary-list.component';

const routes: Routes = [
  {
    path: '',
    component: AccountStatementSummaryListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountStatementSummaryListRoutingModule {
}
