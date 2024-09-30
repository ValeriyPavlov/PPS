export class User{
    public id: number;
    public correo: string;
    public clave: string;
    public sexo: string;
    public perfil: string;

    constructor(
        id: number,
        correo: string,
        clave: string,
        sexo: string,
        perfil: string
    ){
        this.id = id;
        this.correo = correo;
        this.clave = clave;
        this.sexo = sexo;
        this.perfil = perfil;
    }

}