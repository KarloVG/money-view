import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountStatementSummaryService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getQueryForm(): Observable<AccountStatementSummaryForm> {
    const url = 'https://localhost:5011/api/account-statement-summaries/form';
    return this.http.get<AccountStatementSummaryForm>(url);
  }

  test(): void {
    this.http.get('http://localhost:4200').subscribe();
  }
}

export interface WithCsrfToken {
  xCSRFToken: string;
}

export interface AccountStatementSummaryForm extends WithCsrfToken {
  firms: [{ id: string | number, name: string }];
  summaryTypes: [{ id: string | number, name: string }];
  banks: [{ id: string | number, name: string }];
}
