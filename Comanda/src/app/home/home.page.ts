import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private auth: AuthService, private notiService: NotificationService, private router: Router) { }

  ngOnInit() {
  }

  logOut() {
    setTimeout(() => {
      this.auth.logout();
    }, 3000);
  }

  test() {
    setTimeout(() => {
      this.router.navigate(['alta-encuentas']);
    }, 2000);
  }
}
