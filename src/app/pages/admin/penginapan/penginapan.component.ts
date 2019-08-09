import { Component, OnInit, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccomodationService } from '../../../services/accomodation.service';

@Component({
  selector: 'app-penginapan',
  templateUrl: './penginapan.component.html',
  styleUrls: ['./penginapan.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class PenginapanComponent implements OnInit, OnDestroy {

  columnsToDisplay = ['name', 'quota', 'pricePerNight', 'reservedQuota', 'action'];
  accomodationList: any = [];
  subscribe: Subscription;

  accomodation : FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private accomodationService: AccomodationService) {
    this.accomodation = this.formBuilder.group(
      {
        name : ["", Validators.required],
        quota : ["", Validators.required],
        pricePerNight : ["", Validators.required]     
      }
    );
  }

  ngOnInit() {
    this.subscribe = this.accomodationService.getAccomodations().subscribe(res => {
      this.accomodationList = res.accommodations;
      console.log(res);
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  postAccomodation() {
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
}
