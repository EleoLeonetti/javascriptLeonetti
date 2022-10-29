const section = document.querySelector(".catalogo");
const plantilla = document.querySelector(".tempCatalogo").content;
const btnCard = document.querySelector(".btnCard");
const templateCarrito = document.querySelector(".tempCarrito").content;
const templateTotales = document.querySelector(".tempTotales").content;
const comprados = document.querySelector(".detalleCompra");
const footerCarrito = document.querySelector(".footerCarrito");
const btnFinalizar = document.querySelector(".btnFinalizar");
const modalFin = document.querySelector(".modalFin");
const formulario = document.querySelector(".formFin");
const formNombre = document.querySelector(".formNombre");
const formMail = document.querySelector(".formMail");
const suscribirse = document.querySelector(".send")
const inputSuscribirse = document.querySelector("#suscripcionMail");

let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
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
    notificacion(e);
})

comprados.addEventListener('click', e => {
    botonesCantidad(e)
})

btnFinalizar.addEventListener('click', e =>{
    finalizarCompra(e)
})

suscribirse.addEventListener('click', (e) =>{
    if(inputSuscribirse.value == null || inputSuscribirse.value.length == 0){
        Swal.fire('Dejanos tu email para recibir novedades')
    }else{
    Swal.fire({
        icon: 'succes',
        title: 'Gracias por suscribirse',
        text: 'Pronto recibirás novedades y ofertas especiales!',
      })
    }
      e.preventDefault();
})


formulario.addEventListener("submit", validarFormulario);

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
        productoCarrito(e.target.parentElement);
    }
}
const notificacion = e => {
    if (e.target.classList.contains('btnCard')){
        Toastify({
            text: "Producto agregado al carrito",     
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
                background: "#e75217",
              },
            offset: {
                y:50,
            }
            }).showToast();
    }
}

const productoCarrito = objeto => {
    const productoC = {
        id: objeto.querySelector('.btnCard').dataset.id,
        nombre: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('strong').textContent,
        cantidad: 1
    } 
    if(carrito.hasOwnProperty(productoC.id)){
        productoC.cantidad = carrito[productoC.id].cantidad + 1;
    }
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
        producto.cantidad ++
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


 finalizarCompra = e => {
    if(Object.keys(carrito).length === 0){
        Swal.fire({
            title: 'No seleccionó ningún producto',
            text: "Para iniciar compra agregue productos al carrito",
            confirmButtonColor: '#106567',
            confirmButtonText: 'Comprar'
          })

    }else{
        modalFin.style.display = "block";
        window.addEventListener("click",function(event) {
            if (event.target == modalFin) {
              modalFin.style.display = "none";
            }
          });
    }
 }

 function validarFormulario (e){
    e.preventDefault();
    if(formMail.value == null || formMail.value.length == 0 || formNombre.value == null || formNombre.value.length == 0){
        Swal.fire('Por favor, completar todos los datos para que podamos contactarte')
    }else{
    Swal.fire({
        title: `Gracias por tu compra, ${formNombre.value}`,
        text: `Pronto recibirás novedades de tu compra al mail ${formMail.value}`,
      })
    }
 }