import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';


import { HeaderComponent } from './components/header/header.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { LoginComponent } from './pages/login/login.component';
import { RouteGuardGuard } from './guards/route.guard';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { SekolahComponent } from './pages/admin/sekolah/sekolah.component';
import { PerlombaanComponent } from './pages/admin/perlombaan/perlombaan.component';
import { PenginapanComponent } from './pages/admin/penginapan/penginapan.component';
import { MedparComponent } from './pages/admin/medpar/medpar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminComponent,
    SidemenuComponent,
    LoginComponent,
    DashboardComponent,
    SekolahComponent,
    PerlombaanComponent,
    PenginapanComponent,
    MedparComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatGridListModule,
    MatTableModule,
    MatTabsModule
  ],
  providers: [RouteGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
