function ClienteRest(){

    this.agregarJugador=function(nick){
        $.getJSON("/agregarJugador/"+nick,function(data){
                //se ejecuta cuando conteste el servidor
                console.log(data);
                if(data.nick!=-1){
                    ws.nick=data.nick;
                    $.cookie("nick",data.nick);
                    iu.mostrarListaPartidas();
                    rest.obtenerTodasPartidas();
                   iu.mostrarHome();
                }else{
                    iu.mostrarModal("El nick"+nick+"esta en uso");
                    iu.mostrarAgregarJugador();
                    
                }
            
        })
      /*  if(data.nick!=-1){
            ws.nick=data.nick;
            iu.mostrarCrearPartida();
            cli.obtenerTodasPartidas();

        }else{
            iu.mostrarAgregarJugador();
        }*/
        //sigue la ejecucion sin esperar 
        //mostrar una ruleta
    }
    this.crearPartida=function(numJug,nick){
        $.getJSON("/crearPartida/"+numJug+"/"+nick,function(data){
            console.log(data);
        })
    }

    this.unirAPartida=function(codigo,nick){
        $.getJSON("/unirAPartida/"+codigo+"/"+nick,function(data){
            console.log(data);
        })
    }

    this.obtenerTodasPartidas=function(){
        $.getJSON("/obtenerTodasPartidas/",function(data){
            console.log(data);
            iu.mostrarTodasPartidas(data);
        })
    }

    this.obtenerPartidasDisponibles=function(){
        $.getJSON("/obtenerPartidasDisponibles/",function(data){
            console.log(data);
            iu.mostrarTodasPartidas(data);
        })
    }
}