import { Routes } from '@angular/router';
import { AuthorizationGuardService } from 'src/app/shared/services/authentication/authorization.guard';

export const codebookRoutes: Routes = [
  {
    path: 'group-and-company',
    canLoad: [AuthorizationGuardService],
    loadChildren: () =>
      import('./group-and-company/group-and-company.module').then(
        (m) => m.GroupAndCompanyModule
      ),
  },
  {
    path: 'bank',
    canLoad: [AuthorizationGuardService],
    loadChildren: () => import('./bank/bank.module').then((m) => m.BankModule),
  },
  {
    path: 'user-panel',
    canLoad: [AuthorizationGuardService],
    loadChildren: () =>
      import('./user-panel/user-panel.module').then((m) => m.UserPanelModule),
  },
  {
    path: 'account',
    canLoad: [AuthorizationGuardService],
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'licence',
    canLoad: [AuthorizationGuardService],
    loadChildren: () =>
      import('./licence/licence.module').then((m) => m.LicenceModule),
  },
];
