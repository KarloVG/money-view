import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, take, tap } from 'rxjs/operators';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { NotificationService } from 'src/app/shared/services/swal-notification/notification.service';
import { IResponseGroup } from '../models/response/response-group';
import { GroupService } from '../services/group.service';
import { slideInUp } from 'ng-animate';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'mv-group-overview',
  templateUrl: './group-overview.component.html',
  styleUrls: ['./group-overview.component.scss'],
  animations: [
    trigger('slideInUp', [transition('* => *', useAnimation(slideInUp, {
      params: { timing: 0.5 }
    }))])
  ]
})
export class GroupOverviewComponent implements OnInit {

  /* #region  Variables*/
  isSubmitLoaderActive: boolean = false;
  groupForm: FormGroup = this._formBuilder.group({
      id: [null],
      name: ['', [Validators.minLength(3), Validators.maxLength(30)]]
    });
  group!: IResponseGroup;
  errorMessage: string = '';
  isEditActive: boolean = false;
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private _groupService: GroupService,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService,
    private _spinner: NgxSpinnerService
  ) {}
  /* #endregion */

  /* #region  Methods */
  ngOnInit(): void { this.getGroup() }

  onSubmit(): void {
    if(this.groupForm.invalid) {
      return;
    } else {
      if(this.groupForm.dirty) {
        this.isSubmitLoaderActive = true;
        if(this.id?.value) {
          this._groupService.put(this.groupForm.value).pipe(
            take(1)
          ).subscribe(data =>  this.handleSuccesResponse("Grupa je uređena"));
        } else {
          this._groupService.add(this.groupForm.value).pipe(
            take(1)
          ).subscribe(data =>  this.handleSuccesResponse("Grupa je dodana"));
        }
      }
    }
  }

  // Get all
  getGroup(): void {
    this._groupService.get().pipe(
        tap(data => {
          if(data.response) {
            this.groupForm.patchValue({
              id: data.response.id,
              name: data.response.name
            })
          }
        }),
        map((response: IFleksbitResponse<IResponseGroup>) => this.group = response.response),
        take(1)
      ).subscribe((data: IResponseGroup) => {});
  }

  // 201 - Success
  handleSuccesResponse(successMessage: string): void {
    this._spinner.show();
    // zbog izgleda
    setTimeout(() => {
      this._spinner.hide();
      this._notificationService.fireSuccessMessage(successMessage);
      this.isSubmitLoaderActive = false;
      this.isEditActive = false;
      this.getGroup();
    },500);
  }

  // Close edit group
  closeEdit() {
    this.isEditActive = false;
    this.groupForm.patchValue({
      id: this.group.id,
      name: this.group.name
    });
  }

  /* #endregion */

   /* #region  Abstract controls */
  get id(): AbstractControl | null { return this.groupForm.get('id'); }
  get name(): AbstractControl | null { return this.groupForm.get('name'); }
  /* #endregion */
}
