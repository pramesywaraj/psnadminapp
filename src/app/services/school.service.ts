import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { retry, catchError, map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  userToken: any;

  constructor(public http: HttpClient, private config: ConfigService) {
    this.userToken = JSON.parse(localStorage.getItem('token'));
  }

  public getSchools() {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get<any>(this.config.baseUrl + 'schools', {headers: headers})
      .pipe(
        map(resp => { 
          return resp;
        },
        err => console.log(err)
        )
      );
  }

  getStudentTeacherBill(schoolId): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.userToken);

    let teacher = this.http.get<any>(this.config.baseUrl + 'teachers/school/' + schoolId, {headers: headers});
    let student = this.http.get<any>(this.config.baseUrl + 'students/school/' + schoolId, {headers: headers});
    let bill = this.http.get<any>(this.config.baseUrl + 'bills/school/' + schoolId, {headers: headers});    

    return forkJoin([teacher, student, bill]);

  }

  // public getTeacher(schoolId) {
  //   let headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Authorization', 'Bearer ' + this.userToken);
  //   return this.http.get<any>(this.config.baseUrl + 'teachers/school/' + schoolId, {headers: headers})
  //     .pipe(
  //       map(resp => { 
  //         return resp;
  //       },
  //       err => console.log(err)
  //       )
  //     );
  // }

  // public getStudent(schoolId) {
  //   let headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.get<any>(this.config.baseUrl + 'students/school/' + schoolId, {headers: headers})
  //     .pipe(
  //       map(resp => { 
  //         return resp;
  //       },
  //       err => console.log(err)
  //       )
  //     );
  // }
}
