import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable, throwError } from 'rxjs';

import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  userToken = null;

  constructor(public http: HttpClient, private config: ConfigService) { }

  public login(user): Observable<any> {
    return this.http.post<any>(this.config.baseUrl + 'auth/login/admin', JSON.stringify(user), this.httpOptions)
      .pipe(
        map(resp => {
          this.storeToken(resp.token);
          return resp;
        },
        err => console.log(err)
        )
      );
  }

  public logout() {
    this.userToken = null;
    localStorage.removeItem("token");
  }

  public storeToken(token) {
    window.localStorage.setItem('token', JSON.stringify(token));
    this.userToken = token;
  }

  public loadToken() {
    let token = JSON.parse(window.localStorage.getItem('token'));
    return token;
  }

}
