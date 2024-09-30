import { Injectable } from '@angular/core';
import { collection, getDocs, getFirestore, onSnapshot, query } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';
import { User } from '../entities/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users: User[] = [];
  public user: User | null = null;
  public usersQuickAccess: any[] = [];

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
}

const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);