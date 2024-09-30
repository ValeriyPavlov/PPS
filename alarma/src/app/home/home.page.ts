import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public user: string = "";
  public password: string = "";

  constructor(public userService: UserService, public router: Router, public alertService: AlertService) {
    this.userService.getUsers();
  }

  async login(){
    let retorno = await this.userService.logIn(this.user, this.password);
    if(retorno == true){
      setTimeout(() => {
        console.log("Bienvenido!");
        this.user = "";
        this.password = "";
        this.router.navigateByUrl("principal");
      }, 1500); 
    }
    else{
      this.alertService.showAlert({message:"El correo electrónico y/o la contraseña son incorrectos.", title: "Error", showConfirmButton: true});
    }
  }

  public alertButtons = [
    {
      text: 'admin',
      cssClass: 'alert-button-confirm',
      value: "admin@admin.com",
      handler: () => {
        this.user = "admin@admin.com";
        this.password = "111111";
      },
    },
    {
      text: 'invitado',
      cssClass: 'alert-button-confirm',
      value: "invitado@invitado.com",
      handler: () => {
        this.user = "invitado@invitado.com";
        this.password = "222222";
      },
    },
    {
      text: 'usuario',
      cssClass: 'alert-button-confirm',
      value: "usuario@usuario.com",
      handler: () => {
        this.user = "usuario@usuario.com";
        this.password = "333333";
      },
    },
    {
      text: 'anonimo',
      cssClass: 'alert-button-confirm',
      value: "anonimo@anonimo.com",
      handler: () => {
        this.user = "anonimo@anonimo.com";
        this.password = "444444";
      },
    },
    {
      text: 'tester',
      cssClass: 'alert-button-confirm',
      value: "tester@tester.com",
      handler: () => {
        this.user = "tester@tester.com";
        this.password = "555555";
      },
    },
  ];

}
