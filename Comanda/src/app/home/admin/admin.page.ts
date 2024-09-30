import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { UserService } from 'src/app/services/user.service';
import { VerificationService } from 'src/app/services/verification.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  public userClients: User[] = [];
  private userFantasma: User[] = [];

  constructor(private loadingCtrl: LoadingController, private userService: UserService, private auth: AuthService, private emailService: EmailService, private verificationService: VerificationService) { }

  ngOnInit() {
    this.verificationService.getList(/*this.userClients*/);
    this.updateTable();
  }

  updateTable() {
    this.userClients = [];
    this.verificationService.getAll2(this.userClients);
    //this.verificationService.getList(this.userClients);
  }

  accept(user: User) {
    user.estadoVerificado = 'confirmado';
    user.estado = 'registrado';
    user.verificado = true;
    this.userService.updateUser(user);
    this.verificationService.updateUser(user);
    this.emailService.sendApproveEmail({ email: user.email, name: user.nombre + ' ' + user.apellido })
    this.updateTable();
  }

  reject(user: User) {
    user.estadoVerificado = 'rechazado';
    user.estado = 'rechazado';
    user.verificado = false;
    this.userService.updateUser(user);
    this.verificationService.updateUser(user);
    this.emailService.sendRejectEmail({ email: user.email, name: user.nombre + ' ' + user.apellido })
    this.updateTable();
  }

  logOut() {
    this.showLoading();
    setTimeout(() => {
      this.auth.logout();
    }, 2000);
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      duration: 2000,
    });

    loading.present();
  }

}
