import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReservationWrite } from '../models/ReservationWrite';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getAllReservation(): Observable<any> {
    return this.httpClient.get(
      this.apiUrl + '/api/Reservation/all-reservations'
    );
  }
  getAllReservationForUser(): Observable<any> {
    return this.httpClient.get(
      this.apiUrl + 'api/Reservation/reservations-user'
    );
  }
  createNewReservation(reservation: ReservationWrite) {
    return this.httpClient.post(
      this.apiUrl + '/api/Reservation/adding/reservation',
      reservation
    );
  }
  deleteReservation(id: number) {
    return this.httpClient.delete(this.apiUrl + '/api/Reservation/' + id);
  }
}
