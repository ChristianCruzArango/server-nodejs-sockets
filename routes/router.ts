import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/socket';

const router = Router();

/*mandar un mensaje priovado se instancia la instancia del serve y como es un patron singelton 
*ya la instancia viene cuando se conecta el servidor
*/
const server = Server.instance;

router.get('/mensajes', ( req: Request, res: Response  ) => {

    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });

});

router.post('/mensajes', ( req: Request, res: Response  ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;

    const payload ={
        de,
        cuerpo
    }  

    /*para enviar mensajes privado a todas las personas 
    */
   server.io.emit('mensaje-nuevo',payload);

    res.json({
        ok: true,
        cuerpo,
        de
    });

});


router.post('/mensajes/:id', ( req: Request, res: Response  ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;

    const payload ={
        de,
        cuerpo
    }  

    /*Se llama el servidor de socket que se encuentra en el io,donde se llama el in
    *que sirve para llamar a una persona que se encuentra en un canal particular,esto realiza el llamada
    a una sala que hace referencia al mismo id de la persona quien recibe el mensaje
    */
    server.io.in(id).emit('mensaje-privado',payload);

  

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});


//Servicio para obtener todos los id de los usuarios conectados
router.get('/usuarios',(req:Request,res:Response)=>{

    //para obtener los id de los sockets
    const server = Server.instance;

    //funcion directa del server sockets para barrer todos los clientes
    server.io.clients((err:any,clientes:string[])=>{

        if(err){
            return res.json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            clientes
        });
    });
});

//Obtener usuarios y sus nombre
router.get('/usuarios/detalle',(req:Request,res:Response)=>{    


    //funcion directa del server sockets para barrer todos los clientes
    server.io.clients((err:any,clientes:string[])=>{

        if(err){
            return res.json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            clientes:usuariosConectados.getLIsta()
        });
    });
});


export default router;


