import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/services/swal-notification/notification.service';
import { IResponseGroup } from '../models/response/response-group';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'mv-group-overview',
  templateUrl: './group-overview.component.html',
  styleUrls: ['./group-overview.component.scss']
})
export class GroupOverviewComponent implements OnInit {

  /* #region  Variables*/
  isSubmitLoaderActive: boolean = false;
  groupForm: FormGroup = this._formBuilder.group({
      id: [null],
      name: ['', [Validators.minLength(3), Validators.maxLength(30)]]
    });;

  errorMessage: string = '';
  group$: Observable<IResponseGroup> = this._groupService.group$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private _groupService: GroupService,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService
    ) {}
  /* #endregion */

  /* #region  Methods */
  ngOnInit(): void { }

  onSubmit(): void {
    if(this.groupForm.invalid) {
      return;
    } else {
      if(this.groupForm.dirty) {
        this.isSubmitLoaderActive = true;
        if(this.id) {
          this._groupService.put(this.groupForm.value).pipe(take(1)).subscribe(
            data => {
              // todo: Modify when API comes to play
              this._notificationService.fireSuccessMessage("Grupa je uređena");
              this.isSubmitLoaderActive = false;
            },
            err => catchError(err => {
              this.isSubmitLoaderActive = false;
              this.errorMessage = err;
              return EMPTY;
            })
          );
        } else {
          this._groupService.put(this.groupForm.value).pipe(take(1)).subscribe(
            data => {
              // todo: Modify when API comes to play
              this._notificationService.fireSuccessMessage("Grupa je dodana");
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
  /* #endregion */

   /* #region  Abstract controls */
  get id(): AbstractControl | null { return this.groupForm.get('id'); }
  get name(): AbstractControl | null { return this.groupForm.get('name'); }
  /* #endregion */
}
