import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { RangeCustomEvent } from '@ionic/angular';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public user: string = "";
  public password: string = "";

  constructor(public userService: UserService, public router: Router, public alert: AlertService) {
    this.userService.getUsers();
  }

  async login(){
    let retorno = await this.userService.logIn(this.user, this.password);
    if(retorno == true){
      setTimeout(() => {
        this.user = "";
        this.password = "";
        console.log("Bienvenido!");
        this.router.navigateByUrl("principal");
      }, 1500); 
    }
    else{
      this.alert.showAlert({message:"El correo electrónico y/o la contraseña son incorrectos.", title: "Error", showConfirmButton: true});
    }
  }

  autoLogin(e: Event){
    let numero = (e as RangeCustomEvent).detail.value;
    switch(numero){
      case 1:
        this.user = "admin@admin.com";
        this.password = "111111";
        break;
      case 2:
        this.user = "invitado@invitado.com";
        this.password = "222222";
        break;
      case 3:
        this.user = "usuario@usuario.com";
        this.password = "333333";
        break;
      case 4:
        this.user = "anonimo@anonimo.com";
        this.password = "444444";
        break;
      case 5:
        this.user = "tester@tester.com";
        this.password = "555555";
        break;
    }
  }


}
