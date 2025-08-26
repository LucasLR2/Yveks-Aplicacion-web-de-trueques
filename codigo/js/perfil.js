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
];

const resenas = [
    {
        id: 1,
        usuario: "María Rodríguez",
        avatar: "recursos/imagenes/angelaleman.jpg",
        fecha: "15 de abril de 2024",
        calificacion: 5,
        comentario: "José fue muy amable y profesional. El producto llegó exactamente como se describía y en perfectas condiciones."
    },
    {
        id: 2,
        usuario: "Carlos Mendoza",
        avatar: "recursos/imagenes/angelaleman.jpg",
        fecha: "8 de abril de 2024",
        calificacion: 4,
        comentario: "El cargador magnético funciona perfectamente. El envío fue más rápido de lo esperado."
    },
    {
        id: 3,
        usuario: "Ana Gutierrez",
        avatar: "recursos/imagenes/angelaleman.jpg",
        fecha: "2 de abril de 2024",
        calificacion: 5,
        comentario: "Los lentes llegaron en perfectas condiciones. José fue súper honesto sobre el estado del producto y me dio muchos consejos sobre su cuidado."
    },
    {
        id: 4,
        usuario: "Diego Silva",
        avatar: "recursos/imagenes/angelaleman.jpg",
        fecha: "28 de marzo de 2024",
        calificacion: 4,
        comentario: "El proyector funciona muy bien. José me explicó detalladamente cómo usarlo y me dio algunos accesorios extra sin costo."
    },
    {
        id: 5,
        usuario: "Sofia López",
        avatar: "recursos/imagenes/angelaleman.jpg",
        fecha: "20 de marzo de 2024",
        calificacion: 5,
        comentario: "La remera está en excelente estado. José fue muy detallado en la descripción y las fotos coinciden perfectamente con el producto real."
    },
    {
        id: 6,
        usuario: "Roberto Martínez",
        avatar: "recursos/imagenes/angelaleman.jpg",
        fecha: "15 de marzo de 2024",
        calificacion: 4,
        comentario: "El sillón llegó en buen estado general. José me ayudó con la entrega y fue muy amable."
    }
];

let currentTab = 'productos';

// Función para generar estrellas basadas en calificación
function generarEstrellas(calificacion, tamaño = 'w-4 h-4') {
    const estrellas = [];
    const calificacionEntera = Math.floor(calificacion);
    
    for (let i = 1; i <= 5; i++) {
        if (i <= calificacionEntera) {
            // Estrella sólida (amarilla)
            estrellas.push(`<img src="recursos/iconos/solido/estado/estrella.svg" alt="Estrella" class="${tamaño} svg-yellow">`);
        } else {
            // Estrella de contorno (gris)
            estrellas.push(`<img src="recursos/iconos/contorno/estado/estrella.svg" alt="Estrella" class="${tamaño} svg-yellow">`);
        }
    }
    
    return estrellas.join('');
}

// Generar productos para el perfil
function generarProductosPerfil() {
    const contenedor = document.getElementById('profile-products');
    const contenedorMovil = document.getElementById('mobile-profile-products');

    const productosHTML = productos.map(producto => `
            <div class="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                onclick="seleccionarProducto(this)">
                <div class="aspect-square bg-gray-200 relative">
                    <img src="${producto.imagenes[0].imagen}" alt="${producto.nombre}" class="w-full h-full object-cover">
                </div>
                <div class="p-4">
                    <h3 class="font-medium text-gray-800 mb-1">${producto.nombre}</h3>
                    <p class="text-sm text-gray-600">${producto.estado}</p>
                </div>
            </div>
        `).join('');

    const productosMovilHTML = productos.map(producto => `
            <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow product-card"
                onclick="seleccionarProducto(this)">
                <div class="aspect-square bg-gray-200 relative">
                    <img src="${producto.imagenes[0].imagen}" alt="${producto.nombre}" class="w-full h-full object-cover">
                </div>
                <div class="p-3">
                    <h4 class="text-sm text-gray-800 mb-3">${producto.nombre}</h4>
                    <div class="flex items-center justify-between">
                        <p class="text-base text-green mb-0">${producto.estado}</p>
                        <div class="flex items-center gap-2">
                            <div class="flex items-center space-x-1">
                                ${generarEstrellas(producto.calificacion, 'w-4 h-4')}
                            </div>
                            <span class="text-base text-gray-500">${producto.calificacion} (${producto.resenas})</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

    if (contenedor) contenedor.innerHTML = productosHTML;
    if (contenedorMovil) contenedorMovil.innerHTML = productosMovilHTML;
}

// Generar reseñas para el perfil
function generarResenasPerfil() {
    const contenedor = document.getElementById('profile-reviews');
    const contenedorMovil = document.getElementById('mobile-profile-reviews');

    const resenasHTML = resenas.map(resena => `
            <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex items-start space-x-4">
                    <img src="${resena.avatar}" alt="${resena.usuario}" class="w-12 h-12 rounded-full object-cover">
                    <div class="flex-1">
                        <div class="flex items-center justify-between mb-2">
                            <div>
                                <h4 class="font-medium text-gray-800">${resena.usuario}</h4>
                                <p class="text-sm text-gray-500">${resena.fecha}</p>
                            </div>
                            <div class="flex items-center space-x-1">
                                ${generarEstrellas(resena.calificacion, 'w-4 h-4')}
                            </div>
                        </div>
                        <p class="text-gray-600 mb-3">${resena.comentario}</p>
                    </div>
                </div>
            </div>
        `).join('');

    const resenasMovilHTML = resenas.map(resena => `
            <div class="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div class="flex items-start space-x-3">
                    <img src="${resena.avatar}" alt="${resena.usuario}" class="w-10 h-10 rounded-full object-cover">
                    <div class="flex-1">
                        <div class="flex items-center justify-between mb-1">
                            <h4 class="font-medium text-gray-800 text-sm">${resena.usuario}</h4>
                            <div class="flex items-center space-x-1">
                                ${generarEstrellas(resena.calificacion, 'w-3 h-3')}
                            </div>
                        </div>
                        <p class="text-xs text-gray-500 mb-2">${resena.fecha}</p>
                        <p class="text-gray-600 text-sm mb-2">${resena.comentario}</p>
                    </div>
                </div>
            </div>
        `).join('');

    if (contenedor) contenedor.innerHTML = resenasHTML;
    if (contenedorMovil) contenedorMovil.innerHTML = resenasMovilHTML;
}

// Actualizar iconos de tabs según el estado
function updateTabIcons(activeTab, platform) {
    const productosIcon = document.getElementById(`${platform}-icon-productos`);
    const resenasIcon = document.getElementById(`${platform}-icon-resenas`);
    const productosTab = document.getElementById(`${platform}-tab-productos`);
    const resenasTab = document.getElementById(`${platform}-tab-resenas`);

    if (activeTab === 'productos') {
        // Tab Productos activo
        productosIcon.src = "recursos/iconos/solido/estado/cuadricula.svg";
        productosTab.querySelector('span').classList.add('font-medium');
        
        // Tab Reseñas inactivo
        resenasIcon.src = "recursos/iconos/contorno/estado/estrella.svg";
        resenasTab.querySelector('span').classList.remove('font-medium');
    } else if (activeTab === 'resenas') {
        // Tab Reseñas activo
        resenasIcon.src = "recursos/iconos/solido/estado/estrella.svg";
        resenasTab.querySelector('span').classList.add('font-medium');
        
        // Tab Productos inactivo
        productosIcon.src = "recursos/iconos/contorno/estado/cuadricula.svg";
        productosTab.querySelector('span').classList.remove('font-medium');
    }
}

// Cambiar tab en móvil
function switchMobileTab(tab, element) {
    currentTab = tab;

    // Actualizar estilos de tabs
    document.querySelectorAll('.mobile-tab').forEach(t => {
        t.classList.remove('tab-active');
        t.classList.add('tab-inactive');
    });
    element.classList.remove('tab-inactive');
    element.classList.add('tab-active');

    // Actualizar iconos dinámicamente
    updateTabIcons(tab, 'mobile');

    // Mostrar/ocultar contenido
    document.querySelectorAll('.mobile-content').forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('content-show');
        content.classList.add('content-fade');
    });

    const targetContent = document.getElementById(`mobile-${tab}`);
    if (targetContent) {
        targetContent.classList.remove('hidden');
        targetContent.classList.remove('content-fade');
        targetContent.classList.add('content-show');
    }
}

// Cambiar tab en desktop
function switchDesktopTab(tab, element) {
    currentTab = tab;

    // Actualizar estilos de tabs
    document.querySelectorAll('.desktop-tab').forEach(t => {
        t.classList.remove('tab-active');
        t.classList.add('tab-inactive');
    });
    element.classList.remove('tab-inactive');
    element.classList.add('tab-active');

    // Actualizar iconos dinámicamente
    updateTabIcons(tab, 'desktop');

    // Mostrar/ocultar contenido
    document.querySelectorAll('.desktop-content').forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('content-show');
        content.classList.add('content-fade');
    });

    const targetContent = document.getElementById(`desktop-${tab}`);
    if (targetContent) {
        targetContent.classList.remove('hidden');
        targetContent.classList.remove('content-fade');
        targetContent.classList.add('content-show');
    }
}

// Selección de producto
function seleccionarProducto(elemento) {
    elemento.style.transform = 'scale(0.95)';
    setTimeout(() => {
        elemento.style.transform = 'scale(1)';
    }, 150);
    console.log('Producto seleccionado');
}

// Mostrar dropdown del menú
function showDropdown() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
}

// Cerrar dropdown al hacer click fuera
document.addEventListener('click', function (event) {
    const menu = document.getElementById('menu');
    const button = document.getElementById('menu-button');

    if (!menu.contains(event.target) && !button.contains(event.target)) {
        menu.classList.add('hidden');
    }
});

// Inicializar la página
document.addEventListener('DOMContentLoaded', function () {
    generarProductosPerfil();
    generarResenasPerfil();
    
    // Asegurar que el estado inicial sea correcto
    updateTabIcons('productos', 'mobile');
    updateTabIcons('productos', 'desktop');
});