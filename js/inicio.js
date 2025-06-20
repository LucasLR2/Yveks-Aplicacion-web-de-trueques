// Datos de productos
const productos = [
    {
        id: 1,
        nombre: "Lentes retro",
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
    }
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
                <p class="text-base text-green mb-3">${producto.estado}</p>
                <div class="flex items-center gap-2">
                    <img src="recursos/iconos/Solid/Status/Star.svg" alt="Estrella" class="w-4 h-4 svg-yellow">
                    <span class="text-base text-gray-500">${producto.calificacion} (${producto.resenas})</span>
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
                        <img src="recursos/iconos/Solid/Status/Star.svg" alt="Estrella" class="w-4 h-4 svg-yellow">
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
        }
    };
    const config = iconosCategoria[categoria] || { icono: 'tag' };
    return `<img src="recursos/iconos/Outline/Devices/${config.icono}.svg" alt="${categoria.charAt(0).toUpperCase() + categoria.slice(1)}" class="w-5 h-5 svg-green">`;
}

function obtenerDescripcionCategoria(categoria) {
    const descripciones = {
        'tecnologia': 'Laptops, móviles y más',
        'hogar': 'Muebles y decoración',
        'ropa': 'Moda y accesorios',
        'accesorios': 'Auto y más'
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
                    <p class="text-base text-green mb-3">${producto.estado}</p>
                    <div class="flex items-center gap-2">
                        <img src="recursos/iconos/Solid/Status/Star.svg" alt="Estrella" class="w-4 h-4 svg-yellow">
                        <span class="text-base text-gray-500">${producto.calificacion} (${producto.resenas})</span>
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
                            <img src="recursos/iconos/Solid/Status/Star.svg" alt="Estrella" class="w-4 h-4 svg-yellow">
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
});
