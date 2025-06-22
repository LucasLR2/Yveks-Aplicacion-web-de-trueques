// Mapa de colores predefinidos global
const mapaColores = {
  primario: "text-green",
  secundario: "text-blue-600",
  acento: "text-purple-600",
  advertencia: "text-orange-600",
  exito: "text-green-600",
  info: "text-blue-500",
  peligro: "text-red-600",
  gris: "text-gray-600",
};

// Función para generar estrellas (uso global, no productos)
function generarEstrellas(cantidad) {
  let estrellas = "";
  const estrellaLlena = "⭐";
  const estrellaVacia = "☆";
  for (let i = 1; i <= 5; i++) {
    if (i <= cantidad) {
      estrellas += estrellaLlena;
    } else {
      estrellas += estrellaVacia;
    }
  }
  return estrellas;
}

// Función de navegación móvil
function setActiveTab(elemento, indice, dispositivo) {
  const idBurbuja =
    dispositivo === "mobile" ? "mobile-bubble" : "desktop-bubble";
  const burbuja = document.getElementById(idBurbuja);
  const botones = document.querySelectorAll(
    `[onclick*="setActiveTab"][onclick*="${dispositivo}"]`
  );

  if (indice === 2) {
    burbuja.style.opacity = "0";
    const botonCentral = botones[2];
    botonCentral.style.transform = "scale(1.2)";
    botonCentral.style.transition = "transform 0.3s ease";

    botones.forEach((btn, i) => {
      const icono = btn.querySelector("img");
      if (i === 2) return; // No cambiar el plus
      btn.classList.remove("text-green");
      btn.classList.add("text-gray-300");
      icono.classList.remove("svg-green");
      icono.classList.add("svg-white");
      icono.style.transform = "translateY(0)";
      icono.style.transition = "transform 0.3s ease";
      // Cambiar a icono Outline
      cambiarIconoAOutline(icono);
      // Eliminar cualquier clase svg-* de color antes de agregar svg-white
      icono.classList.remove(
        "svg-green",
        "svg-gray-300",
        "svg-gray-400",
        "svg-gray-600",
        "svg-gray-800",
        "svg-yellow"
      );
    });
  } else {
    burbuja.style.opacity = "1";
    const botonCentral = botones[2];
    botonCentral.style.transform = "scale(1)";
    botonCentral.style.transition = "transform 0.3s ease";
    // Nuevo cálculo usando left
    const contenedorVerde = burbuja.parentElement;
    const anchoContenedor = contenedorVerde.offsetWidth;
    const cantidadBotones = botones.length;
    const anchoBoton = anchoContenedor / cantidadBotones;
    const leftBurbuja = (indice + 0.5) * anchoBoton - burbuja.offsetWidth / 2;
    burbuja.style.left = leftBurbuja + "px";
    burbuja.style.transform = "translateY(11px)";
    botones.forEach((btn, i) => {
      const icono = btn.querySelector("img");
      if (i === 2) return; // No cambiar el plus
      if (btn.classList.contains("bg-white")) {
        return;
      }
      if (i === indice) {
        btn.classList.remove("text-gray-300");
        btn.classList.add("text-green");
        icono.classList.remove(
          "svg-white",
          "svg-gray-300",
          "svg-gray-400",
          "svg-gray-600",
          "svg-gray-800",
          "svg-yellow",
          "svg-green"
        );
        icono.classList.add("svg-green");
        icono.style.transform = "translateY(-8px)";
        icono.style.transition = "transform 0.3s ease";
        // Cambiar a icono Solid
        cambiarIconoASolid(icono);
      } else {
        btn.classList.remove("text-green");
        btn.classList.add("text-gray-300");
        icono.classList.remove(
          "svg-green",
          "svg-gray-300",
          "svg-gray-400",
          "svg-gray-600",
          "svg-gray-800",
          "svg-yellow",
          "svg-white"
        );
        icono.classList.add("svg-white");
        icono.style.transform = "translateY(0)";
        icono.style.transition = "transform 0.3s ease";
        // Cambiar a icono Outline
        cambiarIconoAOutline(icono);
      }
    });
  }
}

// Función de navegación escritorio
function setDesktopActiveNav(elemento) {
  document.querySelectorAll(".desktop-nav-item").forEach((item) => {
    item.classList.remove("active", "bg-green", "text-white");
    item.classList.add("text-green", "hover:bg-gray-50");
    // Cambiar iconos a Outline
    const icono = item.querySelector("img");
    if (icono) {
      cambiarIconoAOutline(icono);
      icono.classList.remove("svg-white");
      icono.classList.add("svg-green");
    }
  });
  elemento.classList.remove("text-green", "hover:bg-gray-50");
  elemento.classList.add("active", "bg-green", "text-white");
  // Cambiar icono a Solid
  const icono = elemento.querySelector("img");
  if (icono) {
    cambiarIconoASolid(icono);
    icono.classList.remove("svg-green");
    icono.classList.add("svg-white");
  }
}

// Función para cambiar icono a Outline
function cambiarIconoAOutline(icono) {
  const src = icono.src;
  if (src.includes("/Solid/")) {
    const nuevoSrc = src.replace("/Solid/", "/Outline/");
    icono.src = nuevoSrc;
  }
}

// Función para cambiar icono a Solid
function cambiarIconoASolid(icono) {
  const src = icono.src;
  if (src.includes("/Outline/")) {
    const nuevoSrc = src.replace("/Outline/", "/Solid/");
    icono.src = nuevoSrc;
  }
}

// Función genérica para manejar iconos SVG
function obtenerIconoVectorial(nombre, opciones = {}) {
  const {
    tamano = "w-5 h-5",
    color = "primario",
    alt = nombre,
    colorPersonalizado = null,
  } = opciones;
  return `<img src="recursos/iconos/Outline/${nombre}.svg" alt="${alt}" class="${tamano} svg-green">`;
}

// Evento de redimensionamiento global
window.addEventListener("resize", function () {
  // Aquí puedes agregar lógica global para el redimensionamiento
  console.log("Ventana redimensionada");
});

// Inicialización global
document.addEventListener("DOMContentLoaded", function () {
  // Activar primera pestaña móvil por defecto
  const primerTabMovil = document.querySelector(
    '[onclick*="setActiveTab"][onclick*="mobile"]'
  );
  if (primerTabMovil) {
    setActiveTab(primerTabMovil, 0, "mobile");
  }
});

const menu = document.getElementById("menu");
  const button = document.getElementById("menu-button");

  function showDropdown() {
    menu.classList.toggle("hidden");
  }

  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !button.contains(event.target)) {
      menu.classList.add("hidden"); 
    }
  });
