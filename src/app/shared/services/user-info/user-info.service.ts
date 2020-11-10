import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createAppRoute} from '../../utility/create-app-route';
import {catchError} from 'rxjs/operators';
import {createLoginUrl} from '../../utility/create-login-url';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getUserInfo(): Observable<ProfileUserClaims> {
    const url = createAppRoute(['user', 'info']);

    return this.http.get<ProfileUserClaims>(url.toString())
      .pipe(
        catchError((err: HttpErrorResponse, caught) => {
          window.location.replace(createLoginUrl().toString());
          return caught;
        })
      );
  }

}

export interface ProfileUserClaims {
  readonly name?: string;
  readonly family_name?: string;
  readonly given_name?: string;
  readonly middle_name?: string;
  readonly nickname?: string;
  readonly preferred_username?: string;
  readonly profile?: string;
  readonly picture?: string;
  readonly website?: string;
  readonly gender?: string;
  readonly birthdate?: string;
  readonly zoneinfo?: string;
  readonly locale?: string;
  readonly updated_at?: string;
}
