import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './auth/login.guard';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarsComponent } from './components/cars/cars.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReservationComponent } from './components/reservation/reservation.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'car', component: CarDetailComponent },
  {
    path: 'admin',
    component: HomeAdminComponent,
    children: [
      {
        path: 'reservations',
        component: ReservationComponent,
      },
      {
        path: 'cars',
        component: CarsComponent,
      },
    ],
    canActivate: [LoginGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
