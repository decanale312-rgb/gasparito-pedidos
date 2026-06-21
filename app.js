const selectorMesa = document.querySelector("#mesa");
const estadoMesa = document.querySelector("#estado-mesa");
const botonesProducto = document.querySelectorAll(".producto");
const tipoTaco = document.querySelector("#tipo-taco");
const cantidadTaco = document.querySelector("#cantidad-taco");
const botonAgregarTaco = document.querySelector("#agregar-taco");
const errorTaco = document.querySelector("#error-taco");
const varianteTostada = document.querySelector("#variante-tostada");
const cantidadTostada = document.querySelector("#cantidad-tostada");
const botonAgregarTostada = document.querySelector("#agregar-tostada");
const errorTostada = document.querySelector("#error-tostada");
const varianteEmpanada = document.querySelector("#variante-empanada");
const cantidadEmpanada = document.querySelector("#cantidad-empanada");
const botonAgregarEmpanada = document.querySelector("#agregar-empanada");
const errorEmpanada = document.querySelector("#error-empanada");
const salsaPicadita = document.querySelector("#salsa-picadita");
const guisoPicadita = document.querySelector("#guiso-picadita");
const cantidadPicadita = document.querySelector("#cantidad-picadita");
const botonAgregarPicadita = document.querySelector("#agregar-picadita");
const errorPicadita = document.querySelector("#error-picadita");
const listaPedido = document.querySelector("#lista-pedido");
const pedidoVacio = document.querySelector("#pedido-vacio");
const totalPedido = document.querySelector("#total");
const botonEnviarCocina = document.querySelector("#enviar-cocina");
const botonBorrarPedido = document.querySelector("#borrar-pedido");
const errorEnvio = document.querySelector("#error-envio");

const numeroCocina = "526563171683";
const pedido = [];

selectorMesa.addEventListener("change", () => {
  const mesa = selectorMesa.value;

  if (!mesa) {
    estadoMesa.textContent = "Todavía no has seleccionado una mesa.";
    return;
  }

  estadoMesa.textContent = `Pedido para Mesa ${mesa}.`;
});

botonesProducto.forEach((boton) => {
  boton.addEventListener("click", () => {
    if (
      boton.id === "agregar-taco" ||
      boton.id === "agregar-tostada" ||
      boton.id === "agregar-empanada" ||
      boton.id === "agregar-picadita"
    ) {
      return;
    }

    const producto = {
      nombre: boton.dataset.nombre,
      precio: Number(boton.dataset.precio)
    };

    pedido.push(producto);
    mostrarPedido();
  });
});

botonAgregarTaco.addEventListener("click", () => {
  const opcionSeleccionada = tipoTaco.selectedOptions[0];

  if (!tipoTaco.value) {
    errorTaco.textContent = "Selecciona un tipo de taco.";
    return;
  }

  const producto = {
    nombre: tipoTaco.value,
    precio: Number(opcionSeleccionada.dataset.precio)
  };

  agregarProductoVariasVeces(producto, cantidadTaco, errorTaco);

  if (!errorTaco.textContent) {
    tipoTaco.value = "";
    cantidadTaco.value = "1";
  }
});

botonAgregarTostada.addEventListener("click", () => {
  if (!varianteTostada.value) {
    errorTostada.textContent = "Selecciona una opción para la tostada.";
    return;
  }

  const producto = {
    nombre: "Tostada",
    variante: varianteTostada.value,
    precio: 25
  };

  agregarProductoVariasVeces(producto, cantidadTostada, errorTostada);

  if (!errorTostada.textContent) {
    varianteTostada.value = "";
    cantidadTostada.value = "1";
  }
});

botonAgregarEmpanada.addEventListener("click", () => {
  if (!varianteEmpanada.value) {
    errorEmpanada.textContent = "Selecciona una opción para la empanada.";
    return;
  }

  const producto = {
    nombre: "Empanada",
    variante: varianteEmpanada.value,
    precio: 88
  };

  agregarProductoVariasVeces(producto, cantidadEmpanada, errorEmpanada);

  if (!errorEmpanada.textContent) {
    varianteEmpanada.value = "";
    cantidadEmpanada.value = "1";
  }
});

botonAgregarPicadita.addEventListener("click", () => {
  if (!salsaPicadita.value || !guisoPicadita.value) {
    errorPicadita.textContent = "Selecciona salsa o base y guiso para la picadita.";
    return;
  }

  const producto = {
    nombre: "Picadita",
    variante: `${salsaPicadita.value} + ${guisoPicadita.value}`,
    precio: 100
  };

  agregarProductoVariasVeces(producto, cantidadPicadita, errorPicadita);

  if (!errorPicadita.textContent) {
    salsaPicadita.value = "";
    guisoPicadita.value = "";
    cantidadPicadita.value = "1";
  }
});

botonEnviarCocina.addEventListener("click", () => {
  if (!selectorMesa.value) {
    errorEnvio.textContent = "Selecciona una mesa antes de enviar el pedido.";
    return;
  }

  if (pedido.length === 0) {
    errorEnvio.textContent = "Agrega al menos un producto a la cuenta antes de enviar.";
    return;
  }

  errorEnvio.textContent = "";

  const mensaje = crearMensajeWhatsApp();
  const enlaceWhatsApp = `https://wa.me/${numeroCocina}?text=${encodeURIComponent(mensaje)}`;

  window.open(enlaceWhatsApp, "_blank");
});

botonBorrarPedido.addEventListener("click", () => {
  pedido.length = 0;
  errorEnvio.textContent = "";
  mostrarPedido();
});

function mostrarPedido() {
  listaPedido.innerHTML = "";

  const productosAgrupados = agruparPedido();

  productosAgrupados.forEach((producto) => {
    const item = document.createElement("li");
    const variante = producto.variante ? ` (${producto.variante})` : "";

    const textoProducto = document.createElement("span");
    textoProducto.textContent = `${producto.cantidad} x ${producto.nombre}${variante} - $${producto.subtotal}`;

    const botonQuitar = document.createElement("button");
    botonQuitar.className = "boton-quitar";
    botonQuitar.type = "button";
    botonQuitar.textContent = "Quitar";
    botonQuitar.addEventListener("click", () => {
      quitarProducto(producto.clave);
    });

    item.appendChild(textoProducto);
    item.appendChild(botonQuitar);
    listaPedido.appendChild(item);
  });

  const total = pedido.reduce((suma, producto) => suma + producto.precio, 0);

  totalPedido.textContent = `$${total}`;
  pedidoVacio.style.display = pedido.length === 0 ? "block" : "none";
}

function agregarProductoVariasVeces(producto, campoCantidad, campoError) {
  const cantidad = Number(campoCantidad.value);

  if (!Number.isInteger(cantidad) || cantidad < 1) {
    campoError.textContent = "La cantidad debe ser 1 o más.";
    return;
  }

  for (let i = 0; i < cantidad; i += 1) {
    pedido.push(producto);
  }

  campoError.textContent = "";
  mostrarPedido();
}

function agruparPedido() {
  const grupos = {};

  pedido.forEach((producto) => {
    const clave = `${producto.nombre}-${producto.variante || ""}`;

    if (!grupos[clave]) {
      grupos[clave] = {
        clave,
        nombre: producto.nombre,
        variante: producto.variante,
        precio: producto.precio,
        cantidad: 0,
        subtotal: 0
      };
    }

    grupos[clave].cantidad += 1;
    grupos[clave].subtotal += producto.precio;
  });

  return Object.values(grupos);
}

function quitarProducto(clave) {
  const indice = pedido.findIndex((producto) => {
    const claveProducto = `${producto.nombre}-${producto.variante || ""}`;
    return claveProducto === clave;
  });

  if (indice >= 0) {
    pedido.splice(indice, 1);
    mostrarPedido();
  }
}

function crearMensajeWhatsApp() {
  const productosAgrupados = agruparPedido();
  const total = pedido.reduce((suma, producto) => suma + producto.precio, 0);

  const lineasProductos = productosAgrupados.map((producto) => {
    const variante = producto.variante ? ` (${producto.variante})` : "";
    return `${producto.cantidad} x ${producto.nombre}${variante}`;
  });

  return [
    "PEDIDO PARA COCINA",
    "",
    `Mesa: ${selectorMesa.value}`,
    "",
    ...lineasProductos,
    "",
    `Total: $${total}`
  ].join("\n");
}
