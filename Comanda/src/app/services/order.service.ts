import { Injectable } from '@angular/core';
import { Firestore, collection, onSnapshot, query, doc, setDoc, where, getDocs, updateDoc } from '@angular/fire/firestore';
import { Order, Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { TableService } from './table.service';
import { UserService } from './user.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private dataRef = collection(this.firestore, 'orders');
  public subList!: any;
  public primerIngreso = false;

  constructor(private firestore: Firestore, private user: UserService, private notificationService: NotificationService) { }

  async createOrder(order: Order) {
    let flag = false;
    if (order === null) return Promise.reject();
    const q = query(this.dataRef, where("userId", "==", order.userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      flag = true;
    });
    const docs = doc(this.dataRef);
    order.id = docs.id;
    if(flag == false){
      return setDoc(docs, order);
    }else{
      return Promise.reject();
    }
  }


  getMyOrder(userId: string): Observable<Order[]> 
  {
    return new Observable<Order[]>((observable) => {
      onSnapshot(this.dataRef, (snap) => {
        const pedidos: any[] = [];
        snap.docChanges().forEach(x => {
          const pedido = x.doc.data() as Order;
          if(pedido.userId == userId && pedido.state != "libre")
          {
            pedidos.push(pedido);
          }
        });
        observable.next(pedidos);
      });
    });
  }



  updateOrderStateById(id: string, state: string ): void {
    const docs = doc(this.dataRef, id);
    updateDoc(docs, { state: state });
  }

  updateOrderEncById(id: string, encuesta: boolean ): void {
    const docs = doc(this.dataRef, id);
    updateDoc(docs, { encuesta: encuesta });
  }

  rejectOrderById(order: Order): void {
    const docs = doc(this.dataRef, order.id);
    updateDoc(docs, { userId: order.id + "_R" });
  }

  async updateProductStateById(id: string, idProd: string, ready: boolean ) {
    const docs = doc(this.dataRef, id);
    const consulta = query(this.dataRef, where("id", "==", id));
    const consultaEjecuto = await getDocs(consulta);
    consultaEjecuto.forEach(async (datos) => 
    {
      const pedido = datos.data();
      const productos = pedido["products"];
      productos.forEach(async (producto: { ready: boolean; id: string; }) => {
        if (producto.id == idProd){
          producto.ready = ready;
          let verified = this.verifyAllProducts(productos);
          await updateDoc(docs, { products: productos});
          if (verified == true) {
            this.updateOrderStateById(id, "listo");
            this.user.updateUserStateById(pedido["userId"], `${pedido["tableId"]} listo pedido`);
          }
        }
      });
    });
  }

  verifyAllProducts(productos: Product[]){
    let retorno = true;
    productos.forEach(producto => {
      if (producto.ready == false){
        retorno = false;
      }
    });
    return retorno;
  }

  getAllOrders(orders: Order[]) {
    let countNoti = 0;
    const q = query(this.dataRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const order = change.doc.data() as Order;
        orders.push(order);
        if (change.type == "modified" && order.state == "aceptado" && this.user.usuarioActual && (this.user.usuarioActual.cargo == 'cocinero' || this.user.usuarioActual.cargo == 'bartender') && countNoti == 0 && this.primerIngreso) {
          countNoti++;
          this.notificationService.send("Nuevos Pedidos", "Se han agregado nuevos productos a preparar.");
        }
      });
      countNoti = 0;
      this.primerIngreso = true;
    });

    this.subList = unsubscribe;
    return unsubscribe;
  }

  obtenerOrdenes(): Observable<Order[]> 
  {
    return new Observable<Order[]>((observable) => {
      onSnapshot(this.dataRef, (snap) => {
        const ordenes: Order[] = [];
        snap.docChanges().forEach(x => {
          const orden = x.doc.data() as Order;
          ordenes.push(orden);
        });
        observable.next(ordenes);
      });
    });
  }


  getProductsByType(products: Product[], type: string){
    let countNoti = 0;
    const q = query(collection(this.firestore, 'orders'), where("state", "==", "aceptado"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const order = change.doc.data() as Order;
          order.products.forEach(product => {
            if (product.type === type && product.ready == false) {
              products.push(product);
              countNoti++;
            }
          });
        }
      });
      countNoti = 0;
      this.primerIngreso = true;
    });

    this.subList = unsubscribe;
    return unsubscribe;

  }


}
