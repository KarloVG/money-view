import { Routes } from '@angular/router';
import { LicenceGuard } from 'src/app/shared/services/authentication/licence.guard';

export const codebookRoutes: Routes = [
  {
    path: 'group-and-company',
    canActivate: [LicenceGuard],
    loadChildren: () =>
      import('./group-and-company/group-and-company.module').then(
        (m) => m.GroupAndCompanyModule
      ),
  },
  {
    path: 'bank',
    canActivate: [LicenceGuard],
    loadChildren: () => import('./bank/bank.module').then((m) => m.BankModule),
  },
  {
    path: 'user-panel',
    canActivate: [LicenceGuard],
    loadChildren: () =>
      import('./user-panel/user-panel.module').then((m) => m.UserPanelModule),
  },
  {
    path: 'account',
    canActivate: [LicenceGuard],
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'licence',
    canActivate: [LicenceGuard],
    loadChildren: () =>
      import('./licence/licence.module').then((m) => m.LicenceModule),
  },
];
