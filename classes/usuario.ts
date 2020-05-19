
export class Usuario {

    //todos los clientes conectados o usuario deben tener si o si un id para identificarlos
    public id:string;
    public nombre:string;
    public sala:string;

    constructor(id:string){

        this.id = id;
        this.nombre = 'sin-nombre';
        this.sala   = 'sin-sala'; 

    }

}