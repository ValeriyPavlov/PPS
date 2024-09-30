import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { Order, Product } from '../interfaces/product';
import swal from 'sweetalert2';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit, OnDestroy {

  public comidas: Product[] = [];
  public bebidas: Product[] = [];
  public postres: Product[] = [];
  public userInfo: User | null = null;
  private sub: any;
  public pedido: Order = { id: "", totalPrice: 0, prodTime: 0, state: "", products: [], userId: "", tableId: "", encuesta: false};

  constructor(public user: UserService, private auth: AuthService, public productService: ProductService, private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.productService.getProductsByType(this.comidas, "comida");
    this.productService.getProductsByType(this.bebidas, "bebida");
    this.productService.getProductsByType(this.postres, "postre");
    this.sub = this.user.getUserByUid(this.user.usuarioActual!.id).subscribe(user => {
      this.userInfo = user;
    });
    this.pedido = {id: "", totalPrice: 0, prodTime: 0, state: "", products: [], userId: "", tableId: "0", encuesta: false};
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  agregarAlPedido(producto: Product){
    if(!this.pedido.products.includes(producto)){
      this.pedido.products.push(producto);
    }
    else{
      const index = this.pedido.products.indexOf(producto, 0);
      if (index > -1) {
        producto.amount = 1;
        this.pedido.products.splice(index, 1);
      }
    }
  }

  getMaxTime(){
    let max = 0;
    this.pedido.products.map((prod) => {
      if(prod.prodTime > max){
        max = prod.prodTime;
      }
    });
    return max;
  }

  getTotal(){
    let total = 0;
    this.pedido.products.map((prod) => {
      total += prod.price * prod.amount;
    });
    return total;
  }

  async setOrder(){
    let flag = true;
    this.pedido.products.forEach(prod => {
      if(prod.amount < 1 || prod.amount > 100){
        flag = false;
      }
    });
    if(flag == true && this.userInfo != null){
      this.pedido.totalPrice = this.getTotal();
      this.pedido.prodTime = this.getMaxTime();
      this.pedido.state = "pendiente";
      this.pedido.userId = this.userInfo.id;
      this.pedido.encuesta = false;
      this.pedido.tableId = this.userInfo.estado.substring(0, 1);
      try{
        await this.orderService.createOrder(this.pedido).then((res) => {
          if (this.userInfo != null){
          let numMesa = this.userInfo.estado.substring(0, 1);
          this.user.updateUserState(this.userInfo, `${numMesa} confirmacion pedido`);
          swal.fire({ title: "Pedido Realizado", text: "Ha realizado el pedido exitosamente. Por favor, aguarde la confirmación.", icon: "success", heightAuto: false, confirmButtonText: "Aceptar" });
          }
        }, (rej) => {
          swal.fire({ title: "Error", text: "Error, ya ha realizado un pedido, si todavia no fue confirmado puede solicitarle al mozo su cancelación.", icon: "error", heightAuto: false, confirmButtonText: "Aceptar" });
        });

      }
      catch(e){
        swal.fire({ title: "Error", text: "Error, ya ha realizado un pedido, si todavia no fue confirmado puede solicitarle al mozo su cancelación.", icon: "error", heightAuto: false, confirmButtonText: "Aceptar" });
      }
      finally{
        setTimeout(() => {
          this.router.navigate(['home-cliente']);
        }, 2000)
      }
    }
    else{
      swal.fire({ title: "Error", text: "Debe seleccionar cantidades entre 1 y 100.", icon: "error", heightAuto: false, confirmButtonText: "Aceptar" });
    }
  }

  
  logOut() {
    setTimeout(() => {
      this.pedido = {id: "", totalPrice: 0, prodTime: 0, state: "", products: [], userId: "", tableId: "", encuesta: false};
      this.auth.logout();
    }, 2000);
  }

}
