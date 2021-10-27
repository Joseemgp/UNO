function ClienteWS(){
    this.socket;
    this.nick;
    this.codigo;
    this.conectar=function(){
        this.socket=io();
        this.servidorWSCliente();
    }
    this.crearPartida=function(numJug,nick){
        this.nick=nick;
        this.socket.emit("crearPartida",numJug,nick);

    }
    this.unirAPartida=function(codigo,nick){
        this.nick=nick;
        this.socket.emit("unirAPartida",codigo,nick);
        
    }
    this.manoInicial=function(){
        this.emit("manoInicial",this.nick);
    }

    


    //servidor WS del cliente
    this.servidorWSCliente=function(){
        var cli=this;
        this.socket.on("connect",function(){
            console.log("conectado al servidor WS");
        })

        this.socket.on("partidaCreada",function(data){
            console.log(data);
            cli.codigo=data.codigo
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
            cli.meToca();
        })
        //entrada para la respuesta del WS
    }
    this.conectar();

}