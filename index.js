var fs=require("fs");
var express=require("express");
var app=express();
var server=require("http").Server(app);
var bodyParser = require("body-parser");

app.set('port',process.env.PORT || 5000);

app.use(express.static(__dirname + "/"));

app.get("/",function(request,response){
    var contenido=fs.readFileSync(__dirname+"/cliente/index.html");
    response.setHeader("Content-type","text/html");
    response.send(contenido);
})

//app.get("/agregarUsuario/nick")

app.listen(app.get('port'),function(){
    console.log("La app NodeJS se esta ejecutando en el puerto", app.get("port"));
})