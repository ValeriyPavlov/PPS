import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { UserService } from 'src/app/services/user.service';
import { VerificationService } from 'src/app/services/verification.service';
import { Order } from '../interfaces/product';
import { Subscription, firstValueFrom } from 'rxjs';
import { OrderService } from '../services/order.service';
import swal from 'sweetalert2';
import { TableService } from '../services/table.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home-mozo',
  templateUrl: './home-mozo.page.html',
  styleUrls: ['./home-mozo.page.scss'],
})
export class HomeMozoPage implements OnInit, OnDestroy {

  public ordenes: Order[] = [];
  public usuarios: string[] = [];
  public suscripcion: Subscription | null = null
  public pantalla = "menu";

  constructor(private loadingCtrl: LoadingController, public userService: UserService, private auth: AuthService, private ordenService: OrderService, private mesaService: TableService, private notif: NotificationService, private router: Router) { }

  ngOnInit() {
    this.suscripcion = this.ordenService.obtenerOrdenes().subscribe(async ordenes => {
      if (this.ordenes.length == 0) {
        this.ordenes = ordenes;

        for (let index = 0; index < this.ordenes.length; index++) {
          const user = await firstValueFrom(this.userService.getUserByUid(this.ordenes[index].userId));

          if (user.cargo == "anonimo") {
            this.usuarios.push(user.nombre);
          }
          else {
            this.usuarios.push(user.nombre + " " + user.apellido);
          }
        }
      }
      else {
        const orden = ordenes[0];
        let i = this.getIndexOrder(orden.id);

        if (i != null) {
          this.ordenes[i] = orden;
          if (orden.state == "listo") {
            this.notif.send("Pedido listo.", `El pedido de la mesa ${orden.tableId} esta listo para ser servido.`);
          }
          else if (orden.state == "pagando") {
            this.notif.send("Pidieron cuenta.", `El cliente de la mesa ${orden.tableId} solicitó la cuenta.`);
          }
        }
        else {
          const user = await firstValueFrom(this.userService.getUserByUid(orden.userId));
          let cambio = "";
          if (user.cargo == "anonimo") {
            cambio = user.nombre;
          }
          else {
            cambio = user.nombre + " " + user.apellido;
          }

          this.usuarios.push(cambio);
          this.ordenes.push(orden);
        }
      }
    }
    )
  }

  ngOnDestroy() {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
  }

  getIndexOrder(uid: string) {
    for (let i = 0; i < this.ordenes.length; i++) {
      if (this.ordenes[i].id == uid) {
        return i;
      }
    }

    return null;
  }

  cambiarPantalla(nuevaPantalla: string) {
    this.pantalla = nuevaPantalla;
  }

  verificarPendientes() {
    for (let i = 0; i < this.ordenes.length; i++) {
      const orden = this.ordenes[i];
      if (orden.state == "pendiente") {
        return true;
      }
    }

    return false;
  }

  verificarActivos() {
    for (let i = 0; i < this.ordenes.length; i++) {
      const orden = this.ordenes[i];
      if (orden.state == "aceptado" || orden.state == "listo" || orden.state == "entregado" || orden.state == "pagando") {
        return true;
      }
    }

    return false;
  }

  mostrarDetalles(orden: Order, nombre: string) {
    let productosInfo = "<h5>---------------------------------</h5>";

    for (let i = 0; i < orden.products.length; i++) {
      const producto = orden.products[i];
      productosInfo +=
        `
      <h5 style="text-align: left;">${producto.amount}x ${producto.description} - $${producto.price}</h5>\n 
      `
    }
    productosInfo += "<h5>---------------------------------</h5>";


    swal.fire(
      {
        title: "Pedido de " + nombre,
        html:
          `
      <h4>Tiempo estimado: ${orden.prodTime} minutos</h4>
      <h4>Valor: $ ${orden.totalPrice} ARS</h4>
      <h4>Mesa asignada: ${orden.tableId}</h4>
      <h4>Cantidad de Productos: ${orden.products.length}</h4>
      `,
        icon: "info",
        heightAuto: false,
        confirmButtonText: "Ver Detalles",
        showCloseButton: true
      }).then(respuesta => {
        if (respuesta.isConfirmed) {
          swal.fire
            (
              {
                title: "Detalle Productos",
                html: productosInfo,
                confirmButtonText: "Aceptar",
                heightAuto: false
              }
            ).then(respuesta => {
              this.mostrarDetalles(orden, nombre);
            }
            )
        }
      }
      );
  }

  cambiarEstadoPedido(orden: Order, estadoNuevo: string) {
    if (estadoNuevo == "rechazado") {
      this.userService.updateUserStateById(orden.userId, `${orden.tableId} en mesa`);
      this.ordenService.rejectOrderById(orden);
    }
    else {
      this.ordenService.updateOrderStateById(orden.id, estadoNuevo);
    }

    if (estadoNuevo == "aceptado") {
      this.userService.updateUserStateById(orden.userId, `${orden.tableId} aceptado pedido`);
    }
    else if (estadoNuevo == "entregado") {
      this.userService.updateUserStateById(orden.userId, `${orden.tableId} entregado pedido`);
    }
    else if (estadoNuevo == "libre") {
      this.mesaService.updateTable(orden.tableId, "libre");
      this.userService.updateUserStateById(orden.userId, `saliendo`);
    }
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

  chat() {
    this.showLoading();
    setTimeout(() => {
      this.router.navigate(['chat']);
    }, 2000);
  }

}
