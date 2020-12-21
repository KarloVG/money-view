import { Routes } from '@angular/router';

export const codebookRoutes: Routes = [
  {
    path: 'group-and-company',
    loadChildren: () =>
      import('./group-and-company/group-and-company.module').then(
        (m) => m.GroupAndCompanyModule
      ),
  },
  {
    path: 'bank',
    loadChildren: () => import('./bank/bank.module').then((m) => m.BankModule),
  },
  {
    path: 'user-panel',
    loadChildren: () =>
      import('./user-panel/user-panel.module').then((m) => m.UserPanelModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
];
