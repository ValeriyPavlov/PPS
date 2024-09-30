import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(public router: Router, public userService: UserService) { }

  ngOnInit() {
  }

  navegar(ruta: string){
    this.router.navigateByUrl(ruta);
  }

  volver(){
    this.router.navigateByUrl("home");
  }

}
