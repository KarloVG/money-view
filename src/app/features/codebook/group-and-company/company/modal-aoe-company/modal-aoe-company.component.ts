import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { IResponseCompany } from '../models/response/response-company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'mv-modal-aoe-company',
  templateUrl: './modal-aoe-company.component.html',
  styleUrls: ['./modal-aoe-company.component.scss']
})
export class ModalAoeCompanyComponent implements OnInit {

  @Input() companyEdit!: IResponseCompany;
  errorMessage: string = '';

  companyGroup: FormGroup = this._formBuilder.group({
    id: [null],
    oib: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
  });

  constructor(
    private _formBuilder: FormBuilder,
    public _modal: NgbActiveModal,
    private _companyService: CompanyService
  ) { }

  ngOnInit(): void {
    if (this.companyEdit) {
      this.companyGroup.patchValue({
        id: this.companyEdit.id,
        name: this.companyEdit.name,
        oib: this.companyEdit.oib
      });
    }
  }

  onSubmit(): void {
    if (this.companyGroup.invalid) {
      return;
    } else {
      if (this.companyGroup.dirty) {
        if (this.id?.value) {
          this._companyService
            .put(this.companyGroup.value)
            .pipe(take(1))
            .subscribe(
              (data) => {
                this.errorMessage = '';
                this._modal.close('Firma je uređena');
              },
              err => {
                this.errorMessage = err;
              });
        } else {
          this._companyService
            .add(this.companyGroup.value)
            .pipe(take(1))
            .subscribe(
              (data) => {
                this.errorMessage = '';
                this._modal.close('Firma je dodana');
              },
              err => {
                this.errorMessage = err;
              });
        }
      } else {
        this._modal.dismiss();
      }
    }
  }

  get name(): AbstractControl | null { return this.companyGroup.get('name'); }
  get oib(): AbstractControl | null { return this.companyGroup.get('oib'); }
  get id(): AbstractControl | null { return this.companyGroup.get('id'); }
}
