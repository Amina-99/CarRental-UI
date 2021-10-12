import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { identifierModuleUrl } from '@angular/compiler';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;
  constructor(
    private authService: AuthentificationService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  submit(e) {
    e.preventDefault();
    let message: string = 'Successfully logged in.';
    let action: string = 'Close';
    let invalidFormMessage: string = 'Form is not filled correctly.';
    if (this.loginForm.valid) {
      this.authService.login(this.form.username, this.form.password).subscribe(
        (data: any) => {
          if (data.rolaId == 1) {
            this.router.navigateByUrl('/admin');
          }
          this.dialog.closeAll();
          this.snackBar.open(message, action, { duration: 4000 });
        },
        (error: any) => {
          this.snackBar.open(error, action, { duration: 4000 });
        }
      );
    } else {
      this.snackBar.open(invalidFormMessage, action, { duration: 4000 });
    }
  }
  get form() {
    return this.loginForm.value;
  }
  routeToRegister() {
    this.dialog.closeAll();
    this.dialog.open(RegisterComponent);
  }
}
