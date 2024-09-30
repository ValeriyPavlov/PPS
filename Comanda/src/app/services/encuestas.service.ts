import { Injectable } from '@angular/core';
import { Firestore, collection, doc, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Encuesta } from '../interfaces/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  private dataRef = collection(this.firestore, 'encuestas');


  constructor(private firestore: Firestore) { }

  createEncuesta(encuesta: Encuesta) {
    if (encuesta === null) return Promise.reject();
    const docs = doc(this.dataRef);
    encuesta.id = docs.id;
    return setDoc(docs, encuesta);
  }

  // updateEncuesta(encuesta: Encuesta): void {
  //   if (encuesta === null) return;
  //   const docs = doc(this.dataRef, encuesta.id);
  //   updateDoc(docs, { verificado: encuesta.verificado, estadoVerificado: encuesta.estadoVerificado });
  // }

  getEncuestaById(uid: string): Observable<Encuesta> {
    return new Observable<Encuesta>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        snap.docChanges().forEach(x => {
          const data = x.doc.data() as Encuesta;
          if (data.id === uid) {
            observer.next(data);
          }
        });
      });
    });
  }

  getAll(): Observable<Encuesta[]> {
    return new Observable<Encuesta[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const encuestas: Encuesta[] = [];
        snap.docChanges().forEach(x => {
          const u = x.doc.data() as Encuesta;
          encuestas.push(u);
        });
        observer.next(encuestas);
      });
    });
  }

}
