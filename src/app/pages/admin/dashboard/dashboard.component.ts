import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../../services/school.service';

import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public school: SchoolService) { }

  ngOnInit() {
  }

  downloadTeachers() {
    let today = new Date();
    var day = today.getDate();
    var month = today.getMonth();

    this.school.downloadTeachers().subscribe(data => 
      {
        FileSaver.saveAs(data, "Data_Daftar_Guru_Pendamping_PSN2019_" + day + "-" + month + "-" + "2019");
      },
      err => {
        console.log('err', err);
      }
    );
  }

  

}
