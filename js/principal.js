// Mapa de colores predefinidos
const mapaColores = {
    'primario': 'text-green',
    'secundario': 'text-blue-600',
    'acento': 'text-purple-600',
    'advertencia': 'text-orange-600',
    'exito': 'text-green-600',
    'info': 'text-blue-500',
    'peligro': 'text-red-600',
    'gris': 'text-gray-600'
};

// Función para generar estrellas (solo para uso global, no productos)
function generarEstrellas(cantidad) {
    let estrellas = '';
    const estrellaLlena = '⭐';
    const estrellaVacia = '☆';
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
function activarPestana(elemento, indice, dispositivo) {
    const idBurbuja = dispositivo === 'mobile' ? 'mobile-bubble' : 'desktop-bubble';
    const burbuja = document.getElementById(idBurbuja);
    const botones = document.querySelectorAll(`[onclick*="setActiveTab"][onclick*="${dispositivo}"]`);

    if (indice === 2) {
        burbuja.style.opacity = '0';
        const botonCentral = botones[2];
        botonCentral.style.transform = 'scale(1.2)';
        botonCentral.style.transition = 'transform 0.3s ease';

        botones.forEach((btn, i) => {
            if (i !== 2) {
                const icono = btn.querySelector('i');
                btn.classList.remove('text-green');
                btn.classList.add('text-gray-300');
                icono.style.transform = 'translateY(0)';
                icono.style.transition = 'transform 0.3s ease';
            }
        });
    } else {
        burbuja.style.opacity = '1';
        const botonCentral = botones[2];
        botonCentral.style.transform = 'scale(1)';
        botonCentral.style.transition = 'transform 0.3s ease';
        const anchoContenedor = elemento.parentElement.offsetWidth;
        const posicionBoton = indice * (anchoContenedor / 5);
        const desplazamientoBurbuja = posicionBoton + (anchoContenedor / 10) - 24;
        burbuja.style.transform = `translateX(${desplazamientoBurbuja}px) translateY(11px)`;
        botones.forEach((btn, i) => {
            const icono = btn.querySelector('i');
            if (btn.classList.contains('bg-white')) {
                return;
            }
            if (i === indice) {
                btn.classList.remove('text-gray-300');
                btn.classList.add('text-green');
                icono.style.transform = 'translateY(-8px)';
                icono.style.transition = 'transform 0.3s ease';
            } else {
                btn.classList.remove('text-green');
                btn.classList.add('text-gray-300');
                icono.style.transform = 'translateY(0)';
                icono.style.transition = 'transform 0.3s ease';
            }
        });
    }
}

// Función de navegación escritorio
function activarNavegacionEscritorio(elemento) {
    document.querySelectorAll('.desktop-nav-item').forEach(item => {
        item.classList.remove('active', 'bg-green', 'text-white');
        item.classList.add('text-gray-600', 'hover:bg-gray-50');
    });
    elemento.classList.remove('text-gray-600', 'hover:bg-gray-50');
    elemento.classList.add('active', 'bg-green', 'text-white');
}

// Función genérica para manejar iconos SVG
function obtenerIconoVectorial(nombre, opciones = {}) {
    const {
        tamano = 'w-5 h-5',
        color = 'primario',
        alt = nombre,
        colorPersonalizado = null
    } = opciones;
    return `<img src="recursos/iconos/Outline/${nombre}.svg" alt="${alt}" class="${tamano} svg-green">`;
}

// Evento de redimensionamiento global
window.addEventListener('resize', function () {
    // Aquí puedes agregar lógica global para el redimensionamiento
    console.log('Ventana redimensionada');
});

// Inicialización global
document.addEventListener('DOMContentLoaded', function () {
    // Activar primera pestaña móvil por defecto
    const primerTabMovil = document.querySelector('[onclick*="setActiveTab"][onclick*="mobile"]');
    if (primerTabMovil) {
        activarPestana(primerTabMovil, 0, 'mobile');
    }
});