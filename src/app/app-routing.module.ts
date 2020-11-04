import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/account-statement-summary-list/account-statement-summary-list.module')
      .then(m => m.AccountStatementSummaryListModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./features/authentication/authentication.module').then(m => m.AuthenticationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
