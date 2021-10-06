describe("El juedo del UNO...", function() {
  var juego;

  beforeEach(function() {
    juego=new Juego();
    juego.agregarJugador("ana");
    juego.agregarJugador("pepe");
    juego.agregarJugador("luis");
  });

  it("Condiciones iniciales",function(){
    expect(juego.numeroPartidas()).toEqual(0);
    expect(juego.obtenerTodasPartidas().length).toEqual(0);
  });

  describe("Ana crea una partida de 2 jugadores...", function() {
    var ju1;
    var partida;
  beforeEach(function() {
     ju1=juego.usuarios["ana"];
     var partida= ju1.crearPartida(2);
   });
  
   it("Comprobar obtener partida",function(){
     var codigo=ju1.codigoPartida;
     expect(ju1.obtenerPartida()).toBefined();
   })




  it("Comprobar mazo",function(){
   
    expect(partida.mazo.length).toBe(108);
        var rojo=partida.mazo.filter(function(each){
          return each.color=="rojo";
        });
        expect(rojo.length).toBe(25);
        var verde=partida.mazo.filter(function(each){
          return each.color=="verde";
        });
        expect(verde.length).toBe(25);
        var amarillo=partida.mazo.filter(function(each){
          return each.color=="amarillo";
        });
        expect(amarillo.length).toBe(25);
        var azul=partida.mazo.filter(function(each){
          return each.color=="azul";
        });
        expect(azul.length).toBe(25);
        var comodin=partida.mazo.filter(function(each){
          return each.tipo=="comodin";
        });
        expect(comodin.length).toBe(4);
        var comodin4=partida.mazo.filter(function(each){
          return each.tipo=="comodin4";
        });
        expect(comodin4.length).toBe(4);
      });

  it("Comprobamos la partida para dos jugadores", function() {
    //var ju1=juego.usuarios["ana"];
   // expect(juego.numeroPartidas()).toEqual(0);
   // var partida= ju1.crearPartida(2);
    expect(juego.numeroPartidas()).toEqual(1);
    expect(partida.codigo).toBefined();
    expect(partida.numeroJugadores()).toEqual(1);
    expect(juego.obtenerTodasPartidas().length).toEqual(1)
    expect(partida.fase.nombre).toBe("inicial");
  });

  it(" Pepe se une", function() {
    /*var ju1=juego.usuarios["ana"];
    expect(juego.numeroPartidas()).toEqual(0);
    expect(juego.obtenerTodasPartidas().length).toEqual(0);
    var partida= ju1.crearPartida(2);
    expect(juego.numeroPartidas()).toEqual(1);
    expect(juego.obtenerTodasPartidas().length).toEqual(1);*/
    var ju2=juego.usuarios["pepe"];
    ju2.unirAPartida(partida.codigo);
    expect(partida.numeroJugadores()).toEqual(2);
    expect(partida.fase.nombre).toBe("jugando");
  });

  it(" Pepe se une y Luis intenta meterse pero no puede", function() {
   /* var ju1=juego.usuarios["ana"];
    expect(juego.numeroPartidas()).toEqual(0);
    var partida= ju1.crearPartida(2);
    expect(juego.numeroPartidas()).toEqual(1);*/
    var ju2=juego.usuarios["pepe"];
    ju2.unirAPartida(partida.codigo);
    var ju3=juego.usuarios["luis"];
    ju3.unirAPartida(partida.codigo);
    expect(partida.numeroJugadores()).toEqual(2);// Si pasa esta prueba es porque el numero de jugadores es 2 y no 3 y por la tanto Luis no ha podido meterse en la partida
    expect(partida.fase.nombre).toBe
  });

  it(" Pepe se une y Luis intenta meterse pero no puede", function() {
    /* var ju1=juego.usuarios["ana"];
     expect(juego.numeroPartidas()).toEqual(0);
     var partida= ju1.crearPartida(2);
     expect(juego.numeroPartidas()).toEqual(1);*/
     var ju2=juego.usuarios["pepe"];
     ju2.unirAPartida(partida.codigo);
     var ju3=juego.usuarios["luis"];
     ju3.unirAPartida(partida.codigo);
     expect(partida.numeroJugadores()).toEqual(2);// Si pasa esta prueba es porque el numero de jugadores es 2 y no 3 y por la tanto Luis no ha podido meterse en la partida
     expect(partida.fase.nombre).toBe
   });





  
});
});