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

// Variable global para identificar la ruta actual (para el chatbot)
window.rutaActual = window.rutaActual || '';

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

function activarTabMovil(indiceActivo) {
  const botones = document.querySelectorAll('.mobile-nav-btn, [data-index="2"]');
  if (!botones.length) return;
  
  botones.forEach((btn) => {
    const icono = btn.querySelector('img');
    if (!icono) return;
    
    const btnIndex = parseInt(btn.getAttribute('data-index')) || 0;
    const esCentral = btnIndex === 2;
    
    if (btnIndex === indiceActivo) {
      // Botón activo
      if (!esCentral) {
        btn.classList.remove('text-gray-300');
        btn.classList.add('text-white');
        icono.classList.add('svg-white');
        cambiarIconoASolid(icono);
      }
    } else {
      // Botones inactivos
      if (!esCentral) {
        btn.classList.remove('text-white');
        btn.classList.add('text-gray-300');
        icono.classList.add('svg-white');
        cambiarIconoAOutline(icono);
      }
    }
  });
  
}

// Inicializar menú móvil según la página actual
function inicializarMenuMovil() {
  if (!window.rutaActual) return;
  
  const botones = document.querySelectorAll('.mobile-nav-btn');
  let indiceActivo = 0;
  
  // Buscar el botón que corresponde a la página actual
  botones.forEach((btn, i) => {
    const pagina = btn.getAttribute('data-page');
    if (pagina === window.rutaActual) {
      indiceActivo = parseInt(btn.getAttribute('data-index'));
    }
  });
  
  // Activar el tab correspondiente
  activarTabMovil(indiceActivo);
}

// Evento de redimensionamiento
window.addEventListener('resize', function () {
    // Mantener el estado activo de los iconos al redimensionar
  const botones = document.querySelectorAll('.mobile-nav-btn');
  botones.forEach((btn) => {
    const icono = btn.querySelector('img');
    if (icono && icono.classList.contains('svg-white')) {
      const indiceActivo = parseInt(btn.getAttribute('data-index'));
      activarTabMovil(indiceActivo);
    }
  });
});

// Inicialización global
document.addEventListener('DOMContentLoaded', function () {
  // Inicializar menú móvil según página actual
  inicializarMenuMovil();
});