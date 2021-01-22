import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { BasicPaginatedResponse } from 'src/app/shared/basic-paginated-response';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { IResponseBank } from '../../bank/models/response/response-bank';
import { BankService } from '../../bank/services/bank.service';
import { IResponseCompany } from '../../group-and-company/company/models/response/response-company';
import { CompanyService } from '../../group-and-company/company/services/company.service';
import { IResponseAccount } from '../models/response/response-account';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'mv-modal-aoe-account',
  templateUrl: './modal-aoe-account.component.html',
  styleUrls: ['./modal-aoe-account.component.scss'],
})
export class ModalAoeAccountComponent implements OnInit {
  /* #region  Variables */
  @Input() account!: IResponseAccount;
  isSubmitLoaderActive: boolean = false;
  companies!: IResponseCompany[];
  banks!: IResponseBank[];
  bankAndCompany$!: Subscription;
  errorMessage: string = '';

  accountGroup: FormGroup = this._formBuilder.group({
    id: [null],
    companyId: [null, Validators.required],
    bankId: [null, Validators.required],
    iban: ['', [Validators.required, Validators.pattern('^[0-9]{19}$')]],
  });
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private _formBuilder: FormBuilder,
    private _companyService: CompanyService,
    private _bankService: BankService,
    public _modal: NgbActiveModal,
    private _accountService: AccountService
  ) { }
  /* #endregion */

  /* #region  Methods */
  ngOnInit(): void {
    this.bankAndCompany$ = forkJoin([
      this._bankService.getDropdown().pipe(
        take(1),
        map(
          (
            response: IFleksbitResponse<BasicPaginatedResponse<IResponseBank>>
          ) => response.response.data
        )
      ),
      this._companyService.getDropdown().pipe(
        take(1),
        map(
          (
            response: IFleksbitResponse<
              BasicPaginatedResponse<IResponseCompany>
            >
          ) => response.response.data
        )
      ),
    ]).subscribe((results) => {
      this.banks = results[0];
      this.companies = results[1];

      if (this.account) {
        this.accountGroup.patchValue({
          id: this.account.id,
          companyId: this.account.company.id,
          bankId: this.account.id,
          iban: this.account.iban.substring(2),
        });
      }
    });
  }

  onSubmit(): void {
    if (this.accountGroup.invalid) {
      return;
    } else {
      if (this.accountGroup.dirty) {
        if (this.id?.value) {
          this._accountService
            .put(this.accountGroup.value)
            .pipe(take(1))
            .subscribe(
              data => {
                this._modal.close('Račun je uređen');
              },
              err => this.errorMessage = err
            );
        } else {
          this._accountService
            .add(this.accountGroup.value)
            .pipe(take(1))
            .subscribe(
              data => {
                this._modal.close('Račun je dodan');
              },
              err => this.errorMessage = err
            );
        }
      } else {
        this._modal.dismiss('cancel');
      }
    }
  }
  /* #endregion */

  /* #region  Abstract Controls */
  get companyId(): AbstractControl | null {
    return this.accountGroup.get('companyId');
  }
  get bankId(): AbstractControl | null {
    return this.accountGroup.get('bankId');
  }
  get iban(): AbstractControl | null {
    return this.accountGroup.get('iban');
  }
  get id(): AbstractControl | null {
    return this.accountGroup.get('id');
  }
  /* #endregion */
}
