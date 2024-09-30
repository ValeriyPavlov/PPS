import { Injectable } from '@angular/core';
import { Firestore, collection, doc, onSnapshot, setDoc, updateDoc, query, deleteDoc } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class WaitingListService {

  private dataRef = collection(this.firestore, 'waitingList');
  public usuarioActual: User | null = null;
  public subList!: any;
  public primerIngreso = false;

  constructor(private firestore: Firestore, private notificationService: NotificationService, private userService: UserService) { }

  createUser(user: User) {
    if (user === null) return Promise.reject();
    const docs = doc(this.dataRef, user.id);
    return setDoc(docs, user);
  }

  deleteUser(userId: string): void {
    if (userId === null) return;
    const docs = doc(this.dataRef, userId);
    deleteDoc(docs);
  }

  getUserByUid(uid: string): Observable<User[]> {
    return new Observable<User[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const users: User[] = [];
        snap.docChanges().forEach(x => {
          const user = x.doc.data() as User;
          if (uid == user.id) {
            users.push(user);
          }
        });
        observer.next(users);
      });
    });
  }



  getAll(): Observable<User[]> {
    return new Observable<User[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const users: User[] = [];
        snap.docChanges().forEach(x => {
          const user = x.doc.data() as User;
          users.push(user);
        });
        observer.next(users);
      });
    });
  }

  getList(users: User[]) {
    let countNoti = 0;
    const q = query(collection(this.firestore, 'waitingList'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "added") {
          const user = change.doc.data() as User
          users.push(user);
          if (this.userService.usuarioActual && this.userService.usuarioActual.cargo == 'maitre' && countNoti == 0 && this.primerIngreso) {
            // TODO: Fixear doble notificacion!
            this.notificationService.send("Nuevo Cliente", "Hay nuevos clientes en la lista de espera.");
          }
          countNoti++;
        }
        else if (change.type == "removed") {
          const user = change.doc.data() as User
          const index = users.indexOf(user, 0);
          if (index > -1) {
            users.splice(index, 1);
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
