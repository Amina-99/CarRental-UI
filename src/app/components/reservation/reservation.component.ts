import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { duration } from 'moment';
import { ReservationRead } from 'src/app/models/ReservationRead';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  constructor(
    private _reservationService: ReservationService,
    _router: Router,
    private snackBar: MatSnackBar
  ) {}
  reservations: any;
  ngOnInit() {
    this._reservationService
      .getAllReservation()
      .subscribe((data: ReservationRead[]) => {
        this.reservations = data;
      });
  }
  delete(id: number) {
    let message: string = 'Successfully deleted reservation.';
    let action: string = 'Close';
    let invalidFormMessage: string = 'Something went wrong.';
    this._reservationService.deleteReservation(id).subscribe(
      (response) => {
        this.snackBar.open(message, action, { duration: 4000 });
        window.location.reload();
      },
      (error) => {
        this.snackBar.open(invalidFormMessage, action, { duration: 4000 });
      }
    );
  }
}
