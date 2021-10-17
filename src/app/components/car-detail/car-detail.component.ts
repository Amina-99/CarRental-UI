import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CarRead } from 'src/app/models/CarRead';
import { CarServiceService } from 'src/app/services/car-service.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from '@angular/compiler/src/util';
import { AuthentificationService } from 'src/app/services/authentification.service';
import * as moment from 'moment';
declare var paypal;
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  newReservationForm!: FormGroup;
  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  public minDate: Object = new Date(
    this.currentYear,
    this.currentMonth,
    this.currentDay
  );
  public isLoggedIn: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarServiceService,
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private snackBar: MatSnackBar,
    private _auth: AuthentificationService
  ) {}
  cars: any;
  carId: number;
  price: number;
  currentDate = Date.now();
  ngOnInit() {
    this._auth.currentUser.subscribe((data) => {
      if (data == null) {
        this.isLoggedIn = false;
        console.log('Nije prijavljen');
      } else {
        this.isLoggedIn = true;
        console.log('Prijavljen');
      }
    });
    this.newReservationForm = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      customer: ['', Validators.required],
    });
    this.activatedRoute.queryParams.subscribe((params: ParamMap) => {
      let id = parseInt(params['id']);
      this.carId = id;
      this.price = parseInt(params['pricePerDay']);
      this.getCarDetails(this.carId);
    });
  }
  getCarDetails(carId: number) {
    this.carService.getDetailOfCar(carId).subscribe((data: CarRead) => {
      this.cars = data;
    });
  }
  get field() {
    return this.newReservationForm.controls;
  }
  public submit() {
    let errorMessage: string = 'Sorry, your form is not submitted.';
    let message: string = 'Successfully added new reservation.';
    let action: string = 'Close';
    let invalidFormMessage: string = 'Form is not filled correctly.';

    if (this.newReservationForm.valid) {
      this.setupPayPal();
    } else {
      this.snackBar.open(invalidFormMessage, action, { duration: 4000 });
    }
  }

  setupPayPal() {
    let startDate = moment(this.field.start.value);
    let endDate = moment(this.field.end.value);
    let days = moment.duration(endDate.diff(startDate)).asDays();
    this.reservationService
      .createNewReservation({
        startDate: this.field.start.value,
        endDate: this.field.end.value,
        carId: this.carId,
        customerName: this.field.customer.value,
      })
      .subscribe(
        (data: any) => {
          this.snackBar.open('Successfully paid', 'Close', { duration: 4000 });
        },
        (error: any) => {
          this.snackBar.open('Something went wrong', 'Close', {
            duration: 4000,
          });
        }
      );
    //      paypal
    //        .Buttons({
    //          createOrder: (data, actions) => {
    //            return actions.order.create({
    //              purchase_units: [
    //                {
    //                  description: "Car reservation",
    //                  amount: {
    //                    currency_code: 'USD',
    //                    value: this.price *days
    //                  }
    //                }
    //              ]
    //            });
    //          },
    // onApprove: async (data, actions) => {
    //          const order = await actions.order.capture();
    //          this.reservationService.createNewReservation({
    //           startDate: this.field.start.value,
    //           endDate: this.field.end.value,
    //           carId: this.carId,
    //           customerName: this.field.customer.value
    //         }).subscribe((data:any) =>{
    //           this.snackBar.open("Successfully paid", "Close", {duration: 4000,});
    //         }, (error: any) =>{
    //           this.snackBar.open("Something went wrong", "Close",{duration: 4000,});
    //         });
    //        },
    //        onError: err => {
    //          console.log(err);
    //        }
    //      })
    //      .render(this.paypalElement.nativeElement);
  }
}
