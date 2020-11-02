import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {App} from '../../app.config';
import {backoff} from '../../backoff';
import {debounceTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getUserInfo(): Observable<object> {
    const url = `${App.Api.rootUrl}/user/info`;

    return this.http.get<object>(url.toString(), {withCredentials: true})
      .pipe(
        debounceTime(250),
        backoff(3, 250)
      );
  }

}
