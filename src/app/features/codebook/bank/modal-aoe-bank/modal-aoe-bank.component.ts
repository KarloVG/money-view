import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IResponseBank } from '../models/response/response-bank';

@Component({
  selector: 'mv-modal-aoe-bank',
  templateUrl: './modal-aoe-bank.component.html',
  styleUrls: ['./modal-aoe-bank.component.scss'],
})
export class ModalAoeBankComponent implements OnInit {
  /* #region  Variables */
  @Input() bank!: IResponseBank;
  isSubmitLoaderActive: boolean = false;

  bankGroup: FormGroup = this._formBuilder.group({
    id: [null],
    tag: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(8)],
    ],
    vbdi: [
      '',
      [
        Validators.minLength(7),
        Validators.maxLength(7),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
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
    if (this.bank) {
      this.bankGroup.patchValue({
        id: this.bank.id,
        name: this.bank.name,
        vbdi: this.bank.vbdi,
        tag: this.bank.tag,
      });
    }
  }

  onSubmit(): void {
    if (this.bankGroup.invalid) {
      return;
    } else {
      if (this.bankGroup.dirty) {
        console.log(this.bankGroup);
        this._modal.close(this.bankGroup.value);
      } else {
        this._modal.dismiss('cancel');
      }
    }
  }
  /* #endregion */

  /* #region  Abstract Controls */
  get name(): AbstractControl | null {
    return this.bankGroup.get('name');
  }
  get vbdi(): AbstractControl | null {
    return this.bankGroup.get('vbdi');
  }
  get tag(): AbstractControl | null {
    return this.bankGroup.get('tag');
  }
  get id(): AbstractControl | null {
    return this.bankGroup.get('id');
  }
  /* #endregion */
}
