// categorias.js

let categoriaActual = 'todas';           // Guarda la categoría actualmente filtrada (si la usas en algún lugar)
let categoriasSeleccionadas = new Set(); // Es el conjunto de categorías activas
let vistaAnterior = null;                 // Puedes usarlo si necesitas guardar la vista anterior, no es obligatorio

// Función para seleccionar categoría en escritorio
function seleccionarCategoriaEscritorio(elemento, categoria) {
    const nombreCategoria = elemento.querySelector('span').textContent;
    const iconoCategoria = elemento.querySelector('img').outerHTML;
    const descripcionCategoria = elemento.dataset.descripcion || '';

    if (categoriasSeleccionadas.has(categoria)) {
        // Deseleccionar
        categoriasSeleccionadas.delete(categoria);
        elemento.classList.remove('bg-gray-100');
        
        // Buscar tarjeta SOLO dentro del grid de categorías seleccionadas, no en toda la página
        const gridCategorias = document.getElementById('selected-categories');
        const tarjetaExistente = gridCategorias ? gridCategorias.querySelector(`[data-category="${categoria}"]`) : null;
        if (tarjetaExistente) tarjetaExistente.remove();

        if (categoriasSeleccionadas.size === 0) {
            const seccionCategorias = document.querySelector('.categories-section');
            // Si ya no hay categorías seleccionadas, vaciar el contenido
            // pero mantener la sección placeholder existente en el DOM
            if (seccionCategorias) seccionCategorias.innerHTML = '';
        }

    } else {
        // Seleccionar
        categoriasSeleccionadas.add(categoria);
        elemento.classList.add('bg-gray-100');

        // Crear sección si no existe
        let seccionCategorias = document.querySelector('.categories-section');
        
        if (!seccionCategorias) {
            seccionCategorias = document.createElement('div');
            seccionCategorias.className = 'categories-section mb-12';
            seccionCategorias.innerHTML = `
                <h2 class="text-2xl text-gray-800 mb-6">Explorar por categoría</h2>
                <div class="overflow-x-auto scrollbar-hide">
                    <div class="flex space-x-4" id="selected-categories"></div>
                </div>
            `;
            const seccionBienvenida = document.querySelector('.mb-8');
            if (seccionBienvenida) seccionBienvenida.after(seccionCategorias);
        } else {
            // Si existe una sección placeholder en el HTML pero no tiene el contenedor esperado,
            // inicializar su estructura interna para que funcione desde el primer clic
            const selectedCategoriesExistente = seccionCategorias.querySelector('#selected-categories');
            
            if (!selectedCategoriesExistente) {
                // Asegurar clase de margen inferior
                if (!seccionCategorias.classList.contains('mb-12')) {
                    seccionCategorias.classList.add('mb-12');
                }
                seccionCategorias.innerHTML = `
                    <h2 class="text-2xl text-gray-800 mb-6">Explorar por categoría</h2>
                    <div class="overflow-x-auto scrollbar-hide">
                        <div class="flex space-x-4" id="selected-categories"></div>
                    </div>
                `;
            }
        }

        // Obtener grid de tarjetas
        const gridCategorias = document.getElementById('selected-categories');
        
        // Buscar tarjeta SOLO dentro del grid de categorías seleccionadas
        const tarjetaExistente = gridCategorias ? gridCategorias.querySelector(`[data-category="${categoria}"]`) : null;

        // Agregar tarjeta solo si no existe
        if (gridCategorias && !tarjetaExistente) {
            const tarjetaCategoria = document.createElement('div');
            tarjetaCategoria.className = 'desktop-category-card bg-gray-100 p-4 rounded-2xl cursor-pointer hover:shadow-lg smooth-transition flex-shrink-0 min-w-[280px]';
            tarjetaCategoria.setAttribute('data-category', categoria);
            tarjetaCategoria.innerHTML = `
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                        ${iconoCategoria}
                    </div>
                    <div class="flex-1">
                        <h3 class="text-green text-base mb-1">${nombreCategoria}</h3>
                        <p class="text-sm text-gray-600">${descripcionCategoria}</p>
                    </div>
                </div>
            `;
            gridCategorias.appendChild(tarjetaCategoria);
        }
    }

    // Actualizar productos
    generarProductosMovil();
    generarProductosEscritorio();
}

// Función para seleccionar categoría en móvil
function seleccionarCategoria(elemento) {
    const nombreCategoria = elemento.querySelector('span').textContent.trim().toLowerCase();
    const mapCategoria = {
        'tecnología': 'tecnologia',
        'hogar': 'hogar',
        'ropa': 'ropa',
        'accesorios': 'accesorios',
        'deportes': 'deportes',
        'entretenimiento': 'entretenimiento',
        'mascotas': 'mascotas',
        'herramientas': 'herramientas',
        'servicios': 'servicios'
    };
    const categoria = mapCategoria[nombreCategoria] || nombreCategoria;

    if (categoriasSeleccionadas.has(categoria)) {
        categoriasSeleccionadas.delete(categoria);
        elemento.querySelector('div').classList.remove('bg-green');
        elemento.querySelector('div').classList.add('bg-gray-100');
        const img = elemento.querySelector('img');
        img.classList.remove('svg-white');
        img.classList.add('svg-green');
        elemento.querySelector('span').classList.remove('text-green');
        elemento.querySelector('span').classList.add('text-gray-600');
    } else {
        categoriasSeleccionadas.add(categoria);
        elemento.querySelector('div').classList.remove('bg-gray-100');
        elemento.querySelector('div').classList.add('bg-green');
        const img = elemento.querySelector('img');
        img.classList.remove('svg-green');
        img.classList.add('svg-white');
        elemento.querySelector('span').classList.remove('text-gray-600');
        elemento.querySelector('span').classList.add('text-green');
    }

    generarProductosMovil();
    generarProductosEscritorio();
}
