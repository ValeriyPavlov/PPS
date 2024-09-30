import { Component, OnInit, ViewChild  } from '@angular/core';
import { Mensaje } from '../interfaces/mensaje';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TableService } from '../services/table.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild('content') private content: any;

  constructor(private chatService: ChatService, private authService: AuthService, private router: Router, private userService: UserService, private tableService: TableService) { }

  public usuarioLogeado!: User;
  public mesa!: string;
  public nuevoMensaje: Mensaje = {
    emisor: '',
    email: '',
    fecha: '',
    texto: '',
    mesa: '',
  };
  public mensajes: Mensaje[] = [];
  public sub!: any;

  async ngOnInit() {
    this.authService.getUserLogged().subscribe(user => {
      this.userService.getUserByEmail(user?.email!).subscribe(u => {
        this.usuarioLogeado = u;
        this.tableService.getAssociatedTable(this.usuarioLogeado.id).subscribe(m => this.mesa = m.id);
      });

    });
    this.chatService.obtenerChat(this.mensajes, "chat")
      .then(res => {
        this.scrollToBottomOnInit();
        //this.scrollToTheLastElementByClassName();
      })
  }

  ngOnDestroy(): void {
    this.mensajes = [];
  }

  
  scrollToBottomOnInit() {
      setTimeout(() => {
        if (this.content.scrollToBottom) {
            this.content.scrollToBottom(400);
        }
    }, 300);
  }

  
  ionViewDidEnter(){
    this.scrollToBottomOnInit();
  }

  async enviarMensaje() {
    this.scrollToBottomOnInit();
    if (this.nuevoMensaje.texto != '') {
      //this.nuevoMensaje.emisor = this.usuarioLogeado.email;
      console.log(this.usuarioLogeado);

      let mensaje = {
        emisor: this.usuarioLogeado.nombre,
        email: this.usuarioLogeado.email,
        texto: this.nuevoMensaje.texto,
        fecha: new Date().toTimeString() + " - " + new Date().toDateString(),
        mesa: this.mesa ? 'Mesa ' + this.mesa : 'Mozo',
      };
      try {
        await this.chatService.agregarChat(mensaje, "chat").then((chat) => {
          this.nuevoMensaje.texto = '';
          setTimeout(() => {
            //this.scrollToTheLastElementByClassName();
            this.scrollToBottomOnInit();
          }, 20);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  convertirAFechaString(cadenaFecha: string): string {
    const partes = cadenaFecha.split(" - ");
    const horaParte = partes[0]; // Hora en formato HH:MM:SS GMT
    const fechaParte = partes[1]; // Fecha en formato Day Mon Date Year

    const fecha = new Date(fechaParte);

    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11 en JavaScript
    const año = fecha.getFullYear().toString().slice(-2); // Obtenemos los últimos dos dígitos del año

    const horas = horaParte.split(':')[0];
    const minutos = horaParte.split(':')[1];

    const fechaFormateada = `${dia}/${mes}/${año} ${horas}:${minutos}`;
    return fechaFormateada;
  }



  // scrollToTheLastElementByClassName() {
  //   let element = document.getElementsByClassName('msj');
  //   if (element.length > 0) {
  //     let lastElement: any = element[element.length - 1];
  //     let toppos = lastElement.offsetTop;
  //     const contMsg = document.getElementById('contendedorMensajes');
  //     // console.log(contMsg!.scrollTop);
  //     contMsg!.scrollTop = toppos;
  //   }
  // }

  back() {
    //this.scrollToTheLastElementByClassName();
    this.scrollToBottomOnInit();
  }

  getUsernameFromEmail(email: string): string {
    const atIndex = email.indexOf('@');
    if (atIndex === -1) {
      return '';
    }
    return email.substring(0, atIndex);
  }

}
