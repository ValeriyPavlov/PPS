import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  public async showAlert(config: {
    icon?: SweetAlertIcon;
    message: string;
    timer?: number;
    showCancelButton?: boolean;
    showConfirmButton?: boolean;
    title?: string;
  }) {
    return await Swal.fire({
      position: 'center',
      icon: config.icon,
      title: config.message,
      timer: config.timer,
      showCancelButton: config.showCancelButton,
      showConfirmButton: config.showConfirmButton,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      heightAuto: false,
      color: "#03005c", // Color de letras
      background: "#7afaf6", // Color de Fondo
    });
  }

}
