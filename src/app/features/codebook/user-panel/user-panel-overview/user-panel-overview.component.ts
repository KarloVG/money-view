import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, take } from 'rxjs/operators';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { NotificationService } from 'src/app/shared/services/swal-notification/notification.service';
import { IRequestCompany } from '../../group-and-company/company/models/request/request-company';
import { IPaginatedResponseCompany, IResponseCompany } from '../../group-and-company/company/models/response/response-company';
import { CompanyService } from '../../group-and-company/company/services/company.service';
import { IRequestUSerPanel } from '../models/request/request-user-panel';
import { IRequestRole } from '../models/request/role-request';
import { IResponseUserPanel } from '../models/response/response-user-panel';
import { UserPanelService } from '../services/user-panel.service';

@Component({
  selector: 'mv-user-panel-overview',
  templateUrl: './user-panel-overview.component.html',
  styleUrls: ['./user-panel-overview.component.scss']
})
export class UserPanelOverviewComponent implements OnInit {

  isSubmitLoaderActive: boolean = false;
  errorMessage: string = '';
  group!: IResponseUserPanel;
  desiredPageSize: number = 150;
  dropDownCompanies: IRequestCompany[] = [];
  @Input() editUser!: IRequestUSerPanel;

  userPanelForm: FormGroup = this._formBuilder.group({
    id: [null],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],  //Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    confirmMail: ['', [Validators.required]],
    company: ['', Validators.required],
    username: ['', [Validators.required, Validators.minLength(4)]],
    role: ['', Validators.required]
  }, { validator: this.checkEmail }
  );

  checkEmail(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.controls.email.value;
  let confirmEmail = group.controls.confirmMail.value;
  return pass === confirmEmail ? group.get('confirmMail')?.setErrors(null) : group.get('confirmMail')?.setErrors({'notSame': true});
}

  roles: IRequestRole[] = [
    {
      id:1,
      name:'Admin'
    },
    {
      id:2,
      name:'Menadžer firme'
    },
    {
      id:3,
      name:'Menadžer grupe'
    }
  ]

  constructor(
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService,
    private _userPanelService: UserPanelService,
    private _spinner: NgxSpinnerService,
    private _companyService: CompanyService,) { }

  ngOnInit(): void {
    if(this.editUser){
      this.userPanelForm.patchValue({
        id:this.editUser.id,
        email:this.editUser.email,
        company:this.editUser.company,
        username:this.editUser.username,
        role:this.editUser.role
      });
    }
    this.getDropdownCompanies();
  }

  getDropdownCompanies(): void{
    this._companyService.getDropdown().pipe(
      take(1),
      map((response: IFleksbitResponse<IPaginatedResponseCompany>) => response.response),
    ).subscribe((res: IPaginatedResponseCompany) => {
      this.dropDownCompanies = res.data;
    })
  }

  resetFormGroup(): void {
    this.userPanelForm.reset();
  }

  onSubmit(): void{
    if(this.userPanelForm.invalid){
      return;
    } else {
      if(this.userPanelForm.dirty) {
        this.isSubmitLoaderActive = true;
        if(this.id?.value) {
          this._userPanelService.put(this.userPanelForm.value).pipe(
            take(1)
          ).subscribe(data => this.handleSuccesResponse("Korisnik je uređen"));
        } else {
          this._userPanelService.add(this.userPanelForm.value).pipe(
            take(1)
          ).subscribe(data => this.handleSuccesResponse("Korisnik je dodan"));
        }
      }
    }
  }

  // 201 - Success
  handleSuccesResponse(successMessage: string): void {
    this._spinner.show();
    // zbog izgleda
    setTimeout(() => {
      this._spinner.hide();
      this._notificationService.fireSuccessMessage(successMessage);
      this.isSubmitLoaderActive = false;
    },500);
  }

  get id(): AbstractControl | null { return this.userPanelForm.get('id'); }
  get email(): AbstractControl | null { return this.userPanelForm.get('email');}
  get confirmMail(): AbstractControl | null { return this.userPanelForm.get('confirmMail');}
  get username(): AbstractControl | null { return this.userPanelForm.get('username'); }
  get role(): AbstractControl | null { return this.userPanelForm.get('role');}
  get company(): AbstractControl | null { return this.userPanelForm.get('company');}

}
