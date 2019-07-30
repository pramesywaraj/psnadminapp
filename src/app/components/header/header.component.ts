import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService, public router: Router) { }

  ngOnInit() {
  }

  logoutAction() {
    this.auth.logout();
    alert('Selamat jalan :(');
    this.router.navigate(['/login']);
  }

}
