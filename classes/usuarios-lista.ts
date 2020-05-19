import { Usuario } from './usuario';


export class UsuariosLista {

    private lista:Usuario [] = [];

    constructor(){}

    //agregar un usuario
    public agregar(usuario:Usuario){

        this.lista.push(usuario);

        console.log(this.lista);

        return usuario;

    }

    public actualizarNombre(id:string,nombre:string){

        for (let usuario of this.lista) {

            if(usuario.id === id){
                usuario.nombre = nombre;
                break;    
            }

        }

        console.log('===================Actualizando Usuario=============');
        console.log(this.lista);
        
    }

    //obtener toda la lista de usuarios conectados
    public getLIsta(){
        return this.lista;
    }

    public getUsuario(id:string){
        return this.lista.find(usuario=> usuario.id === id);
    }

    //obtener usuario de una sala en particular
    public getusuariosEnSala(sala:String){
        return this.lista.filter(usuario => usuario.sala == sala);
    }

    //borrar un usuario cuando deja la conexion de socket
    public borrarusuarioSocket(id:string){
        const tempUsuario = this.getUsuario(id);

        this.lista = this.lista.filter(usuario=> usuario.id !== id );

        return tempUsuario;
    }

}