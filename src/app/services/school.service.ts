import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  userToken: any;

  constructor(public http: HttpClient, private config: ConfigService) {
    this.userToken = JSON.parse(localStorage.getItem('token'));
  }

  public getContest() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get<any>(this.config.baseUrl + 'schools', {headers: headers})
      .pipe(
        map(resp => { 
          return resp;
        },
        err => console.log(err)
        )
      );
  }
}
