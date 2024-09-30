import { Injectable } from '@angular/core';
import { Firestore, collection, onSnapshot, query, where } from '@angular/fire/firestore';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dataRef = collection(this.firestore, 'products');
  public subList!: any;
  public primerIngreso = false;
  constructor(private firestore: Firestore) { }

  getProductsByType(products: Product[], type: string) {
    let countNoti = 0;
    const q = query(this.dataRef, where("type", "==", type));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const product = change.doc.data() as Product;
          if (product.type === type) {
            products.push(product);
            countNoti++;
          }
        }
      });
      countNoti = 0;
      this.primerIngreso = true;
    });

    this.subList = unsubscribe;
    return unsubscribe;
  }
}
