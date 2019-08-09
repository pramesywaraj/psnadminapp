import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable, throwError } from 'rxjs';

import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccomodationService {
  userToken: any;

  constructor(public http: HttpClient, private config: ConfigService) {
    this.userToken = JSON.parse(localStorage.getItem('token'));
  }

  public getAccomodations() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get<any>(this.config.baseUrl + 'accommodation', {headers: headers})
      .pipe(
        map(resp => { 
          return resp;
        },
        err => console.log(err)
        )
      );
  }

  public postAccomodation(accomodation) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.userToken);
    return this.http.post<any>(this.config.baseUrl + 'accommodation', accomodation, {headers: headers})
      .pipe(
        map(resp => {
          return resp;
        },
        err => console.log(err)
        )
      );
  }

  public deleteAccomodation(id) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.userToken);

    return this.http.delete<any>(this.config.baseUrl + 'accommodation/' + id, {headers: headers})
      .pipe(
        map(resp => {
          return resp;
        },
        err => console.log(err)
        )
      );
  }
}
