import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Foto } from '../entities/Foto';

@Component({
  selector: 'app-lindas',
  templateUrl: './lindas.page.html',
  styleUrls: ['./lindas.page.scss'],
})
export class LindasPage implements OnInit {

  public foto: Photo | null = null;
  public fotos: Foto[] = [];
  constructor(public userService: UserService, public router: Router) { 
  }

  ngOnInit() {
    this.userService.traer("linda").subscribe(data => {
      this.fotos = data;
      this.ordenarPorFecha(this.fotos);
    });
  }

  async sacarFoto(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      promptLabelHeader: "Cosas LINDAS",
      promptLabelPicture: "Nueva foto",
      promptLabelPhoto: "Importar desde galería..."
    });
    this.foto = image;
    if (image) {
      this.userService.subirImg(image, "linda");
    }
  }

  ordenarPorFecha(fotos: Foto[]) {
    fotos.sort((a: Foto, b: Foto) => {
      const horaA = new Date(a.date);
      const horaB = new Date(b.date);
      return horaB.getTime() - horaA.getTime();
    });
  }

  getDate(fecha: string){
    const date = new Date(fecha);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}\n${date.getHours()}:${date.getMinutes()}hs`;
    // return date.getDate() + '/' + date.getMonth() + '/' + (date.getFullYear()) + "\n" + date.getHours() + ":" + date.getMinutes() + " hs";
  }

  async vote(photo: Foto) {
    await this.userService.votarFoto(photo, this.userService.user?.correo!);
  }

  checkVotes(photo: Foto): boolean {
    let result = true;
    if (photo.votes.includes(this.userService.user?.correo!)) {
      result = false;
    }
    return result;
  }

  async updatePhotos() {
    this.userService.traer("linda").subscribe(data => {
      this.fotos = data;
      this.ordenarPorFecha(this.fotos);
    });
  }

  volver(){
    this.router.navigateByUrl("principal");
  }

  getIfLiked(foto: Foto){
    let path = "";
    if (foto.votes.includes(this.userService.user?.correo!)) {
      path = "../../assets/like.png";
    }
    else{
      path = "../../assets/dislike.png";
    }
    return path;
  }

  salir(){
    this.userService.user = null;
    this.router.navigateByUrl("home");
  }

  irGraficos(){
    this.router.navigateByUrl("graficos");
  }


}
