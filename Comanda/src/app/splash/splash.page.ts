import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit, AfterViewInit {

  constructor(public router: Router) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      SplashScreen.hide({ fadeOutDuration: 500 });
    }, 100);
  }
  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['log']);
    }, 4000)
  }

}
