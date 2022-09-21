class Producto {
    constructor(id, nombre, precio, tipo, disponible, img, detalle, apto = "A PARTIR DE LOS 3 AÑOS"){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.tipo = tipo;
        this.disponible = disponible;
        this.img = img;
        this.detalle = detalle;
        this.apto = apto;    
    };
}

const stock =  [
new Producto (1, "Silla Mara", 4500, "muebles", true, "./img/silla-mara.png", "Silla inspirada en la postura sentada de la Mara y sus largas patas delanteras."),
new Producto (2, "Silla Taruca", 4500, "muebles", true, "./img/silla-taruca.png", "Silla inspirada en la pequeña ornamenta y grandes orejas de La Taruca"),
new Producto (3, "Silla Yaguarete", 4500, "muebles", true, "./img/silla-yaguarete.png",  "Silla inspirada en la postura del Yaguareté cuando descansa sobre los árboles"),
new Producto (4, "Silla Yurumi", 4500, "muebles", true, "./img/silla-yurumi.png", "Silla inspirada en la trompa del Yurumí. Cuenta con un estante para guardar cosas"),
new Producto (5, "Mesa Ombu", 5000, "muebles", true, "./img/mesa-ombu.png", "Mesa inspirada en las raíces anchas y las ramas abiertas del Ombú"),
new Producto (6, "Baul Ballena", 5000, "muebles", true, "./img/baul-ballena.png", "Baúl y en sí mismo un juego inspirado en La Ballena Franca Austral"),
new Producto (7, "Rompecabezas: Kit individual", 800, "juegos", true,"./img/juego-aguara.png", "Contiene: un animal para armar, una base, una tempera y un pincel."),
new Producto (8, "Rompecabezas: Kit Completo", 3900, "juegos", true, "./img/juego-kitcompleto.png", "Contiene: seis animales para armar, seis bases, seis temperas y un pincel."),
];

const carrito = [ ];

let section = document.querySelector(".catalogo");
let plantilla = document.querySelector(".tempCatalogo");
let card = plantilla.content.querySelector(".card");


stock.forEach((Producto)=>{
    let cardClon = card.cloneNode(true);
    section.appendChild(cardClon);
    cardClon.children[0].src = Producto.img;
    cardClon.children[1].innerText = Producto.nombre;
    cardClon.children[2].innerText = Producto.detalle;
    cardClon.children[3].innerText = Producto.apto;
    cardClon.children[4].innerText = "ARS $ " + Producto.precio + ".-";
});

const formulario = document.querySelector(".suscripcion")
const mail = document.querySelector("#suscripcionMail")
formulario.addEventListener("submit", validarFormulario)

function validarFormulario(e){   
    const confirmacion = document.createElement("p");
    confirmacion.innerHTML = "Se suscribió correctamente";
    document.querySelector(".mensaje").appendChild(confirmacion);
}









