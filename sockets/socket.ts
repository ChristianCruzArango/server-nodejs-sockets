import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';


export const usuariosConectados = new UsuariosLista();


export const conectarCliente = (cliente:Socket,io:socketIO.Server) =>{

    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = ( cliente: Socket,io:socketIO.Server ) => {

    cliente.on('disconnect', () => {

        console.log('Cliente Desconectado');

        usuariosConectados.borrarusuarioSocket(cliente.id);

        io.emit('usuarios-activos',usuariosConectados.getLIsta());

    });
}

// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {
    
    //Escucha el mensaje
    cliente.on('mensaje', (  payload: { de: string, cuerpo: string }  ) => {

        console.log('Mensaje recibido', payload );

        io.emit('mensaje-nuevo', payload );

    });

}

//Configurar Usuario
export const configurarUsuario = (cliente:Socket,io:socketIO.Server)=>{

    cliente.on('configurar-usuario',(payload:{nombre:string},callback:Function)=>{

        usuariosConectados.actualizarNombre(cliente.id,payload.nombre);

        io.emit('usuarios-activos',usuariosConectados.getLIsta());

        callback({
            ok:true,
            mensaje:'Usuario '+ payload.nombre
        });

        //io.emit('configurar-usuario',payload);
    });    
}

//obtener usuarios 
export const obtenerUsuarios = (cliente:Socket,io:socketIO.Server)=>{

    //se utiliza para escuchar un evento emitido desde el front
    cliente.on('obtener-usuarios',() =>{

        //para enviarlo solo a las personas conectadas
        io.to(cliente.id).emit('usuarios-activos',usuariosConectados.getLIsta());

    });    
}
