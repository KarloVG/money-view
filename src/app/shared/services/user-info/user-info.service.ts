import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createAppUrl} from '../../utility/create-app-url';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getUserInfo(): Observable<ProfileUserClaims> {
    const url = createAppUrl(['user', 'info']);

    return this.http.get<ProfileUserClaims>(url.toString());
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
