import { TestBed } from '@angular/core/testing';

import { AccountStatementSummaryService } from './account-statement-summary.service';

describe('AccountStatementSummaryService', () => {
  let service: AccountStatementSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountStatementSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
