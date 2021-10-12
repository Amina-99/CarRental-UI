import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarWrite } from 'src/app/models/CarWrite';
import { CarServiceService } from 'src/app/services/car-service.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})
export class AddCarComponent implements OnInit {
  addForm: FormGroup;
  car: CarWrite;
  constructor(
    private service: CarServiceService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.addForm = this.fb.group({
      carName: ['', Validators.required],
      gearShift: ['', Validators.required],
      seat: ['', Validators.required],
      door: ['', Validators.required],
      navigationSystem: ['', Validators.required],
      mp: ['', Validators.required],
      airConditioner: ['', Validators.required],
      blueotooth: ['', Validators.required],
      parkingSensors: ['', Validators.required],
      centralLocking: ['', Validators.required],
      photo: ['', Validators.required],
      pricePerDay: ['', Validators.required],
    });
  }
  get field() {
    return this.addForm.controls;
  }
  addCar() {
    let errorMessage: string = 'Sorry, your form is not submitted.';
    let message: string = 'Successfully added car.';
    let action: string = 'Close';
    let invalidFormMessage: string = 'Form is not filled correctly.';
    if (this.addForm.valid) {
      this.service
        .addNewCar({
          name: this.field.carName.value,
          gearShift: this.field.gearShift.value,
          seat: Number(JSON.parse(this.field.seat.value)),
          door: Number(JSON.parse(this.field.door.value)),
          navigationSystem: Boolean(
            JSON.parse(this.field.navigationSystem.value)
          ),
          mp: Boolean(JSON.parse(this.field.mp.value)),
          airConditioner: Boolean(JSON.parse(this.field.airConditioner.value)),
          centralLocking: Boolean(JSON.parse(this.field.centralLocking.value)),
          parkingSensors: Boolean(JSON.parse(this.field.parkingSensors.value)),
          bluetooth: Boolean(JSON.parse(this.field.blueotooth.value)),
          photo: this.field.photo.value,
          pricePerDay: Number(JSON.parse(this.field.pricePerDay.value)),
        })
        .subscribe((data: any) => {
          this.dialog.closeAll();
          window.location.reload();
          this.snackBar.open(message, action, { duration: 4000 });
        });
    } else {
      this.snackBar.open(invalidFormMessage, action, { duration: 4000 });
    }
  }
}
