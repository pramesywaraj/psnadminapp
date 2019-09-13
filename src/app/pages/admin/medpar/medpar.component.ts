import { Component, OnInit } from '@angular/core';
import { AccomodationService } from '../../../services/accomodation.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-medpar',
  templateUrl: './medpar.component.html',
  styleUrls: ['./medpar.component.scss']
})
export class MedparComponent implements OnInit {

  search: string;
  queriedObj: any;

  constructor(public accomodation: AccomodationService, private formBuilder : FormBuilder) {
  }

  ngOnInit() {
  }

  searchVa() {
    let searchObj = {
      vaNumber: this.search
    }

    this.accomodation.searchVA(searchObj).subscribe(res => {
      if(res.length === 0) {
        alert("Nomor VA tidak ditemukan.");
      } else {
        this.queriedObj = res;
        console.log(this.queriedObj);
      }
    }, err => {
      alert(err.message);
    })
  }

  updateBill(bill) {
    let updateObj = {
      billId : bill
    }

    this.accomodation.changeStatus(updateObj).subscribe(
    res => {
      alert("Berhasil diubah.");
      this.searchVa();

    }, err => {
      alert(err.message);
    })
  }


}
