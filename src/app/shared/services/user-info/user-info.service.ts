import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiClientService, UserInfoResponse} from '../api-client/api-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(
    private readonly apiClient: ApiClientService
  ) {
  }

  public getUserInfo(): Observable<UserInfoResponse | null> {
    return this.apiClient.userInfo().pipe(map((response) => response.body));
  }

}

