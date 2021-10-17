import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarRead } from 'src/app/models/CarRead';
import { CarWrite } from 'src/app/models/CarWrite';
import { CarServiceService } from 'src/app/services/car-service.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css'],
})
export class EditCarComponent implements OnInit {
  cars: CarWrite[];
  editForm!: FormGroup;
  selectedCarId: number;
  constructor(
    private fb: FormBuilder,
    private _service: CarServiceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log(this._service.carForEdit);
    console.log(this._service.carForEdit.Id);
    this.editForm = this.fb.group({
      carName: [this._service.carForEdit.name, Validators.required],
      gearshift: [
        this._service.carForEdit.gearShift.toString(),
        Validators.required,
      ],
      blueotooth: [
        this._service.carForEdit.blueotooth.toString(),
        Validators.required,
      ],
      door: [this._service.carForEdit.door.toString(), Validators.required],
      seat: [this._service.carForEdit.seat.toString(), Validators.required],
      navigationSystem: [
        this._service.carForEdit.navigationSystem.toString(),
        Validators.required,
      ],
      mp: [this._service.carForEdit.mp.toString(), Validators.required],
      parkingSensors: [
        this._service.carForEdit.parkingSensors.toString(),
        Validators.required,
      ],
      centralLocking: [
        this._service.carForEdit.centralLocking.toString(),
        Validators.required,
      ],
      airConditioner: [
        this._service.carForEdit.airConditioner.toString(),
        Validators.required,
      ],
      pricePerDay: [
        this._service.carForEdit.pricePerDay.toString(),
        Validators.required,
      ],
      photo: [this._service.carForEdit.photo.toString(), Validators.required],
    });
  }
  get field() {
    return this.editForm.controls;
  }
  onSelectUser(car: CarWrite) {}
  saveChanges() {
    let errorMessage: string = 'Sorry, your form is not submitted.';
    let message: string = 'Successfully edited car.';
    let action: string = 'Close';
    let invalidFormMessage: string = 'Form is not filled correctly.';
    if (this.editForm.valid) {
      this._service
        .editCar({
          name: this.field.carName.value,
          gearShift: this.field.gearshift.value,
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
        .subscribe((_) => {
          this.dialog.closeAll();
          window.location.reload();
          this.snackBar.open(message, action, { duration: 4000 });
        });
    } else {
      this.snackBar.open(invalidFormMessage, action, { duration: 4000 });
    }
  }
}
