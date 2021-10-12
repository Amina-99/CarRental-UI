import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    private _authService: AuthentificationService,
    private dialog: MatDialog
  ) {}
  user: User;
  ngOnInit(): void {
    this._authService.currentUser.subscribe((data) => {
      this.user = data;
    });
  }
  logout() {
    this._authService.logout();
  }
  openDialog() {
    this.dialog.open(LoginComponent);
  }
  openDialogRegister() {
    this.dialog.open(RegisterComponent);
  }
}
