import { Component, OnInit, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContestService } from '../../../services/contest.service';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perlombaan',
  templateUrl: './perlombaan.component.html',
  styleUrls: ['./perlombaan.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class PerlombaanComponent implements OnInit, OnDestroy {

  contest: FormGroup;
  contestList: any = [];
  subscribe: Subscription;

  columnsToDisplay = ['name', 'registrationStatus'];


  constructor(private formBuilder: FormBuilder, private contestService: ContestService, private router: Router) {
    this.contest = this.formBuilder.group(
      {
        name : ["", Validators.required],
        memberPerTeam : ["", Validators.required],
        maxTeam : ["", Validators.required],
        img : ["", Validators.required],
        pricePerStudent : ["", Validators.required],
        registrationStatus : ["open"],        
      }
    );

  }

  ngOnInit() {
    this.subscribe = this.contestService.getContest().subscribe(res => {
      this.contestList = res.contests;
    });

  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  postContest() {
    if(this.contest.valid) {
      this.contestService.postContest(this.contest.value).subscribe(
        res => {
          console.log(res);
          alert('Lomba berhasil ditambahkan.');
          this.contest.reset();
          this.ngOnInit();
        },
        err => {
          console.log(err);
          alert('Lomba gagal ditambahkan');
        }
      );
    } else {
      alert('Form belum terisi dengan benar');
    }
  }

  deleteContest(id) {
    if(confirm('Apakah Anda yakin untuk menghapus lomba ini?' )) {
      this.contestService.deleteContest(id).subscribe(
        res => {
          alert('Lomba berhasil dihapus');
          this.ngOnInit();
        },
        err => {
          console.log(err);
          alert('Lomba gagal dihapus.')
        }
      );
    }

  }

  editContest(item) {
    let data = this.contestList.filter(i => i._id == item._id);
    if(data[0].registrationStatus === 'open') {
      data[0].registrationStatus = 'close';
    } else {
      data[0].registrationStatus = 'open';      
    }

    let newData = {
      "_id" : data[0]._id,
      "name" : data[0].name,
      "memberPerTeam": data[0].memberPerTeam,
	    "maxTeam": data[0].maxTeam,
	    "img": data[0].img,
	    "pricePerStudent": data[0].pricePerStudent,
	    "registrationStatus": data[0].registrationStatus
    }
    
    this.contestService.updateContest(newData).subscribe(
      res => {
        alert('Status berhasil dirubah.');
        this.ngOnInit();
      },
      err => {
        console.log(err);
        alert('Gagal update status');
      }
    );
    
  }

  editContestAll(contest) {
    localStorage.setItem('contestItem', JSON.stringify(contest));
    this.router.navigate(['/admin/editlomba']);
  }

}
