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

  navegar(path: string, sala: string){
    this.userService.salaActual = sala;
    this.router.navigateByUrl(path);
  }

  volver(){
    this.userService.user = null;
    this.router.navigateByUrl("home");
  }
}
