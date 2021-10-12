import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/User';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm: FormGroup;
  user: User;
  constructor(
    private fb: FormBuilder,
    private _authService: AuthentificationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  submit(e) {
    e.preventDefault();
    let message: string = 'Successfully registrated.';
    let action: string = 'Close';
    let invalidFormMessage: string = 'Form is not filled correctly.';
    if (this.registerForm.valid) {
      this._authService
        .register(this.form.username, this.form.password)
        .subscribe((data: any) => console.log(data));
      this.dialog.closeAll();
      this.snackBar.open(message, action, { duration: 4000 });
    } else {
      this.snackBar.open(invalidFormMessage, action, { duration: 4000 });
    }
  }
  get form() {
    return this.registerForm.value;
  }
}
