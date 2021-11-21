function ClienteWS(){
    this.socket;
    this.nick;
    this.codigo;
    this.conectar=function(){
        this.socket=io();
        this.servidorWSCliente();
    }
    this.crearPartida=function(numJug,nick){
       // this.nick=nick;
        this.socket.emit("crearPartida",numJug,nick);

    }
    this.unirAPartida=function(codigo,nick){
        this.nick=nick;
        this.socket.emit("unirAPartida",codigo,nick);
        
    }
    this.manoInicial=function(){
        this.socket.emit("manoInicial",this.nick);
    }
    this.jugarCarta=function(numJug){
        this.socket.emit("jugarCarta",this.nick,numJug)
    }
    this.robarCarta=function(numJug){
        this.socket.emit("robar carta ",this.nick,numJug)
    }
    this.pasarTurno=function(){
        this.socket.emit("pasarTurno",this.nick)
    }

    this.abandonarPartida=function(){
        this.socket.emit("abandonarPartida",this.nick);
    }

    this.cerrarSesion=function(){
        this.socket.emit("cerrarSesion",this.nick);
    }
    


    //servidor WS del cliente
    this.servidorWSCliente=function(){
        var cli=this;
        this.socket.on("connect",function(){
            console.log("conectado al servidor WS");
        })

        this.socket.on("partidaCreada",function(data){
            console.log(data);
            cli.codigo=data.codigo;
        })
        this.socket.on("nuevaPartida",function(lista){
            if(!cli.codigo && cli.nick){
                iu.mostrarListaPartidas(lista);

            }

        })
        this.socket.on("unidoAPartida",function(data){
            console.log(data);
            cli.codigo=data.codigo;
        })
        this.socket.on("pedirCartas",function(data){
            cli.manoInicial();
        })
        this.socket.on("mano",function(data){
            console.log(data);
            iu.mostrarMano(data);
            //cli.meToca();
        })

        this.socket.on("turno",function(data){
            console.log(data);
            //cli.meToca();
            iu.mostrarCartaActual(data.cartaActual)
        })
        this.socket.on("fallo",function(data){
            console.log(data);
        })
        this.socket.on("Final", function(data){
            console.log(data)
        })

        this.socket.on("jugadorAbandona",function(){
            iu.mostrarModal("Un jugador abandona la partida")
            iu.limpiar();
            iu.mostrarHome(nick);
            cli.codigo="";
        })
        this.socket.on("usuarioEliminado",function(){
            cli.nick="";
            cli.codigo="";
            $.removeCookie("nick");
            iu.limpiar();
            iu.mostrarAgregarJugador();
        })
        
        //entrada para la respuesta del WS
    }
    this.conectar();

}