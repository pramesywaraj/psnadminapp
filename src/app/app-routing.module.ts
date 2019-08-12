import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteGuardGuard } from './guards/route.guard';

import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { SekolahComponent } from './pages/admin/sekolah/sekolah.component';
import { PerlombaanComponent } from './pages/admin/perlombaan/perlombaan.component';
import { PenginapanComponent } from './pages/admin/penginapan/penginapan.component';
import { MedparComponent } from './pages/admin/medpar/medpar.component';
import { EditLombaComponent } from './pages/admin/perlombaan/edit-lomba/edit-lomba.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RouteGuardGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'sekolah',
        component: SekolahComponent
      },
      {
        path: 'perlombaan',
        component: PerlombaanComponent,
        // children:[
          
        // ]
      },
      {
        path: 'editlomba',
        component: EditLombaComponent,
      },
      {
        path: 'penginapan',
        component: PenginapanComponent
      },
      {
        path: 'mediapartner',
        component: MedparComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
