import { Component, OnInit} from '@angular/core';
import { Barcode, BarcodeScanner, ScanResult } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { OnSameUrlNavigation, Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit{

  // 2786f4877b9091dcad7f35751bfcf5d5ea712b2f -> 100
  // ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 -> 50
  // 8c95def646b6127282ed50454b73240300dccabc -> 10

  puntaje: number = 0;
  puntajes: number[] = [];
  isSupported = false;

  constructor(private alertController: AlertController, public userService: UserService, private toastController: ToastController, private router: Router) { }
 
  ionViewWillEnter(){
    for (const key in this.userService.puntaje){
      this.puntaje = this.puntaje + this.userService.puntaje[key];
      this.puntajes[key] = this.userService.puntaje[key];
    }
  }

  ngOnInit() {
    BarcodeScanner.installGoogleBarcodeScannerModule(); 
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const {barcodes} = await BarcodeScanner.scan();
    this.asignarValor(barcodes);
  }

  asignarValor(scan: Barcode[]){

    scan.forEach(barcode => {
      if(this.userService.user?.correo != "admin@admin.com"){
        if (barcode.rawValue == "2786f4877b9091dcad7f35751bfcf5d5ea712b2f" && this.puntajes[0] == 0){
          this.puntajes[0] = 100;
          this.presentToast("+100");
          this.userService.setPoints(this.userService.user?.correo!, this.puntajes);
        }
        else{ 
          if ((barcode.rawValue).trim() == "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172" && this.puntajes[1] == 0){
            this.puntajes[1] = 50;
            this.presentToast("+50");
            this.userService.setPoints(this.userService.user?.correo!, this.puntajes);
          }
          else{
            if(barcode.rawValue == "8c95def646b6127282ed50454b73240300dccabc" && this.puntajes[2] == 0){
              this.puntajes[2] = 10;
              this.presentToast("+10");
              this.userService.setPoints(this.userService.user?.correo!, this.puntajes);
            }
            else{
              this.presentToast("No se acreditó el puntaje.");
            }
          }
        }
      }
      else{
        if (barcode.rawValue == "2786f4877b9091dcad7f35751bfcf5d5ea712b2f" && this.puntajes[0] == 0){
          this.puntajes[0] = 100;
          this.presentToast("+100");
          this.userService.setPoints(this.userService.user?.correo!, this.puntajes);
        }
        else{                   
          if (barcode.rawValue == "2786f4877b9091dcad7f35751bfcf5d5ea712b2f" && this.puntajes[1] == 0){
            this.puntajes[1] = 100;
            this.presentToast("+100");
            this.userService.setPoints(this.userService.user?.correo!, this.puntajes);
          }
          else{
            if((barcode.rawValue).trim() == "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172" && this.puntajes[2] == 0){
              this.puntajes[2] = 50;
              this.presentToast("+50");
              this.userService.setPoints(this.userService.user?.correo!, this.puntajes);
            }
            else{
              if((barcode.rawValue).trim() == "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172" && this.puntajes[3] == 0){
                this.puntajes[3] = 50;
                this.presentToast("+50");
                this.userService.setPoints(this.userService.user?.correo!, this.puntajes);
              }
              else{
                if(barcode.rawValue == "8c95def646b6127282ed50454b73240300dccabc" && this.puntajes[4] == 0){
                  this.puntajes[4] = 10;
                  this.presentToast("+10");
                  this.userService.setPoints(this.userService.user?.correo!, this.puntajes);
                }
                else{
                  if(barcode.rawValue == "8c95def646b6127282ed50454b73240300dccabc" && this.puntajes[5] == 0){
                    this.puntajes[5] = 10;
                    this.presentToast("+10");
                    this.userService.setPoints(this.userService.user?.correo!, this.puntajes);
                  }
                  else{
                    this.presentToast("No se acreditó el puntaje.");
                  }
                }
              }
            }
          }
        }
      }
    });
    this.puntaje = this.puntajes.reduce((a,b)=>{
      return a + b;
    });
  }

  limpiar(){
    this.puntajes = [0,0,0,0,0,0];
    this.puntaje = 0;
    this.userService.setPoints(this.userService.user?.correo!, this.puntajes);
  }

  logout(){
    this.userService.user = null;
    this.userService.puntaje = [];
    this.router.navigateByUrl("home");
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      position: 'top',
    });
    await toast.present();
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

}
