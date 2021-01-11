import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { AppRouteService } from 'src/app/shared/services/route/app-route.service';
import {environment} from '../../../../../../environments/environment';
import { IRequestCompany } from '../models/request/request-company';
import { IPaginatedResponseCompany, IResponseCompany } from '../models/response/response-company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  /* #region  Variables */
  private readonly CONTROLLER_NAME = environment.production ? 'api/api/company' : 'api/company';
  /* #endregion */

 /* #region  Constructor */
  constructor(
    private readonly _http: HttpClient,
    private readonly _appRoute: AppRouteService
  ) { }

  //Get All Dropdown
  getDropdown(): Observable<IFleksbitResponse<IPaginatedResponseCompany>>{
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    const requestParams = new HttpParams({
      fromObject:
      {
        enumerate: "true"
      }
    });
    return this._http.get<IFleksbitResponse<IPaginatedResponseCompany>>(url.toString(), {params: requestParams})
      .pipe(
        tap(data => console.log('Get Dropdown Company', data))
      );
  }
  // Get All
  get(page: number, pageSize: number,): Observable<IFleksbitResponse<IPaginatedResponseCompany>> {
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    const requestParams = new HttpParams({
      fromObject:
        {
          offset: page.toString(),
          pageSize: pageSize.toString()
        }
    });
    return this._http.get<IFleksbitResponse<IPaginatedResponseCompany>>(url.toString(), {params: requestParams})
      .pipe(
        tap(data => console.log('Get Company',data))
      );
  }

  add(formGroup: IRequestCompany): Observable<IResponseCompany>{
    const request = {...formGroup};
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    return this._http.post<IResponseCompany>(url.toString(), request)
      .pipe(
        tap(data => console.log('Add Company', JSON.stringify(data)))
      );
  }

  put(formGroup: IRequestCompany): Observable<IResponseCompany>{
    const request ={...formGroup};
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME, formGroup.id.toString()]);
    return this._http.put<IResponseCompany>(url.toString(), request)
      .pipe(
        tap(data => console.log('Add Company', JSON.stringify(data)))
      );
  }

  delete(id: number): Observable<IResponseCompany>{
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME, id.toString()]);
    return this._http.delete<IResponseCompany>(url.toString())
      .pipe(
        tap(data => console.log('Delete company', JSON.stringify(data)))
      );
  }
}
