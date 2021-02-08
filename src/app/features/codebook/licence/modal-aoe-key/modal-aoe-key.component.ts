import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'mv-modal-aoe-key',
  templateUrl: './modal-aoe-key.component.html',
  styleUrls: ['./modal-aoe-key.component.scss']
})
export class ModalAoeKeyComponent implements OnInit {

  /* #region  Variables */
  keyGroup!: FormGroup;
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private _formBuilder: FormBuilder,
    public _modal: NgbActiveModal
  ) { }
  /* #endregion */

  /* #region  Public methods */
  ngOnInit(): void {
    this.keyGroup = this._formBuilder.group({
      keyID: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.keyGroup.invalid) {
      return;
    } else {
      if (this.keyGroup.dirty) {
        this._modal.close(this.keyID?.value);
      } else {
        this._modal.dismiss('cancel');
      }
    }
  }
  /* #endregion */

  /* #region  Getters */
  get keyID(): AbstractControl | null {
    return this.keyGroup.get('keyID');
  }
  /* #endregion */
}
