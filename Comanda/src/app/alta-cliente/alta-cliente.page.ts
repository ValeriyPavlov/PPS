import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2';
import { ImageService } from '../services/image.service';
import { QrService } from '../services/qr.service';
import { VerificationService } from 'src/app/services/verification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.page.html',
  styleUrls: ['./alta-cliente.page.scss'],
})
export class AltaClientePage implements OnInit {

  //public userList : User[] = [];
  public suscription!: Subscription;
  public seleccion: string = "Ninguno";
  public flag: boolean = false;

  public formulario: FormGroup = this.forms.group({
    email: ['', [Validators.required, Validators.email]],
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z ]+$')]],
    apellido: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z ]+$')]],
    dni: ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    passwordConfirmation: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    foto: ['', [Validators.required]],
  });

  constructor(private user: UserService, private forms: FormBuilder, private auth: AuthService, private imageService: ImageService, private qrService: QrService, private verificationService: VerificationService, private router: Router) {

  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    //this.suscription.unsubscribe();
  }

  checkError(key: string): boolean | null {
    if (this.flag == false) {
      this.flag = true;
      return true;
    }

    if(key == "passwordConfirmation" && this.formulario.controls[key].errors == null)
    {
      return this.formulario.value["passwordConfirmation"] != this.formulario.value["password"];
    }

    return this.formulario.controls[key].errors && this.formulario.controls[key].touched;
  }

  getError(key: string): string | null {
    if (!this.formulario.controls[key] && !this.formulario.controls[key].errors) return " ";

    const errores = this.formulario.controls[key].errors;

    if (this.seleccion == "Ninguno" || this.seleccion == key)//Para que no soprepase la pantalla
    {
      if(key == "passwordConfirmation" && errores == null)
      {
        return "Las contraseñas deben ser iguales";
      }

      for (const clave of Object.keys(errores!)) {
        switch (clave) {
          case 'required':
            if (key == 'foto') {
              return "Es necesario que adjunte la foto";
            }
            return "Este campo es requerido";
          case 'minlength':
            return `Minimo ${errores!['minlength'].requiredLength} caracteres.`;
          case 'maxlength':
            return `Maximo ${errores!['maxlength'].requiredLength} caracteres.`;
          case 'min':
            return `Como minimo debe ser ${errores!['min'].min}.`;
          case 'max':
            return `Como maximo debe ser ${errores!['max'].max}.`;
          case 'email':
            return "El formato del mail es incorrecto";
          case 'pattern':
            return `El formato del ${key} es incorrecto`;
        }
      }
    }
    return " ";
  }

  public async register() {
    //Agregar Spinner
    setTimeout(async () => {
      if (this.formulario.valid) {
        //Crear cuenta
        if(this.formulario.value["password"] == this.formulario.value["passwordConfirmation"])
        {
          const user: User = { email: this.formulario.value["email"], password: this.formulario.value["password"], apellido: this.formulario.value["apellido"], nombre: this.formulario.value["nombre"], dni: this.formulario.value["dni"], foto: this.formulario.value["foto"], id: "", rol: "cliente", cargo: "registrado", verificado: false, estadoVerificado: 'pendiente', estado: "pendiente" };
          try {
            await this.auth.register(user);
            await this.user.createUser(user);
            await this.verificationService.createUser(user);
            swal.fire({ title: "Agregado", text: "Cliente registrado con exito", icon: "success", heightAuto: false, confirmButtonText: "Aceptar" });
            setTimeout(() => {
              this.router.navigate(['log']);
            }, 2000)
          } catch (error) {
            swal.fire({ title: "Error", text: "El correo electrónico ya se encuentra registrado.", icon: "error", heightAuto: false, confirmButtonText: "Aceptar" });
          }
        }
        else
        {
          swal.fire({ title: "Error", text: "Revise sus datos", icon: "error", heightAuto: false, confirmButtonText: "Aceptar" });
        }
      }
      else {
        swal.fire({ title: "Error", text: "Revise sus datos", icon: "error", heightAuto: false });
        this.formulario.markAllAsTouched();
      }
      //Esconder Spinner
    }, 1000);
  }

  async takePicture() {
    this.imageService.takePhoto("foto_usuario").then((res) => {
      console.log(res);
      this.formulario.controls["foto"].setValue(res);
    });
  }

  async scanQr() {

    await this.qrService.scanQr();

    if (this.qrService.qr != "") {
      let listaDatos = this.qrService.qr.split("@");

      if (listaDatos.length == 9) {
        let nombre = listaDatos[2].charAt(0).toUpperCase() + listaDatos[2].slice(1).toLowerCase();
        let apellido = listaDatos[1].charAt(0).toUpperCase() + listaDatos[1].slice(1).toLowerCase();
        let dni = parseInt(listaDatos[4]);
        let nombreAux = ""

        for (let i = 0; i < nombre.length; i++) {
          if (i === 0 || nombre[i - 1] === " ") {
            nombreAux += nombre[i].toUpperCase();
          }
          else {
            nombreAux += nombre[i]
          }
        }


        this.formulario.controls["nombre"].setValue(nombreAux);
        this.formulario.controls["apellido"].setValue(apellido);
        this.formulario.controls["dni"].setValue(dni);
      }
      else {
        swal.fire({ title: "Error", text: "Error al escanear el DNI, vuelva a intentarlo", icon: "error", heightAuto: false, confirmButtonText: "Aceptar" });
      }
    }
    else {
      swal.fire({ title: "Error", text: "Error al escanear el DNI, vuelva a intentarlo", icon: "error", heightAuto: false, confirmButtonText: "Aceptar" });
    }
  }
}