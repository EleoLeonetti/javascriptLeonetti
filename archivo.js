class Productos {
    constructor(id, nombre, precio, tipo, disponible){
        this.id = id;
        this.nombre = nombre;
        this.precio = Number(precio);
        this.tipo = tipo;
        this.disponible = disponible;
    }
}

const stock =  [
new Productos (1, "Silla Mara", Number(4500), "muebles", true),
new Productos (2, "Silla Taruca", Number(4500), "muebles", true),
new Productos (3, "Silla Yaguarete", Number(4500), "muebles", true),
new Productos (4, "Silla Yurumi", Number(4500), "muebles", true),
new Productos (5, "Mesa Ombu", Number(5000), "muebles", true),
new Productos (6, "Baul Ballena", Number(5000), "muebles", true),
new Productos (7, "Rompecabezas Taruca", Number(800), "juegos", true),
new Productos (8, "Rompecabezas Aguara Guazu", Number(800), "juegos", true),
new Productos (9, "Rompecabezas Yaguarete", Number(800), "juegos", true),
new Productos (10, "Kit Completo", Number(3900), "juegos", true),
]


const carrito = [ ];

const muebles = stock.filter((m) => m.tipo.includes("muebles"));
const juegos = stock.filter((j) => j.tipo.includes("juegos"));


const listaStock = stock.map(stock => stock.id + ' ' + stock.nombre + ' ' + '$' + stock.precio);
const listaMuebles = muebles.map(muebles => muebles.id + ' ' + muebles.nombre + ' ' + '$' + muebles.precio);
const listaJuegos = juegos.map(juegos => juegos.id + ' ' + juegos.nombre + ' ' + '$' + juegos.precio);




function inicio(){
    let bienvenido = prompt('Bienvenido a Kimkelen. Seleccione que tipo de producto le interesa: \r A- Muebles \r B- Juegos \r C- TODOS: INICIAR COMPRA');
    if(bienvenido == "A"){
        alert(listaMuebles);
        inicio();
    }if(bienvenido == "B"){
        alert(listaJuegos);
        inicio();
    }if(bienvenido == "C"){
        agregarProducto();
    }else{
        inicio();
    }
    };


function agregarProducto(){
    let productoId = Number(prompt('Ingrese N° de ID del producto que desea comprar: \r' + listaStock + ' \r Ingrese 00 para finalizar compra y ver carrito'));
    if(productoId != 00){
    let producto = stock.find(product => product.id===productoId);
    carrito.push(producto);
    agregarProducto();
    }if(productoId == 00){
        verCarrito();
    }
}


function calculoTotal(carrito){
    let total = 0;
    carrito.forEach(producto=> {
        total += producto.precio
    });
    return total;
}

function verCarrito(){
    alert('EL TOTAL DE SU COMPRA ES: $' + calculoTotal(carrito))
    let entrada = prompt('FIN para finalizar compra \r SEGUIR para continuar comprando ')
    if(entrada == "FIN"){
        alert("Gracias por su compra!");
    }if(entrada == "SEGUIR"){
        agregarProducto();
    }else{
        alert("Gracias por visitarnos. Vuelva pronto");
    } 
}

inicio();











