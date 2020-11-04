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

  getUserInfo(): Observable<object> {
    const url = createAppUrl(['user', 'info']);

    return this.http.get<object>(url.toString());
  }

}
