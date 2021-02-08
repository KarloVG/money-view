import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, take } from 'rxjs/operators';
import { BasicPaginatedResponse } from 'src/app/shared/basic-paginated-response';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { PageInfo } from 'src/app/shared/page-info';
import { AppTourService } from 'src/app/shared/services/app-tour/app-tour.service';
import { NotificationService } from 'src/app/shared/services/swal-notification/notification.service';
import { ModalAoeBankComponent } from '../modal-aoe-bank/modal-aoe-bank.component';
import { IResponseBank } from '../models/response/response-bank';
import { BankService } from '../services/bank.service';

@Component({
  selector: 'mv-bank-overview',
  templateUrl: './bank-overview.component.html',
  styleUrls: ['./bank-overview.component.scss'],
  providers: [AppTourService]
})
export class BankOverviewComponent implements OnInit {
  /* #region  Variables */
  rows: IResponseBank[] = [];
  loadingIndicator: boolean = true;
  currentEntryCount!: number;
  desiredPageSize: number = 5;
  desiredPageOffset: number = 0;
  ColumnMode: ColumnMode = ColumnMode.force;
  tourName: string = 'bank-tour'
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private _modal: NgbModal,
    private _bankService: BankService,
    private _notificationService: NotificationService,
    private _spinner: NgxSpinnerService,
    private appTour: AppTourService
  ) { }
  /* #endregion */

  /* #region  Methods */
  public setPage(pageInfo: PageInfo): void {
    this.desiredPageOffset = pageInfo.offset;
    this.desiredPageSize = pageInfo.pageSize;
    this.getBanks();
  }

  ngOnInit(): void {
    this.getBanks();
  }

  ngAfterViewInit(): void {
    //APP TOUR
    this.appTour.isTourActive(this.tourName, false)
  }

  //APP TOUR
  tour() {
    this.appTour.showTour(this.tourName)
  }

  // Get all
  getBanks(): void {
    this._bankService
      .get(this.desiredPageOffset, this.desiredPageSize)
      .pipe(
        take(1),
        map(
          (
            response: IFleksbitResponse<BasicPaginatedResponse<IResponseBank>>
          ) => response.response
        )
      )
      .subscribe((res: BasicPaginatedResponse<IResponseBank>) => {
        this.rows = res.data;
        this.loadingIndicator = false;
        this.currentEntryCount = res.pagination.count;
      });
  }

  // Add or Edit
  addOrEditBank(bank?: IResponseBank): void {
    const modal = this._modal.open(ModalAoeBankComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    if (bank) {
      modal.componentInstance.bank = bank;
    }
    modal.result
      .then((result) => {
        if (result && result.id) {
          this._bankService
            .put(result)
            .pipe(
              take(1)
            )
            .subscribe((data) => {
              this.handleSuccesResponse('Banka je uređena');
            });
        } else {
          this._bankService
            .add(result)
            .pipe(
              take(1)
            )
            .subscribe((data) => {
              this.handleSuccesResponse('Banka je dodana');
            });
        }
      })
      .catch((reason) => {
        if (bank) {
          this.handleModalDismiss('Banka nije uređena');
        } else {
          this.handleModalDismiss('Banka nije dodana');
        }
        // todo swift alert warning
      });
  }

  // Delete
  deleteBank(bank: IResponseBank): void {
    const modalRef = this._modal.open(ConfirmationModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.title = 'Brisanje banke';
    modalRef.componentInstance.description = `Želite li obrisati banku pod nazivom ${bank.name}?`;
    modalRef.componentInstance.isDelete = true; // text danger
    modalRef.result
      .then((result) => {
        if (result == true) {
          this._bankService
            .delete(bank.id)
            .pipe(
              take(1)
            )
            .subscribe((data) => {
              this.handleSuccesResponse('Banka je obrisana');
            });
        }
      })
      .catch((reason) => {
        this.handleModalDismiss('Banka nije obrisana');
      });
  }

  // 201 - Success
  handleSuccesResponse(successMessage: string): void {
    this._spinner.show();
    // zbog izgleda
    setTimeout(() => {
      this._spinner.hide();
      this._notificationService.fireSuccessMessage(successMessage);
      this.getBanks();
    }, 500);
  }

  // Ngb modal dismiss event
  handleModalDismiss(message: string): void {
    this._notificationService.fireWarningMessage(message);
  }
  /* #endregion */

  /* #region  Getters */
  get entryCount(): number {
    return this.currentEntryCount ?? 0;
  }
  get desiredPage(): number {
    return this.desiredPageOffset + 1;
  }
  /* #endregion */
}
