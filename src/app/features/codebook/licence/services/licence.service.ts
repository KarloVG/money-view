import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileItem } from 'ng2-file-upload';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BasicPaginatedResponse } from 'src/app/shared/basic-paginated-response';
import { IFleksbitResponse } from 'src/app/shared/models/fleksbit-response';
import { AppRouteService } from 'src/app/shared/services/route/app-route.service';
import { environment } from 'src/environments/environment';
import { IRequestLicence } from '../models/request/request-licence';
import { IResponseActiveLicence } from '../models/response/response-active-licence';
import { IResponseLicence } from '../models/response/response-licence';
import { IResponseLicenceUpload } from '../models/response/response-licence-upload';

@Injectable({
  providedIn: 'root',
})
export class LicenceService {
  /* #region  Variables */
  private readonly CONTROLLER_NAME = environment.production
    ? 'api/api/licenses'
    : 'api/licenses';
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private readonly _http: HttpClient,
    private readonly _appRoute: AppRouteService
  ) { }
  /* #endregion */

  /* #region  Methods */

  // Get All
  get(
    page: number,
    pageSize: number
  ): Observable<IFleksbitResponse<BasicPaginatedResponse<IResponseLicence>>> {
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    const requestParams = new HttpParams({
      fromObject: {
        offset: page.toString(),
        pageSize: pageSize.toString(),
      },
    });
    return this._http
      .get<IFleksbitResponse<BasicPaginatedResponse<IResponseLicence>>>(
        url.toString(),
        {
          params: requestParams,
        }
      )
      .pipe(
        tap((data) => console.log('Get Licence', data))
      );
  }

  // Add
  add(formGroup: IResponseLicence): Observable<IRequestLicence> {
    const request = {
      id: formGroup.id,
      key: formGroup.identifier,
    };
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    return this._http.post<IRequestLicence>(url.toString(), request).pipe(
      tap((data) => console.log('Add Licence', JSON.stringify(data)))
    );
  }

  // Edit
  put(formGroup: IResponseLicence): Observable<IRequestLicence> {
    const request = {
      key: formGroup.identifier,
    };
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    return this._http.put<IRequestLicence>(url.toString(), request).pipe(
      tap((data) => console.log('Put Licence', JSON.stringify(data)))
    );
  }

  // Delete
  delete(id: number): Observable<IResponseLicence> {
    const url = this._appRoute.createAppRouteURL([
      this.CONTROLLER_NAME,
      id.toString(),
    ]);
    return this._http.delete<IResponseLicence>(url.toString()).pipe(
      tap((data) => console.log('Delete Licence', JSON.stringify(data)))
    );
  }

  // Get latest active
  getLatest(): Observable<IFleksbitResponse<IResponseActiveLicence>> {
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME, 'active']);
    return this._http.get<IFleksbitResponse<IResponseActiveLicence>>(url.toString()).pipe(
      catchError(err =>
        of({
          code: 200, error: null, response: {
            isActive: false,
            expirationDate: '',
            expirationDays: 0,
            isValid: false,
            licenseIdentifier: ''
          }
        })
      )
    );
  }

  uploadLicence(file: FileItem, key: string): Observable<IFleksbitResponse<IResponseLicenceUpload>> {
    const url = this._appRoute.createAppRouteURL([this.CONTROLLER_NAME]);
    const formData = new FormData();
    formData.append('LicenseFile', file.file.rawFile);
    formData.append('Key', key);
    // file to small for this logic...
    // file.inProgress = true;
    return this._http.post<IFleksbitResponse<IResponseLicenceUpload>>(url.toString(), formData
      // {
      //   reportProgress: true,
      //   observe: 'events'
      // }
    )
    // .pipe(
    // map(event => {
    //   switch (event.type) {
    //     case HttpEventType.UploadProgress:
    //       file.progress = Math.round(event.loaded * 100 / event.total);
    //       break;
    //     case HttpEventType.Response:
    //       return event;
    //   }
    // })
  }

  /* #endregion */
}
