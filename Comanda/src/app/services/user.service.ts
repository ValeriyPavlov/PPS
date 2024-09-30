import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Firestore, addDoc, collection, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { onSnapshot, query } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dataRef = collection(this.firestore, 'users');
  public uidActual = "";
  public usuarioActual: User | null = null;
  public subList!: any;

  constructor(private firestore: Firestore) { }

  createUser(user: User) {
    if (user === null) return Promise.reject();
    const docs = doc(this.dataRef);
    user.id = docs.id;
    this.uidActual = docs.id;
    return setDoc(docs, user);
  }

  updateUser(user: User): void {
    if (user === null) return;
    const docs = doc(this.dataRef, user.id);
    updateDoc(docs, { verificado: user.verificado, estadoVerificado: user.estadoVerificado, estado: user.estado });
  }

  updateUserState(user: User, state: string): void {
    if (user === null) return;
    const docs = doc(this.dataRef, user.id);
    updateDoc(docs, { estado: state });
  }

  updateUserStateById(id: string, state: string): void {
    const docs = doc(this.dataRef, id);
    updateDoc(docs, { estado: state });
  }


  getUserByEmail(email: string): Observable<User> {
    return new Observable<User>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        snap.docChanges().forEach(x => {
          const data = x.doc.data() as User;
          if (data.email === email) {
            observer.next(data);
          }
        });
      });
    });
  }

  getUserByUid(uid: string): Observable<User> {
    return new Observable<User>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        snap.docChanges().forEach(x => {
          const data = x.doc.data() as User;
          if (data.id === uid) {
            observer.next(data);
          }
        });
      });
    });
  }

  getAll(): Observable<User[]> {
    return new Observable<User[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const users: User[] = [];
        snap.docChanges().forEach(x => {
          const u = x.doc.data() as User;
          users.push(u);
        });
        observer.next(users);
      });
    });
  }

}
