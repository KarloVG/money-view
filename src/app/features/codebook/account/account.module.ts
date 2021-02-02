import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { ModalAoeAccountComponent } from './modal-aoe-account/modal-aoe-account.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationModalModule } from 'src/app/shared/components/confirmation-modal/confirmation-modal.module';
import { RouterModule } from '@angular/router';
import { JoyrideModule } from 'ngx-joyride';

@NgModule({
  declarations: [AccountOverviewComponent, ModalAoeAccountComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmationModalModule,
    JoyrideModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: AccountOverviewComponent,
      },
    ]),
  ],
  entryComponents: [ModalAoeAccountComponent],
})
export class AccountModule { }
