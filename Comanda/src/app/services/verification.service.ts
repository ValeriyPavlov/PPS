import { Injectable } from '@angular/core';
import { Firestore, collection, doc, onSnapshot, setDoc, updateDoc, query } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  private dataRef = collection(this.firestore, 'verifyUsers');
  public uidActual = "";
  public usuarioActual: User | null = null;
  public subList!: any;
  public primerIngreso = false;

  constructor(private firestore: Firestore, private notificationService: NotificationService, private userService: UserService) { }
  createUser(user: User) {
    if (user === null) return Promise.reject();
    const docs = doc(this.dataRef, user.id);
    return setDoc(docs, user);
  }

  updateUser(user: User): void {
    if (user === null) return;
    const docs = doc(this.dataRef, user.id);
    updateDoc(docs, { verificado: user.verificado, estadoVerificado: user.estadoVerificado });
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
          const user = x.doc.data() as User;
          if (user.estadoVerificado === 'pendiente')
            users.push(user);
        });
        observer.next(users);
      });
    });
  }

  getAll2(users: User[]) {

    const q = query(collection(this.firestore, 'verifyUsers'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const user = change.doc.data() as User
          if (user.estadoVerificado === 'pendiente') {
            users.push(user);

          }
        }
      });
    });

    this.subList = unsubscribe;
    return unsubscribe;
  }

  getList(/*users: User[]*/) {
    let countNoti = 0;
    const q = query(collection(this.firestore, 'verifyUsers'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const user = change.doc.data() as User
          if (user.estadoVerificado === 'pendiente') {
            //users.push(user);
            if (this.userService.usuarioActual && this.userService.usuarioActual.rol == 'admin' && countNoti == 0 && this.primerIngreso) {
              this.notificationService.send("Nuevo Cliente", "Un nuevo cliente ha solicitado ingreso");
            }
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
