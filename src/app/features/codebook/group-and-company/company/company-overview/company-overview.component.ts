import { AnimationDriver } from '@angular/animations/browser';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, TableColumn } from '@swimlane/ngx-datatable';
import { ModalAoeCompanyComponent } from '../modal-aoe-company/modal-aoe-company.component';
import { IResponseCompany } from '../models/response/response-company';

@Component({
  selector: 'mv-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss']
})
export class CompanyOverviewComponent implements OnInit {

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
  ]

  ColumnMode: ColumnMode = ColumnMode.force
  constructor(private _modal: NgbModal) { }

  ngOnInit(): void {
  }

  addCompany(): void{
    this._modal.open(ModalAoeCompanyComponent, {size:'l', backdrop:'static'});
  }

  editCompany(editCompany: IResponseCompany): void{
    const modal = this._modal.open(ModalAoeCompanyComponent, {size:'l', backdrop:'static'});
    modal.componentInstance.companyEdit = editCompany;
    console.log('Editiranje', editCompany)
  }
  deleteCompany(companyId: number): void{
    const modal = this._modal.open(ModalAoeCompanyComponent)
    modal.componentInstance.companyId = companyId;
    console.log('Brisanje',companyId)
  }

}
