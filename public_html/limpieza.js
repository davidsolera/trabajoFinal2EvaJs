var resultadoTotalJardin;
var resultadoTotalMenaje;
var resultadoTotalLimpieza;

function cargarLimpieza(){
    var datosIn;
            document.getElementById('posicionTabla').removeChild(articulos);

       
            $.ajax({
                    url: "Limpieza.csv",
                    success:function(data){
                        datosIn=data;
                        crearTabla(data);

                    }

            });
        
    function crearTabla(data) {

                    var elemento = new Array();
                    var celda = new Array();

                    var numeroLineas = data.split(/\r?\n|\r/);
                    var elemento;

                    //creo la tabla y la añado al html

                    tabla= "<table id='articulos'> <thead id='cabeceraTabla'><td id='imagen' class='imagen'>Imagen</td><td id='ref' class='ref'>Ref</td><td id='des' class='descripcion'>Descripcion</td><td id='uCaja' class='unidadesCaja'>U/Caja</td><td id='valorUni' class='valUnidad'>Valor/Unidad</td> <td id='cant' class='cantidad'>Cantidad</td><td id='total' class='resultado'>Total</td></thead>     </table>";

                    document.getElementById("posicionTabla").innerHTML += tabla;

                    //defino el numero de columnas que tendra la tabla en relacion al numero de lineas del fichero leido
                    //y las añado a la tabla
                    for(i=0;i<=numeroLineas.length;i++){
                        columnas = "<tr id='numColumna" + i + "'" +"></tr>";
                        document.getElementById("articulos").innerHTML += columnas;
                    }

                    //defino el numero de celdas por tabla y le inserto el valor de cada linea
                    // parseando los ; y asignandolos a cada una de las celdas
                    for (i = 0; i < data.split(/\r\n|\r|\n/).length-1; i++) {
                       //selecciono la linea 
                       var linea = data.split(/\r\n|\r|\n/)[i];                    
                       var arrayElementoLinea = [];
                       arrayElementoLinea.push(linea.split(";")[0]);
                       arrayElementoLinea.push(linea.split(";")[1]);
                       arrayElementoLinea.push(linea.split(";")[2]);
                       arrayElementoLinea.push(linea.split(";")[3].replace(",","."));
                       var refImg = arrayElementoLinea[0];
                       var cantidadPorCaja = arrayElementoLinea[2];
                       var valorUnidad = arrayElementoLinea[3];

                       //alert(cantidadPorCaja);
                       celdas="<td id='imegen"+i+"'class='imagen'><img src='http://www.vetusplas.com/images/webcli/peque/"+refImg+".png'></img></td>";
                       celdas=celdas+"<td id='referencia"+i+"'class='ref'>"+arrayElementoLinea[0]+"</td>";
                       celdas=celdas+"<td id='descripcion"+i+"' class='descripcion'>"+arrayElementoLinea[1]+"</td>";
                       celdas=celdas+"<td id='unidadesCaja"+i+"'class='unidadesCaja'>"+arrayElementoLinea[2]+"</td>";
                       celdas=celdas+"<td id='valorUnidad"+i+"'class='valUnidad' >"+arrayElementoLinea[3]+"</td>";
                       celdas=celdas+"<td id='cantidad"+i+"'class='cantidad'>"+"<input type='number' name='cantidad' placeholder='cantidad' value='0' onblur=calcular("+ cantidadPorCaja+","+ valorUnidad+"," +i+",this);></td>";
                       celdas=celdas+"<td id='resultado' class='resultado'>"+"<input type='text' id='resultado["+i+"]' name='resultado' placeholder='resultado'  disabled>"+"</td>";

                       document.getElementById("numColumna"+i).innerHTML += celdas;
                    }

    }

   

}

 function calcular(num1, num2, linea, num3){
                       var numero1 = num1;
                       var numero2 = num2;
                       var numero3 = num3.value;
                       var lin = linea;
                       var resultado = eval(numero1*numero2*numero3);
                       resultadoCorto = resultado.toFixed(3);
                       resultadoTotalLimpieza=(resultadoTotalLimpieza+resultado);

                       document.getElementById("resultado["+lin+"]").value = resultadoCorto;

}
