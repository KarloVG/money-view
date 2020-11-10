import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {createAppRoute} from '../../utility/create-app-route';
import {createLoginUrl} from '../../utility/create-login-url';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationStatusService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  isAuthenticated(): Observable<boolean> {
    const url = createAppRoute(['user', 'info']);

    return this.http.get<boolean>(url.toString(), {observe: 'response'})
      .pipe(map((response) => response.ok),
        catchError((err: HttpErrorResponse, caught) => {
          window.location.replace(createLoginUrl().toString());
          return caught;
        })
      );
  }

  isNotAuthenticated(): Observable<boolean> {
    return this.isAuthenticated().pipe(map((x) => !x));
  }

}
