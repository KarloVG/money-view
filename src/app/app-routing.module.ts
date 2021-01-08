import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { codebookRoutes } from './features/codebook/codebook-routes';
import { AuthorizationGuardService } from './shared/services/authentication/authorization.guard';

const routes: Routes = [
  {
    path: 'codebook',
    children: codebookRoutes,
  },
  {
    path: '',
    canLoad: [AuthorizationGuardService],
    loadChildren: () => import('./features/account-statement-summary-list/account-statement-summary-list.module')
      .then(m => m.AccountStatementSummaryListModule)
  },
  // todo: 404 pageNotFound
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
