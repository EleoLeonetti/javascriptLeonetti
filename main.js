const section = document.querySelector(".catalogo");
const plantilla = document.querySelector(".tempCatalogo").content;
const templateCarrito = document.querySelector(".tempCarrito").content;
const templateTotales = document.querySelector(".tempTotales").content;
const comprados = document.querySelector(".detalleCompra");
const footerCarrito = document.querySelector(".footerCarrito");

let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
// Apliqué OPERADOR LOGICO OR
    carrito = JSON.parse(localStorage.getItem('carrito')) || {}
    verCarrito();

})
const fetchData = async () => {
    try {
        const res = await fetch('stock.json');
        const data = await res.json();
        cardProductos(data);
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('click', e => {
    agregarCarrito(e);
})

comprados.addEventListener('click', e => {
    botonesCantidad(e)
})

const cardProductos = data => {
    data.forEach(producto => {
        plantilla.querySelector('img').setAttribute("src", producto.img);
        plantilla.querySelector('h5').textContent = producto.nombre;
        plantilla.querySelector('p').textContent = producto.descripcion;
        plantilla.querySelector('strong').textContent = producto.precio;
        plantilla.querySelector('.btnCard').dataset.id = producto.id;

        const cardClon = plantilla.cloneNode(true);
        section.appendChild(cardClon)
    })
}

const agregarCarrito = e => {
    if (e.target.classList.contains('btnCard')) {
        productoCarrito(e.target.parentElement)
    }
}

const productoCarrito = objeto => {
    const productoC = {
        id: objeto.querySelector('.btnCard').dataset.id,
        nombre: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('strong').textContent,
        cantidad: 1
    } 
// Apliqué acceso condicional a un objeto
    carrito(productoC?.id || (productoC.cantidad = carrito[productoC.id].cantidad + 1));
// El spread ya lo había aplicado previamente. Está era una de las cosas que te comentaba para la 2da entrega que había buscado por fuera del material del curso. Más adelante lo utilicé una vezmás
    carrito[productoC.id] = {...productoC};
    verCarrito();
}

const verCarrito = () => {
comprados.innerHTML = '';
 Object.values(carrito).forEach(productoC => {
    templateCarrito.querySelector('.tdNombre').textContent = productoC.nombre;
    templateCarrito.querySelector('.tdCantidad').textContent = productoC.cantidad;
    templateCarrito.querySelector('.btnMas').dataset.id = productoC.id;
    templateCarrito.querySelector('.btnMenos').dataset.id = productoC.id;
    templateCarrito.querySelector('.tdPrecio').textContent = "$ " + productoC.cantidad * productoC.precio;
    
    const clon = templateCarrito.cloneNode(true);
    comprados.appendChild(clon);
 })
 detalleCarrito();
 
 localStorage.setItem('carrito',JSON.stringify(carrito))
}

const detalleCarrito = ()=> {
    footerCarrito.innerHTML = '';
    if (Object.keys(carrito).length === 0){
        return
    }
    const cantidadTotal = Object.values(carrito).reduce((acc,{cantidad} ) => acc +cantidad,0)

    const precioTotal = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)

    templateTotales.querySelector(".ftdCantidad").textContent = cantidadTotal;
    templateTotales.querySelector(".ftdTotal").textContent = "$ " + precioTotal;

    const clone = templateTotales.cloneNode(true);
    footerCarrito.appendChild(clone)

    const btnVaciar = document.querySelector(".btnVaciar")
    btnVaciar.addEventListener( 'click', () => {
        carrito = {}
        verCarrito()
    })
}

 const botonesCantidad = e => {
    if(e.target.classList.contains('btnMas')){
        const producto = carrito[e.target.dataset.id];
// El ++ también ya lo había incorporado en segunda entrega. Este se había utilizado alguna vez en clase.
        producto.cantidad ++
// Spread operator
        carrito[e.target.dataset.id] = {...producto}
        verCarrito()
    }
    if(e.target.classList.contains('btnMenos')){
        const producto = carrito[e.target.dataset.id];
        producto.cantidad --
        if(producto.cantidad === 0){
        delete carrito[e.target.dataset.id]
    }
    verCarrito()
    }
 }