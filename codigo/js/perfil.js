// Variables globales para almacenar los datos del perfil
let productos = [];
let resenas = [];
let usuarioPerfil = {};
let currentTab = 'productos';
let vistaAnterior = null;

// Función para cargar datos del perfil desde la BD
async function cargarPerfilUsuario() {
    try {
        const response = await fetch('obtener-perfil.php');
        const data = await response.json();
        
        if (data.success) {
            // Guardar datos en variables globales
            productos = data.productos;
            resenas = data.resenas;
            usuarioPerfil = data.usuario;
            
            // Actualizar información del usuario en el DOM
            actualizarInfoUsuario();
            
            // Generar productos y reseñas
            generarProductosPerfil();
            generarResenasPerfil();
        } else {
            console.error('Error al cargar perfil:', data.message);
            mostrarMensaje('Error al cargar el perfil', 'error');
        }
    } catch (error) {
        console.error('Error en fetch:', error);
        mostrarMensaje('Error al conectar con el servidor', 'error');
    }
}

// Función para actualizar la información del usuario en el DOM
function actualizarInfoUsuario() {
    // Actualizar nombre
    const nombreMobile = document.getElementById('mobile-profile-name');
    const nombreDesktop = document.getElementById('desktop-profile-name');
    
    if (nombreMobile) nombreMobile.textContent = usuarioPerfil.nombre;
    if (nombreDesktop) nombreDesktop.textContent = usuarioPerfil.nombre;
    
    // Actualizar ubicación
    const ubicacionMobile = document.getElementById('mobile-profile-location');
    const ubicacionDesktop = document.getElementById('desktop-profile-location');
    
    if (ubicacionMobile) ubicacionMobile.textContent = usuarioPerfil.ubicacion;
    if (ubicacionDesktop) ubicacionDesktop.textContent = usuarioPerfil.ubicacion;
    
    // Actualizar avatar
    const avatarMobile = document.getElementById('mobile-profile-avatar');
    const avatarDesktop = document.getElementById('desktop-profile-avatar');
    
    if (avatarMobile) {
        avatarMobile.src = usuarioPerfil.avatar;
        avatarMobile.alt = usuarioPerfil.nombre;
    }
    if (avatarDesktop) {
        avatarDesktop.src = usuarioPerfil.avatar;
        avatarDesktop.alt = usuarioPerfil.nombre;
    }
}

// Función para mostrar mensajes al usuario
function mostrarMensaje(mensaje, tipo) {
    console.log(`[${tipo}] ${mensaje}`);
}

// Función para generar estrellas basadas en calificación
function generarEstrellas(calificacion, tamaño = 'w-4 h-4') {
    const estrellas = [];
    const calificacionEntera = Math.floor(calificacion);
    
    for (let i = 1; i <= 5; i++) {
        if (i <= calificacionEntera) {
            // Estrella sólida (amarilla)
            estrellas.push(`<img src="../recursos/iconos/solido/estado/estrella.svg" alt="Estrella" class="${tamaño} svg-yellow">`);
        } else {
            // Estrella de contorno (gris)
            estrellas.push(`<img src="../recursos/iconos/contorno/estado/estrella.svg" alt="Estrella" class="${tamaño} svg-yellow">`);
        }
    }
    
    return estrellas.join('');
}

// Function to open product detail with new design
function openProductDetail(productId) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;
    
    // Save current view state
    guardarVistaAnterior();
    
    // Create the HTML for detail view matching the image design
    const detailHTML = `
        <!-- Product detail view -->
        <div class="product-detail-view w-full min-h-screen bg-gray-50" style="font-family: 'Leo Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
            <!-- Mobile header -->
            <div class="lg:hidden bg-white px-4 py-3 border-b border-gray-200">
                <div class="flex items-center">
                    <button onclick="volverVistaAnterior()" class="w-8 h-8 flex items-center justify-center">
                        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <h1 class="ml-3 text-lg font-medium text-gray-900">Detalle del producto</h1>
                </div>
            </div>
            
            <!-- Main content -->
            <div class="w-full px-1 py-1">
                <!-- Main product card -->
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-4" style="background: linear-gradient(135deg, #719177 0%, #8fa685 100%);">
                    <div class="p-4">
                        <div class="grid lg:grid-cols-2 gap-6">
                            <!-- Product image section - larger -->
                            <div class="relative lg:col-span-1">
                                <!-- Back arrow on image -->
                                <button onclick="volverVistaAnterior()" class="absolute left-4 top-4 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center z-10 shadow-md hover:bg-opacity-100 transition-all">
                                    <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                                    </svg>
                                </button>
                                
                                <!-- Options button -->
                                <button class="absolute right-4 top-4 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center z-10 shadow-md hover:bg-opacity-100 transition-all">
                                    <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01"></path>
                                    </svg>
                                </button>
                                
                                <!-- Main image - 1:1 aspect ratio and larger -->
                                <div class="bg-white rounded-2xl overflow-hidden shadow-inner">
                                    <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-full object-cover aspect-square">
                                </div>
                            </div>
                            
                            <!-- Product information - constrained width -->
                            <div class="text-white space-y-3">
                                <!-- Title and time -->
                                <div>
                                    <h1 class="text-xl lg:text-xl mb-1 leading-tight">${producto.nombre}</h1>
                                    <p class="text-white text-opacity-90 text-sm">Publicado hace ${producto.publicadoHace}</p>
                                </div>
                                
                                <!-- Seller info with rating - Una línea -->
                                <div class="flex items-center justify-between w-full">
                                    <div class="flex items-center space-x-2">
                                        <span class="text-sm text-white text-opacity-70">de</span>
                                        <img src="${usuarioPerfil.avatar}" alt="${usuarioPerfil.nombre}" class="w-8 h-8 rounded-full border-2 border-white border-opacity-30">
                                        <span class="text-sm text-white font-medium">${usuarioPerfil.nombre}</span>
                                    </div>
                                    <div class="flex items-center space-x-1">
                                        <svg class="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                        <span class="text-white text-opacity-90 text-sm">${usuarioPerfil.reputacion} (${usuarioPerfil.totalResenas})</span>
                                    </div>
                                </div>
                                
                                <!-- Location -->
                                <div class="flex items-center space-x-2">
                                    <svg class="w-5 h-5 text-white text-opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <span class="text-white text-opacity-90 text-sm">${producto.ubicacion}</span>
                                </div>
                                
                                <!-- Map -->
                                <div id="product-detail-map" class="w-full h-32 bg-white bg-opacity-50 rounded-lg"></div>

                                <!-- Product details -->
                                <div class="space-y-4">
                                    <h3>Detalles del producto</h3>
                                    <div class="space-y-3">
                                        <div class="flex justify-between items-center">
                                            <span class="text-white text-opacity-80">Estado</span>
                                            <span>${producto.estado}</span>
                                        </div>
                                        <p class="text-white text-opacity-90 text-sm leading-relaxed">${producto.descripcion}</p>
                                    </div>
                                </div>
                                
                                <!-- Exchange preferences -->
                                <div class="space-y-3">
                                    <h3 class="font-semibold">Preferencias de intercambio</h3>
                                    <p class="text-white text-opacity-90 text-sm">${producto.preferenciasIntercambio.join(', ')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;
    
    // Replace main content with detail view
    reemplazarVistaConDetalle(detailHTML);
    
    // Initialize map after a brief delay
    setTimeout(() => {
        initProductDetailMap(producto.coordenadas, producto.ubicacion);
    }, 100);
}

// Función para guardar la vista anterior
function guardarVistaAnterior() {
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) {
        // Guardar contenido móvil
        const mobileContainer = document.querySelector('.lg\\:hidden');
        vistaAnterior = {
            tipo: 'mobile',
            contenido: mobileContainer ? mobileContainer.innerHTML : null
        };
    } else {
        // Guardar contenido desktop
        const desktopMain = document.querySelector('.desktop-main main');
        vistaAnterior = {
            tipo: 'desktop',
            contenido: desktopMain ? desktopMain.innerHTML : null
        };
    }
}

// Función para reemplazar la vista con el detalle
function reemplazarVistaConDetalle(detailHTML) {
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) {
        // Reemplazar contenido móvil
        const mobileContainer = document.querySelector('.lg\\:hidden');
        if (mobileContainer) {
            mobileContainer.innerHTML = detailHTML;
        }
    } else {
        // Reemplazar contenido desktop principal
        const desktopMain = document.querySelector('.desktop-main main');
        if (desktopMain) {
            desktopMain.innerHTML = detailHTML;
        }
    }
}

// Función para volver a la vista anterior
function volverVistaAnterior() {
    if (!vistaAnterior) {
        // Si no hay vista anterior, recargar la página
        location.reload();
        return;
    }
    
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile && vistaAnterior.tipo === 'mobile') {
        // Restaurar vista móvil
        const mobileContainer = document.querySelector('.lg\\:hidden');
        if (mobileContainer && vistaAnterior.contenido) {
            mobileContainer.innerHTML = vistaAnterior.contenido;
            // Reinicializar productos y reseñas
            generarProductosPerfil();
            generarResenasPerfil();
            // Restaurar el tab activo
            updateTabIcons(currentTab, 'mobile');
        }
    } else if (!isMobile && vistaAnterior.tipo === 'desktop') {
        // Restaurar vista desktop
        const desktopMain = document.querySelector('.desktop-main main');
        if (desktopMain && vistaAnterior.contenido) {
            desktopMain.innerHTML = vistaAnterior.contenido;
            // Reinicializar productos y reseñas
            generarProductosPerfil();
            generarResenasPerfil();
            // Restaurar el tab activo
            updateTabIcons(currentTab, 'desktop');
        }
    }
    
    // Limpiar vista anterior
    vistaAnterior = null;
}

// Función mejorada para inicializar el mapa de detalle
function initProductDetailMap(coordinates, locationName) {
    const mapContainer = document.getElementById('product-detail-map');
    if (!mapContainer) return;
    
    mapContainer.innerHTML = '';
    
    try {
        // Verificar si Leaflet está disponible
        if (typeof L !== 'undefined') {
            // Crear el mapa con Leaflet
            const map = L.map('product-detail-map', {
                zoomControl: true,
                scrollWheelZoom: false,
                doubleClickZoom: false,
                boxZoom: false,
                keyboard: false,
                dragging: true,
                tap: false
            }).setView(coordinates, 14);
            
            // Añadir tiles de OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 18
            }).addTo(map);
            
            // Añadir marcador
            const marker = L.marker(coordinates)
                .addTo(map)
                .bindPopup(`<strong>${locationName}</strong>`);
                
            // Ajustar el tamaño del mapa después de un pequeño delay
            setTimeout(() => {
                map.invalidateSize();
            }, 100);
            
        } else {
            // Fallback: usar iframe de Google Maps (necesita API key válida)
            const lat = coordinates[0];
            const lng = coordinates[1];
            
            mapContainer.innerHTML = `
                <div class="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        style="border:0;" 
                        loading="lazy" 
                        allowfullscreen 
                        referrerpolicy="no-referrer-when-downgrade" 
                        src="https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01},${lat-0.01},${lng+0.01},${lat+0.01}&layer=mapnik&marker=${lat},${lng}">
                    </iframe>
                    <div class="absolute bottom-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs">
                        <strong>${locationName}</strong>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.log('Error cargando mapa:', error);
        // Fallback: mostrar mapa estático con información de ubicación
        mapContainer.innerHTML = `
            <div class="flex items-center justify-center h-full bg-gradient-to-br from-green-100 to-green-200 rounded-lg border-2 border-green-300">
                <div class="text-center p-4">
                    <svg class="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <p class="text-green-800 font-medium text-sm">${locationName}</p>
                    <p class="text-green-600 text-xs mt-1">Lat: ${coordinates[0]}, Lng: ${coordinates[1]}</p>
                </div>
            </div>
        `;
    }
}

// También necesitas asegurarte de que Leaflet esté cargado
// Añade esto al HTML si no lo tienes:
function loadLeafletIfNeeded() {
    if (typeof L === 'undefined') {
        // Cargar CSS de Leaflet
        const leafletCSS = document.createElement('link');
        leafletCSS.rel = 'stylesheet';
        leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        leafletCSS.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        leafletCSS.crossOrigin = '';
        document.head.appendChild(leafletCSS);
        
        // Cargar JavaScript de Leaflet
        const leafletJS = document.createElement('script');
        leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        leafletJS.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
        leafletJS.crossOrigin = '';
        document.head.appendChild(leafletJS);
        
        return new Promise((resolve) => {
            leafletJS.onload = resolve;
        });
    }
    return Promise.resolve();
}

// Función para hacer oferta
function hacerOferta(productId) {
    alert('Funcionalidad de hacer oferta - Producto ID: ' + productId);
}

// Generar productos para el perfil
function generarProductosPerfil() {
    const contenedor = document.getElementById('profile-products');
    const contenedorMovil = document.getElementById('mobile-profile-products');

    if (!productos || productos.length === 0) {
        const mensajeVacio = '<p class="text-gray-500 text-center py-8">No hay productos publicados</p>';
        if (contenedor) contenedor.innerHTML = mensajeVacio;
        if (contenedorMovil) contenedorMovil.innerHTML = mensajeVacio;
        return;
    }

    const productosHTML = productos.map(producto => `
            <div class="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                onclick="openProductDetail(${producto.id})">
                <div class="aspect-square bg-gray-200 relative">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-full object-cover">
                </div>
                <div class="p-4">
                    <h3 class="font-medium text-gray-800 mb-1">${producto.nombre}</h3>
                    <p class="text-sm text-green">${producto.estado}</p>
                </div>
            </div>
        `).join('');

    const productosMovilHTML = productos.map(producto => `
            <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow product-card"
                onclick="openProductDetail(${producto.id})">
                <div class="aspect-square bg-gray-200 relative">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-full object-cover">
                </div>
                <div class="p-3">
                    <h4 class="text-sm text-gray-800 mb-3">${producto.nombre}</h4>
                    <div class="flex items-center justify-between">
                        <p class="text-base text-green mb-0">${producto.estado}</p>
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

    if (!resenas || resenas.length === 0) {
        const mensajeVacio = '<p class="text-gray-500 text-center py-8">No hay reseñas disponibles</p>';
        if (contenedor) contenedor.innerHTML = mensajeVacio;
        if (contenedorMovil) contenedorMovil.innerHTML = mensajeVacio;
        return;
    }

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
        productosIcon.src = "../recursos/iconos/solido/estado/cuadricula.svg";
        productosTab.querySelector('span').classList.add('font-medium');
        
        // Tab Reseñas inactivo
        resenasIcon.src = "../recursos/iconos/contorno/estado/estrella.svg";
        resenasTab.querySelector('span').classList.remove('font-medium');
    } else if (activeTab === 'resenas') {
        // Tab Reseñas activo
        resenasIcon.src = "../recursos/iconos/solido/estado/estrella.svg";
        resenasTab.querySelector('span').classList.add('font-medium');
        
        // Tab Productos inactivo
        productosIcon.src = "../recursos/iconos/contorno/estado/cuadricula.svg";
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

// Selección de producto (reemplazada por openProductDetail)
function seleccionarProducto(elemento) {
    // Esta función ya no se usa, se reemplazó por openProductDetail
    console.log('Función obsoleta - usar openProductDetail');
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

    if (menu && button && !menu.contains(event.target) && !button.contains(event.target)) {
        menu.classList.add('hidden');
    }
});

// Close detail view with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if (document.querySelector('.product-detail-view')) {
            volverVistaAnterior();
        }
    }
});

// Inicializar la página
document.addEventListener('DOMContentLoaded', function () {
    // Cargar datos del perfil desde la base de datos
    cargarPerfilUsuario();
    
    // Asegurar que el estado inicial sea correcto
    updateTabIcons('productos', 'mobile');
});