/*CLASES*/
class Reserva{
    constructor(pNombre, pApellido, pTelefono, pMail, pDia, pHora, pCantidadPersonas){
        this.nombre = pNombre;
        this.apellido = pApellido;
        this.telefono = pTelefono;
        this.mail = pMail;
        this.dia = pDia;
        this.hora = pHora;
        this.cantidadPersonas = pCantidadPersonas;
    }
}

class Carrito{
    constructor(pIdUser){
        this.idUser = pIdUser;
        this.products = [];
    }
}

/*FUNCIONES*/
function validarFormReserva(){
    let ok = true;

    if(document.getElementById("fname").value == "" || document.getElementById("lname").value == "" || document.getElementById("tel").value == "" || document.getElementById("email").value == "" || document.getElementById("date").value == "" || document.getElementById("time").value == "" || document.getElementById("cantidad").value == ""){

        alert("Por favor complete todos los campos solicitados");
        ok = false;
    }else{
        let nuevaReserva = new Reserva(document.getElementById("fname").value, document.getElementById("lname").value, document.getElementById("tel").value, document.getElementById("email").value, document.getElementById("date").value, document.getElementById("time").value, document.getElementById("cantidad").value);

        //LocalStorage 
        arrayReservas.push(nuevaReserva);
        localStorage.setItem(1, JSON.stringify(arrayReservas));

        mostrarReservaDom();
        }
        return ok;
}

function mostrarReservaDom(){
    $(`#datosReserva`).append($(`<div class="div-datos-reserva" id="sub-div-reserva" style="display: none">
                                    <h6>¡Reserva confirmada!</h6>
                                    <p>Usted reservó a nombre de: <b>${document.getElementById("fname").value} ${document.getElementById("lname").value}</p></b>
                                    <p>Los datos de contacto son: <b>${document.getElementById("tel").value} / ${document.getElementById("email").value}</p></b>
                                    <p>La fecha y hora de reserva son: <b>${document.getElementById("date").value} / ${document.getElementById("time").value}</p></b>
                                    <p>La cantidad de personas es: <b>${document.getElementById("cantidad").value}</p></b>

                                    <p><i>Para ver nuevamente los datos de su reserva presione el botón de notificaciones arriba a la izquierda.</i></p>

                                    <button id="btn-aceptar-reserva">Aceptar</button>
                                </div>`).fadeIn(200));

    $(`#btn-aceptar-reserva`).on("click", function(){
        $(`#sub-div-reserva`).fadeOut(200, function(){
            $(`#sub-div-reserva`).remove();
        });
    });
}

function mostrarMensajePlatoAgregado(){
    $(`#platoAgregado`).append($(`<div id="sub-div-plato-agregado" style="display: none">
                                    <h6>¡Plato agregado!</h6>
                                    <p>Presiona el carrito para ver tu compra.</p>

                                    <button id="btn-aceptar-plato">Aceptar</button>
                                </div>`).fadeIn(200));

    $(`#btn-aceptar-plato`).on("click", function(){
        $(`#sub-div-plato-agregado`).fadeOut(200, function(){
            $(`#sub-div-plato-agregado`).remove();
        });
    });
}

function validarFormPedido(e){
    e.preventDefault();

    let ok = true;

    if(document.getElementById("nombreCompra").value == "" || document.getElementById("direccionCompra").value == "" || document.getElementById("mailCompra").value == ""){
        alert("Por favor complete todos los campos solicitados");
        ok = false;
    }else{
        mostrarMensajePedidoConfirmado()
    }
    return ok;
}

function mostrarMensajePedidoConfirmado(){
    $(`#mensajePedido`).append(`<div class="div-mensaje-pedido" id="sub-div-mensaje-pedido">
                                <h6>¡Perfecto!</h6>
                                <p>Gracias por ordenar en Sándalo Restaurant, ${document.getElementById("nombreCompra").value}</p>
                                <p>Realizá tu pago a través de Mercado Pago y una vez validado recibirás un mail con la confirmación de tu pedido.</p>

                                <a href="https://www.mercadopago.com.ar/" target="_blank" id="btn-aceptar-mensaje">CONTINUAR A MERCADO PAGO</a>
                                </div>`);

    $(`#btn-aceptar-mensaje`).on("click", function(){
        $(`#sub-div-mensaje-pedido`).fadeOut(500, function(){
            $(`#sub-div-mensaje-pedido`).remove();
        });
    });
}

function mostrarNotificacionReserva(){
    let getDatosReserva = JSON.parse(localStorage.getItem(1));
    
    $(`#notificacionReservas`).append($(`<div id="sub-div-notificacion" style="display: none; height: 100%">
                                            <div class="title-cerrar">
                                                <h6>Reservas</h6>
                                                <button id="btn-cerrar-not"><i class="fas fa-times"></i></button>
                                            </div>
                                            <div class="icon-data-reserva">
                                                <i class="fas fa-calendar-day"></i>
                                                <p><b>${getDatosReserva[0].dia} / ${getDatosReserva[0].hora}</b>. Mesa a nombre de <b>${getDatosReserva[0].nombre} ${getDatosReserva[0].apellido}</b> para ${getDatosReserva[0].cantidadPersonas} personas.</p>
                                            </div>
                                        </div>`).slideDown(500));
    
    $(`#btn-cerrar-not`).on("click", function(){
        $(`#sub-div-notificacion`).slideUp(500, function(){
        $(`#sub-div-notificacion`).remove();
        });
    });
}

function mostrarCarrito(){
    $(`#divCarrito`).append($(`<div id="sub-div-carrito" style="display: none; height: 100%">
                                    <div class="div-carrito-title">
                                        <div class="div-carrito">
                                            <i class="fas fa-shopping-cart"></i>
                                            <h6>CARRITO</h6>
                                        </div>
                                        <button id="btn-cerrar-carrito"><i class="fas fa-times"></i></button>
                                    </div>
                                    <p class="carrito-subtitle">Estás llevando...</p>
                                    <div id="div-platos-agregados"></div>
                                    <div id="div-pago-carrito"></div>
                                </div>`).slideDown(500));

    //Calcular precio total
    let precioFinal = 0;
    for (const platoSeleccionado of carrito.products){
        $(`#div-platos-agregados`).append(`<p>Plato ${platoSeleccionado.tipo} <b>${platoSeleccionado.nombre}</b> por un precio de <b>${platoSeleccionado.precio}</b></p>`);

        let precioTotal = platoSeleccionado.precio;
        precioFinal+=precioTotal;
    }

    //Mostrar total a pagar y formulario de compra
    $(`#div-pago-carrito`).append(`<hr>
                                   <p class="carrito-total">El precio total a pagar es <b>$${precioFinal}</b></p>
                                   <hr>
                                   <p>Para continuar con el pago, ingresá los siguientes datos:</p>
                                   <form id="formPedido">
                                        <input type="text" name="nombreCompra" id="nombreCompra" placeholder="Nombre y apellido">
                                        <input type="text" name="direccionCompra" id="direccionCompra" placeholder="Dirección">
                                        <input type="email" name="mailCompra" id="mailCompra" placeholder="Mail">
                                        <input type="submit" name="enviar" value="Enviar">
                                   </form>`);

    //Enviar formulario pedido
    $(`#formPedido`).on("submit", validarFormPedido);
    
    //Botón para cerrar carrito.
    $(`#btn-cerrar-carrito`).on("click", function(){
        $(`#sub-div-carrito`).slideUp(500, function(){
            $(`#sub-div-carrito`).remove();
        });
    });
}

function mostrarPlatosMenu(){
    $.getJSON(URLJSON, function (respuesta, estado) {
        if(estado === "success"){
          let menu = respuesta;
            for (const plato of menu){
                $(`.div-general-menu`).append(`<div class="col-6 sub-div-menu">
                                                    <div class="div-plato">
                                                        <h5>${plato.nombre}</h5>
                                                        <p class="plato-description">${plato.descripcion}</p>
                                                        <div class="d-flex justify-content-between price-select">
                                                            <p class="plato-price">$${plato.precio}</p>
                                                            <button class="btn-select-plato" id="btn-select${plato.id}"><i class="fas fa-plus-square"></i></button>
                                                        </div>
                                                    </div>
                                            </div>`);
                //Push platos al carrito
                $(`#btn-select${plato.id}`).on("click", function(){
                let platoSeleccionado = menu.find(x => x.id == `${plato.id}`);
                carrito.products.push(platoSeleccionado);
                mostrarMensajePlatoAgregado();
                });
            }  
        }
    });
    
}

/*CONSTANTES*/
//Array reservas
const arrayReservas = [];

//Archivo JSON local > Datos platos del menú
const URLJSON = "data/data.json"

//Carrito
const carrito = new Carrito("Usuario 1");

/*LISTENERS*/
//Envío y reseteo formulario reserva
let formReserva = document.getElementById("formulario");
formReserva.addEventListener("submit", function(e){
    e.preventDefault();
    validarFormReserva();
    formReserva.reset();
});

//Notificación datos reserva
$(`#notification-btn`).on("click", mostrarNotificacionReserva);

//Carrito
$(`#carrito-btn`).on("click", mostrarCarrito);

/*LLAMADO FUNCIONES*/
mostrarPlatosMenu();