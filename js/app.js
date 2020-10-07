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
document.addEventListener('DOMContentLoaded',()=>{
    mostrarAutos(); //muestra los autos al cargar

    //Llena las opciones de año
    llenarSelect();
});

//Event listeners para los selects de búsqueda
marca.addEventListener('change',e=>{
    datosBusqueda.marca = e.target.value;
});

year.addEventListener('change',e=>{
    datosBusqueda.year = e.target.value;
});

minimo.addEventListener('change',e=>{
    datosBusqueda.minimo = e.target.value;
});

maximo.addEventListener('change',e=>{
    datosBusqueda.maximo = e.target.value;
});

puertas.addEventListener('change',e=>{
    datosBusqueda.puertas = e.target.value;
});

transmision.addEventListener('change',e=>{
    datosBusqueda.transmision = e.target.value;
});

color.addEventListener('change',e=>{
    datosBusqueda.color = e.target.value;
    console.log(datosBusqueda);
});
//------------ Funciones ------------
function mostrarAutos(){
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

//Genera los años del select
function llenarSelect(){
    for(let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); //agrega las opciones de año al select
    }
}