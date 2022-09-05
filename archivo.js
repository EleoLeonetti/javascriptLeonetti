function sumar (producto1, producto2){
    return producto1 + producto2;
}
let total = sumar(1000, 2000);
alert("El total de su compra es: $ " + total);

let descuento20 = total - (total * 0.20);

alert("Descuento 20% por pago en efectivo o transferencia")
let medioDePago = prompt("Seleccione forma de pago: 1.Efectivo 2. Transferencia 3. Tarjeta de debito, 4. Tarjeta de credito");

function descuento (){
    if ((medioDePago == "1") || (medioDePago == "2")){
        return descuento20;
    }else if ((medioDePago == "3") || (medioDePago == "4")){
        alert("El total de su compra es: $ " + total);
    }else{
        alert("El método de pago ingresado no es válido")
    }
}
alert(descuento());





