import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CarRead } from '../../models/CarRead';
import { CarServiceService } from '../../services/car-service.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { RegisterComponent } from '../register/register.component';
import { User } from 'src/app/models/User';
import * as moment from 'moment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private _authService: AuthentificationService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _carService: CarServiceService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}
  searchCarForm!: FormGroup;
  public cars: CarRead[];
  public pageNumber: number = 1;
  public Count: number;
  public carId: number;
  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  public minDate: Object = new Date(
    this.currentYear,
    this.currentMonth,
    this.currentDay
  );
  user: User;
  ngOnInit(): void {
    this._authService.currentUser.subscribe((data) => {
      this.user = data;
    });
    this.fetchCars();
    this.searchCarForm = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
    this._route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.carId = id;
    });
  }
  fetchCars(): void {
    this._carService.getCarsPage().subscribe((result) => {
      this.cars = result.items;
      this.pageNumber = result.pageIndex;
      this.Count = result.count;
    });
  }

  onPageChange(e) {
    //e jer je u html $event, u njemu su sadrzane sve informacije o elemntu na koji se klikne
    this.pageNumber = e;
    if (this.form.start == '') {
      this._carService.getPageChange(this.pageNumber).subscribe((result) => {
        this.cars = result.items;
        this.pageNumber = result.pageIndex;
        this.Count = result.count;
      });
    } else {
      this.getDateCars();
    }
  }
  onSelect(car) {
    console.log(car);
    this._router.navigate(['/car'], {
      queryParams: { id: car.id, pricePerDay: car.pricePerDay },
    });
  }
  openDialog() {
    this.dialog.open(LoginComponent);
  }
  openDialogRegister() {
    this.dialog.open(RegisterComponent);
  }
  logout() {
    this._authService.logout();
  }
  getDateCars() {
    this._carService
      .getDatesCars(
        this.pageNumber,
        moment(this.form.start).format('YYYY-MM-DD'),
        moment(this.form.end).format('YYYY-MM-DD')
      )
      .subscribe((result) => {
        this.cars = result.items;
        this.pageNumber = result.pageIndex;
        this.Count = result.count;
      });
  }
  get form() {
    return this.searchCarForm.value;
  }
}
