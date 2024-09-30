import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { QrService } from '../services/qr.service';
import swal from 'sweetalert2';
import { WaitingListService } from '../services/waiting-list.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from '../interfaces/product';
import { firstValueFrom } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.page.html',
  styleUrls: ['./home-cliente.page.scss'],
})
export class HomeClientePage implements OnInit, OnDestroy {


  public mensajeActual: string = "";
  private sub: any;
  public mostrarBotonChat = false;
  public mostrarBotonEncuesta = false;
  public userInfo: User | null = null;
  public propina = 0;
  private pedido: Order[] = [];

  constructor(private loadingCtrl: LoadingController, private router: Router, private auth: AuthService, public user: UserService, public qrService: QrService, public waitingService: WaitingListService, public notification: NotificationService, public orderService: OrderService) { }


  ngOnInit() {
    this.sub = this.user.getUserByUid(this.user.usuarioActual!.id).subscribe(async user => {
      this.userInfo = user;
      this.asignarMensajeActual();
    });
  }

  ionViewWillEnter() {
    this.asignarMensajeActual();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logOut() {
    this.showLoading()
    setTimeout(() => {
      this.mensajeActual = "";
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

  viewEncuestas() {
    this.showLoading();
    setTimeout(() => {
      this.router.navigate(['view-encuestas']);
    }, 2000);
  }

  calcularDetalle() {
    let texto = "";
    if (this.pedido.length > 0) {
      this.pedido[0].products.forEach(prod => {
        texto += `<h5 style="text-align: left;">${prod.amount}x ${prod.description} - $${prod.price}</h5>`;
      });
    }
    return texto;
  }

  calcularTotal() {
    let total = 0;
    this.pedido[0].products.forEach(prod => {
      total = total + prod.price * prod.amount;
    });
    return total + (total / 100 * this.propina);
  }

  async scanQr() {
    // DESCOMENTAR!
    await this.qrService.scanQr();

    setTimeout(async () => {

      if (this.userInfo != null) {

        //BORRAR!
        //this.qrService.qr = `Mesa_${this.userInfo.estado.substring(0, 1)}`;


        this.pedido = await firstValueFrom(this.orderService.getMyOrder(this.userInfo.id));


        if (this.qrService.qr == "QR_entrada" && this.userInfo.estado == "registrado") {
          this.user.updateUserState(this.userInfo, "en espera");
          this.waitingService.createUser(this.userInfo);
          swal.fire({ title: "QR escaneado con éxito", text: "Usted fue agregado a la lista de espera.", icon: "success", heightAuto: false, confirmButtonText: "Aceptar" });
        }
        else if (this.qrService.qr == `Mesa_${this.userInfo.estado.substring(0, 1)}` && this.userInfo.estado.substring(2) == `mesa asignada`) {
          this.user.updateUserState(this.userInfo, `${this.userInfo.estado.substring(0, 1)} en mesa`);
          swal.fire({ title: "QR escaneado con éxito", text: "Usted ocupó la mesa que le fue asignada.", icon: "success", heightAuto: false, confirmButtonText: "Aceptar" });
        }
        else if (this.qrService.qr == `Mesa_${this.userInfo.estado.substring(0, 1)}` && this.userInfo.estado.substring(2) == `en mesa`) {
          this.router.navigate(["menu"]);
        }
        else if (this.qrService.qr == `Mesa_${this.userInfo.estado.substring(0, 1)}` && this.userInfo.estado.substring(2) == `confirmacion pedido`) {
          swal.fire({ title: "Estado de su pedido.", text: `Estimado cliente, su pedido está PENDIENTE de confirmación por el mozo.`, icon: "warning", heightAuto: false, confirmButtonText: "Aceptar" });
        }
        else if (this.qrService.qr == `Mesa_${this.userInfo.estado.substring(0, 1)}` && this.userInfo.estado.substring(2) == `aceptado pedido`) {
          let res = await swal.fire({ title: "Estado de su pedido.", text: `Estimado cliente, su pedido ya ha sido aceptado por el mozo y actualmente está en proceso de preparación.`, icon: "info", heightAuto: false, confirmButtonText: "Encuestas", cancelButtonText: "Volver", showCancelButton: true });
          if (res.isConfirmed) {
            setTimeout(() => {
              this.router.navigateByUrl("alta-encuentas");
            }, 2000);
          }
        }
        else if (this.qrService.qr == `Mesa_${this.userInfo.estado.substring(0, 1)}` && this.userInfo.estado.substring(2) == `listo pedido`) {
          let res = await swal.fire({ title: "Estado de su pedido.", text: `Estimado cliente, la preparación de su pedido ha finalizado y esta listo para ser servido.`, icon: "info", heightAuto: false, confirmButtonText: "Encuestas", cancelButtonText: "Volver", showCancelButton: true });
          if (res.isConfirmed) {
            setTimeout(() => {
              this.router.navigateByUrl("alta-encuentas");
            }, 2000);
          }
        }
        else if (this.qrService.qr == `Mesa_${this.userInfo.estado.substring(0, 1)}` && this.userInfo.estado.substring(2) == `entregado pedido`) {
          let res = await swal.fire({ title: "Estado de su pedido.", text: `Su pedido ha sido entregado por el mozo, por favor, confirme su recepción.`, icon: "info", heightAuto: false, confirmButtonText: "Encuestas", cancelButtonText: "Volver", showCancelButton: true, showDenyButton: true, denyButtonText: "Recibir Pedido", denyButtonColor: "green" });
          if (res.isDenied) {
            this.user.updateUserState(this.userInfo, `${this.userInfo.estado.substring(0, 1)} comiendo`);
          }
          else if (res.isConfirmed) {
            setTimeout(() => {
              this.router.navigateByUrl("alta-encuentas");
            }, 2000);
          }
        }
        else if (this.qrService.qr == `Mesa_${this.userInfo.estado.substring(0, 1)}` && this.userInfo.estado.substring(2) == `comiendo`) {
          let res = await swal.fire({ title: "Estado de su pedido.", text: `Pedido entregado y confirmado por el cliente.`, icon: "info", heightAuto: false, confirmButtonText: "Encuestas", cancelButtonText: "Volver", showCancelButton: true, showDenyButton: true, denyButtonText: "Pedir cuenta", denyButtonColor: "green" });
          if (res.isDenied) {
            this.user.updateUserState(this.userInfo, `${this.userInfo.estado.substring(0, 1)} pagando`);
            this.orderService.updateOrderStateById(this.pedido[0].id, "pagando");
          }
          else if (res.isConfirmed) {
            setTimeout(() => {
              if (this.pedido[0].encuesta == false) {
                this.router.navigateByUrl("alta-encuentas");
              }
              else {
                this.router.navigateByUrl("graph-encuestas");
              }
            }, 2000);
          }
        }
        else if (this.qrService.qr.substring(0, 7) == `Propina` && this.userInfo.estado.substring(2) == `pagando`) {
          this.propina = parseInt(this.qrService.qr.substring(8));
          swal.fire({ title: "Su grado de satisfacción", text: `Seleccionó ${this.propina}% de propina.`, icon: "success", heightAuto: false, confirmButtonText: "Aceptar" });
        }
        else if (this.qrService.qr == `Mesa_${this.userInfo.estado.substring(0, 1)}` && this.userInfo.estado.substring(2) == `pagando`) {

          let res = await swal.fire({
            title: "Detalle.",
            html:
              `
            <h5>---------------------------------</h5>
            ${this.calcularDetalle()}
            <h5>---------------------------------</h5>
            <h3>Propina: ${this.propina}%</h3>
            <h2>TOTAL: $${this.calcularTotal()}</h2>
            `,
            heightAuto: false,
            confirmButtonText: "Encuestas",
            cancelButtonText: "Volver",
            showCancelButton: true,
            showDenyButton: true,
            denyButtonText: "PAGAR",
            denyButtonColor: "green"
          });
          if (res.isDenied) {
            this.user.updateUserState(this.userInfo, `${this.userInfo.estado.substring(0, 1)} pago`);
            if (this.pedido != null) {
              this.orderService.updateOrderStateById(this.pedido[0].id, "pago");
            }
          }
        }
        else if (this.qrService.qr == `Mesa_${this.userInfo.estado.substring(0, 1)}` && this.userInfo.estado.substring(2) == `pago`) {
          let res = await swal.fire({ title: "Estado de su pago.", text: `Estimado cliente, aguarde un momento mientras confirmamos la recepción de su pago.`, icon: "info", heightAuto: false, confirmButtonText: "Encuestas", cancelButtonText: "Volver", showCancelButton: true });
          if (res.isConfirmed) {
            setTimeout(() => {
              this.router.navigateByUrl("graph-encuestas");
            }, 2000);
          }
        }
        else if (this.qrService.qr == "QR_entrada" && this.userInfo.estado == "saliendo") {
          setTimeout(() => {
            this.router.navigateByUrl("graph-encuestas");
          }, 2000);
        }
        else if (this.qrService.qr.substring(0, 4) == `Mesa`) {
          swal.fire({ title: "Error", text: "Lo sentimos, no puede ocupar esta mesa.", icon: "error", heightAuto: false, confirmButtonText: "Aceptar" });
        }
        else {
          swal.fire({ title: "Error", text: "Siga los pasos indicados por la aplicación.", icon: "error", heightAuto: false, confirmButtonText: "Aceptar" });
        }
      }
    }, 2000);
    this.asignarMensajeActual();
  }

  asignarMensajeActual() {
    if (this.userInfo != null) {
      switch (this.userInfo.estado) {
        case "registrado":
          this.mostrarBotonChat = false;
          this.mostrarBotonEncuesta = false;
          this.mensajeActual = "Por favor, escanee el código QR del ingreso al local para ingresar a la lista de espera.";
          break;
        case "en espera":
          this.mostrarBotonChat = false;
          this.mostrarBotonEncuesta = true;
          this.mensajeActual = "Ha ingresado exitosamente a la lista de espera, por favor aguarde hasta que se le asigne una mesa.";
          break;
        case `${this.userInfo.estado.substring(0, 1)} mesa asignada`:
          this.mostrarBotonChat = false;
          this.mostrarBotonEncuesta = true;
          this.mensajeActual = `Se le asignó la mesa número ${this.userInfo.estado.substring(0, 1)}, por favor escanee el código QR de su mesa para ocuparla.`;
          break;
        case `${this.userInfo.estado.substring(0, 1)} en mesa`:
          this.mostrarBotonChat = true;
          this.mostrarBotonEncuesta = true;
          this.mensajeActual = "Por favor, escanee el código QR de su mesa para poder visualizar la carta con todos los productos que ofrecemos.";
          break;
        case `${this.userInfo.estado.substring(0, 1)} confirmacion pedido`:
          this.mostrarBotonChat = true;
          this.mostrarBotonEncuesta = true;
          this.mensajeActual = "Escanee el código QR de su mesa para visualizar el estado de su pedido.";
          break;
        case `${this.userInfo.estado.substring(0, 1)} aceptado pedido`:
          this.mostrarBotonChat = true;
          this.mostrarBotonEncuesta = false;
          this.mensajeActual = "Escanee el código QR de su mesa para visualizar el estado de su pedido.";
          break;
        case `${this.userInfo.estado.substring(0, 1)} listo pedido`:
          this.mostrarBotonChat = true;
          this.mostrarBotonEncuesta = false;
          this.mensajeActual = "Escanee el código QR de su mesa para visualizar el estado de su pedido.";
          break;
        case `${this.userInfo.estado.substring(0, 1)} entregado pedido`:
          this.mostrarBotonChat = true;
          this.mostrarBotonEncuesta = false;
          this.mensajeActual = "Escanee el código QR de su mesa para visualizar el estado de su pedido, confirmar la recepción del mismo o acceder a la encuesta.";
          break;
        case `${this.userInfo.estado.substring(0, 1)} comiendo`:
          this.mostrarBotonChat = true;
          this.mostrarBotonEncuesta = false;
          this.mensajeActual = "Escanee el código QR de su mesa para visualizar el estado de su pedido, solicitar la cuenta o acceder a la encuesta.";
          break;
        case `${this.userInfo.estado.substring(0, 1)} pagando`:
          this.mostrarBotonChat = true;
          this.mostrarBotonEncuesta = false;
          this.mensajeActual = "Escanee el código QR correspondiente al grado de su satisfacción con el servicio o el QR de su mesa para visualizar los detalles de la cuenta.";
          break;
        case `${this.userInfo.estado.substring(0, 1)} pago`:
          this.mostrarBotonChat = true;
          this.mostrarBotonEncuesta = false;
          this.mensajeActual = "Por favor, aguarde un momento mientras confirmamos la recepción de su pago.";
          break;
        case `saliendo`:
          this.mostrarBotonChat = false;
          this.mostrarBotonEncuesta = false;
          this.mensajeActual = "¡Pago recibido con éxito, gracias por elegirnos, esperamos volver a verlo pronto!";
          break;
      }
    }
  }

  chat() {
    this.showLoading();
    setTimeout(() => {
      this.router.navigate(['chat']);
    }, 2000);
  }

}
