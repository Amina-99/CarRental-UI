import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor(private _authService: AuthentificationService, private router: Router) { }

  ngOnInit() {
  }
  logout(){
    this._authService.logout();
    this.router.navigateByUrl('/');
  }
}
