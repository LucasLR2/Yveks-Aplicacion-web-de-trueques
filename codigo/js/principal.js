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

// Funciones para cambiar iconos entre solid y outline
function cambiarIconoASolid(icono) {
  if (!icono || !icono.src) return;
  
  const rutaActual = icono.src;
  
  // Si ya es solid, no hacer nada
  if (rutaActual.includes('/solido/')) return;
  
  // Cambiar de contorno a sólido
  const nuevaRuta = rutaActual.replace('/contorno/', '/solido/');
  icono.src = nuevaRuta;
}

function cambiarIconoAOutline(icono) {
  if (!icono || !icono.src) return;
  
  const rutaActual = icono.src;
  
  // Si ya es outline (contorno), no hacer nada
  if (rutaActual.includes('/contorno/')) return;
  
  // Cambiar de sólido a contorno
  const nuevaRuta = rutaActual.replace('/solido/', '/contorno/');
  icono.src = nuevaRuta;
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

// Evento de redimensionamiento global
window.addEventListener("resize", function () {
  // Aquí puedes agregar lógica global para el redimensionamiento
  console.log("Ventana redimensionada");
});

// Inicialización global
document.addEventListener("DOMContentLoaded", function () {
  // Activar primera pestaña móvil por defecto (solo si existe)
  const primerTabMovil = document.querySelector(
    '[onclick*="setActiveTab"][onclick*="mobile"]'
  );
  if (primerTabMovil) {
    try {
      setActiveTab(primerTabMovil, 0, "mobile");
    } catch(error) {
      console.warn("Error al activar tab móvil:", error);
    }
  }
});