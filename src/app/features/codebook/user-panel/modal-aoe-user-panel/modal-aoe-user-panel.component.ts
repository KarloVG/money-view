import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { BasicPaginatedResponse } from 'src/app/shared/basic-paginated-response';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { IRequestCompany } from '../../group-and-company/company/models/request/request-company';
import { IPaginatedResponseCompany, IResponseCompany } from '../../group-and-company/company/models/response/response-company';
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
  group!: IResponseUserPanel;
  dropDownCompanies: IRequestCompany[] = [];
  @Input() user!: IRequestUserPanel;
  company$!: Subscription;

  userPanelForm: FormGroup = this._formBuilder.group({
    id: [null],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    confirmMail: ['', [Validators.required]],
    company: [''],
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
    public _modal: NgbActiveModal,
    private _companyService: CompanyService,
    private _userPanelService: UserPanelService
  ) { }

  ngOnInit(): void {
    this.getModalData();
  }

  // Get all modal data
  getModalData(): void {
    if (this.user) {
      this.company$ = forkJoin([
        this._companyService.getDropdown().pipe(
          take(1),
          map((response: IFleksbitResponse<BasicPaginatedResponse<IResponseCompany>>) => response.response.data)
        ),
        this._userPanelService.getById(this.user.id).pipe(
          take(1),
          map((response: IFleksbitResponse<IResponseUserPanel>) => response.response)
        )
      ]).subscribe((result) => {
        this.dropDownCompanies = result[0];
        // patch userData
        this.userPanelForm.patchValue({
          id: result[1].id,
          email: result[1].email,
          confirmMail: result[1].email,
          userName: result[1].userName,
          roleNames: this.roles.find(x => x.name == result[1].roleNames[0])?.id ?? 1
        });
        if (result[1].roleNames[0] == "firm-manager") {
          this.company?.setValidators([Validators.required]);
          this.company?.patchValue(result[1].firmId);
          this.company?.updateValueAndValidity();
        }
      });
    } else {
      this._companyService.getDropdown().pipe(
        take(1),
        map((response: IFleksbitResponse<BasicPaginatedResponse<IResponseCompany>>) => response.response.data)
      ).subscribe((result) => {
        this.dropDownCompanies = result;
      });
    }
  }

  // If user is "firm-manager" field Firm must be required
  changeUserRole(event: Event) {
    const selectedValue = (event.target as HTMLOptionElement).value;
    if (selectedValue === "2") {
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
  get confirmMail(): AbstractControl | null { return this.userPanelForm.get('confirmMail'); }
  get userName(): AbstractControl | null { return this.userPanelForm.get('userName'); }
  get roleNames(): AbstractControl | null { return this.userPanelForm.get('roleNames'); }
  get company(): AbstractControl | null { return this.userPanelForm.get('company'); }
}
