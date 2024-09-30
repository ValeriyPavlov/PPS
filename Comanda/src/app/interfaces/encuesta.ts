export interface Encuesta {
    // range, input, radio, check, select
    // range del 1-10 que tan satisfecho esta
    // radio volveria al lugar
    // check que es lo mas destaco comida/servicio/ambiente/bebida
    // select si recomendaria el lugar (poco probable, probable, muy probable)
    // foto1
    // foto2
    // foto3
    id: string;
    clasificacion: number;
    volveria: string;
    destacados: string[];
    recomendacion: string;
    comentario: string;
    fotos: string[];
}
