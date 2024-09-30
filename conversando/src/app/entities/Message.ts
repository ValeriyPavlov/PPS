export class Message{
    usuario: string;
    fecha: number;
    mensaje: string;
    sala: string;

    constructor(usuario: string, fecha: number,mensaje: string, sala: string){
        this.usuario = usuario;
        this.fecha = fecha;
        this.mensaje = mensaje;
        this.sala = sala;
    }
}