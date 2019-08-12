import { Component, OnInit, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContestService } from '../../../../services/contest.service';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-lomba',
  templateUrl: './edit-lomba.component.html',
  styleUrls: ['./edit-lomba.component.scss']
})
export class EditLombaComponent implements OnInit, OnDestroy {

  contest: FormGroup;
  subscribe: Subscription;
  contestItem: any;

  constructor(private formBuilder: FormBuilder, private contestService: ContestService, private router: Router) { 
    this.contestItem = JSON.parse(localStorage.getItem('contestItem'));
    this.contest = this.formBuilder.group(
      {
        _id: [this.contestItem._id],
        name : [this.contestItem.name, Validators.required],
        memberPerTeam : [this.contestItem.memberPerTeam, Validators.required],
        maxTeam : [this.contestItem.maxTeam, Validators.required],
        img : [this.contestItem.img, Validators.required],
        pricePerStudent : [this.contestItem.pricePerStudent, Validators.required],
        registrationStatus : ["open"],        
      }
    );
  }

  ngOnInit() {
    console.log(this.contestItem);
  }

  ngOnDestroy() {
    localStorage.removeItem('contestItem');
  }

  editContest() {
    if(this.contest.valid) {
      this.subscribe = this.contestService.editContest(this.contest.value).subscribe((res) => {
        console.log(res);
        alert(res.message);
        this.router.navigate(['/admin/perlombaan']);
      },
        err => {
          console.log(err);
          alert('Gagal mengedit lomba');
        }
      )
    } else {
      alert('Harap isi form yang belum terisi!');
    }
  }



}
