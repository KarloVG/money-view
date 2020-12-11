import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppRouteService } from 'src/app/shared/services/route/app-route.service';
import { NotificationService } from 'src/app/shared/services/swal-notification/notification.service';
import { IRequestCompany } from '../models/request/request-company';
import { IResponseCompany } from '../models/response/response-company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private readonly CONTROLLER_NAME = 'api/company';
  // All products
  company$: Observable<IResponseCompany> = this.get();
 /* #endregion */

 /* #region  Constructor */
  constructor(
    private readonly _http: HttpClient,
    private readonly _appRoute: AppRouteService,
    private readonly _notificationService: NotificationService
  ) { }

  private get(): Observable<IResponseCompany> {
    return this._http.get<IResponseCompany>(this.CONTROLLER_NAME)
      .pipe(
        tap(data => console.log('Get Company', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  add(formGroup: IRequestCompany): Observable<IResponseCompany>{
    const request = {...formGroup};
    return this._http.post<IResponseCompany>(this.CONTROLLER_NAME, request)
      .pipe(
        tap(data => console.log('Add Company', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  put(formGroup: IRequestCompany): Observable<IResponseCompany>{
    const request ={...formGroup};
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME, formGroup.id.toString()]);
    return this._http.put<IResponseCompany>(url.toString(), request)
      .pipe(
        tap(data => console.log('Add Company', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  delete(id: number): Observable<IResponseCompany>{
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME, id.toString()]);
    return this._http.delete<IResponseCompany>(url.toString())
      .pipe(
        tap(data => console.log('Delete company', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

   // Remove before production
 private handleError(err: any): Observable<never> {
  // instead of logging infrastructore on BE, just log it to the console
  let errorMessage: string;
  if (err.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    errorMessage = `Došlo je do frontend pogreške: ${err.error.message}`;
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    errorMessage = `Došlo je do backend pogreške ${err.status}: ${err.body.error}`;
  }
  this._notificationService.fireErrorNotification(errorMessage)
  return throwError(errorMessage);
}


}
