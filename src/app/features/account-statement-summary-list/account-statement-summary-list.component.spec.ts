import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountStatementSummaryListComponent } from './account-statement-summary-list.component';

describe('AccountStatementSummaryListComponent', () => {
  let component: AccountStatementSummaryListComponent;
  let fixture: ComponentFixture<AccountStatementSummaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountStatementSummaryListComponent ]
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
