import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyOverviewComponent } from './company-overview/company-overview.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalAoeCompanyComponent } from './modal-aoe-company/modal-aoe-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CompanyOverviewComponent, ModalAoeCompanyComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CompanyOverviewComponent],
  entryComponents:[ModalAoeCompanyComponent]
})
export class CompanyModule { }
