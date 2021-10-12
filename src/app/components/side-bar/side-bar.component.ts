import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
interface Routers {
  route: string;
  icon: string;
}
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthentificationService
  ) {}

  ngOnInit() {}
  getReservation() {
    this.router.navigate(['reservations'], { relativeTo: this.route });
  }
  getCars() {
    this.router.navigate(['cars'], { relativeTo: this.route });
  }
  getUsers() {
    this.router.navigate(['users'], { relativeTo: this.route });
  }
  logout() {
    this.authService.logout();
    this.router.navigate([''], { relativeTo: this.route });
  }
}
