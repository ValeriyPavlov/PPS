import { Component, OnInit } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';
import { CapacitorFlash } from '@capgo/capacitor-flash';
import { Haptics } from '@capacitor/haptics';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';



let accelHandler: PluginListenerHandle;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  public lastAction: string = "";
  public audio: HTMLAudioElement = new Audio();
  public isDetectorActive = false;
  public timerId: any;
  public reposo: boolean = true;
  public imagen: string = "../../assets/abierto.png";

  constructor(public userService: UserService, public alert: AlertController, public router: Router) {

  }
  

  ngOnInit() {

  }

  async activar(){
    if (this.isDetectorActive == false) {
      console.log("Alarma Activada");
      this.isDetectorActive = true;
      this.imagen = "../../assets/cerrado.png";
      this.startListening();
    } else {
      console.log("Alarma Desactivada");

      const alerta = await this.alert.create({
        header: 'Ingrese su contraseña para desactivar la alarma',
        inputs: [
          {
            name: 'password',
            type: 'password',
            placeholder: 'Contraseña'
          }
        ],
        buttons: [
          {
            text: 'Aceptar',
            handler: data => {
              if (data.password === this.userService.user?.clave) {
                this.desactivar();
              } else {
                this.alarmaFull();
              }
            }
          }
        ]
      });
      await alerta.present();

    }
    //   // this.rota_x = event.alpha; // Sur, Norte, Este, Oeste
    //   // this.rota_y = event.beta; // Vertical 0 a 90 a 180 (media vuelta)
    //   // this.rota_z = event.gamma; // Horizontal 0 a 45 a 90 a 180 (media vuelta)
  }
  
  async startListening() {
    accelHandler = await Motion.addListener('orientation', event => {
      if(event.beta > 60 && this.lastAction != "vertical"){
        clearTimeout(this.timerId);
        this.lastAction = 'vertical';
        this.reposo = false;
        this.reproducir("vertical");
        CapacitorFlash.switchOn({intensity: 0.7}).then(() => this.timerId = setTimeout(() => {
          CapacitorFlash.switchOff();
        }, 5000));
      }
      if(event.gamma > 45 && this.lastAction != "derecha"){
        clearTimeout(this.timerId);
        this.lastAction = "derecha";
        this.reproducir("derecha");
      }
      if(event.gamma < -45 && this.lastAction != "izquierda"){
        clearTimeout(this.timerId);
        this.lastAction = "izquierda";
        this.reproducir("izquierda");
      }
      if(event.beta < 10 && this.lastAction != "horizontal" && this.reposo == false){
        clearTimeout(this.timerId);
        this.lastAction = "horizontal";
        this.reproducir("horizontal");
        Haptics.vibrate({duration: 5000});
      }
    });
  }

  alarmaFull(){
    this.reproducir("full");
    Haptics.vibrate({duration: 5000});
    CapacitorFlash.switchOn({intensity: 1}).then(() => this.timerId = setTimeout(() => {
      CapacitorFlash.switchOff();
      this.audio.pause();
    }, 5000));
  }


  stopListening() {
    accelHandler.remove();
    this.lastAction = "";
    this.timerId = null;
    this.reposo = true;
  }
  
  desactivar(){
    this.isDetectorActive = false;
    this.imagen = "../../assets/abierto.png";
    this.stopListening();
  }
  
  reproducir(posicion: string) {
    this.audio.pause();
    this.audio = new Audio(`assets/Audio/${posicion}.mp3`);
    this.audio.volume = 1;
    this.audio.play();
  }

  logout(){
    this.userService.user = null;
    this.router.navigateByUrl("home");
  }

}
