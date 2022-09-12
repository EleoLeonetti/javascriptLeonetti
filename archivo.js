class Productos {
    constructor(nombre, precio, tipo, disponible){
        this.nombre = nombre;
        this.precio = Number(precio);
        this.tipo = tipo;
        this.disponible = disponible;
    }
}
const lista =  [
new Productos ("Silla Mara", 4500, "muebles", true),
new Productos ("Silla Taruca", 4500, "muebles", true),
new Productos ("Silla Yaguarete", 4500, "muebles", true),
new Productos ("Silla Yurumi", 4500, "muebles", true),
new Productos ("Mesa Ombu", 5000, "muebles", true),
new Productos ("Baul Ballena", 4500, "muebles", true),
new Productos ("Rompecabezas Taruca", 800, "juegos", true),
new Productos ("Rompecabezas Aguara Guazu", 800, "juegos", true),
new Productos ("Rompecabezas Yaguarete", 800, "juegos", true),
new Productos ("Kit Completo", 3900, "juegos", true),
]

const muebles = lista.slice(0, 6);
const juegos = lista.slice(6, 10);

function seleccion () {
    let entrada = prompt("Opcion 1-Muebles / 2-Juegos")
    if(entrada == 1){
        console.log(muebles);
    }if( entrada == 2){
        console.log(juegos)
    }else{
        console.log("Error")
    }
}

seleccion();





