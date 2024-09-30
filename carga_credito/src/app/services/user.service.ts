import { Injectable } from '@angular/core';
import { collection, getDocs, getFirestore, onSnapshot, query, setDoc, doc, where, updateDoc } from 'firebase/firestore';
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
  public puntaje: number[] = [];
  public test: any;

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
    this.test = docRef;
    var bandera = false;
    try 
    {
      docRef.forEach((doc) => {
        if (doc.get("correo") == correo && doc.get("clave") == clave)
        {
          bandera = true;
          this.user = new User(doc.get("id"), doc.get("correo"), doc.get("clave"), doc.get("sexo"), doc.get("perfil"));
          this.getPoints();
        }
      });
    }
    catch (err) 
    {
      console.log(err);
    }
    return bandera;
  }

  public async getPoints(){
    let retorno = false;
    const docRef = await getDocs(collection(db, "puntajes"));
    try{
      docRef.forEach((doc) => {
        if(doc.get("email") == this.user?.correo){
          this.puntaje = doc.get("points");
          retorno = true;
        }
      });
    }
    catch(err){
      console.log(err);
    }
    return retorno;
  }

  public async setPoints(userMail: string, points: number[]){
    try 
    {
      const q = query(collection(db, 'puntajes'), where('email', '==', userMail));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size === 0) 
      {
        return false;
      }
      const docSnap = querySnapshot.docs[0];
      const puntRef = doc(db, 'puntajes', docSnap.id);
      await updateDoc(puntRef, {points: {...points}});
      return true;
    } 
    catch (error) 
    {
      return false; 
    }

  }
}

const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);