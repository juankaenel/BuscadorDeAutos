//------------ Variables ------------
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');

const resultado = document.querySelector('#resultado'); //Contenedor para los resultados

//Fechas
const max = new Date().getFullYear(); //año actual
const min = max - 10 //año minimo

//Genera un objeto con datos de la búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

//------------ Eventos ------------
//Evento principal
document.addEventListener('DOMContentLoaded',()=>{
    mostrarAutos(autos); //muestra los autos al cargar, este parametro viene de db.js

    //Llena las opciones de año
    llenarSelect();
});

//Event listeners para los selects de búsqueda
marca.addEventListener('change',e=>{
    datosBusqueda.marca = e.target.value;
    filtrarAuto(); //llamo al filtro una vez seleccionado la marca
});

year.addEventListener('change',e=>{
    datosBusqueda.year = parseInt(e.target.value); //parseo la fecha a entero
    filtrarAuto();
});

minimo.addEventListener('change',e=>{
    datosBusqueda.minimo = parseInt(e.target.value);
    filtrarAuto();
});

maximo.addEventListener('change',e=>{
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});

puertas.addEventListener('change',e=>{
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});

transmision.addEventListener('change',e=>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener('change',e=>{
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});
//------------ Funciones ------------
function mostrarAutos(autos){
    limpiarHTML(); //Elimina el html previo

    autos.forEach(auto=>{
        const {marca,modelo,year,puertas,transmision,precio,color} = auto;
        const autoHTML = document.createElement('p'); //creamos un p para cada auto

        autoHTML.textContent = `
            ${marca} - ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Color: ${color} - Precio: $${precio}
        `;
        //insertar el html en el div resultado
        resultado.appendChild(autoHTML);    
    })
}

//Función para limpiar el html
function limpiarHTML(){
    while(resultado.firstChild){ //mientras haya algo dentro de resultado
        resultado.removeChild(resultado.firstChild);
    }
}

//Genera los años del select
function llenarSelect(){
    for(let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); //agrega las opciones de año al select
    }
}

//--------- Filtros ---------
//Funcion principal de alto nivel que filtra en base a la búsqueda
function filtrarAuto(){
    //función de alto nivel, toma otra función como parametro
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuerta ).filter( filtrarTransmision).filter( filtrarColor) 
    // console.log(resultado);

    if(resultado.length){ //si el arreglo no está vacío mostrame los autos
        mostrarAutos(resultado); //llamo a la fn y le paso el resultado de los filtros
    } //sino mostrame un msj de error
    else{
        noResultado();
    }

} 

function filtrarMarca(auto){ //el parm auto lo recibe de autos
    const { marca } = datosBusqueda; //destructuring

    if(marca){ //si no está vacio la marca en datosBusqueda.marca
        return auto.marca === marca; //filtra a todos los que tengan la misma marca
    }
    return auto; //si no selecciono ningun auto returno el auto completo, no hago filtros
}

function filtrarYear(auto){
    const { year } = datosBusqueda; 

    if(year){ 
        //return auto.year === parseInt(year); //year viene como string desde datosBusqueda entonces hay que parsearlo
        return auto.year === year; //meto la lógica en el event listener
    }
    return auto;
}

function filtrarMinimo(auto){
    const { minimo } = datosBusqueda; 

    if(minimo){ 
        return auto.precio >= minimo; //retorname los autos cuyo precio sean mayor o igual al minimo
    }
    return auto;
}

function filtrarMaximo(auto){
    const { maximo } = datosBusqueda; 

    if(maximo){ 
        return auto.precio <= maximo; //retorname los autos cuyo precio sean mayor o igual al minimo
    }
    return auto;
}

function filtrarPuerta(auto){
    const { puertas } = datosBusqueda;
    if(puertas){
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    const { transmision } = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto){
    const { color } = datosBusqueda;
    if(color){
        return auto.color === color;
    }
    return auto;
}

//Función que devuelve un msj en caso que el array de resultados esté vacío
function noResultado(){
    limpiarHTML();
    const msj = document.createElement('div');
    msj.classList.add('alerta','error');
    msj.textContent = 'No existe ningún auto con esos parámetros ingresados';
    resultado.appendChild(msj);
}