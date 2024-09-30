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
      await this.userService.getPoints().then(() =>{
        this.user = "";
        this.password = "";
        this.router.navigateByUrl("principal");
      });
    }
    else{
      this.alertService.showAlert({message:"El correo electrónico y/o la contraseña son incorrectos.", title: "Error", showConfirmButton: true});
    }
  }

  autoLogin(e: string){
    this.user = e;
    switch(e){
      case "admin@admin.com":
        this.password = "111111";
        break;
      case "invitado@invitado.com":
        this.password = "222222";
        break;
      case "usuario@usuario.com":
        this.password = "333333";
        break;
      case "anonimo@anonimo.com":
        this.password = "444444";
        break;
      case "tester@tester.com":
        this.password = "555555";
        break;
    }
  }
  
}
