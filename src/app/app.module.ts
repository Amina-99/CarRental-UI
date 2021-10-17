import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AuthentificationService } from './services/authentification.service';
import { ReservationComponent } from './components/reservation/reservation.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CarServiceService } from './services/car-service.service';
import { JwtInterceptor } from './Helpers/jwt.interceptor';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CarsComponent } from './components/cars/cars.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';
import { MatRadioModule } from '@angular/material/radio';
import { NavComponent } from './components/nav/nav.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginGuard } from './auth/login.guard';
import { IncomeAnaycitsComponent } from './components/income-anaycits/income-anaycits.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CarDetailComponent,
    HomeAdminComponent,
    LoginComponent,
    RegisterComponent,
    SideBarComponent,
    ReservationComponent,
    CarsComponent,
    EditCarComponent,
    NavComponent,
    AddCarComponent,
   IncomeAnaycitsComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatTableModule,
    MatSnackBarModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatRadioModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    CarServiceService,
    AuthentificationService,
    LoginGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
