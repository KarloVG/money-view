import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, take } from 'rxjs/operators';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { NotificationService } from 'src/app/shared/services/swal-notification/notification.service';
import { IRequestCompany } from '../../group-and-company/company/models/request/request-company';
import { IPaginatedResponseCompany } from '../../group-and-company/company/models/response/response-company';
import { CompanyService } from '../../group-and-company/company/services/company.service';
import { IRequestUserPanel } from '../models/request/request-user-panel';
import { IRequestRole } from '../models/request/role-request';
import { IResponseUserPanel } from '../models/response/response-user-panel';
import { UserPanelService } from '../services/user-panel.service';

@Component({
  selector: 'mv-user-user-overview',
  templateUrl: './modal-aoe-user-panel.component.html',
  styleUrls: ['./modal-aoe-user-panel.component.scss']
})
export class ModalAoeUserPanelComponent implements OnInit {

  isSubmitLoaderActive: boolean = false;
  errorMessage: string = '';
  group!: IResponseUserPanel;
  dropDownCompanies: IRequestCompany[] = [];
  @Input() user!: IRequestUserPanel;

  userPanelForm: FormGroup = this._formBuilder.group({
    id: [null],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    confirmMail: ['', [Validators.required]],
    company: ['', Validators.required],
    userName: ['', [Validators.required, Validators.minLength(4), Validators.pattern("^[a-zA-Z0-9\S._@+-]{4,}$")]],
    roleNames: ['', Validators.required]
  }, { validator: this.checkEmail }
  );

  checkEmail(group: FormGroup) {
    let pass = group.controls.email.value;
    let confirmEmail = group.controls.confirmMail.value;
    return pass === confirmEmail ? group.get('confirmMail')?.setErrors(null) : group.get('confirmMail')?.setErrors({ 'notSame': true });
  }

  roles: IRequestRole[] = [
    {
      id: 1,
      name: 'Admin'
    },
    {
      id: 2,
      name: 'Menadžer firme'
    },
    {
      id: 3,
      name: 'Menadžer grupe'
    }
  ]

  constructor(
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService,
    public _modal: NgbActiveModal,
    private _userPanelService: UserPanelService,
    private _spinner: NgxSpinnerService,
    private _companyService: CompanyService,) { }

  ngOnInit(): void {
    if (this.user) {
      this.userPanelForm.patchValue({
        id: this.user.id,
        email: this.user.email,
        company: this.user.company,
        userName: this.user.userName,
        roleNames: this.user.role
      });
    }
    this.getDropdownCompanies();
  }

  changeUserRole(event: any) {
    if (event && event?.target?.value === "2") {
      this.company?.setValidators([Validators.required]);
      this.company?.updateValueAndValidity();
    } else {
      if (this.checkIfValidators(this.company)) {
        this.company?.clearValidators();
        this.company?.updateValueAndValidity();
      }
    }
  }

  checkIfValidators(abstractControl: AbstractControl | null) {
    if (abstractControl?.validator) {
      const validator = abstractControl.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    return false
  }

  getDropdownCompanies(): void {
    this._companyService.getDropdown().pipe(
      take(1),
      map((response: IFleksbitResponse<IPaginatedResponseCompany>) => response.response),
    ).subscribe((res: IPaginatedResponseCompany) => {
      this.dropDownCompanies = res.data;
    })
  }


  onSubmit(): void {
    if (this.userPanelForm.invalid) {
      return;
    } else {
      if (this.userPanelForm.dirty) {
        this._modal.close(this.userPanelForm.value);
      } else {
        this._modal.dismiss('cancel');
      }
    }
  }

  get id(): AbstractControl | null { return this.userPanelForm.get('id'); }
  get email(): AbstractControl | null { return this.userPanelForm.get('email'); }
  get confirmMail(): AbstractControl | null { return this.userPanelForm.get('confirmMail');}
  get userName(): AbstractControl | null { return this.userPanelForm.get('userName'); }
  get roleNames(): AbstractControl | null { return this.userPanelForm.get('roleNames'); }
  get company(): AbstractControl | null { return this.userPanelForm.get('company'); }

}