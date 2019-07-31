import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  username = new FormControl('');
  password = new FormControl('');
  hide = true;

  private subscription: Subscription;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, public router: Router) {

    this.loginForm = formBuilder.group({
      'username': this.username,
      'password': this.password
    });
  }

  ngOnInit() {
    if(this.auth.loadToken) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }

  // getErrorMessage() {
  //   return this.email.hasError('required') ? 'Anda belum memasukkan email.' :
  //       this.email.hasError('email') ? 'Masukkan Anda tidak sesuai dengan format email.' :
  //           '';
  // }

  submitLogin() {
    this.subscription = this.auth.login(this.loginForm.value).subscribe((data) => {
      alert('Yeay! Login berhasil.');
      this.router.navigate(['/admin/dashboard']);
    }, err => {
      alert(err.error.message);
    });
  }

}
