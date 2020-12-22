import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IResponseLicence } from '../models/response/response-licence';

@Component({
  selector: 'mv-modal-aoe-licence',
  templateUrl: './modal-aoe-licence.component.html',
  styleUrls: ['./modal-aoe-licence.component.scss'],
})
export class ModalAoeLicenceComponent implements OnInit {
  /* #region  Variables */
  @Input() licence!: IResponseLicence;
  licenceGroup: FormGroup = this._formBuilder.group({
    id: [null],
    identifier: ['', [Validators.required]],
  });
  /* #endregion */
  /* #region  Constructor */
  constructor(
    private _formBuilder: FormBuilder,
    public _modal: NgbActiveModal
  ) {}
  /* #endregion */

  /* #region  Methods */
  ngOnInit(): void {
    if (this.licence) {
      this.licenceGroup.patchValue({
        id: this.licence.id,
        identifier: this.licence.identifier,
      });
    }
  }

  // Handle form submit
  onSubmit(): void {
    if (this.licenceGroup.invalid) {
      return;
    } else {
      if (this.licenceGroup.dirty) {
        this._modal.close(this.licenceGroup.value);
      } else {
        this._modal.dismiss('cancel');
      }
    }
  }
  /* #endregion */

  /* #region  Abstract controls */
  get identifier(): AbstractControl | null {
    return this.licenceGroup.get('identifier');
  }
  get id(): AbstractControl | null {
    return this.licenceGroup.get('id');
  }
  /* #endregion */
}
