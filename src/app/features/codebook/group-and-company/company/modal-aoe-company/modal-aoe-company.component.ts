import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/services/swal-notification/notification.service';
import { IRequestCompany } from '../models/request/request-company';
import { IResponseCompany } from '../models/response/response-company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'mv-modal-aoe-company',
  templateUrl: './modal-aoe-company.component.html',
  styleUrls: ['./modal-aoe-company.component.scss']
})
export class ModalAoeCompanyComponent implements OnInit {

  @Input() companyEdit!: IResponseCompany;
  @Input() companyAdd!: IResponseCompany;
  @Input() companyId!: number;

  isEdit = true;

  isSubmitLoaderActive: boolean = false;

  companyGroup: FormGroup = this._formBuilder.group({
    id: [null],
    name: ['', [Validators.minLength(3), Validators.maxLength(30)]]
  });

  errorMessage: string = '';
  company$: Observable<IResponseCompany> = this._companyService.company$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  )
  constructor(private _formBuilder: FormBuilder,
              private _modal:NgbActiveModal,
              private _companyService: CompanyService,
              private _notificationService: NotificationService) { }

  ngOnInit(): void {
    if(this.companyEdit){
      this.isEdit = false;
      this.companyGroup.patchValue({
        name: this.companyEdit.name
      });
    }
  }


  onSubmit(): void {
    if (this.companyGroup.invalid) {
      return;
    } else {
      if (this.companyGroup.dirty) {
        this.isSubmitLoaderActive = true;
        if (this.id) {
          this._companyService.put(this.companyGroup.value).pipe(take(1)).subscribe(
            data => {
              // todo: Modify when API comes to play
              this._notificationService.fireSuccessMessage("Firma je uređena");
              this.isSubmitLoaderActive = false;
            },
            err => catchError(err => {
              this.isSubmitLoaderActive = false;
              this.errorMessage = err;
              return EMPTY;
            })
          );
        } else {
          this._companyService.add(this.companyGroup.value).pipe(take(1)).subscribe(
            data => {
              // todo: Modify when API comes to play
              this._notificationService.fireSuccessMessage("Firma je dodana");
              this.isSubmitLoaderActive = false;
            },
            err => catchError(err => {
              this.isSubmitLoaderActive = false;
              this.errorMessage = err;
              return EMPTY;
            })
          );
        }
      }
    }
  }

  exitModal(){
    this._modal.close(false);
  }

  get name(): AbstractControl | null { return this.companyGroup.get('name');}
  get id(): AbstractControl | null { return this.companyGroup.get('id'); }
  

}
