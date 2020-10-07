//------------ Variables ------------
const resultado = document.querySelector('#resultado');


//------------ Eventos ------------
document.addEventListener('DOMContentLoaded',()=>{
    mostrarAutos();
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

