
function ServidorWS(){

    //zona cliente del servidor WS

    this.enviarAlRemitente=function(socket,mensaje,datos){

        socket.emit(mensaje,datos);

    }
    this.enviarATodosMenosRemitente=function(socket,nombre,mensaje,datos){
        socket.to(nombre).emit(mensaje,datos);

   };


 

    this.enviarATodos=function(io,codigo,mensaje,datos){

        io.sockets.in(codigo).emit(mensaje,datos)

    }

    this.enviarGlobal=function(socket,mens,datos){

        socket.broadcast.emit(mens,datos);

    }

 

    //zona servidor del servidor WS

    this.lanzarServidorWS=function(io,juego){

        var cli=this;

        io.on("connection",function(socket){

            console.log("Usuario conectado");

 

            socket.on("crearPartida",function(num,nick){

                var ju1=juego.usuarios[nick];

                if(ju1){

                    var res={codigo:-1};

                    var partida=ju1.crearPartida(num);

                    if(partida){

                        console.log("Nueva partida de "+nick +" codigo: "+ju1.codigoPartida)

                        res.codigo=ju1.codigoPartida;

                        socket.join(res.codigo);

                        cli.enviarAlRemitente(socket,"partidaCreada",res);

                        //var lista=juego.obtenerTodasPartidasDisponibles();

                        var lista=juego.obtenerTodasPartidas();

                        cli.enviarGlobal(socket,"nuevaPartida",lista);

                    }

                    else{

                        cli.enviarAlRemitente(socket,"fallo","La partida no se ha creado");

                    }

                }

                else{

                    cli.enviarAlRemitente(socket,"fallo","El usuario no existe");

                }

            });

 

            socket.on("unirAPartida",function(codigo,nick){

                var ju1=juego.usuarios[nick];

                var res={codigo:-1};

                var partida=juego.partidas[codigo];

                if(ju1 && partida){

                    ju1.unirAPartida(codigo);

                            res.codigo=ju1.codigoPartida;

                            if(res.codigo!=-1){

                                socket.join(res.codigo);

                                console.log(nick+ " se ha unido a la partida que tiene de codigo de partida: " + ju1.codigoPartida);

                                var partida=juego.partidas[codigo];

                                cli.enviarAlRemitente(socket,"unidoAPartida",res);

                                if(partida.fase.nombre=="jugando"){

                                    cli.enviarATodos(io,codigo,"pedirCartas",{});

                                    //var lista=juego.obtenerTodasPartidasDisponibles();

                                    var lista=juego.obtenerTodasPartidas();

                                    cli.enviarGlobal(socket,"nuevaPartida",lista);

                                }

                            }

                            else{

                                cli.enviarAlRemitente(socket,"fallo",res);

                            }

                }else{

                    cli.enviarAlRemitente(socket,"fallo","El usuario o la partida no existen");

            }

            });

 

            socket.on("manoInicial",function(nick){

                var ju1=juego.usuarios[nick];

                if (ju1){

                    ju1.manoInicial();

                    cli.enviarAlRemitente(socket,"mano",ju1.mano);

                    var codigo=ju1.codigoPartida;

                    var partida=juego.partidas[codigo];

                    var nickTurno=partida.turno.nick;

                    cli.enviarATodos(io,codigo,"turno",{turno:nickTurno, cartaActual:partida.cartaActual});

                }else{

                    cli.enviarAlRemitente(socket,"fallo","El usuario  no existe");

            }

 

            })

            socket.on("jugarCarta",function(nick,num){

                var ju1=juego.usuarios[nick];

                if(ju1){

                    ju1.jugarCarta(num);

                    cli.enviarAlRemitente(socket,"mano",ju1.mano);

                    var codigo=ju1.codigoPartida;

                    var partida=juego.partidas[codigo];

                    var nickTurno=partida.turno.nick;

                   // cli.enviarAlRemitente(io,codigo,"turno",{turno:nickTurno, cartaActual:partida.cartaActual});

                    cli.enviarATodos(io,codigo,"turno",{turno:nickTurno, cartaActual:partida.cartaActual});

                        if(partida.fase.nombre=="final"){

                            cli.enviarATodos(io,codigo,"final",{"ganador":nickTurno});

                        }

                }else{

                    cli.enviarAlRemitente(socket,"fallo","El usuario  no existe");

            }

            })

 

            socket.on("robarCarta",function(nick,num){

                var ju1=juego.usuarios[nick];

                if(ju1){
                    var num=ju1.robar(num);
                    ju1.robar(num);

                    cli.enviarAlRemitente(socket,"mano",ju1.mano);
                    if(num==0){
                            var codigo=ju1.codigoPartida
                            var partida=juego.partidas[codigo]
                            var nickturno=partida.turno.nick
                            cli.enviarATodos(io,codigo,"turno",{turno:nickTurno, cartaActual:partida.cartaActual});
                        }

                }else{

                    cli.enviarAlRemitente(socket,"fallo","El usuario  no existe");

            }

            })

 

            socket.on("pasarTurno",function(nick){

                var ju1=juego.usuarios[nick];

                if(ju1){

                    ju1.pasarTurno();

                    var codigo=ju1.codigoPartida;

                    var partida=juego.partidas[codigo];

                    var nickTurno=partida.turno.nick;

                    cli.enviarATodos(io,codigo,"turno",{turno:nickTurno, cartaActual:partida.cartaActual});

                }else{

                    cli.enviarAlRemitente(socket,"fallo","El usuario  no existe");

            }

            socket.on("abandonarPartida",function(nick){
                var ju1=juego.usuarios[nick];
                if(ju1){
                    ju1.abandonarPartida();
                    var codigo=ju1.codigoPartida;

                    cli.enviarATodos(io,codigo,"jugadorAbandona",{});

                }
            })

            socket.on("cerrarSesion",function(nick){
                var ju1=juego.usuarios[nick];
                if(ju1){
                    
                    var codigo=ju1.codigoPartida;

                    var partida=juego.partidas[codigo];
                    if(partida){
                        ju1.abandonarPartida();
                        cli.enviarATodosMenosRemitente(socket,codigo,"Jugador abandona",{});
                    }
                    ju1.cerrarSesion();
                    cli.enviarAlRemitente(socket,"Usuario Eliminado",{});

                }
            })

 

            })

 

           

           

        })

    }

}

 

module.exports.ServidorWS=ServidorWS;