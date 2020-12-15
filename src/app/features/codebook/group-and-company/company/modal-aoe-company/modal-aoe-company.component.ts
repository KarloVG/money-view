import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IResponseCompany } from '../models/response/response-company';

@Component({
  selector: 'mv-modal-aoe-company',
  templateUrl: './modal-aoe-company.component.html',
  styleUrls: ['./modal-aoe-company.component.scss']
})
export class ModalAoeCompanyComponent implements OnInit {

  @Input() companyEdit!: IResponseCompany;
  @Input() companyAdd!: IResponseCompany;
  @Input() companyId!: number;

  isSubmitLoaderActive: boolean = false;

  companyGroup: FormGroup = this._formBuilder.group({
    id: [null],
    oib: ['', [Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],
    name: ['', [Validators.minLength(3), Validators.maxLength(30)]]
  });

  constructor(private _formBuilder: FormBuilder,
              public _modal:NgbActiveModal) { }

  ngOnInit(): void {
    this.oib?.valueChanges.subscribe(x => {console.log(this.oib)});
    if(this.companyEdit){
      this.companyGroup.patchValue({
        id:this.companyEdit.id,
        name: this.companyEdit.name,
        oib: this.companyEdit.oib
      });
    }
  }

  onSubmit(): void {
    if (this.companyGroup.invalid) {
      return;
    }else{
      if(this.companyGroup.dirty){
        this._modal.close(this.companyGroup.value);
      } else {
        this._modal.dismiss('cancel');
      }
    }
  }

  get name(): AbstractControl | null { return this.companyGroup.get('name');}
  get oib(): AbstractControl | null { return this.companyGroup.get('oib');}
  get id(): AbstractControl | null { return this.companyGroup.get('id'); }
}
