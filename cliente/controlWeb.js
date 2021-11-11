function ControlWeb(){
    this.mostrarAgregarJugador=function(){
        var cadena='<div id="mAJ"><label for="usr">Nick:</label>';
        cadena= cadena + '<input type="text" class="form-control" placeholder="Introduce tu nick" id="usr">';
        cadena=cadena+ '<button type="button" id="btnAJ" class="btn btn-primary">Entrar</button>';
        cadena = cadena + "</div>";
        $("#agregarJugador").append(cadena);
        $("#btnAJ").on("click",function(){
            var nick=$('#usr').val();
            if(nick==""){
                iu.mostrarModal("Introduce tu nick");
            }
            $("body").append('<p id="nick" class="d-none">'+nick+'</p> ')
            $("#mAJ").remove();
            rest.agregarJugador(nick);
           // iu.mostrarCrearPartida();
           // iu.mostrarUnirAPartida();
        })

        
    }

    this.mostrarCrearPartida=function(){
        var cadena='<div id="mCP"><label for="numJug">Numero de Jugadores:</label>';
        cadena= cadena + '<input type="text" class="form-control" id="num">';
        cadena=cadena+ '<button type="button" id="btnCP" class="btn btn-primary">Crear</button>';
        cadena = cadena + "</div>";
        $("#crearPartida").append(cadena);
        $("#btnCP").on("click",function(){
            var nick=$('#usr').val();
            var numJug=$('#num').val();
            $("#mCP").remove();
            $("#mUA").remove();
            rest.crearPartida(numJug,nick);
            var cadena3='<br></br><label for="numJug">Numero Jugadores:'+numJug+'</label>'; 
            //<br></br><label for="usr">Nick:'+nick+'</label>';

                cadena3=cadena3+"</div>";

            $("#crearPartida").append(cadena3);
        })

   

    }

    this.mostrarUnirAPartida=function(){
        var cadena='<div id="mUA"><label for="cod">Codigo para entrar</label>';
        cadena= cadena + '<input type="text" class="form-control" id="cod">';
        cadena= cadena + '<label for="usr"> Nick </label>'
        cadena = cadena + '<input type="text" class="form-control" id="nick">';
        cadena=cadena+ '<button type="button" id="btnUA" class="btn btn-primary">Unir</button>';
        
        cadena = cadena + "</div>";
        $("#crearPartida").append(cadena);
        $("#btnUA").on("click",function(){
            var nick=$('#usr').val();
            var codigo=$('#cod').val();
            $("#mUA").remove();
            $("#mCP").remove();
            rest.unirAPartida(codigo,nick);
            
        })

    
    }

    this.mostrarListaPartidas=function(lista){
        $('#mOLP').remove();

        var cadena ='<div class="list-group" id="mOLP">'

        for(i=0;i<lista.length;i++){

            var codigo=lista[i].codigo;

            var propietario=lista[i].propietario;

            cadena=cadena+ '<a href="#" class="list-group-item list-group-item-action" value="'+codigo+'">'+codigo+'  || '+propietario+'</a>';

        }

        cadena=cadena+'</div>';




        $("#listaPartidas").append(cadena);

        $(".list-group a").click(function(){

            codigo=$(this).attr("value");

            //var nick=$('nick').val()

            var nick=ws.nick;

            console.log(codigo+" "+nick);

            $("#mOLP").remove();

            $("#mCP").remove();

            ws.unirAPartida(codigo,nick);

        });



    }
    this.mostrarModal=function(msg){
        $('#cM').remove();
        var cadena = "<p id='cM'>"+msg+"</p>"
        $('#contenidoModal').append(cadena)
        //meter el msg en el modal
        $('#myModal').modal('show');

    }
    this.mostrarMano=function(lista){

        $("mM").remove();

        var cadena='<div id="mM" class="card-columns"></div>'

        for(i=0;i<lista.length;i++){

            cadena=cadena+'<div class="card bg-light">';

            cadena=cadena+'<div class="card-body text-center">';

            cadena=cadena+'<img class="card-img-top" src="cliente/img"'+lista[i].nombre+'.png alt="Card image">'

            cadena=cadena+'<p class="card-text">'+lista[i].tipo+''+lista[i].color+''+lista[i].valor+'</p>';

            cadena=cadena+'</div></div>'

        }

        cadena=cadena+'</div>'

        $("#mano").append(cadena);



        //onclick

    }



    this.mostrarCartaActual=function(carta){

        $("mCA").remove();

        var cadena='<div id="mCA" class="card-columns"></div>'

       

        cadena=cadena+'<div class="card bg-light">';

        cadena=cadena+'<div class="card-body text-center">';

        cadena=cadena+'<img class="card-img-top" src="cliente/img"'+lista[i].nombre+'.png alt="Card image">'

        cadena=cadena+'<p class="card-text">'+carta.tipo+''+carta.color+''+carta.valor+'</p>';

        cadena=cadena+'</div></div>'

   

        cadena=cadena+'</div>'

        $("#actual").append(cadena);



        //onclick

    }
    
}