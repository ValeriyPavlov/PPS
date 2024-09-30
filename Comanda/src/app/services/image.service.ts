import { Injectable } from '@angular/core';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { collection } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadString } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private photoRef = collection(this.firestore, 'photos');
  constructor(private storage: Storage, private firestore: Firestore) { }


  async takePhoto(nombre: string){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      promptLabelHeader: "Seleccione una opción...",
      promptLabelPicture: "Tomar nueva foto",
      promptLabelPhoto: "Importar desde galería"
    });
    if (image) {
      return await this.uploadImage(image, nombre);
    }
    else{
      return null;
    }
  }
  
  async uploadImage(cameraFile: Photo, nombre: string): Promise<string | null> {
    return new Promise<string>(async (resolve, reject) => {
        const path = `photos/${nombre}_${Date.now()}.jpeg`;
        const storageRef = ref(this.storage, path);
        try {
          let upload = await uploadString(
            storageRef,
            cameraFile?.base64String || '',
            'base64'
          );
          const imageUrl = await getDownloadURL(storageRef);
          resolve(imageUrl);
        } catch (e) {
          reject(null);
        }
      }
    );
  }


}
