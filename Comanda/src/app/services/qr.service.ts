import { Injectable } from '@angular/core';
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
  Barcode,
} from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  scannedResult: any;
  content_visibility = '';
  public barcodes: Barcode[] = [];
  public qr = "";
  public isSupported = false;

  constructor(private alertController:AlertController) { }

  public async scanQr()
  {
    this.barcodes = [];
    await this.scan();

    if(this.barcodes.length > 0)
    {
      this.qr = this.barcodes[0].rawValue;
    }
  }

  async scan(): Promise<void> {

    await BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable()
      .then(res => {
        if (!res.available) {
          BarcodeScanner.installGoogleBarcodeScannerModule();
        }
      })

    const granted = await this.requestPermissions();

    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
    //await this.presentAlert2();
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Por favor active la cámara para poder escanear el QR .',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  async presentAlert2(): Promise<void> {
    
    const alert = await this.alertController.create({
      header: 'Operación exitosa',
      message: this.barcodes[0].rawValue,
      buttons: ['OK'],
    });
    await alert.present();
  }


}
