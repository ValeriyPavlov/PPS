import { Injectable } from '@angular/core';
import { Firestore, collection, doc, onSnapshot, setDoc, updateDoc, query, where } from '@angular/fire/firestore';
import { Table } from '../interfaces/table';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private firestore: Firestore) { }
  private dataRef = collection(this.firestore, 'tables');
  public subList!: any;
  public primerIngreso = false;

  updateTable(tableId: string, state: string, userId: string = ""): void {
    if (tableId === null) return;
    const docs = doc(this.dataRef, tableId);
    updateDoc(docs, { state: state, associatedUserId: userId });
  }

  getFreeTables(tables: Table[]) {
    let countNoti = 0;
    const q = query(collection(this.firestore, 'tables'), where("state", "==", "libre"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const table = change.doc.data() as Table;
          if (table.state === 'libre') {
            tables.push(table);
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

  getAssociatedTable(uid: string) {
    return new Observable<Table>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        snap.docChanges().forEach(x => {
          const t = x.doc.data() as Table;
          if (t.associatedUserId === uid) {
            observer.next(t);
            observer.complete();
          }
        });
      });
    });
  }
}
