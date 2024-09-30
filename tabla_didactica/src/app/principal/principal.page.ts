import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  public selectedTheme: string = "N";
  public selectedLang: string = "S";
  public imagenBandera: string = "../../assets/S.png";
  public imagenTema: string = "../../assets/Img/5.png";
  public audio: HTMLAudioElement = new Audio();
  public img1: string = "../../assets/Img/7.png";
  public img2: string = "../../assets/Img/8.png";
  public img3: string = "../../assets/Img/9.png";
  public img4: string = "../../assets/Img/4.png";
  public img5: string = "../../assets/Img/5.png";
  public img6: string = "../../assets/Img/6.png";
  public img7: string = "../../assets/Img/1.png";
  public img8: string = "../../assets/Img/2.png";
  public img9: string = "../../assets/Img/3.png";
  constructor(public router: Router) { }

  ngOnInit() {

  }

  activarSonido(boton: string){

  }

  reproducir(posicion: string) {
    let path = `${posicion}_${this.selectedTheme}_${this.selectedLang}`;
    this.audio.pause();
    this.audio = new Audio(`../../assets/Audio/${path}.mp3`);
    this.audio.volume = 1;
    this.audio.play();
  }

  selectTheme(theme: string){
    this.selectedTheme = theme;
    if(theme == "A"){
      this.img1 = "../../assets/Img/perro.png";
      this.img2 = "../../assets/Img/tigre.png";
      this.img3 = "../../assets/Img/pinguin.png";
      this.img4 = "../../assets/Img/vaca.png";
      this.img5 = "../../assets/Img/mono.png";
      this.img6 = "../../assets/Img/elefante.png";
      this.img7 = "../../assets/Img/gato.png";
      this.img8 = "../../assets/Img/buho.png";
      this.img9 = "../../assets/Img/chancho.png";
      this.imagenTema = "../../assets/Img/mono.png";
    }else{
      if(theme == "C"){
        this.img1 = "../../assets/Img/amarillo.png";
        this.img2 = "../../assets/Img/celeste.png";
        this.img3 = "../../assets/Img/rojo.png";
        this.img4 = "../../assets/Img/verde.png";
        this.img5 = "../../assets/Img/naranja.png";
        this.img6 = "../../assets/Img/violeta.png";
        this.img7 = "../../assets/Img/azul.png";
        this.img8 = "../../assets/Img/rosado.png";
        this.img9 = "../../assets/Img/marron.png";
        this.imagenTema = "../../assets/Img/rojo.png";
      }
      else{
        if(theme == "N"){
          this.img1 = "../../assets/Img/7.png";
          this.img2 = "../../assets/Img/8.png";
          this.img3 = "../../assets/Img/9.png";
          this.img4 = "../../assets/Img/4.png";
          this.img5 = "../../assets/Img/5.png";
          this.img6 = "../../assets/Img/6.png";
          this.img7 = "../../assets/Img/1.png";
          this.img8 = "../../assets/Img/2.png";
          this.img9 = "../../assets/Img/3.png";
          this.imagenTema = "../../assets/Img/5.png";
        }
      }
    }
  }

  selectLang(lang: string){
    this.imagenBandera = `../../assets/${lang}.png`;
    this.selectedLang = lang;
  }

  logout(){
    this.router.navigateByUrl("home");
  }

}
