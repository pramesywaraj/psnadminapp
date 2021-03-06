import { Component, OnInit, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccomodationService } from '../../../services/accomodation.service';


import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-penginapan',
  templateUrl: './penginapan.component.html',
  styleUrls: ['./penginapan.component.scss'],
  providers: [DatePipe],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class PenginapanComponent implements OnInit, OnDestroy {

  columnsToDisplay = ['name', 'quota', 'pricePerNight', 'bookingAmount', 'delete', 'edit'];
  accomodationList: any = [];
  bookersList: any = [];

  teacherBookers: any = [];
  studentBookers: any = [];

  nameUpdate: string;
  quotaUpdate: number;
  priceUpdate: number;
  
  subscribe: Subscription;
  subscribe2: Subscription;  

  accomodation : FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private accomodationService: AccomodationService, private datePipe: DatePipe) {
    this.accomodation = this.formBuilder.group(
      {
        name : ["", Validators.required],
        quota : ["", Validators.required],
        pricePerNight : ["", Validators.required],
        startDate: ["", Validators.required],
        endDate: ["", Validators.required],
      }
    );
  }

  async ngOnInit() {
    this.subscribe = await this.accomodationService.getAccomodations().subscribe(res => {
      this.accomodationList = res.accommodations;
      console.log(res);
    });

    this.subscribe2 = await this.accomodationService.getAllBookers().subscribe(res => {
      let tempBookers = res.bookings;
      tempBookers.forEach(element => {
        this.bookersSelection(element);
      });
    });

    console.log(this.teacherBookers);
  }

  bookersSelection(booker) {
    if(booker.userType === 'teacher') 
      this.teacherBookers.push(booker);
    else 
      this.studentBookers.push(booker);
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
    this.subscribe2.unsubscribe();
    
  }

  postAccomodation() {
    const temp = this.accomodation.value;
    temp.startDate = this.datePipe.transform(temp.startDate, 'MM-dd-yyyy');
    temp.endDate = this.datePipe.transform(temp.endDate, 'MM-dd-yyyy');    
    if(this.accomodation.valid) {
      this.accomodationService.postAccomodation(this.accomodation.value).subscribe(
        res => {
          console.log(res);
          alert('Paket penginapan berhasil ditambahkan.');
          this.accomodation.reset();
          this.ngOnInit();
        },
        err => {
          console.log(err);
          alert('Paket penginapan gagal ditambahkan');
        }
      );
    } else {
      alert('Form belum terisi dengan benar');
    }
  }

  editAccomodation(el) {
    let temp = el;
    delete temp.bookingAmount;
    delete temp.endDate;
    delete temp.reservedQuota;
    delete temp.startDate;
    delete temp.__v;

    console.log(temp);

    this.accomodationService.editAccomodation(temp).subscribe(
      res => {
        alert('Paket berhasil diupdate');
        this.ngOnInit();
      },
      err => {
        console.log(err);
        alert('Paket gagal dupdate.')
      }
    );
  }

  deleteAccomodation(id) {
    if(confirm('Apakah Anda yakin untuk menghapus paket ini?' )) {
      this.accomodationService.deleteAccomodation(id).subscribe(
        res => {
          alert('Paket berhasil dihapus');
          this.ngOnInit();
        },
        err => {
          console.log(err);
          alert('Paket gagal dihapus.')
        }
      );
    }
  }

  public downloadAccomodationData() {
    let today = new Date();
    var day = today.getDate();
    var month = today.getMonth();

    this.accomodationService.downloadAccomodation().subscribe(data => 
      {
        FileSaver.saveAs(data, "Data_Pemesan_Penginapan_PSN2019_" + day + "-" + month + "-" + "2019");
      },
      err => {
        console.log('err', err);
      }
    );
  }
}
