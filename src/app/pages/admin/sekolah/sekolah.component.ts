import { Component, OnInit, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormGroup } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { SchoolService } from '../../../services/school.service';

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
    this.schoolService.getStudentTeacher(schoolId).subscribe(
      res => {
        this.teacherList = res[0].teachers;
        this.studentList = res[1].students;

        console.log(this.teacherList);
        console.log(this.studentList);        
      }, err => {
        console.log(err);
      });
  }

}
