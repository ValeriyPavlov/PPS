import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, firstValueFrom } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ImageService } from '../services/image.service';
import { QrService } from '../services/qr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-anonimo',
  templateUrl: './alta-anonimo.page.html',
  styleUrls: ['./alta-anonimo.page.scss'],
})
export class AltaAnonimoPage implements OnInit {

  //public userList : User[] = [];
  public suscription!: Subscription;
  public seleccion: string = "Ninguno";
  public flag: boolean = false;

  public formulario: FormGroup = this.forms.group({
    //email: ['', [Validators.required,Validators.email]],
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')]],
    //password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    foto: ['', [Validators.required]],
  });

  constructor(private user: UserService, private forms: FormBuilder, private auth: AuthService, private imageService: ImageService, private qrService: QrService, private router: Router) {

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
    return this.formulario.controls[key].errors && this.formulario.controls[key].touched;
  }

  getError(key: string): string | null {
    if (!this.formulario.controls[key] && !this.formulario.controls[key].errors) return " ";

    const errores = this.formulario.controls[key].errors;

    if (this.seleccion == "Ninguno" || this.seleccion == key)//Para que no soprepase la pantalla
    {
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
            return `Solo letras`;
        }
      }
    }
    return " ";
  }

  public async loginAnonimo() {
    //Agregar Spinner
    setTimeout(async () => {
      if (this.formulario.valid) {
        await this.auth.logoutAnonimo();
        const user: User = { email: "", password: "", apellido: "", nombre: this.formulario.value["nombre"], dni: 0, foto: this.formulario.value["foto"], id: "", rol: "cliente", cargo: "anonimo", verificado: true, estadoVerificado: 'anonimo', estado: "registrado" };
        await this.user.createUser(user);
        this.user.usuarioActual = await firstValueFrom(this.user.getUserByUid(this.user.uidActual));
        this.router.navigateByUrl('home-cliente');//HOME DEL ANONIMO
      }
      //Esconder Spinner
    }, 3000);
  }

  async takePicture() {
    this.imageService.takePhoto("foto_usuario").then((res) => {
      console.log(res);
      this.formulario.controls["foto"].setValue(res);
    });
  }
}
