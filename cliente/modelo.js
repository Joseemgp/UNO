function Juego(){
    this.usuarios={};
    this.partidas={};
    this.agregarJugador=function(nick){
        if(!this.usuarios[nick]){
            var jugador = new Jugador(nick,this);
            
            this.usuarios[nick]=jugador;
        }
        else{
            console.log("El nick esta en uso")
        }
    }
    this.crearPartida=function(nick,numJug){
        var codigo="-1";
        var jugador=this.usuarios[nick];
        codigo=this.obtenerCodigo();
       while (this.partidas[codigo]){
            codigo=this.obtenerCodigo();
        };
            var partida=new Partida(codigo,jugador,numJug);
            this.partidas[codigo]=partida;
        
            return partida;
        //asignarla a la coleccion partidas


    }
    this.obtenerTodasPartidas=function(){
        var lista =[]
        for(each in this.partidas){
            var partida=this.partidas[each];
            lista.push({propietario:partida.propietario})
        }
        return lista
    }

    this.unirAPartida=function (codigo,nick) {
        if (this.partidas[codigo]){
            var jugador=this.uasuarios[nick];
            this.partidas[codigo].unirAPartida(nick)
        }
    
    }
    this.obtenerCodigo=function(){
		let cadena="ABCDEFGHIJKLMNOPQRSTUVXYZ";
		let letras=cadena.split('');
		let maxCadena=cadena.length;
		let codigo=[];
		for(i=0;i<6;i++){
			codigo.push(letras[randomInt(1,maxCadena)-1]);
		}
		return codigo.join('');
	}
    //return Date.now().toString();
    

  
    
    this.numeroPartidas=function(){
		return Object.keys(this.partidas).length;
	}

}


function Jugador(nick,juego){
    this.nick=nick;
    this.juego=juego;
    this.mano=[];
    this.codigoPartida;
    this.crearPartida= function(numJug) {
        return this.Juego.crearPartida(nick,numJug)
    }
    this.unirAPartida=function (jugador) {
        this.juego.unirAPartida(codigo,nick);
    } 

    this.robar=function(num){
        var partida=this.obtenerPartida(this.codigoPartida);
        var robadas=partida.damecartas(num);
        //var tmp=this.mano;
        this.mano=this.mano.concat(robadas);
    }
    this.manoInicial=function(){
        var partida=this.obtenerPartida(this.codigoPartida);
        
        this.mano=partida.damecartas(7);
    }

    this.obtenerPartida=function(codigo){

        return this.juego.partida[codigo];
    }

    this.pasarTurno
}

function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}


function Partida(codigo,jugador,numJug){
    this.codigo=codigo;
    this.mazo=[];
    this.propietario=jugador.nick;
    this.numJug=numJug;
    this.jugadores={};
    this.jugadores[jugador.nick]=jugador;
    this.fase=new Inicial();
    this.unirAPartida=function(jugador){
        this.fase.unirAPartida(this,jugador);
    }
    this.puedeunirAPartida=function(jugador){
        this.jugadores[jugador.nick]=jugador;
        jugador.codigoPartida=this.codigo;
        this.ordenTurno.push(jugador,nick);
    }
    this.numeroJugadores=function(){
		return Object.keys(this.jugadores).length;
	}
    this.crearMazo=function(){
    var colores=["azul","amarillo","rojo","verde"];

        for(i=0;i<colores.length;i++){
            this.mazo.push(new this.numeroJugadores(0,color[i]));
            for(j=1;j<10;j++){
                this.mazo.push(new Numero(j,colores[i]))
                this.mazo.push(new Numero(j,colores[i]));
            }
        }
        
        for ( i=0;i<colores.length;i++){
            this.mazo.push(new Cambio(20,colores[i]));
            this.mazo.push(new Cambio(20,colores[i]));
        }
        for ( i=0;i<colores.length;i++){
            this.mazo.push(new Bloqueo(20,colores[i]));
            this.mazo.push(new Bloqueo(20,colores[i]));
        }
        for ( i=0;i<colores.length;i++){
            this.mazo.push(new Mas2(20,colores[i]));
            this.mazo.push(new Mas2(20,colores[i]));
        }
        for ( i=0;i<colores.length;i++){
            this.mazo.push(new Comodin(50,"comodin"));
        }
        for ( i=0;i<colores.length;i++){
            this.mazo.push(new Comodin4(50,"comodin4"));
        }
        
    }

    this.unirAPartida(jugador);
    this.asignarunaCarta=function(){
        var longitud=this.mazo.length
        var numAleatorio=randomInt(1,longitud)-1;
        var lista=this.mazo.splice(numAleatorio,1)
        return lista[0];
        
    }

    this.damecartas=function(numero){
        var cartas=[];
        for(i=0;i<numero;i++){
            mazo.push(this.asignarunaCarta());
        }
        return cartas;
     }

     this.asignarTurno=function(){
         var nick=this.ordenTurno[0];
         this.turno=this.jugadores[nick];
     }
     this.pasarTurno=function(nickJugador){
         var nick=this.turno.nick;
         if(nick==nickJugador){
             var indice=this.ordenTurno.indexOf(nick);
             var siguiente=(indice+1)%(Object.keys)
         }
     }
}

function Inicial(){
    this.nombre="inicial"
    this.unirApartida=function(partida,jugador){
        //si numero de jugadores < numJug
        partida.puedeunirAPartida(jugador);
        if(partida.numeroJugadores()==partida.numJug){
            partida.fase=new Jugando();
        }
        
    }
    this.esInicial=function(){
        return false;
    }
}
function Jugando(){
    this.unirApartida=function (partida,jugador){
        console.log("La partida ya ha comenzado");
    }
}
function Final() {
    this.unirApartida=function (partida,jugador){
        console.log("La partida ha terminado");
    }
}
function Numero(valor, color){
    this.color=color;
    this.valor=valor;
}

function Carta(color,tipo){
    this.color=color;
    this.tipo=tipo;
}
function Cambio(valor,color){
    this.valor=valor;
    this.color=color;
}
function Bloqueo(valor,color){
    this.valor=valor;
    this.color=color;
}
function Mas2(valor,color){
    this.valor=valor;
    this.color=color;
}
function Comodin(valor,tipo){
    this.valor=valor;
    this.tipo=tipo;
   
}
function Comodin4(valor,tipo){
    this.valor=valor;
    this.tipo=tipo;
    
}

var juego
var ju1,ju2;
var partida;

function Prueba(){
    juego = new Juego();
    juego.agregarJugador("ana");
    ju1.crearPartida(2)
    juego.agregarJugador("pepe");

}
