import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Message } from '../entities/Message';

@Component({
  selector: 'app-chata',
  templateUrl: './chata.page.html',
  styleUrls: ['./chata.page.scss'],
})
export class ChataPage implements OnInit {

  @ViewChild('content') private content: any;

  public mensaje: string = "";
  constructor(public router: Router, public userService: UserService) { }

  ngOnInit() {
    this.userService.refreshChat();

  }

  ionViewDidEnter(){
    this.userService.refreshChat();
    this.scrollToBottomOnInit();
  }

  scrollToBottomOnInit() {
    // this.content.scrollToBottom(300);
      setTimeout(() => {
        if (this.content.scrollToBottom) {
            this.content.scrollToBottom(400);
        }
    }, 300);
  }

  getMensajesPorFecha(fecha: string){
    let mensajes: Message[] = [];
    this.userService.mensajes.forEach(mensaje => {
      if(fecha == this.crearFecha(mensaje.fecha)){
        mensajes.push(mensaje);
      }
    });
    return mensajes;
  }

  enviar(){
    this.userService.EnviarMensaje(this.mensaje);
    this.mensaje = "";
    this.scrollToBottomOnInit();
  }

  logout(){
    this.router.navigateByUrl("home");
  }
  
  volver(){
    this.router.navigateByUrl("principal");
  }

  public crearHorario(date: number)
  {
    let horario = new Date(date);
    let horas = horario.getHours();
    let minutos = horario.getMinutes();
    let minutosStr = '';
    let horarioFinal = `${horas}:${minutos}`;
    if(minutos < 10)
    {
      minutosStr = '0' + minutos.toString();
      horarioFinal = `${horas}:${minutosStr}`;
    }
    return horarioFinal;
  }

  public crearFecha(date: number){
    let fecha = new Date(date);
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1; // Nombre completo del mes
    let anio = fecha.getFullYear();
    let completa = `${dia}/${mes}/${anio}`
    return completa;
  }

}
