import { Component, OnInit, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormGroup } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { SchoolService } from '../../../services/school.service';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-sekolah',
  templateUrl: './sekolah.component.html',
  styleUrls: ['./sekolah.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SekolahComponent implements OnInit, OnDestroy {

  subscribe: Subscription;
  schoolList: any = [];

  studentList: any = [];
  teacherList: any = [];
  billList: any = [];  
  
  studentCol = ['name', 'phone', 'email'];
  teacherCol = ['name', 'NIP', 'phone', 'email'];
  billCol = ['type', 'VANumber', 'registration', 'totalPrice', 'payment'];  
  columnsToDisplay = ['name', 'phone'];


  constructor(private schoolService: SchoolService) { }

  ngOnInit() {
    this.subscribe = this.schoolService.getSchools().subscribe(res => {
      this.schoolList = res.schools;
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  getStudentTeacher(schoolId) {
    this.schoolService.getStudentTeacherBill(schoolId).subscribe(
      res => {
        this.teacherList = res[0].teachers;
        this.studentList = res[1].students;
        this.billList = res[2].bills;        

        console.log(this.teacherList);
        console.log(this.studentList);
        console.log(this.billList);                
      }, err => {
        console.log(err);
      });
  }
}
