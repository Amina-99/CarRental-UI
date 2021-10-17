import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { duration } from 'moment';
import { CarRead } from 'src/app/models/CarRead';
import { CarServiceService } from 'src/app/services/car-service.service';
import { AddCarComponent } from '../add-car/add-car.component';
import { EditCarComponent } from '../edit-car/edit-car.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  constructor(
    private _service: CarServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  cars: any;

  ngOnInit() {
    this._service.getCars().subscribe((data: CarRead[]) => {
      this.cars = data;
    });
  }
  edit(car: any): void {
    this._service.carForEdit = car;
    this.dialog.open(EditCarComponent);
  }
  delete(id: number) {
    let message: string = 'Successfully deleted car.';
    let action: string = 'Close';
    let invalidFormMessage: string = 'Something went wrong.';
    this._service.deleteCar(id).subscribe(
      (response) => {
        window.location.reload();
        this.snackBar.open(message, action, { duration: 4000 });
      },
      (error) => {
        console.log(error);
        this.snackBar.open(invalidFormMessage, action, { duration: 40000 });
      }
    );
  }

  addCar() {
    this.dialog.open(AddCarComponent); 
  }
}
