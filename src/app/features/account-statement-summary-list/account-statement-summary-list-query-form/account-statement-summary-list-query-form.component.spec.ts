import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountStatementSummaryListQueryFormComponent } from './account-statement-summary-list-query-form.component';

describe('AccountStatementSummaryListQueryFormComponent', () => {
  let component: AccountStatementSummaryListQueryFormComponent;
  let fixture: ComponentFixture<AccountStatementSummaryListQueryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountStatementSummaryListQueryFormComponent ]
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
