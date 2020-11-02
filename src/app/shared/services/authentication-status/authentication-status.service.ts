import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {App} from '../../app.config';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationStatusService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  isAuthenticated(): Observable<boolean> {
    const url = `${App.Api.rootUrl}/user/info`;

    return this.http.get<boolean>(url.toString(), {observe: 'response', withCredentials: true})
      .pipe(map((response) => response.ok));
  }

  isNotAuthenticated(): Observable<boolean> {
    return this.isAuthenticated().pipe(map((x) => !x));
  }

}
