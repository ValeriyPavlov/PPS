import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.page.html',
  styleUrls: ['./alta-empleado.page.scss'],
})
export class AltaEmpleadoPage implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  crearEmpleado(){
    console.log("Empleado dado de alta.");
  }

  tomarFoto(){
    console.log("Tomar foto.");
  }

  async volver(){
    console.log("Volver atras.");
  }

}
