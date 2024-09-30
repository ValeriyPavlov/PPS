import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';
import { Order, Product } from '../interfaces/product';
import { Subscription, firstValueFrom } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home-cocinero-barman',
  templateUrl: './home-cocinero-barman.page.html',
  styleUrls: ['./home-cocinero-barman.page.scss'],
})
export class HomeCocineroBarmanPage implements OnInit, OnDestroy {

  public pedidos: Order[] = [];
  private unsub: any;
  private suscripcion: Subscription | null = null;
  constructor(private loadingCtrl: LoadingController, private auth: AuthService, public user: UserService, public orderService: OrderService, private notif: NotificationService) { }

  ngOnInit() {
    this.suscripcion = this.orderService.obtenerOrdenes().subscribe(async ordenes => {
      if (this.pedidos.length == 0) {
        this.pedidos = ordenes;
      }
      else {
        const orden = ordenes[0];
        let i = this.getIndexOrder(orden.id);

        if (i != null) {
          this.pedidos[i] = orden;
          let flag: boolean = true;
          for (let index = 0; index < orden.products.length; index++) {
            if (orden.products[index].ready == true) {
              flag = false;
              break;
            }
          }
          if (orden.state == "aceptado" && flag) {
            this.notif.send("Nuevos Pedidos", `Se han agregado nuevos productos para ser preparados.`);
          }
        }
        else {
          this.pedidos.push(orden);
        }
      }
    }
    )
  }

  getIndexOrder(uid: string) {
    for (let i = 0; i < this.pedidos.length; i++) {
      if (this.pedidos[i].id == uid) {
        return i;
      }
    }
    return null;
  }

  ngOnDestroy() {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
  }


  async changeState(order: Order, product: Product) {
    await this.orderService.updateProductStateById(order.id, product.id, true);
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
