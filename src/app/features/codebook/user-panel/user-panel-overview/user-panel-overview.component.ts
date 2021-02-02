import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { JoyrideService } from 'ngx-joyride';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, take } from 'rxjs/operators';
import { BasicPaginatedResponse } from 'src/app/shared/basic-paginated-response';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { PageInfo } from 'src/app/shared/page-info';
import { NotificationService } from 'src/app/shared/services/swal-notification/notification.service';
import { ModalAoeUserPanelComponent } from '../modal-aoe-user-panel/modal-aoe-user-panel.component';
import { IResponseUserPanel } from '../models/response/response-user-panel';
import { UserPanelService } from '../services/user-panel.service';

@Component({
  selector: 'mv-user-panel-overview',
  templateUrl: './user-panel-overview.component.html',
  styleUrls: ['./user-panel-overview.component.scss']
})
export class UserPanelOverviewComponent implements OnInit {

  rows: IResponseUserPanel[] = [];
  loadingIndicator: boolean = true;
  currentEntryCount!: number;
  desiredPageSize: number = 5;
  desiredPageOffset: number = 0;
  ColumnMode: ColumnMode = ColumnMode.force;
  tourUser: boolean = true;

  constructor(
    private _notificationService: NotificationService,
    private _modal: NgbModal,
    private _userPanelService: UserPanelService,
    private _spinner: NgxSpinnerService,
    private joyrideService: JoyrideService
  ) { }

  public setPage(pageInfo: PageInfo): void {
    this.desiredPageOffset = pageInfo.offset;
    this.desiredPageSize = pageInfo.pageSize;
    this.getUsers();
  }

  ngOnInit(): void {
    //APP TOUR
    const token = localStorage.getItem('tour-user');
    if (token) {
      this.tourUser = JSON.parse(token);
    }
    if (this.tourUser) {
      this.joyrideService.startTour(
        {
          steps: ['step1'],
          waitingTime: 1500,
          showCounter: false,
          themeColor: "#288ab5"
        }
      );
    }
    this.getUsers();
  }

  //APPTOUR
  showTour(): void {
    this.tourUser = false;
    localStorage.setItem('tour-user', JSON.stringify(this.tourUser));
  }


  getUsers(): void {
    this._userPanelService
      .get(this.desiredPageOffset, this.desiredPageSize)
      .pipe(
        take(1),
        map(
          (
            response:
              IFleksbitResponse<BasicPaginatedResponse<IResponseUserPanel>>
          ) => response.response
        )
      )
      .subscribe((res: BasicPaginatedResponse<IResponseUserPanel>) => {
        this.rows = res.data;
        this.loadingIndicator = false;
        this.currentEntryCount = res.pagination.count;
      });
  }

  addOrEditUser(user?: IResponseUserPanel): void {
    const modal = this._modal.open(ModalAoeUserPanelComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    if (user) {
      modal.componentInstance.user = user;
    }
    modal.result
      .then((result) => {
        if (result && result.id) {
          this._userPanelService
            .put(result)
            .pipe(
              take(1)
            )
            .subscribe((data) => {
              this.handleSuccesResponse('Korisnik je uređen');
            });
        } else {
          this._userPanelService
            .add(result)
            .pipe(
              take(1)
            )
            .subscribe((data) => {
              this.handleSuccesResponse('Korisnik je dodan');
            });
        }
      })
      .catch((reason) => {
        if (user) {
          this.handleModalDismiss('Korisnik nije uređen');
        } else {
          this.handleModalDismiss('Korisnik nije dodan');
        }
      });
  }

  deleteUser(user: IResponseUserPanel): void {
    const modalRef = this._modal.open(ConfirmationModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.title = 'Brisanje korisnika';
    modalRef.componentInstance.description = `Želite li obrisati korisnika ${user.userName}?`;
    modalRef.componentInstance.isDelete = true;
    modalRef.result
      .then((result) => {
        if (result == true) {
          this._userPanelService
            .delete(user.id)
            .pipe(
              take(1)
            )
            .subscribe((data) => {
              this.handleSuccesResponse('Korisnik je obrisan');
            });
        }
      })
      .catch((reason) => {
        this.handleModalDismiss('Korisnik nije obrisan');
      });
  }

  handleSuccesResponse(successMessage: string): void {
    this._spinner.show();
    setTimeout(() => {
      this._spinner.hide();
      this._notificationService.fireSuccessMessage(successMessage);
      this.getUsers();
    }, 500);
  }

  handleModalDismiss(message: string): void {
    this._notificationService.fireWarningMessage(message);
  }

  get entryCount(): number {
    return this.currentEntryCount ?? 0;
  }
  get desiredPage(): number {
    return this.desiredPageOffset + 1;
  }
}
