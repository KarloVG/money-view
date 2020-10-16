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
    const url = 'https://localhost:5021/api/AccountStatementSummaries/Form?userId=1';
    return this.http.get<AccountStatementSummaryForm>(url);
  }

  test(): void {
    this.getQueryForm().subscribe((x) => console.log(x));
  }
}

export interface AccountStatementSummaryForm {
  firms: [{ id: string | number, name: string }];
  summaryTypes: [{ id: string | number, name: string }];
  banks: [{ id: string | number, name: string }];
}
