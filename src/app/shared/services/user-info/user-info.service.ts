import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiClientService, UserInfoResponse} from '../api-client/api-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private readonly userInfoSubject = new BehaviorSubject<UserInfoResponse | null>(null);
  public readonly userInfo = this.userInfoSubject.asObservable();

  constructor(
    private readonly apiClient: ApiClientService
  ) {
    this.updateUserInfo();
  }

  public updateUserInfo(): void {
    this.apiClient.userInfo().pipe(map((response) => response.body))
      .subscribe((userInfo) => this.userInfoSubject.next(userInfo));
  }

}
