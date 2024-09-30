import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EncuestasService } from '../services/encuestas.service';
import { Encuesta } from '../interfaces/encuesta';
import { ImageService } from '../services/image.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-alta-encuentas',
  templateUrl: './alta-encuestas.page.html',
  styleUrls: ['./alta-encuestas.page.scss'],
})
export class AltaEncuestasPage implements OnInit {

  public calificacion: number = 0;
  public destacado: string[] = [];
  public recomendacion: string = '';
  public volveria: string = '';
  public comentario: string = '';
  public fotos: string[] = []


  constructor(private fb: FormBuilder, private encuentaService: EncuestasService, private imageService: ImageService, private router: Router, private orderService: OrderService, private user: UserService) { }

  ngOnInit() {

  }

  crearEncuesta() {
    if(this.calificacion != 0 && this.recomendacion != "" && this.volveria != ""){
      const encuesta: Encuesta = {
        id: '',
        clasificacion: this.calificacion,
        volveria: this.volveria,
        destacados: this.destacado,
        recomendacion: this.recomendacion,
        comentario: this.comentario,
        fotos: this.fotos,
      }
      if(this.user.usuarioActual != null){
        this.orderService.getMyOrder(this.user.usuarioActual.id).subscribe((orden) => {
          this.orderService.updateOrderEncById(orden[0].id, true);
          this.encuentaService.createEncuesta(encuesta);
          this.router.navigateByUrl("home-cliente");
        });
      }
    }
    else{
      swal.fire({ title: "Error", text: "Debe completar todos los campos.", icon: "error", heightAuto: false, confirmButtonText: "Aceptar" });
    }
  }

  calificacionChange(event: any) {
    console.log(event.detail.value);
    this.calificacion = event.detail.value;

  }

  destacadoChange(event: any) {
    console.log(event);
    const data = event.detail;
    if (data.checked) {
      this.destacado.push(data.value)
    } else {
      this.destacado = this.destacado.filter(item => item !== data.value);
    }
    console.log(this.destacado);

  }
  recomendacionChange(event: any) {
    this.recomendacion = event.detail.value;
  }

  volveriaChange(event: any) {
    this.volveria = event.detail.value;
  }


  async takePicture() {
    if (this.fotos.length < 3){
      this.imageService.takePhoto("foto_encuesta").then((res) => {
        if (res != null) {
          this.fotos.push(res);
          console.log(res);

        };
      });
    }
    else{
      swal.fire({ title: "Error", text: "3 fotos como máximo.", icon: "error", heightAuto: false, confirmButtonText: "Aceptar" });
    }
  }
}
