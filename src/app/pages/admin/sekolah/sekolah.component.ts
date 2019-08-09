import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
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
export class SekolahComponent implements OnInit {

  subscribe: Subscription;
  schoolList: any = [];

  constructor(private schoolService: SchoolService) { }

  ngOnInit() {
    this.subscribe = this.schoolService.getSchool().subscribe(res => {
      this.schoolList = res.schools;
    });
  }

}
