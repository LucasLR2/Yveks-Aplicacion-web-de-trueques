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

// Función mejorada para navegación móvil
function posicionarBurbuja(indice) {
  const burbuja = document.getElementById('mobile-bubble');
  if (!burbuja) return;
  
  const botones = document.querySelectorAll('.mobile-nav-btn, [data-index="2"]');
  if (!botones.length) return;
  
  const contenedor = burbuja.parentElement;
  const anchoContenedor = contenedor.offsetWidth;
  const anchoBoton = anchoContenedor / 5; // 5 botones en total
  
  // Calcular posición horizontal de la burbuja
  // Usamos el centro exacto del botón
  const centroBoton = (indice * anchoBoton) + (anchoBoton / 2);
  
  // Centramos la burbuja usando transform para mayor precisión
  burbuja.style.left = centroBoton + 'px';
  burbuja.style.transform = 'translateX(-50%)';
  burbuja.style.transition = 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  
  // Ajustar posición vertical
  burbuja.style.bottom = '18px';
}

function activarTabMovil(indiceActivo) {
  const botones = document.querySelectorAll('.mobile-nav-btn, [data-index="2"]');
  if (!botones.length) return;
  
  botones.forEach((btn, i) => {
    const icono = btn.querySelector('img');
    if (!icono) return;
    
    // Saltar el botón central (nuevo_producto)
    if (i === 2) return;
    
    if (i === indiceActivo) {
      // Botón activo
      btn.classList.remove('text-gray-300');
      btn.classList.add('text-green');
      
      icono.classList.remove('svg-white', 'svg-gray-300');
      icono.classList.add('svg-green');
      icono.style.transform = 'translateY(-8px)';
      icono.style.transition = 'transform 0.3s ease';
      
      cambiarIconoASolid(icono);
    } else {
      // Botones inactivos
      btn.classList.remove('text-green');
      btn.classList.add('text-gray-300');
      
      icono.classList.remove('svg-green');
      icono.classList.add('svg-white');
      icono.style.transform = 'translateY(0)';
      icono.style.transition = 'transform 0.3s ease';
      
      cambiarIconoAOutline(icono);
    }
  });
  
  // Posicionar la burbuja
  posicionarBurbuja(indiceActivo);
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
  // Reposicionar la burbuja al redimensionar
  const botones = document.querySelectorAll('.mobile-nav-btn');
  botones.forEach((btn, i) => {
    const icono = btn.querySelector('img');
    if (icono && icono.classList.contains('svg-green')) {
      const indice = parseInt(btn.getAttribute('data-index'));
      posicionarBurbuja(indice);
    }
  });
});

// Inicialización global
document.addEventListener('DOMContentLoaded', function () {
  // Inicializar menú móvil según página actual
  inicializarMenuMovil();
});