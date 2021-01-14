import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPanelOverviewComponent } from './user-panel-overview/user-panel-overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalAoeUserPanelComponent } from './modal-aoe-user-panel/modal-aoe-user-panel.component';
import { ConfirmationModalModule } from 'src/app/shared/components/confirmation-modal/confirmation-modal.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [UserPanelOverviewComponent, ModalAoeUserPanelComponent],
  imports: [
    CommonModule,
    FormsModule,
    FormsModule,
    NgbModule,
    ConfirmationModalModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserPanelOverviewComponent
      }
    ])
  ],
  entryComponents:[ModalAoeUserPanelComponent]
})
export class UserPanelModule { }
