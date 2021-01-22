import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, take } from 'rxjs/operators';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { PageInfo } from 'src/app/shared/page-info';
import { NotificationService } from 'src/app/shared/services/swal-notification/notification.service';
import { ModalAoeCompanyComponent } from '../modal-aoe-company/modal-aoe-company.component';
import {
  IPaginatedResponseCompany,
  IResponseCompany,
} from '../models/response/response-company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'mv-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss'],
})
export class CompanyOverviewComponent implements OnInit {
  isSubmitLoaderActive: boolean = false;
  rows: IResponseCompany[] = [];
  loadingIndicator: boolean = true;
  currentEntryCount!: number;
  desiredPageSize: number = 20;
  desiredPageOffset: number = 0;
  ColumnMode: ColumnMode = ColumnMode.force;

  constructor(
    private _modal: NgbModal,
    private _companyService: CompanyService,
    private _notificationService: NotificationService,
    private _spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  public setPage(pageInfo: PageInfo): void {
    this.desiredPageOffset = pageInfo.offset;
    this.desiredPageSize = pageInfo.pageSize;
    this.getCompanies();
  }

  // Get all
  getCompanies(): void {
    this._companyService
      .get(this.desiredPageOffset, this.desiredPageSize)
      .pipe(
        take(1),
        map(
          (response: IFleksbitResponse<IPaginatedResponseCompany>) =>
            response.response
        )
      )
      .subscribe((res: IPaginatedResponseCompany) => {
        this.rows = res.data;
        this.loadingIndicator = false;
        this.currentEntryCount = res.pagination.count;
      });
  }

  // Add or Edit
  addOrEditCompany(editCompany?: IResponseCompany): void {
    const modal = this._modal.open(ModalAoeCompanyComponent, {
      size: 'l',
      backdrop: 'static',
      centered: true,
    });
    if (editCompany) {
      modal.componentInstance.companyEdit = editCompany;
    }
    modal.result
      .then((result) => {
        this.handleSuccesResponse(result);
      })
      .catch((reason) => {
        if (editCompany) {
          this.handleModalDismiss('Firma nije uređena');
        } else {
          this.handleModalDismiss('Firma nije dodana');
        }
      });
  }

  // Delete
  deleteCompany(company: IResponseCompany): void {
    const modalRef = this._modal.open(ConfirmationModalComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
    });
    modalRef.componentInstance.title = 'Brisanje firme';
    modalRef.componentInstance.description = `Želite li obrisati firmu pod nazivom ${company.name}?`;
    modalRef.componentInstance.isDelete = true;
    modalRef.result
      .then((result) => {
        if (result == true) {
          this._companyService
            .delete(company.id)
            .pipe(
              take(1)
            )
            .subscribe((data) => {
              this.handleSuccesResponse('Firma je obrisana');
            });
        }
      })
      .catch((reason) => {
        this.handleModalDismiss('Firma nije obrisana');
      });
  }

  // 201 - Success
  handleSuccesResponse(successMessage: string): void {
    this._spinner.show();
    // zbog izgleda
    setTimeout(() => {
      this._spinner.hide();
      this._notificationService.fireSuccessMessage(successMessage);
      this.getCompanies();
    }, 500);
  }

  // Ngb modal dismiss event
  handleModalDismiss(message: string): void {
    this._notificationService.fireWarningMessage(message);
  }

  /* #region  Getters */
  get entryCount(): number {
    return this.currentEntryCount ?? 0;
  }
  get desiredPage(): number {
    return this.desiredPageOffset + 1;
  }
  /* #endregion */
}
