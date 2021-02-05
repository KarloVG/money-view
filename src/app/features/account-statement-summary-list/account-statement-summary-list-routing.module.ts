import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicenceGuard } from 'src/app/shared/services/authentication/licence.guard';
import { AccountStatementSummaryListComponent } from './account-statement-summary-list.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [LicenceGuard],
    component: AccountStatementSummaryListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountStatementSummaryListRoutingModule {
}
