import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {baseHref} from '../../shared/providers/base-href.provider';
import {AccountStatementSummaryListQueryFormModule} from './account-statement-summary-list-query-form/account-statement-summary-list-query-form.module';

import {AccountStatementSummaryListComponent} from './account-statement-summary-list.component';

describe('AccountStatementSummaryListComponent', () => {
  let component: AccountStatementSummaryListComponent;
  let fixture: ComponentFixture<AccountStatementSummaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountStatementSummaryListComponent],
      imports: [
        HttpClientTestingModule,
        AccountStatementSummaryListQueryFormModule
      ],
      providers: [
        baseHref
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountStatementSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
