var fs=require("fs");
var express=require("express");
var app=express();
var http=require("http").Server(app);
var { Server } = require("socket.io");
var io = new Server(http);
var bodyParser = require("body-parser");

var modelo =require("./servidor/modelo.js");
var ssrv = require("./servidor/servidorWS.js");

var juego= new modelo.Juego();
var servidorWS= new ssrv.ServidorWS();

app.set('port',process.env.PORT || 5000);

app.use(express.static(__dirname + "/"));

app.get("/",function(request,response){
    var contenido=fs.readFileSync(__dirname+"/cliente/index.html");
    response.setHeader("Content-type","text/html");
    response.send(contenido);
})

//app.get("/agregarUsuario/nick")
app.get("/agregarJugador/:nick",function(request,response){
    var nick=request.params.nick;
   var res= juego.agregarJugador(nick)
    response.send(res);
});


//crear partida
app.get("/crearPartida/:numJug/:nick",function(request,response){
    var nick=request.params.nick;
    var numJug= request.params.numJug;
    var ju1=juego.usuarios[nick];

    var res = {codigo:-1};
    if(ju1){
        var partida=ju1.crearPartida(num);
        console.log("Nueva partida de "+nick+"codigo:")
        res.codigo=ju1.codigoPartida;
    }else{
        console.log("usuario no existe")
    }
    response.send(res);
})

//unir a partida
app.get("/unirAPartida/:codigo/:nick",function(request,response){
    var codigo = request.params.codigo;
    var nick = request.params.nick;
    var ju1 = juego.usuarios[nick];
    var response = {codigo: -1}

    if(ju1) {
        ju1.unirAPartida(codigo);
        response.codigo= codigo;
        console.log("Se ha undio a la partida"+nick+"que tiene este codigo"+codigo);
    }
    else{
        console.log("no existe el usuario")
    }
    response.send(response);
})
//obtener lista de partidas


http.listen(app.get('port'),function(){
    console.log("La app NodeJS se esta ejecutando en el puerto", app.get("port"));
})

//lanzar el servidorWs
servidorWS.lanzarServidorWS(io,juego);