import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {
  public audio: HTMLAudioElement = new Audio(`assets/log.wav`);

  ngOnInit() {
    this.audio.volume = 1;
  }

  public register: boolean = false;
  public selected: number = 0;
  public user!: User;
  public form: FormGroup = this.fb.group({
    email: [""],
    password: [""],
    password2: [""],
  });

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router, private toast: ToastController, private userService: UserService, private loadingCtrl: LoadingController) { }

  onSubmit() {
    this.user =
    {
      id: '',
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      nombre: '',
      apellido: '',
      foto: '',
      dni: 0,
      rol: '',
      cargo: '',
      verificado: true,
      estadoVerificado: '',
      estado: ''
    }

    if (this.register) {
      this.registerUser();
    } else {
      this.loginUser();
    }
  }

  registerUser() {
    const password2 = this.form.controls['password2'].value
    if (this.user.password == password2) {
      this.auth.register(this.user)
        .then(async res => {
          this.userService.createUser(this.user);
          this.loginUser()
        })
        .catch(async error => {
          const t = await this.toast.create({
            position: 'bottom',
            message: error.message,
            duration: 2000
          });
          t.present();
        });
    }
  }

  loginUser() {
    this.showLoading();
    this.auth.login(this.user)
      .then(res => {
        // if (res.user!.emailVerified)
        setTimeout(async () => {
          this.userService.usuarioActual = await firstValueFrom(this.userService.getUserByEmail(this.user.email));
          switch (this.userService.usuarioActual.rol) {
            case "cliente":
              if (this.userService.usuarioActual.verificado) {
                this.router.navigate(['home-cliente'])
                this.audio.play();
              } else {
                this.createToast("El usuario no esta aceptado por un dueño/supervisor");
              }
              break;
            case "empleado":
              this.audio.play();
              //this.showLoading();
              if (this.userService.usuarioActual.cargo == "maitre") {
                this.router.navigate(['home-maitre']);
              }
              else if (this.userService.usuarioActual.cargo == "bartender" || this.userService.usuarioActual.cargo == "cocinero") {
                this.router.navigate(['home-cocinero-barman']);
              }
              else if (this.userService.usuarioActual.cargo == "mozo") {
                this.router.navigate(['home-mozo']);
              }
              break;
            case "admin":
              //this.showLoading();
              this.audio.play();
              this.router.navigate(['home/admin']);
              break;
            default:
              //this.showLoading();
              this.audio.play();
              this.router.navigate(['home']);
          }
        }, 1000)
        // this.router.navigateByUrl("/tabs/tab1");
      }).catch(async error => {
        this.createToast(error.message);
      });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      duration: 2000,
    });

    loading.present();
  }

  async createToast(msg: string) {
    const t = await this.toast.create({
      position: "bottom",
      message: msg,
      duration: 2000
    });
    t.present();
  }

  changeMode() {
    setTimeout(() => {
      this.router.navigate(['alta-cliente']);
    }, 3000);
  }

  ingresoAnonimo() {
    this.router.navigate(['alta-anonimo']);
  }

  logOwner() {
    this.register = false;
    this.form.controls['email'].setValue('admin@admin.com');
    this.form.controls['password'].setValue('123123');
    this.selected = 1;
  }
  logMaitre() {
    this.register = false;
    this.form.controls['email'].setValue('maitre@maitre.com');
    this.form.controls['password'].setValue('123123');
    this.selected = 2;
  }
  logBartender() {
    this.register = false;
    this.form.controls['email'].setValue('bartender@bartender.com');
    this.form.controls['password'].setValue('123123');
    this.selected = 3;
  }
  logCocinero() {
    this.register = false;
    this.form.controls['email'].setValue('cocinero@cocinero.com');
    this.form.controls['password'].setValue('123123');
    this.selected = 4;
  }
  logMozo() {
    this.register = false;
    this.form.controls['email'].setValue('mozo@mozo.com');
    this.form.controls['password'].setValue('123123');
    this.selected = 5;
  }
  logCliente() {
    this.register = false;
    this.form.controls['email'].setValue('cliente@cliente.com');
    this.form.controls['password'].setValue('123123');
    this.selected = 6;
  }


}
