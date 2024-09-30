export interface User {
    id: string,
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    foto: string;
    dni: number;
    rol: string;
    cargo: string;
    verificado: boolean;
    estadoVerificado: string;
    estado: string;
}