import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, TableColumn } from '@swimlane/ngx-datatable';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { catchError, take } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/services/swal-notification/notification.service';
import { ModalAoeCompanyComponent } from '../modal-aoe-company/modal-aoe-company.component';
import { IResponseCompany } from '../models/response/response-company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'mv-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss']
})
export class CompanyOverviewComponent implements OnInit {

  isSubmitLoaderActive: boolean = false;
  errorMessage: string = '';

  readonly tableColumns: TableColumn[] = [
    {
      name: 'Naziv',
      prop: 'name',
      draggable: false,
      resizeable: false,
      minWidth: 270,
      maxWidth: 320
    },
    {
      name: 'Akcije',
      prop: 'action',
      draggable: false,
      resizeable: false,
      minWidth: 190,
      maxWidth: 250
    }
  ];
  ColumnMode: ColumnMode = ColumnMode.force;

  constructor(
    private _modal: NgbModal,
    private _companyService: CompanyService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  // TODO GET ALL COMPANIES

  addOrEditCompany(editCompany?: IResponseCompany) {
    const modal = this._modal.open(ModalAoeCompanyComponent, { size: 'l', backdrop: 'static' });
    if (editCompany) {
      modal.componentInstance.companyEdit = editCompany
    }
    modal.result.then(result => {
      if (result && result.id) {
        this._companyService.put(result).pipe(take(1)).subscribe(
          data => {
            this._notificationService.fireSuccessMessage("Firma je uređena");
          },
          err => catchError(err => {
            this.errorMessage = err;
            return EMPTY;
          })
        )
      } else {
        this._companyService.add(result).pipe(take(1)).subscribe(
          data => {
            this._notificationService.fireSuccessMessage("Firma je dodana");
          },
          err => catchError(err => {
            this.errorMessage = err;
            return EMPTY;
          })
        )
      }
    }).catch(reason => {
      // todo swift alert warning
      console.log('razlog',reason)
    })
  }

  deleteCompany(companyId: number): void{
    // todo delete
  }

}
