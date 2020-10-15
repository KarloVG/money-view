import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // tslint:disable-next-line:max-line-length
    loadChildren: () => import('./features/account-statement-summary-list/account-statement-summary-list.module').then(m => m.AccountStatementSummaryListModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
