function ServidorWS(){
    //zona cliente del servidor WS
    this.enviarAlRemitente=function(socket,mensaje,datos){
        socket.emit(mensaje,datos);
    }
    //zona servidor del servidor WS
    this.enviarATodos=function(io,codigo,mensaje,datos){
        io.sockets.in(codigo).emit(mensaje,datos)
    }

    this.lanzarServidorWS = function(io,juego){
        var cli =this;
        io.on("connection",function(socket){
            console.log("Usuario conectado");

            socket.on("crearPartida",function(numJug,nick){
               
                var ju1=juego.usuarios[nick];
            
                var res = {codigo:-1};
                
                    var partida=ju1.crearPartida(num);
                    console.log("Nueva partida de "+nick+"codigo:")
                    res.codigo=ju1.codigoPartida;
                    socket.join(res.codigo);
                
                cli.enviarAlRemitente(socket,"partidaCreada",res);
            })
            socket.on("unirAPartida",function(codigo,nick){
                var ju1 = juego.usuarios[nick];
                var response = {codigo: -1}
            
                
                    ju1.unirAPartida(codigo);
                    response.codigo= codigo;
                    if(response.co!=-1){
                        console.log("Se ha undio a la partida"+nick+"que tiene este codigo"+codigo);
                        socket.join(response.codigo)
                        var partida=juego.partida[codigo];
                        response.send(response);
                     cli.enviarAlRemitente(socket,"unidoAPartida",response);
                        if(partida.fase.nombre=="jugando"){
                            cli.enviarATodos(io,codigo,"pedirCartas",{});
                        }
                    }
                    else{
                        cli.enviarAlRemitente(socket,"fallo",response);
                    }
                   
                }
                
                
                
                
            })
            socket.on("manoInicial",function(nick){
                var ju1=juego.usuarios[nick];
                ju1.manoInicial();
                cli.enviarAlRemitente(socket,"mano",ju1.mano);
            })
        })
    }
}

module.exports.ServidorWS=ServidorWS;