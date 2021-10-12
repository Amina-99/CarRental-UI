import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private fb: FormBuilder, private _service: CarServiceService) {}

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
    });
  }
  get filed() {
    return this.editForm.controls;
  }
  onSelectUser(car: CarWrite) {}
  saveChanges() {
    let errorMessage: string = 'Sorry, your form is not submitted.';
    let message: string = 'Successfully edited car.';
    let action: string = 'Close';
    let invalidFormMessage: string = 'Form is not filled correctly.';
    if (this.editForm.valid) {
      this._service.editCar({
        carName: this.filed.carName,
        gearShift: this.filed.gearShift,
        blueotooth: this.filed.blueotooth,
        door: this.filed.door,
        seat: this.filed.seat,
        navigationSystem: this.filed.navigationSystem,
        mp: this.filed.mp,
        parkingSensors: this.filed.parkingSensors,
        centralLocking: this.filed.centralLocking,
        airConditioner: this.filed.airConditioner,
      });
    }
  }
}
