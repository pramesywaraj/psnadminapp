import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable, throwError } from 'rxjs';

import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  userToken: any;

  constructor(public http: HttpClient, private config: ConfigService) {
    this.userToken = JSON.parse(localStorage.getItem('token'));
  }

  public getContest() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get<any>(this.config.baseUrl + 'contests', {headers: headers})
      .pipe(
        map(resp => { 
          return resp;
        },
        err => console.log(err)
        )
      );
  }

  public editContest(contest) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.userToken);
    return this.http.put<any>(this.config.baseUrl + 'contests', contest, {headers: headers})
      .pipe(
        map(resp => { 
          return resp;
        },
        err => console.log(err)
        )
      );
  }

  public postContest(contest) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.userToken);
    return this.http.post<any>(this.config.baseUrl + 'contests', contest, {headers: headers})
      .pipe(
        map(resp => {
          return resp;
        },
        err => console.log(err)
        )
      );
  }

  public deleteContest(id) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.userToken);

    return this.http.delete<any>(this.config.baseUrl + 'contests/' + id, {headers: headers})
      .pipe(
        map(resp => {
          return resp;
        },
        err => console.log(err)
        )
      );
  }

  public updateContest(contest) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.userToken);

    return this.http.put<any>(this.config.baseUrl + 'contests/', contest,{headers: headers})
      .pipe(
        map(resp => {
          return resp;
        },
        err => console.log(err)
        )
      );
  }

  public contestDownload(contestId): Observable<any> {
    let header = new HttpHeaders();
    header = header.append('Authorization', 'Bearer ' + this.userToken);

    return this.http.get(
      this.config.baseUrl + 'teams/excel/contest/' + contestId, {responseType: 'blob', headers: header})
      .pipe(
        map(
          resp => {
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the store service and orderListDownload function...', err);
          return throwError(err);
        })
      );
  }


}
