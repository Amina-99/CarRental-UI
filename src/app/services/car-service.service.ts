import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarRead } from '../models/CarRead';
import { CarWrite } from '../models/CarWrite';
import { PageResult } from '../models/PageResult';

@Injectable({
  providedIn: 'root',
})
export class CarServiceService {
  private apiUrl = environment.apiUrl;
  carForEdit: any = null;
  carForDelete: any = null;
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/api/Cars/cars');
  }
  getCarsPage(): Observable<any> {
    return this.httpClient.get<PageResult<CarRead>>(
      this.apiUrl + '/api/Cars/all-cars'
    );
  }
  getPageChange(pageNumber: number) {
    return this.httpClient.get<PageResult<CarRead>>(
      this.apiUrl + '/api/Cars/all-cars?page=' + pageNumber
    );
  }
  getDatesCars(pageNumber: number, startDate: string, endDate: string) {
    return this.httpClient.get<PageResult<CarRead>>(
      this.apiUrl +
        '/api/Cars/all-cars?page=' +
        pageNumber +
        '&startDate=' +
        startDate +
        '&endDate=' +
        endDate
    );
  }
  addNewCar(car: CarWrite) {
    return this.httpClient.post(this.apiUrl + '/api/Cars/adding', car);
  }
  editCar(car: any): Observable<any> {
    return this.httpClient.put(
      this.apiUrl + '/api/Cars/editing/' + this.carForEdit.id,
      car
    );
  }

  getDetailOfCar(carId: number) {
    return this.httpClient.get(this.apiUrl + '/api/Cars/' + carId);
  }
  deleteCar(id: number) {
    return this.httpClient.delete(this.apiUrl + '/api/Cars/' + id);
  }
}
