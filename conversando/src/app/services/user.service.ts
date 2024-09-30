import { Injectable } from '@angular/core';
import { collection, getDocs, getFirestore, onSnapshot, query, orderBy, doc, setDoc, where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';
import { User } from '../entities/User';
import { Message } from '../entities/Message';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users: User[] = [];
  public user: User | null = null;
  public salaActual: string = "";
  public usersQuickAccess: any[] = [];
  public mensajes: Message[] = [];
  public fechas: string[] = [];

  constructor() { }

  public async getUsers(){
    const q = query(collection(db, "login"));
    onSnapshot(q, (col) => {
      this.users = [];
      col.forEach(async (doc) =>{
        var usuario = doc.data() as User;
        this.users.push({...usuario});
      });
      return this.users;
    });
  }

  public async logIn(correo: string, clave: string)
  {
    const docRef = await getDocs(collection(db, "login"));
    var bandera = false;
    try 
    {
      docRef.forEach((doc) => {
        if (doc.get("correo") == correo && doc.get("clave") == clave)
        {
          bandera = true;
          this.user = new User(doc.get("id"), doc.get("correo"), doc.get("clave"), doc.get("sexo"), doc.get("perfil"));
        }
      });
    }
    catch (err) 
    {
      console.log(err);
    }
    return bandera;
  }

  public async EnviarMensaje(mensaje: string)
  {
    if(mensaje != '')
    {
      const newChatRef = doc(collection(db, "chat"));
      await setDoc(newChatRef, {usuario: this.user?.correo, fecha: Date.now(), mensaje: mensaje, sala: this.salaActual});
      //Autoscroll?
    }
  }

  public refreshChat()
  {
    const q = query(collection(db, "chat"), orderBy("fecha"), where("sala", "==", this.salaActual));
    const unsub = onSnapshot(q, (col) => {
      this.mensajes = [];
      this.fechas = [];
      col.forEach((doc) =>{
        this.mensajes.push({fecha: doc.get('fecha'), sala: doc.get('sala'), usuario: doc.get('usuario'), mensaje: doc.get('mensaje')} as Message);
        this.getFechas(doc.get('fecha'));
        // var usuario = doc.get("usuario");
        // this.mensajes.push(`${this.crearHorario(new Date(doc.get("fecha")))} - ${usuario}: ${doc.get("mensaje")}`);
      });
    });
  }

  public getFechas(date: number){
      let fecha = new Date(date);
      let dia = fecha.getDate();
      let mes = fecha.getMonth() + 1; // Nombre completo del mes
      let anio = fecha.getFullYear();
      let completa = `${dia}/${mes}/${anio}`
      if(!this.fechas.includes(completa)){
        this.fechas.push(completa);
      }
  }
}

const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);