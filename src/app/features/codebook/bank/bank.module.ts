import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalModule } from 'src/app/shared/components/confirmation-modal/confirmation-modal.module';
import { BankOverviewComponent } from './bank-overview/bank-overview.component';
import { ModalAoeBankComponent } from './modal-aoe-bank/modal-aoe-bank.component';
import { RouterModule } from '@angular/router';
import { JoyrideModule } from 'ngx-joyride';

@NgModule({
  declarations: [BankOverviewComponent, ModalAoeBankComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmationModalModule,
    JoyrideModule.forRoot(),
    // Malo ruta pa nema potrebe za novim file-om
    RouterModule.forChild([
      {
        path: '',
        component: BankOverviewComponent,
      },
    ]),
  ],
  entryComponents: [ModalAoeBankComponent],
})
export class BankModule { }
