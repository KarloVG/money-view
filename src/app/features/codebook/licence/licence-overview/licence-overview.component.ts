import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, take } from 'rxjs/operators';
import { BasicPaginatedResponse } from 'src/app/shared/basic-paginated-response';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { PageInfo } from 'src/app/shared/page-info';
import { NotificationService } from 'src/app/shared/services/swal-notification/notification.service';
import { ModalAoeLicenceComponent } from '../modal-aoe-licence/modal-aoe-licence.component';
import { IResponseLicence } from '../models/response/response-licence';
import { LicenceService } from '../services/licence.service';
import { FileLikeObject, FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'mv-licence-overview',
  templateUrl: './licence-overview.component.html',
  styleUrls: ['./licence-overview.component.scss'],
})
export class LicenceOverviewComponent implements OnInit {
  /* #region  Variables */
  rows: IResponseLicence[] = [];
  loadingIndicator: boolean = true;
  currentEntryCount!: number;
  desiredPageSize: number = 10;
  desiredPageOffset: number = 0;
  ColumnMode: ColumnMode = ColumnMode.force;
  singleRow!: IResponseLicence;
  isActiveRow: boolean = true;
  activeLicence!: IResponseLicence | null;
  uploader!: FileUploader;
  allowedMimeTypes: string[] = ['text/plain'];
  URL = 'https://file.io/';
  maxFileSize: number = 50 * 1024; // 50kB
  hasDropZoneOver: boolean = false;
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private _licenceService: LicenceService,
    private _notificationService: NotificationService,
    private _modal: NgbModal,
    private _spinner: NgxSpinnerService
  ) { }
  /* #endregion */

  /* #region  Methods */

  ngOnInit(): void {
    this.getLicences();
    this.setUploader();
  }

  public setPage(pageInfo: PageInfo): void {
    this.desiredPageOffset = pageInfo.offset;
    this.desiredPageSize = pageInfo.pageSize;
    this.getLicences();
  }

  // Get all
  getLicences(): void {
    this._licenceService
      .get(this.desiredPageOffset, this.desiredPageSize)
      .pipe(
        take(1),
        map(
          (
            response: IFleksbitResponse<
              BasicPaginatedResponse<IResponseLicence>
            >
          ) => response.response
        )
      )
      .subscribe((res: BasicPaginatedResponse<IResponseLicence>) => {
        this.rows = res.data;
        this.loadingIndicator = false;
        this.currentEntryCount = res.pagination.count;
        this.getLastestActive(res.data);
      });
  }
  // Add or Edit
  addOrEditLicence(singleLicence?: IResponseLicence): void {
    const modal = this._modal.open(ModalAoeLicenceComponent, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
    modal.componentInstance.licence = singleLicence;
    modal.result
      .then((result) => {
        this._licenceService
          .put(result)
          .pipe(
            take(1)
          )
          .subscribe((data) => {
            this.handleSuccesResponse('Licenca je uređena');
          });
      })
      .catch((reason) => {
        this.handleModalDismiss('Licenca nije uređena');
      });
  }

  // Delete
  deleteLicence(licence: IResponseLicence): void {
    const modalRef = this._modal.open(ConfirmationModalComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
    });
    modalRef.componentInstance.title = 'Brisanje licence';
    modalRef.componentInstance.description = `Želite li obrisati ključ licence sa šifrom: ${licence.identifier}?`;
    modalRef.componentInstance.isDelete = true; // text danger
    modalRef.result
      .then((result) => {
        if (result == true) {
          this._licenceService
            .delete(licence.id)
            .pipe(
              take(1)
            )
            .subscribe((data) => {
              this.handleSuccesResponse('Licenca je obrisana');
            });
        }
      })
      .catch((reason) => {
        this.handleModalDismiss('Licenca nije obrisana');
      });
  }

  // 201 - Success
  handleSuccesResponse(successMessage: string): void {
    this._spinner.show();
    // zbog izgleda
    setTimeout(() => {
      this._spinner.hide();
      this._notificationService.fireSuccessMessage(successMessage);
      this.getLicences();
    }, 500);
  }

  // Ngb modal dismiss event
  handleModalDismiss(message: string): void {
    this._notificationService.fireWarningMessage(message);
  }

  fileOverDropzone(e: boolean): void {
    console.log(e)
    this.hasDropZoneOver = e;
  }

  setUploader(): void {
    this.uploader = new FileUploader({
      url: this.URL,
      isHTML5: true,
      maxFileSize: this.maxFileSize,
      allowedMimeType: this.allowedMimeTypes,
      queueLimit: 1
    });
    this.uploader.onWhenAddingFileFailed = (item, filter) => this.onWhenAddingFileFailed(item, filter);
    this.uploader.onAfterAddingFile = () => this.onSuccessItem();
    this.uploader.onBeforeUploadItem = (item) => { item.withCredentials = false; }
  }

  onWhenAddingFileFailed(item: FileLikeObject, filter: any): void {
    switch (filter.name) {
      case 'queueLimit':
        this._notificationService.fireErrorNotification("Moguće je poslati samo 1 datoteku");
        break;
      case 'fileSize':
        this._notificationService.fireErrorNotification(`Datatoteka je premašila maksimalnu veličinu (${item.size} od dopuštenih ${this.maxFileSize})`);
        break;
      case 'mimeType':
        this._notificationService.fireErrorNotification(`Tip datoteke "${item.type}" nije dopušten. Moguće je poslati samo .txt datoteku`);
        break;
      default:
        this._notificationService.fireErrorNotification('Dogodila se nepoznata greška. Kontaktirajte administratora');
    }
  }

  onSuccessItem() {
    this.uploader.queue[0].remove();
    this.handleSuccesResponse('Licenca je uspješno dodana.');
  }

  // Get latest active licence
  getLastestActive(data: IResponseLicence[]): void {
    if (data && data.length) {
      const latest = data.sort((a, b) => {
        console.log(new Date(b.expirationDateTime).getTime());
        return (
          <any>new Date(b.expirationDateTime).getTime() -
          <any>new Date(a.expirationDateTime).getTime()
        );
      });
      if (new Date(latest[0].expirationDateTime) > new Date()) {
        this.activeLicence = latest[0];
      }
    } else {
      this.activeLicence = null;
    }
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
