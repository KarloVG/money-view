import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { NotificationService } from 'src/app/shared/services/swal-notification/notification.service';
import { IRequestCompany } from '../../group-and-company/company/models/request/request-company';
import { IRequestUSerPanel } from '../models/request/request-user-panel';
import { IRequestRole } from '../models/request/role-request';
import { UserPanelService } from '../services/user-panel.service';

@Component({
  selector: 'mv-user-panel-overview',
  templateUrl: './user-panel-overview.component.html',
  styleUrls: ['./user-panel-overview.component.scss']
})
export class UserPanelOverviewComponent implements OnInit {

  isSubmitLoaderActive: boolean = false;
  errorMessage: string = '';
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
  let confirmPass = group.controls.confirmMail.value;
  console.log()
  return pass === confirmPass ? null : group.get('confirmMail')?.setErrors({'notSame': true});
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
  companies: IRequestCompany[] = [
    {
      id:1,
      name:"Agrokor"
    },
    {
      id:2,
      name:"Jamnica"
    }
  ]

  constructor(private _formBuilder: FormBuilder,
              private _notificationService: NotificationService,
              private _userPanelService: UserPanelService) { }

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
  }

  onSubmit(){
    if(this.userPanelForm.invalid){
      return
    }else{
      if(this.userPanelForm.dirty) {
        this.isSubmitLoaderActive = true;
        if(this.id) {
          this._userPanelService.put(this.userPanelForm.value).pipe(take(1)).subscribe(
            data => {
              this._notificationService.fireSuccessMessage("Korisnik je uređen");
              this.isSubmitLoaderActive = false;
            },
            err => catchError(err => {
              this.isSubmitLoaderActive = false;
              this.errorMessage = err;
              return EMPTY;
            })
          );
        } else {
          this._userPanelService.put(this.userPanelForm.value).pipe(take(1)).subscribe(
            data => {
              this._notificationService.fireSuccessMessage("Korisnik je dodan");
              this.isSubmitLoaderActive = false;
            },
            err => catchError(err => {
              this.isSubmitLoaderActive = false;
              this.errorMessage = err;
              return EMPTY;
            })
          )
        }
      }
      this._notificationService.fireSuccessMessage("Korisnik je dodan");
    }
  }

  get id(): AbstractControl | null { return this.userPanelForm.get('id'); }
  get email(): AbstractControl | null { return this.userPanelForm.get('email');}
  get confirmMail(): AbstractControl | null { return this.userPanelForm.get('confirmMail');}
  get username(): AbstractControl | null { return this.userPanelForm.get('username'); }
  get role(): AbstractControl | null { return this.userPanelForm.get('role');}
  get company(): AbstractControl | null { return this.userPanelForm.get('company');}

}
