import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { EMPTY, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { BasicPaginatedResponse } from 'src/app/shared/basic-paginated-response';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { PageInfo } from 'src/app/shared/page-info';
import { NotificationService } from 'src/app/shared/services/swal-notification/notification.service';
import { ModalAoeAccountComponent } from '../modal-aoe-account/modal-aoe-account.component';
import { IResponseAccount } from '../models/response/response-account';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'mv-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss'],
})
export class AccountOverviewComponent implements OnInit {
  /* #region  Variables */
  rows: IResponseAccount[] = [];
  loadingIndicator: boolean = true;
  currentEntryCount!: number;
  desiredPageSize: number = 20;
  desiredPageOffset: number = 0;
  ColumnMode: ColumnMode = ColumnMode.force;
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private _modal: NgbModal,
    private _accountService: AccountService,
    private _notificationService: NotificationService,
    private _spinner: NgxSpinnerService
  ) {}
  /* #endregion */

  /* #region  Methods */
  public setPage(pageInfo: PageInfo): void {
    this.desiredPageOffset = pageInfo.offset;
    this.desiredPageSize = pageInfo.pageSize;
    this.getAccounts();
  }

  ngOnInit(): void {
    this.getAccounts();
  }

  // Get all
  getAccounts(): void {
    this._accountService
      .get(this.desiredPageOffset, this.desiredPageSize)
      .pipe(
        take(1),
        map(
          (
            response: IFleksbitResponse<
              BasicPaginatedResponse<IResponseAccount>
            >
          ) => response.response
        )
      )
      .subscribe((res: BasicPaginatedResponse<IResponseAccount>) => {
        this.rows = res.data;
        this.loadingIndicator = false;
        this.currentEntryCount = res.pagination.count;
      });
  }

  // Add or Edit
  addOrEditAccount(account?: IResponseAccount): void {
    console.log('aaccc', account);
    const modal = this._modal.open(ModalAoeAccountComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    if (account) {
      modal.componentInstance.account = account;
    }
    modal.result
      .then((result) => {
        if (result && result.id) {
          this._accountService
            .put(result)
            .pipe(
              take(1),
            )
            .subscribe((data) => {
              this.handleSuccesResponse('Račun je uređen');
            });
        } else {
          this._accountService
            .add(result)
            .pipe(
              take(1),
            )
            .subscribe((data) => {
              this.handleSuccesResponse('Račun je dodan');
            });
        }
      })
      .catch((reason) => {
        if (account) {
          this.handleModalDismiss('Račun nije uređen');
        } else {
          this.handleModalDismiss('Račun nije dodan');
        }
        // todo swift alert warning
      });
  }

  // Delete
  deleteAccount(account: IResponseAccount): void {
    const modalRef = this._modal.open(ConfirmationModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.title = 'Brisanje računa';
    modalRef.componentInstance.description = `Želite li obrisati račun firme ${account.company.name} sa IBAN-om: ${account.iban}?`;
    modalRef.componentInstance.isDelete = true; // text danger
    modalRef.result
      .then((result) => {
        if (result == true) {
          this._accountService
            .delete(account.id)
            .pipe(
              take(1)
            )
            .subscribe((data) => {
              this.handleSuccesResponse('Račun je obrisan');
            });
        }
      })
      .catch((reason) => {
        this.handleModalDismiss('Račun nije obrisan');
      });
  }

  // 201 - Success
  handleSuccesResponse(successMessage: string): void {
    this._spinner.show();
    // zbog izgleda
    setTimeout(() => {
      this._spinner.hide();
      this._notificationService.fireSuccessMessage(successMessage);
      this.getAccounts();
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
