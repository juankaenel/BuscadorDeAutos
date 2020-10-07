//------------ Variables ------------
const resultado = document.querySelector('#resultado');
const year = document.querySelector('#year');

//fechas
const max = new Date().getFullYear(); //año actual
const min = max - 10 //año minimo

//------------ Eventos ------------
document.addEventListener('DOMContentLoaded',()=>{
    mostrarAutos(); //muestra los autos al cargar

    //Llena las opciones de año
    llenarSelect();
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