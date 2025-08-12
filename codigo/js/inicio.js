// Datos de productos
const productos = [
    {
        id: 1,
        nombre: "Lentes retro rojos",
        estado: "Usado",
        calificacion: 4.5,
        resenas: 12,
        imagenes: [{ imagen: "recursos/imagenes/1.jpg" }],
        categoria: "accesorios"
    },
    {
        id: 2,
        nombre: "Auriculares inalámbricos",
        estado: "Nuevo",
        calificacion: 4.2,
        resenas: 32,
        imagenes: [{ imagen: "recursos/imagenes/2.jpg" }],
        categoria: "tecnologia"
    },
    {
        id: 3,
        nombre: "Cargador magnético",
        estado: "Usado",
        calificacion: 4.8,
        resenas: 8,
        imagenes: [{ imagen: "recursos/imagenes/3.jpg" }],
        categoria: "tecnologia"
    },
    {
        id: 4,
        nombre: "Proyector",
        estado: "Nuevo",
        calificacion: 4.3,
        resenas: 15,
        imagenes: [{ imagen: "recursos/imagenes/4.jpg" }],
        categoria: "tecnologia"
    },
    {
        id: 5,
        nombre: "Remera Suzuki con estampado",
        estado: "Nuevo",
        calificacion: 4.6,
        resenas: 23,
        imagenes: [{ imagen: "recursos/imagenes/5.jpg" }],
        categoria: "ropa"
    },
    {
        id: 6,
        nombre: "Sillón naranja",
        estado: "Usado",
        calificacion: 4.4,
        resenas: 18,
        imagenes: [{ imagen: "recursos/imagenes/6.jpg" }],
        categoria: "hogar"
    },
        {
        id: 7,
        nombre: "Zapatillas Adidas Aggresive",
        estado: "Usado",
        calificacion: 4.9,
        resenas: 11,
        imagenes: [{ imagen: "recursos/imagenes/7.jpg" }],
        categoria: "ropa"
    },
            {
        id: 8,
        nombre: "Libro The Laws of Human Nature",
        estado: "Nuevo",
        calificacion: 3.8,
        resenas: 5,
        imagenes: [{ imagen: "recursos/imagenes/8.jpg" }],
        categoria: "entretenimiento"
    },
    {
        id: 9,
        nombre: "Remera Illicit Bloc denim claro",
        estado: "Nuevo",
        calificacion: 5.0,
        resenas: 15,
        imagenes: [{ imagen: "recursos/imagenes/9.jpg" }],
        categoria: "ropa"
    },
    {
        id: 10,
        nombre: "Lámpara de escritorio",
        estado: "Usado",
        calificacion: 3.9,
        resenas: 7,
        imagenes: [{ imagen: "recursos/imagenes/10.jpg" }],
        categoria: "hogar"
    },
    {
        id: 11,
        nombre: "Remera blanca con estampado azul",
        estado: "Nuevo",
        calificacion: 1.8,
        resenas: 4,
        imagenes: [{ imagen: "recursos/imagenes/11.jpg" }],
        categoria: "ropa"
    },
    {
        id: 12,
        nombre: "Remera marrón Illicit Bloc",
        estado: "Nuevo",
        calificacion: 5.0,
        resenas: 17,
        imagenes: [{ imagen: "recursos/imagenes/12.jpg" }],
        categoria: "ropa"
    },
    {
        id: 13,
        nombre: "Cámara fotográfica Canon",
        estado: "Usado",
        calificacion: 4.8,
        resenas: 21,
        imagenes: [{ imagen: "recursos/imagenes/13.jpg" }],
        categoria: "tecnologia"
    },
    {
        id: 14,
        nombre: "Remera blanca con estampado rojo",
        estado: "Usado",
        calificacion: 3.6,
        resenas: 13,
        imagenes: [{ imagen: "recursos/imagenes/14.jpg" }],
        categoria: "ropa"
    },
    {
        id: 15,
        nombre: "iPad mini",
        estado: "Usado",
        calificacion: 4.7,
        resenas: 24,
        imagenes: [{ imagen: "recursos/imagenes/15.jpg" }],
        categoria: "tecnologia"
    },
    {
        id: 16,
        nombre: "Cámara fotográfica Sony",
        estado: "Usado",
        calificacion: 4.8,
        resenas: 19,
        imagenes: [{ imagen: "recursos/imagenes/16.jpg" }],
        categoria: "tecnologia"
    },
    {
        id: 17,
        nombre: "Remera Umbro azul y blanca",
        estado: "Nuevo",
        calificacion: 4.9,
        resenas: 18,
        imagenes: [{ imagen: "recursos/imagenes/17.jpg" }],
        categoria: "ropa"
    },
    {
        id: 18,
        nombre: "AirPods",
        estado: "Nuevo",
        calificacion: 4.8,
        resenas: 25,
        imagenes: [{ imagen: "recursos/imagenes/18.jpg" }],
        categoria: "tecnologia"
    },
    {
        id: 19,
        nombre: "Remera negra con estampado beige vintage",
        estado: "Nuevo",
        calificacion: 5.0,
        resenas: 22,
        imagenes: [{ imagen: "recursos/imagenes/19.jpg" }],
        categoria: "ropa"
    },
    {
        id: 20,
        nombre: "Remera Nike blanca con estampado lila",
        estado: "Nuevo",
        calificacion: 4.9,
        resenas: 16,
        imagenes: [{ imagen: "recursos/imagenes/20.jpg" }],
        categoria: "ropa"
    },
    {
        id: 21,
        nombre: "Lentes retro amarillos",
        estado: "Usado",
        calificacion: 2.7,
        resenas: 10,
        imagenes: [{ imagen: "recursos/imagenes/21.jpg" }],
        categoria: "accesorios"
    },
    {
        id: 22,
        nombre: "Remera ArtTheMoment blanca",
        estado: "Nuevo",
        calificacion: 4.0,
        resenas: 9,
        imagenes: [{ imagen: "recursos/imagenes/22.jpg" }],
        categoria: "ropa"
    },
    {
        id: 23,
        nombre: "Teclado Clicky verde",
        estado: "Usado",
        calificacion: 5.0,
        resenas: 19,
        imagenes: [{ imagen: "recursos/imagenes/23.jpg" }],
        categoria: "tecnologia"
    },
    {
        id: 24,
        nombre: "Mouse y soporte inalámbrico led",
        estado: "Nuevo",
        calificacion: 4.2,
        resenas: 27,
        imagenes: [{ imagen: "recursos/imagenes/24.jpg" }],
        categoria: "tecnologia"
    },
    {
        id: 25,
        nombre: "AirPods Max negros",
        estado: "Usado",
        calificacion: 4.5,
        resenas: 20,
        imagenes: [{ imagen: "recursos/imagenes/25.jpg" }],
        categoria: "tecnologia"
    },
    {
        id: 26,
        nombre: "Samsung Galaxy Book",
        estado: "Usado",
        calificacion: 4.1,
        resenas: 31,
        imagenes: [{ imagen: "recursos/imagenes/26.jpg" }],
        categoria: "tecnologia"
    },
    {
        id: 27,
        nombre: "Bicileta rodado 27",
        estado: "Usado",
        calificacion: 4.9,
        resenas: 23,
        imagenes: [{ imagen: "recursos/imagenes/27.jpg" }],
        categoria: "deportes"
    },
    {
        id: 28,
        nombre: "Guitarra eléctrica naranja",
        estado: "Nuevo",
        calificacion: 4.6,
        resenas: 15,
        imagenes: [{ imagen: "recursos/imagenes/28.jpg" }],
        categoria: "tecnologia"
    },
    {
        id: 29,
        nombre: "Apple Watch con cadena",
        estado: "Usado",
        calificacion: 3.7,
        resenas: 14,
        imagenes: [{ imagen: "recursos/imagenes/29.jpg" }],
        categoria: "tecnologia"
    },
    {
        id: 30,
        nombre: "Dron",
        estado: "Usado",
        calificacion: 4.0,
        resenas: 9,
        imagenes: [{ imagen: "recursos/imagenes/30.jpg" }],
        categoria: "tecnologia"
    },
    {
        id: 31,
        nombre: "Buzo Nike azul",
        estado: "Nuevo",
        calificacion: 5.0,
        resenas: 29,
        imagenes: [{ imagen: "recursos/imagenes/30.jpg" }],
        categoria: "ropa"
    },
    {
        id: 32,
        nombre: "Buzo Salomon negro",
        estado: "Usado",
        calificacion: 4.4,
        resenas: 22,
        imagenes: [{ imagen: "recursos/imagenes/32.jpg" }],
        categoria: "ropa"
    },
    {
        id: 33,
        nombre: "Cinto de cuero negro",
        estado: "Usado",
        calificacion: 2.8,
        resenas: 10,
        imagenes: [{ imagen: "recursos/imagenes/33.jpg" }],
        categoria: "accesorios"
    },
    {
        id: 34,
        nombre: "Morral High negro",
        estado: "Usado",
        calificacion: 4.5,
        resenas: 20,
        imagenes: [{ imagen: "recursos/imagenes/34.jpg" }],
        categoria: "accesorios"
    },
];

let categoriaActual = 'todas';
let categoriasSeleccionadas = new Set();

// Generar productos para móvil
function generarProductosMovil(categoria = 'todas') {
    const contenedor = document.getElementById('mobile-products');
    let productosFiltrados;
    
    if (categoriasSeleccionadas.size === 0) {
        productosFiltrados = productos;
    } else {
        productosFiltrados = productos.filter(p => categoriasSeleccionadas.has(p.categoria));
    }

    contenedor.innerHTML = productosFiltrados.map(producto => `
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow product-card"
            onclick="seleccionarProducto(this)">
            <div class="aspect-square bg-gray-200 relative">
                <div class="absolute inset-0 flex items-center justify-center">
                    <img src="${producto.imagenes[0].imagen}" alt="${producto.nombre}" class="w-full h-full object-cover">
                </div>
            </div>
            <div class="p-3">
                <h4 class="text-sm text-gray-800 mb-3">${producto.nombre}</h4>
                <div class="flex items-center justify-between">
                    <p class="text-base text-green mb-0">${producto.estado}</p>
                    <div class="flex items-center gap-2">
                        <img src="recursos/iconos/solido/estado/estrella.svg" alt="Estrella" class="w-4 h-4 svg-yellow">
                        <span class="text-base text-gray-500">${producto.calificacion} (${producto.resenas})</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Generar productos para escritorio
function generarProductosEscritorio(categoria = 'todas') {
    const contenedor = document.getElementById('desktop-products');
    let productosFiltrados;
    
    if (categoriasSeleccionadas.size === 0) {
        productosFiltrados = productos;
    } else {
        productosFiltrados = productos.filter(p => categoriasSeleccionadas.has(p.categoria));
    }

    contenedor.innerHTML = productosFiltrados.map(producto => `
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg smooth-transition product-card w-full"
            onclick="seleccionarProducto(this)">
            <div class="aspect-square bg-gray-200 relative">
                <div class="absolute inset-0 flex items-center justify-center">
                    <img src="${producto.imagenes[0].imagen}" alt="${producto.nombre}" class="w-full h-full object-cover">
                </div>
            </div>
            <div class="p-4">
                <h4 class="text-sm text-gray-800 mb-3 truncate">${producto.nombre}</h4>
                <div class="flex justify-between items-center">
                    <p class="text-base text-green">${producto.estado}</p>
                    <div class="flex items-center gap-2">
                        <img src="recursos/iconos/solido/estado/estrella.svg" alt="Estrella" class="w-4 h-4 svg-yellow">
                        <span class="text-gray-500 text-base">${producto.calificacion} (${producto.resenas})</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Selección de categoría móvil
function seleccionarCategoria(elemento) {
    // Obtener el nombre de la categoría desde el span
    const nombreCategoria = elemento.querySelector('span').textContent.trim().toLowerCase();
    // Mapear el nombre visible a la clave de categoría
    const mapCategoria = {
        'tecnología': 'tecnologia',
        'hogar': 'hogar',
        'ropa': 'ropa',
        'accesorios': 'accesorios'
    };
    const categoria = mapCategoria[nombreCategoria] || nombreCategoria;

    // Alternar selección múltiple
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

// Selección de categoría escritorio
function seleccionarCategoriaEscritorio(elemento, categoria) {
    const mainContent = document.querySelector('.desktop-main main');
    const nombreCategoria = elemento.querySelector('span').textContent;
    
    if (categoriasSeleccionadas.has(categoria)) {
        categoriasSeleccionadas.delete(categoria);
        elemento.classList.remove('bg-gray-100');
        const tarjetaCategoria = document.querySelector(`[data-category="${categoria}"]`);
        if (tarjetaCategoria) {
            tarjetaCategoria.remove();
        }
    } else {
        categoriasSeleccionadas.add(categoria);
        elemento.classList.add('bg-gray-100');
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
            seccionBienvenida.after(seccionCategorias);
        }
        const gridCategorias = document.getElementById('selected-categories');
        const tarjetaCategoria = document.createElement('div');
        tarjetaCategoria.className = 'desktop-category-card bg-gray-100 p-4 rounded-2xl cursor-pointer hover:shadow-lg smooth-transition flex-shrink-0 min-w-[280px]';
        tarjetaCategoria.setAttribute('data-category', categoria);
        tarjetaCategoria.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    ${obtenerIconoCategoria(categoria)}
                </div>
                <div class="flex-1">
                    <h3 class="text-green text-base mb-1">${nombreCategoria}</h3>
                    <p class="text-sm text-gray-600">${obtenerDescripcionCategoria(categoria)}</p>
                </div>
            </div>
        `;
        gridCategorias.appendChild(tarjetaCategoria);
    }
    generarProductosMovil(categoria);
    generarProductosEscritorio(categoria);
    if (categoriasSeleccionadas.size === 0) {
        const seccionCategorias = document.querySelector('.categories-section');
        if (seccionCategorias) {
            seccionCategorias.remove();
        }
    }
}

// Iconos de categoría
function obtenerIconoCategoria(categoria) {
    const iconosCategoria = {
        'tecnologia': {
            icono: 'Processor'
        },
        'hogar': {
            icono: 'armchair'
        },
        'ropa': {
            icono: 'shirt'
        },
        'accesorios': {
            icono: 'glasses'
        },
        'deportes': {
            icono: 'Voleibol'
        },
        'entretenimiento': {
            icono: 'dado'
        },
        'mascotas': {
            icono: 'Pata'
        },
        'herramientas': {
            icono: 'herramientas'
        },
        'servicios': {
            icono: 'servicio'
        }
    };
    const config = iconosCategoria[categoria] || { icono: 'tag' };
    return `<img src="recursos/iconos/contorno/dispositivos/${config.icono}.svg" alt="${categoria.charAt(0).toUpperCase() + categoria.slice(1)}" class="w-5 h-5 svg-green">`;
}

function obtenerDescripcionCategoria(categoria) {
    const descripciones = {
        'tecnologia': 'Laptops, móviles y más',
        'hogar': 'Muebles y decoración',
        'ropa': 'Moda y accesorios',
        'accesorios': 'Auto y más',
        'deportes': 'Equipamiento deportivo',
        'entretenimiento': 'Juegos y diversión',
        'mascotas': 'Mascotas y accesorios',
        'herramientas': 'Herramientas y bricolaje',
        'servicios': 'Servicios profesionales'
    };
    return descripciones[categoria] || '';
}

// Selección de producto
function seleccionarProducto(elemento) {
    elemento.style.transform = 'scale(0.95)';
    setTimeout(() => {
        elemento.style.transform = 'scale(1)';
    }, 150);
    console.log('Producto seleccionado');
}

// Búsqueda
function configurarBusqueda() {
    const busquedaMovil = document.getElementById('mobile-search');
    const busquedaEscritorio = document.getElementById('desktop-search');
    if (busquedaMovil) {
        busquedaMovil.addEventListener('input', function (e) {
            const consulta = e.target.value.toLowerCase();
            filtrarProductos(consulta);
        });
    }
    if (busquedaEscritorio) {
        busquedaEscritorio.addEventListener('input', function (e) {
            const consulta = e.target.value.toLowerCase();
            filtrarProductos(consulta);
        });
    }
}

function filtrarProductos(consulta) {
    if (!consulta) {
        generarProductosMovil();
        generarProductosEscritorio();
        return;
    }
    const productosFiltrados = productos.filter(producto =>
        (categoriasSeleccionadas.size === 0 || categoriasSeleccionadas.has(producto.categoria)) &&
        (producto.nombre.toLowerCase().includes(consulta) ||
        producto.estado.toLowerCase().includes(consulta))
    );
    const contenedorMovil = document.getElementById('mobile-products');
    if (contenedorMovil) {
        contenedorMovil.innerHTML = productosFiltrados.map(producto => `
            <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow product-card"
                onclick="seleccionarProducto(this)">
                <div class="aspect-square bg-gray-200 relative">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <img src="${producto.imagenes[0].imagen}" alt="${producto.nombre}" class="w-full h-full object-cover">
                    </div>
                </div>
                <div class="p-3">
                    <h4 class="text-sm text-gray-800 mb-3">${producto.nombre}</h4>
                    <div class="flex items-center justify-between">
                        <p class="text-base text-green mb-0">${producto.estado}</p>
                        <div class="flex items-center gap-2">
                            <img src="recursos/iconos/solido/estado/estrella.svg" alt="Estrella" class="w-4 h-4 svg-yellow">
                            <span class="text-base text-gray-500">${producto.calificacion} (${producto.resenas})</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    const contenedorEscritorio = document.getElementById('desktop-products');
    if (contenedorEscritorio) {
        contenedorEscritorio.innerHTML = productosFiltrados.map(producto => `
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg smooth-transition product-card w-full"
                onclick="seleccionarProducto(this)">
                <div class="aspect-square bg-gray-200 relative">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <img src="${producto.imagenes[0].imagen}" alt="${producto.nombre}" class="w-full h-full object-cover">
                    </div>
                </div>
                <div class="p-4">
                    <h4 class="text-sm text-gray-800 mb-3 truncate">${producto.nombre}</h4>
                    <div class="flex justify-between items-center">
                        <p class="text-base text-green">${producto.estado}</p>
                        <div class="flex items-center gap-2">
                            <img src="recursos/iconos/solido/estado/estrella.svg" alt="Estrella" class="w-4 h-4 svg-yellow">
                            <span class="text-gray-500 text-base">${producto.calificacion} (${producto.resenas})</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    generarProductosMovil();
    generarProductosEscritorio();
    configurarBusqueda();
    const slider = document.querySelector('.px-4.mb-6 .flex.overflow-x-auto');
    const caretLeft = document.querySelector('.caret-left-indicador');
    const caretRight = document.querySelector('.caret-right-indicador');
    if (!slider || !caretLeft || !caretRight) return;
    function updateCarets() {
        if (slider.scrollLeft > 5) {
            caretLeft.style.opacity = '1';
        } else {
            caretLeft.style.opacity = '0';
        }
        if (slider.scrollWidth - slider.clientWidth - slider.scrollLeft > 5) {
            caretRight.style.opacity = '1';
        } else {
            caretRight.style.opacity = '0';
        }
    }
    slider.addEventListener('scroll', updateCarets);
    updateCarets();
});

// Funcion para impedir el acceso a usuarios no registrados
function crearPopupAccesoRestringido() {
    // Crear el elemento del popup
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    popup.innerHTML = `
        <div class="bg-white rounded-xl p-6 shadow-lg text-center max-w-sm">
            <h2 class="text-xl font-bold mb-4">Acceso restringido</h2>
            <p class="mb-4">Debes iniciar sesión para acceder a esta sección.</p>
            <div class="flex justify-center gap-4">
                <a href="iniciarsesion.html" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Iniciar sesión</a>
                <button id="cerrarPopup" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Volver</button>
            </div>
        </div>
    `;
    
    // Añadir el popup como hijo del body
    document.body.appendChild(popup);
    
    // Añadir evento al botón de cerrar
    const botonCerrar = document.getElementById('cerrarPopup');
    if (botonCerrar) {
        botonCerrar.addEventListener('click', function() {
            popup.remove();
        });
    }
}

// Llamar a la función para crear el popup al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    
});
