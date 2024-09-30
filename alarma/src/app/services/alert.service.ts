import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertInput } from 'sweetalert2';


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
      color: "#700202", // Color de letras
      background: "#c7c469", // Color de Fondo
    });
  }

  public async askPassword(){
    return await Swal.fire({
    title: "Ingrese su contraseña para desactivar la alarma",
    input: "password",
    inputPlaceholder: "Ingrese su contraseña...",
    confirmButtonText: 'Aceptar',
    heightAuto: false,
    inputAttributes: {
      maxlength: "10",
      autocapitalize: "off",
      autocorrect: "off"
    },
    color: "#4a0006", // Color de letras
    background: "#fcfbd2", // Color de Fondo
  });
  }


}
