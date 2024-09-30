import { Injectable } from '@angular/core';
import { collection, getDocs, getFirestore, onSnapshot, query, doc, setDoc } from 'firebase/firestore';
import { Storage, getDownloadURL, ref, uploadString } from '@angular/fire/storage';
import { updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';
import { User } from '../entities/User';
import { Photo } from '@capacitor/camera';
import { Observable } from 'rxjs';
import { Foto } from '../entities/Foto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public fotoRef = collection(db, 'fotos');
  public users: User[] = [];
  public user: User | null = null;
  public usersQuickAccess: any[] = [];

  constructor(private storage: Storage) { }

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


  async subirImg(cameraFile: Photo, fotoType: string): Promise<string | null> {
    return new Promise<string>(async (resolve, reject) => {
        const path = `fotos/${fotoType}_${this.user?.correo}_${Date.now()}.jpeg`;
        const storageRef = ref(this.storage, path);
        try {
          console.log("Entro al Try");
          let upload = await uploadString(
            storageRef,
            cameraFile?.base64String || '',
            'base64'
          );
          console.log("Upload: " + upload);
          const imageUrl = await getDownloadURL(storageRef);
          console.log("Download: " + imageUrl);
          const foto = {
            id: '',
            url: imageUrl,
            user: this.user?.correo,
            type: fotoType,
            date: Date.now(),
            votes: [],
          };
          const docs = doc(this.fotoRef);
          foto.id = docs.id;
          await setDoc(docs, foto);
          resolve(imageUrl);
        } catch (e) {
          reject(null);
        }
      }
    );
  }



  traer(tipo: string): Observable<Foto[]> {
    return new Observable<Foto[]>((observer) => {
      onSnapshot(this.fotoRef, (snap) => {
        const fotos: Foto[] = [];
        snap.docs.forEach(doc => {
          const one = doc.data() as Foto;
          if(tipo == one.type){
            fotos.push(one);
          }
        });
        observer.next(fotos);
      });
    });
  }

  async votarFoto(foto: Foto, user: string) {
    if (user) {
      const docsPhoto = doc(this.fotoRef, foto.id);
      if(!foto.votes.includes(user)){
        foto.votes.push(user);
      }else{
        let index = foto.votes.indexOf(user);
        if (index > -1) {
          foto.votes.splice(index, 1);
       }
      }
      updateDoc(docsPhoto, { votes: foto.votes });
    }
  }
}

const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);