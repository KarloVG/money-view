import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {baseHref} from '../../../shared/providers/base-href.provider';

import {AccountStatementSummaryListQueryFormComponent} from './account-statement-summary-list-query-form.component';

describe('AccountStatementSummaryListQueryFormComponent', () => {
  let component: AccountStatementSummaryListQueryFormComponent;
  let fixture: ComponentFixture<AccountStatementSummaryListQueryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountStatementSummaryListQueryFormComponent],
      imports: [
        HttpClientTestingModule,
        NgbDatepickerModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        baseHref
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountStatementSummaryListQueryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
