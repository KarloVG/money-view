import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LicenceOverviewComponent } from './licence-overview/licence-overview.component';
import { ModalAoeLicenceComponent } from './modal-aoe-licence/modal-aoe-licence.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [LicenceOverviewComponent, ModalAoeLicenceComponent],
  entryComponents: [ModalAoeLicenceComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    // Malo ruta pa nema potrebe za novim file-om
    RouterModule.forChild([
      {
        path: '',
        component: LicenceOverviewComponent,
      },
    ]),
    FileUploadModule
  ],
})
export class LicenceModule { }
