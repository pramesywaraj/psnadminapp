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

  public searchVA(vanumber) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.userToken);
    
    return this.http.post<any>(this.config.baseUrl + 'bills/search', vanumber, {headers: headers})
      .pipe(
        map(resp => { 
          return resp;
        },
        err => console.log(err)
        )
      );
  }

  public changeStatus(bill) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.userToken);
    
    return this.http.post<any>(this.config.baseUrl + 'bills/force-update', bill, {headers: headers})
      .pipe(
        map(resp => { 
          return resp;
        },
        err => console.log(err)
        )
      );
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

  public getAllBookers() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.userToken);
    
    return this.http.get<any>(this.config.baseUrl + 'booking/', {headers: headers})
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

  public editAccomodation(accomodation) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.userToken);
    return this.http.put<any>(this.config.baseUrl + 'accommodation', accomodation, {headers: headers})
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

  public downloadAccomodation(): Observable<any> {
    let header = new HttpHeaders();
    header = header.append('Authorization', 'Bearer ' + this.userToken);

    return this.http.get(
      this.config.baseUrl + 'booking/download', {responseType: 'blob', headers: header})
      .pipe(
        map(
          resp => {
            return resp;
          }
        ),
        catchError(err => {
          return throwError(err);
        })
      );
  }
}
