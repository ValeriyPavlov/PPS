import { Injectable } from '@angular/core';
import { Mensaje } from '../interfaces/mensaje';
import { Firestore, collection, addDoc, query, onSnapshot } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { User } from '../interfaces/user';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public subChat!: any;
  public user!: User;
  private firstFlag: boolean = false;

  constructor(private firestore: Firestore, private auth: AuthService, private userService: UserService, private notificationService: NotificationService) {
    this.auth.getUserLogged().subscribe(u => this.userService.getUserByEmail(u?.email!).subscribe(user => this.user = user));
  }

  agregarChat(nuevosMensaje: Mensaje, chat: string): Promise<any> {
    const col = collection(this.firestore, chat);
    return addDoc(col, nuevosMensaje);
  }

  obtenerChat(mensajes: Mensaje[], chat: string): Promise<boolean> {
    const q = query(collection(this.firestore, chat));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const msg = { "emisor": change.doc.data()['emisor'], "email": change.doc.data()['email'], "fecha": change.doc.data()['fecha'], "texto": change.doc.data()['texto'], "mesa": change.doc.data()['mesa'] };
          mensajes.push(msg);
          mensajes.sort(this.compararPorFecha);
          if (this.firstFlag && this.user.cargo == 'mozo' && msg.mesa != 'Mozo') {
            this.notificationService.send("Nuevo mensaje", "Un cliente ha enviado un nuevo mensaje");
          }
        }
      });
      this.firstFlag = true;
    });

    this.subChat = unsubscribe;
    return new Promise<boolean>((resolve, reject) => { resolve(true) })
  }

  compararPorFecha(a: Mensaje, b: Mensaje): number {
    const fechaA = new Date(a.fecha.split(' - ')[1] + ' ' + a.fecha.split(' - ')[0]);
    const fechaB = new Date(b.fecha.split(' - ')[1] + ' ' + b.fecha.split(' - ')[0]);
    let cmp = 0;
    if (fechaA < fechaB) { cmp = -1; }
    else if (fechaA > fechaB) { cmp = 1; }
    return cmp;
  }

}
