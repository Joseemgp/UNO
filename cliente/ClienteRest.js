function ClienteRest(){

    this.agregarJugador=function(nick){
        $.getJSON("/agregarJugador/"+nick,function(data){
                //se ejecuta cuando conteste el servidor
                console.log(data);
        })

        //sigue la ejecucion sin esperar 
        //mostrar una ruleta
    }
    this.crearPartida=function(nick,numJug){
        $.getJSON("/crearPartida/"+nick+"/"+numJug,function(data){
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
        })
    }
}