'use strict';
//Noelia Sánchez Manzano, 1ºDAM 
//Proyecto 2ºSemestre

window.onload=function(){
    let formulario=document.miFormulario;
    let opcionFilas=formulario.filas;
    formulario.onsubmit=validar;
    opcionFilas.setCustomValidity("Error.Debe contener un número del 1 al 10 obligatoriamente");
    opcionFilas.oninput=function(){
        if(/^([1-9]|10)$/.test(opcionFilas.value) && opcionFilas.value !== ""){
            opcionFilas.setCustomValidity("");
        }
        else{
            opcionFilas.setCustomValidity("Error.Debe contener un número del 1 al 10 obligatoriamente"); 
        }
    }
}

//1.Validaciones
function validar(event){
    let formValido=true;
    let opcionTabla=document.miFormulario.tabla;
    let desplegable=document.miFormulario.metodo;
    let botonEditable=document.miFormulario.editable;

    //Validar opcionTabla
    let tablas=document.getElementById('tabla');
    if(!/^([1-9]|10)$/.test(opcionTabla.value) || opcionTabla=="")
    {
        tablas.style.backgroundColor='red';
        formValido=false;
    }
    else{
        tablas.style='none';
    }

    //Validar desplegable
    if((botonEditable[0].checked)||(botonEditable[1].checked)){
          //Validar boton editable
        if((botonEditable[0].checked)&&((desplegable.value !== "ul") &&
        (desplegable.value !== "ol")))
        {
            alert("Error. La opción editable solo es compatible con los metodos lista ordenada o desordenada");
            formValido=false;
        }
        else if(desplegable.value === ""){
            alert("Error. Tienes que selecionar un método");
            formValido=false;
        }
    }
    else {
        alert("Seleciona si quieres que sea editable o no");
        formValido=false;
    }
    event.preventDefault();

    if (formValido){
       crear(event);
    }
}

//2.Boton lanzar
function crear(event){
    let formulario= document.miFormulario;
    let botonLanzar= document.miFormulario.btn_lanzar;
    let botonResetear=document.miFormulario.btn_reset;
    botonLanzar.style.display='none';
    botonResetear.style.display='block';
    botonResetear.onclick=resetear;
    
    if(formulario.editable[0].checked){
        formulario.tabla.disabled=true;
        formulario.metodo.disabled=true;
        formulario.filas.disabled=true;
        formulario.editable[0].disabled=true;
        formulario.editable[1].disabled=true;
        crearNodos();
    }
    else if (formulario.editable[1].checked){
        formulario.filas.disabled=true;
        formulario.editable[0].disabled=true;
        formulario.editable[1].disabled=true;
        crearNodos();
        let divRespuesta=document.getElementById("respuesta");
    
        divRespuesta.onclick=conversion;
        formulario.metodo.onchange = function(){
            let div=document.getElementById("respuesta");
            let cantidad=div.childNodes.length;
            for(let i=0; i<cantidad; i++){
                div.removeChild(div.childNodes[0]);
            }
            crearNodos();
        }
    }
   event.preventDefault();
}

//3.Funcion Crear Nodos
function crearNodos(){
    let formulario=document.miFormulario;
    let formatoEmplear=formulario.metodo.value;
    switch(formatoEmplear){
        case "section": 
            crearParrafos();
        break;
        case "ul":
            crearLista();
        break;
        case "ol":
            crearLista();
        break;
        case "table":
            crearTabla();
        break;
        case "select":
            crearDesplegable();
        break;
        default: alert("Error.Metodo no encontrado")
        break; 
    }
}

function crearDesplegable(){
    let formulario=document.miFormulario;
    let valorTabla=formulario.tabla.value;
    console.log(valorTabla);
    let valorCantidad=formulario.filas.value;
    let div=document.getElementById("respuesta");
    let select= document.createElement('select');
    div.appendChild(select);
    for(let i=1; i<=valorCantidad; i++){
        let opcion=document.createElement('option');
        select.appendChild(opcion);
        let textOpcion = document.createElement('label');
        textOpcion=document.createTextNode(valorTabla +'x'+i +'='+(valorTabla*i));
        opcion.appendChild(textOpcion);
    }
}

function crearTabla(){
    let formulario=document.miFormulario;
    let valorTabla=formulario.tabla.value;
    let valorCantidad=formulario.filas.value;
    let div=document.getElementById("respuesta");
    let tabla=document.createElement('table');
    div.appendChild(tabla);
    for (let x=1; x <=valorCantidad ; x++){
        let tr=document.createElement('tr');
        tabla.appendChild(tr);
        let td=document.createElement('td');
        tr.appendChild(td);
        let label=document.createElement('label');
        label=document.createTextNode( valorTabla + "x" + x );
        td.appendChild(label);
        
        let td2=document.createElement('td');
        tr.appendChild(td2);
        let label2=document.createElement('label');
        label2=document.createTextNode( '=');
        td2.appendChild(label2);

        let td3=document.createElement('td');
        tr.appendChild(td3);
        let label3=document.createElement('label');
        label3=document.createTextNode( valorTabla*x);
        td3.appendChild(label3);
       
    }
    //Aplicar css en la tabla
    tabla.style.borderStyle='solid';
    tabla.style.borderColor='black';
    let tablacss=document.querySelectorAll('td');
    for(let i=0; i<tablacss.length; i++){
        tablacss[i].style.borderStyle='solid';
        tablacss[i].style.borderColor='black';
    }  
}

function crearParrafos(){
    let formulario=document.miFormulario;
    let valorTabla=formulario.tabla.value;
    let valorCantidad=formulario.filas.value;
    let div=document.getElementById("respuesta");
    for(let i=1; i<=valorCantidad; i++){
        let parrafo=document.createElement('p');
        div.appendChild(parrafo);
        let parrafoTexto=document.createTextNode(" "+valorTabla +'x'+i +'='+(valorTabla*i)+" ");
        parrafo.appendChild(parrafoTexto);
    }
    div.style.marginLeft='30px';
}

//6.Edición Lista
function crearLista(){
    let formulario=document.miFormulario;
    let formatoEmplear=formulario.metodo.value;
    let valorTabla=formulario.tabla.value;
    let valorCantidad=formulario.filas.value;
    let div=document.getElementById("respuesta");

    if(formulario.editable[0].checked){
        let inputs=document.createElement('li');
        div.appendChild(inputs);
        let mas=document.createElement('button');
        inputs.appendChild(mas);
        mas.innerText='+';
        mas.setAttribute('type', 'button');
        mas.setAttribute('value', 'mas');
        let menos=document.createElement('button');
        inputs.appendChild(menos);
        menos.innerText='-';
        menos.setAttribute('type', 'button');
        menos.setAttribute('value', 'menos');
      
        //Funcion signo +
        mas.onclick=function(){
          if(formulario.metodo.value==='ul'){
            let div=document.getElementById("respuesta");
            let cantidadChil=0;
        
            for(let i=0; i<div.childNodes.length; i++){
                cantidadChil ++;
            }
            let anyadirLi=document.createElement('li');
            div.appendChild(anyadirLi);
            let botonEliminar=document.createElement('button');
            botonEliminar.setAttribute('class','botonimagen' );
            let textoLi=document.createTextNode(valorTabla +' x '+ (cantidadChil - 1)+' = '+(valorTabla*(cantidadChil - 1)));
            anyadirLi.appendChild(textoLi);
            anyadirLi.appendChild(botonEliminar);
            botonEliminar.onclick=eliminar;
           
            let botonModificar=document.createElement('button');
            botonModificar.setAttribute('class','botonModificar');
            anyadirLi.appendChild(botonModificar);
            botonModificar.onclick=modificar;
           
            console.log(cantidadChil);
            if(cantidadChil>10){
                alert("Error. No se pueden añadir más multiplicaciones");
                mas.style.display='none';

            }
            if(cantidadChil>1){
                menos.style="";
            }
          }
          else if(formulario.metodo.value==='ol'){
            let dentroDelOL=document.querySelector('ol');

            let cantidadChil=1;
            let cantidadOL=dentroDelOL.childNodes.length + 1;
           

            let anyadirLi=document.createElement('li');
            dentroDelOL.appendChild(anyadirLi);
            let botonEliminar=document.createElement('button');
            botonEliminar.setAttribute('class','botonimagen' );
            let textoLi=document.createTextNode(valorTabla +' x '+ (cantidadOL)+' = '+(valorTabla*cantidadOL));
            anyadirLi.appendChild(textoLi);
            anyadirLi.appendChild(botonEliminar);
            botonEliminar.onclick=eliminar;
           
            let botonModificar=document.createElement('button');
            botonModificar.setAttribute('class','botonModificar');
            anyadirLi.appendChild(botonModificar);
            botonModificar.onclick=modificar;
            for(let i=0; i<cantidadOL; i++){
                cantidadChil ++;
            }
            
            console.log(cantidadOL);
            if(cantidadOL>=10){
                alert("Error. No se pueden añadir más multiplicaciones");
                mas.style.display='none';

            }
            if(cantidadChil>1){
                menos.style="";
            }
          }         
        }

        //Funcion signo -
        menos.onclick=function(){
            if(formulario.metodo.value==='ul'){
                let div=document.getElementById("respuesta");
                let ultimoElemento=document.getElementsByTagName('li');
                div.removeChild(ultimoElemento[div.childNodes.length-2]);

               for(let i=div.childNodes.length; i<2; i--){
                   div.childNodes[i]--;
                }
              
                if(div.childNodes.length<=2){
                   alert("Error. Ya no hay más elementos");
                   mas.style="";
                   menos.style.display='none';
                }
   
                if(div.childNodes.length<=11){
                   mas.style="";
                }
            }
            else if(formulario.metodo.value==='ol'){
                let dentroDelOL=document.querySelector('ol');
                let ultimoElemento=document.getElementsByTagName('li');
               
                dentroDelOL.removeChild(ultimoElemento[dentroDelOL.childNodes.length]);
                for(let i=div.childNodes.length; i<2; i--){
                   div.childNodes[i]--;
                }
              
                if(dentroDelOL.childNodes.length<1){
                   alert("Error. Ya no hay más elementos");
                   mas.style="";
                   menos.style.display='none';
                }
   
                if(dentroDelOL.childNodes.length<=10){
                   mas.style="";
                }
            }
        } 
    }

    //Crear lista Desordenada
    if( formatoEmplear==="ul" ){
        for(let i=1; i<=valorCantidad; i++){
            let listaSinOrdenar=document.createElement('li');
            div.appendChild(listaSinOrdenar);
            let textoLista=document.createTextNode(valorTabla +' x '+i +' = '+(valorTabla*i));
            listaSinOrdenar.appendChild(textoLista);
            if(formulario.editable[0].checked){
                let botonEliminar=document.createElement('button');
                botonEliminar.setAttribute('class','botonimagen' );
                listaSinOrdenar.appendChild(botonEliminar);
                botonEliminar.onclick=eliminar;
                let botonModificar=document.createElement('button');
                botonModificar.setAttribute('class','botonModificar');
                listaSinOrdenar.appendChild(botonModificar);
                botonModificar.onclick=modificar;
            }
            
            
        }
       div.style.marginLeft='30px';
    }//Crear lista Ordenada
    else if(formatoEmplear==="ol"){
        let ordenar=document.createElement('ol');
        div.appendChild(ordenar);
        for(let i=1; i<=valorCantidad; i++){
            let listaOrdenada=document.createElement('li');
            ordenar.appendChild(listaOrdenada);
            let textoLista=document.createTextNode(valorTabla +' x '+i +' = '+(valorTabla*i));
            listaOrdenada.appendChild(textoLista);
            if(formulario.editable[0].checked){
                let botonEliminar=document.createElement('button');
                botonEliminar.setAttribute('class','botonimagen' );
                listaOrdenada.appendChild(botonEliminar);
                botonEliminar.onclick=eliminar;
                let botonModificar=document.createElement('button');
                botonModificar.setAttribute('class','botonModificar');
                listaOrdenada.appendChild(botonModificar);
                botonModificar.onclick=modificar;
            } 
        }
       div.style.marginLeft='30px';
    }
}

//4.Funcion de Conversión 
function conversion(){
    let formulario=document.miFormulario;
    let opcion=formulario.metodo.value;
    let cantidad=this.childNodes.length;
    for(let i=0; i<cantidad; i++){
        this.removeChild(this.childNodes[0]);
    }
  
    switch(opcion){
        case 'section':
            document.miFormulario.metodo.value='ul';
            crearLista();
            break;
        case 'ul':
            document.miFormulario.metodo.value='ol';
            crearLista();
            break;
        case 'ol':
            document.miFormulario.metodo.value='table';
            crearTabla();
            break;
        case 'table':
            document.miFormulario.metodo.value='select';
            crearDesplegable();
            break;
        case 'select':
            document.miFormulario.metodo.value='section';
            crearParrafos();
            break;
        default: alert("Error. Metodo no válido"); break;
    }
}

//5.Botón resetear 
function resetear(){
    console.log("resetea");
    let botonLanzar= document.miFormulario.btn_lanzar;
    let formulario= document.miFormulario;
    botonLanzar.style.display='block';
    this.style.display='none';

    formulario.tabla.disabled=false;
    formulario.metodo.disabled=false;
    formulario.filas.disabled=false;
    formulario.editable[0].disabled=false;
    formulario.editable[1].disabled=false;
   
    formulario.tabla.value="";
    formulario.metodo.value="";
    formulario.filas.value="";
    formulario.editable[0].checked=false;
    formulario.editable[1].checked=false;

    botonLanzar.onclick=crear;

    let div=document.getElementById("respuesta");
    if(div!=""){
        let cantidadDivs=div.childNodes.length;
        for(let i=0; i<cantidadDivs ; i++){
            div.removeChild(div.childNodes[0]);
        }
    } 
}

//7.Boton de eliminar
function eliminar(){
    this.parentNode.parentNode.removeChild(this.parentNode);
}

//8.Botón Modificar
function modificar(event){
    let formulario=document.miFormulario;
    if(formulario.metodo.value==='ul'){
        let div=document.getElementById("respuesta");

        let li = this.parentNode;
        li.setAttribute('class', 'dondeEstoy');
   
        let formulario=document.miFormulario;
        let valorMultiplicando;
        let valorTabla=formulario.tabla.value;
        for (let i=0; i<div.childNodes.length; i++){
           if(div.childNodes[i]===li){
              valorMultiplicando=i-1;
            }
        }
      
        let cantidad= this.parentNode.childNodes.length;
            for (let i=0; i< cantidad; i++){
               this.parentNode.removeChild(this.parentNode.childNodes[0]);
            }

        let input=document.createElement('input');
        input.setAttribute('value', valorTabla);
        li.appendChild(input);
      
        let label=document.createElement('label');
        let textlabel=document.createTextNode(' X ');
        label.appendChild(textlabel);
        li.appendChild(label);
   
        let input2=document.createElement('input');
        input2.setAttribute('value',valorMultiplicando);
        li.appendChild(input2);
        let label1=document.createElement('label');
        let textlabel1=document.createTextNode(' = ');
        label1.appendChild(textlabel1);
        li.appendChild(label1);
   
        let resultado=valorTabla*valorMultiplicando;
        let input3=document.createElement('input');
        input3.setAttribute('value', resultado);
        li.appendChild(input3);
        input3.disabled = true;
       
   
        let botonGuardar=document.createElement('button');
        botonGuardar.setAttribute('type', 'button');
        let imagen=document.createElement('img');
        imagen.src="img/disco.png";
        botonGuardar.appendChild(imagen);
        li.appendChild(botonGuardar);
   
   
        botonGuardar.onclick=function(){
           let padre=this.parentNode;
           let cantidad= this.parentNode.childNodes.length;
            for (let i=0; i< cantidad; i++){
               padre.removeChild(padre.childNodes[0]);
            }
       
           let valorTablaNuevo=input.value;
           let valorFilasNuevo=input2.value;
           let textoNuevo=document.createTextNode(valorTablaNuevo + " x " + valorFilasNuevo + " = " + (valorTablaNuevo*valorFilasNuevo));
           padre.appendChild(textoNuevo);
   
           let botonEliminar=document.createElement('button');
           botonEliminar.setAttribute('class','botonimagen' );
           padre.appendChild(botonEliminar);
           botonEliminar.onclick=eliminar;
   
           let botonModificar=document.createElement('button');
           botonModificar.setAttribute('class','botonModificar');
           padre.appendChild(botonModificar);
           botonModificar.onclick=modificar;
        }
       event.preventDefault();
    }
    else if(formulario.metodo.value==='ol'){
        let dentroDelOL=document.querySelector('ol');
     
        let li = this.parentNode;
        li.setAttribute('class', 'dondeEstoy');
   
        let formulario=document.miFormulario;
        let valorMultiplicando;
        let valorTabla=formulario.tabla.value;
        for (let i=0; i<dentroDelOL.childNodes.length; i++){
            if(dentroDelOL.childNodes[i]===li){
              valorMultiplicando=i+1;
            }
        }
      
        let cantidad= li.childNodes.length;
            for (let i=0; i< cantidad; i++){
               li.removeChild(li.childNodes[0]);
            }
       
   
        let input=document.createElement('input');
        input.setAttribute('value', valorTabla);
        li.appendChild(input);
      
        let label=document.createElement('label');
        let textlabel=document.createTextNode(' X ');
        label.appendChild(textlabel);
        li.appendChild(label);
   
        let input2=document.createElement('input');
        input2.setAttribute('value',valorMultiplicando);
        li.appendChild(input2);
        let label1=document.createElement('label');
        let textlabel1=document.createTextNode(' = ');
        label1.appendChild(textlabel1);
        li.appendChild(label1);
   
        let resultado=valorTabla*valorMultiplicando;
        let input3=document.createElement('input');
        input3.setAttribute('value', resultado);
        li.appendChild(input3);
        input3.disabled = true;
       
   
        let botonGuardar=document.createElement('button');
        botonGuardar.setAttribute('type', 'button');
        let imagen=document.createElement('img');
        imagen.src="img/disco.png";
        botonGuardar.appendChild(imagen);
        li.appendChild(botonGuardar);
   
   
        botonGuardar.onclick=function(){
           let padre=this.parentNode;
           let cantidad= dentroDelOL.childNodes.length;
            for (let i=0; i< cantidad; i++){
               padre.removeChild(padre.childNodes[0]);
            }
       
           let valorTablaNuevo=input.value;
           let valorFilasNuevo=input2.value;
           let textoNuevo=document.createTextNode(valorTablaNuevo + " x " + valorFilasNuevo + " = " + (valorTablaNuevo*valorFilasNuevo));
           padre.appendChild(textoNuevo);
   
           let botonEliminar=document.createElement('button');
           botonEliminar.setAttribute('class','botonimagen' );
           padre.appendChild(botonEliminar);
           botonEliminar.onclick=eliminar;
   
           let botonModificar=document.createElement('button');
           botonModificar.setAttribute('class','botonModificar');
           padre.appendChild(botonModificar);
           botonModificar.onclick=modificar;
       }
       event.preventDefault();
    }
}






