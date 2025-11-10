// Variables globales para datos dinámicos
let notificaciones = [];
let productos = [];
let vistaAnterior = null;
let scrollAnterior = 0;
let categoriasSeleccionadas = new Set();

// Función para cargar notificaciones desde la base de datos
function cargarNotificaciones() {
    fetch('php/obtener-notificaciones.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error al cargar notificaciones:', data.error);
                return;
            }
            
            if (data.notificaciones) {
                notificaciones = data.notificaciones;
                updateNotificationBadge();
            }
        })
        .catch(error => console.error('Error en fetch de notificaciones:', error));
}

// Como Docker configura DocumentRoot en /var/www/html/codigo, la base es /
const BASE_URL = '/';

// ========== FUNCIONES DE CARGA DE DATOS ==========

// Cargar productos desde la base de datos
async function cargarProductos() {
    try {
        const response = await fetch('obtener-productos.php');
        const data = await response.json();
        
        if (data.success) {
            productos = data.productos;
            // Regenerar productos en ambas vistas
            generarProductosMovil();
            generarProductosEscritorio();
        } else {
            console.error('Error al cargar productos:', data.message);
        }
    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
    }
}

// ========== FUNCIONES DE NOTIFICACIONES ==========

// Toggle notification dropdown for mobile
function toggleNotificationsMobile() {
    const dropdown = document.getElementById('mobile-notifications-dropdown');
    const overlay = document.getElementById('mobile-notifications-overlay');
    
    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
        overlay.classList.remove('hidden');
        generateNotificationsContent('mobile-notifications-content');
        setTimeout(() => {
            dropdown.classList.add('show');
            overlay.classList.add('show');
        }, 10);
    } else {
        dropdown.classList.remove('show');
        overlay.classList.remove('show');
        setTimeout(() => {
            dropdown.classList.add('hidden');
            overlay.classList.add('hidden');
        }, 300);
    }
}

// Toggle notification dropdown for desktop
function toggleNotificationsDesktop() {
    const dropdown = document.getElementById('desktop-notifications-dropdown');
    
    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
        generateNotificationsContent('desktop-notifications-content');
        setTimeout(() => {
            dropdown.classList.add('show');
        }, 10);
    } else {
        dropdown.classList.remove('show');
        setTimeout(() => {
            dropdown.classList.add('hidden');
        }, 300);
    }
}

// Generate notifications content
function generateNotificationsContent(containerId) {
    const container = document.getElementById(containerId);
    const notificacionesRecientes = notificaciones.filter(n => !n.leida);
    const notificacionesAnteriores = notificaciones.filter(n => n.leida);
    
    // Si no hay notificaciones en absoluto
    if (notificaciones.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center h-96 px-4">
                <img src="recursos/iconos/solido/estado/notificacion.svg" alt="Sin notificaciones" class="w-16 h-16 svg-gray-400 mb-4 opacity-50">
                <p class="text-gray-500 text-center text-base">No tienes notificaciones en este momento</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="p-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-800">Notificaciones</h3>
                <button onclick="markAllAsRead()" class="text-sm text-green hover:text-green-700 transition-colors">
                    Marcar todas como leídas
                </button>
            </div>
        </div>
        <div class="max-h-96 overflow-y-auto custom-scrollbar">
    `;
    
    // Recent notifications
    if (notificacionesRecientes.length > 0) {
        html += `
            <div class="p-4">
                <h4 class="text-sm font-medium text-gray-600 mb-3">HOY</h4>
                ${notificacionesRecientes.map(notif => generateNotificationItem(notif)).join('')}
            </div>
        `;
    }
    
    // Previous notifications
    if (notificacionesAnteriores.length > 0) {
        html += `
            <div class="p-4 border-t border-gray-100">
                <h4 class="text-sm font-medium text-gray-600 mb-3">ANTERIORES</h4>
                ${notificacionesAnteriores.map(notif => generateNotificationItem(notif)).join('')}
            </div>
        `;
    }
    
    html += '</div>';
    container.innerHTML = html;
}

// Generate individual notification item
function generateNotificationItem(notif) {
    const iconBg = notif.leida ? 'bg-gray-100' : getIconBgColor(notif.tipo);
    const textColor = notif.leida ? 'text-gray-500' : 'text-gray-800';
    const timeColor = notif.leida ? 'text-gray-400' : 'text-gray-500';
    const checkIcon = notif.leida ? `
        <div class="absolute -top-1 -right-1 w-5 h-5 bg-green rounded-full flex items-center justify-center">
            <img src="recursos/iconos/solido/estado/verificado.svg" alt="Leída" class="w-3 h-3 svg-white">
        </div>
    ` : '';
    
    return `
        <div class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors mb-2 relative" onclick="handleNotificationClick(${notif.id})">
            <div class="relative">
                <div class="w-10 h-10 ${iconBg} rounded-full flex items-center justify-center flex-shrink-0">
                    <img src="${notif.icono}" alt="${notif.tipo}" class="w-5 h-5 ${getIconColor(notif.tipo, notif.leida)}">
                </div>
                ${checkIcon}
            </div>
            <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                    <h5 class="text-sm font-medium ${textColor} truncate">${notif.titulo}</h5>
                    <span class="text-xs ${timeColor} ml-2">${notif.tiempo}</span>
                </div>
                <p class="text-sm ${timeColor} mt-1 line-clamp-2">${notif.descripcion}</p>
            </div>
        </div>
    `;
}

// Get icon background color based on notification type
function getIconBgColor(tipo) {
    const colors = {
        'solicitud_chat': 'bg-blue-100',
        'oferta': 'bg-green-100',
        'mensaje': 'bg-blue-100',
        'oferta_cancelada': 'bg-red-100',
        'oferta_aceptada': 'bg-green-100',
        'resena': 'bg-yellow-100'
    };
    return colors[tipo] || 'bg-gray-100';
}

// Get icon color based on notification type
function getIconColor(tipo, leida) {
    if (leida) return 'svg-gray-400';
    const colors = {
        'solicitud_chat': 'svg-blue-600',
        'oferta': 'svg-green-600',
        'mensaje': 'svg-blue-600',
        'oferta_cancelada': 'svg-red-600',
        'oferta_aceptada': 'svg-green-600',
        'resena': 'svg-yellow-600'
    };
    return colors[tipo] || 'svg-gray-600';
}

// Handle notification click
async function handleNotificationClick(notifId) {
    const notif = notificaciones.find(n => n.id === notifId);
    if (!notif) return;
    
    // Si no está leída, marcarla como leída
    if (!notif.leida) {
        try {
            const formData = new FormData();
            formData.append('id_notificacion', notifId);
            
            const response = await fetch('php/marcar-notificacion-leida.php', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                notif.leida = true;
                updateNotificationBadge();
                
                // Regenerar contenido si están abiertos
                const mobileContent = document.getElementById('mobile-notifications-content');
                const desktopContent = document.getElementById('desktop-notifications-content');
                
                if (mobileContent && !document.getElementById('mobile-notifications-dropdown').classList.contains('hidden')) {
                    generateNotificationsContent('mobile-notifications-content');
                }
                if (desktopContent && !document.getElementById('desktop-notifications-dropdown').classList.contains('hidden')) {
                    generateNotificationsContent('desktop-notifications-content');
                }
            }
        } catch (error) {
            console.error('Error al marcar notificación:', error);
        }
    }
    
    switch(notif.tipo) {
        case 'solicitud_chat':
            console.log('Abriendo solicitud de chat');
            window.location.href = 'php/mensajes.php?tab=solicitudes';
            break;
        case 'solicitud_aceptada':
            if (notif.id_referencia) {
                window.location.href = 'php/mensajes.php?conversacion=' + notif.id_referencia;
            } else {
                window.location.href = 'php/mensajes.php';
            }
            break;
        case 'solicitud_rechazada':
            break;
        case 'oferta':
            // Solo ofertas NUEVAS van a la página de ofertas
            window.location.href = 'php/ofertas.php';
            break;
        case 'oferta_aceptada':
            // Ofertas aceptadas van al chat
            if (notif.id_conversacion) {
                window.location.href = 'php/mensajes.php?conversacion=' + notif.id_conversacion;
            } else {
                window.location.href = 'php/mensajes.php';
            }
            break;
        case 'oferta_rechazada':
            // Ofertas rechazadas van al chat
            if (notif.id_conversacion) {
                window.location.href = 'php/mensajes.php?conversacion=' + notif.id_conversacion;
            } else {
                window.location.href = 'php/mensajes.php';
            }
            break;
        case 'oferta_cancelada':
            // Ofertas canceladas van al chat
            if (notif.id_conversacion) {
                window.location.href = 'php/mensajes.php?conversacion=' + notif.id_conversacion;
            } else {
                window.location.href = 'php/mensajes.php';
            }
            break;
        case 'mensaje':
            if (notif.id_referencia) {
                window.location.href = 'php/mensajes.php?conversacion=' + notif.id_referencia;
            } else {
                window.location.href = 'php/mensajes.php';
            }
            break;
        default:
            console.log('Manejando notificación:', notif.titulo);
    }
}

// Mark all notifications as read
async function markAllAsRead() {
    try {
        const response = await fetch('php/marcar-todas-leidas.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Actualizar estado local
            notificaciones.forEach(notif => notif.leida = true);
            updateNotificationBadge();
            
            // Regenerar contenido de notificaciones
            const mobileContent = document.getElementById('mobile-notifications-content');
            const desktopContent = document.getElementById('desktop-notifications-content');
            
            if (mobileContent && !document.getElementById('mobile-notifications-dropdown').classList.contains('hidden')) {
                generateNotificationsContent('mobile-notifications-content');
            }
            if (desktopContent && !document.getElementById('desktop-notifications-dropdown').classList.contains('hidden')) {
                generateNotificationsContent('desktop-notifications-content');
            }
        } else {
            console.error('Error al marcar notificaciones:', data.message);
        }
    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
    }
}


// Update notification badge
function updateNotificationBadge() {
    const unreadCount = notificaciones.filter(n => !n.leida).length;
    const mobileBadge = document.getElementById('mobile-notification-badge');
    const desktopBadge = document.getElementById('desktop-notification-badge');
    const mobileCount = document.getElementById('mobile-notification-count');
    
    if (unreadCount > 0) {
        const badgeText = unreadCount > 9 ? '9+' : unreadCount.toString();
        if (mobileBadge) {
            mobileBadge.textContent = badgeText;
            mobileBadge.classList.remove('hidden');
        }
        if (desktopBadge) {
            desktopBadge.textContent = badgeText;
            desktopBadge.classList.remove('hidden');
        }
        if (mobileCount) {
            mobileCount.textContent = `+${unreadCount}`;
            mobileCount.classList.remove('hidden');
        }
    } else {
        if (mobileBadge) mobileBadge.classList.add('hidden');
        if (desktopBadge) desktopBadge.classList.add('hidden');
        if (mobileCount) mobileCount.classList.add('hidden');
    }
}

// ========== FUNCIONES DE PRODUCTOS ==========

// Generar productos para móvil
function generarProductosMovil() {
    const contenedor = document.getElementById('mobile-products');
    if (!contenedor) return;
    
    let productosFiltrados;
    
    if (categoriasSeleccionadas.size === 0) {
        productosFiltrados = productos;
    } else {
        productosFiltrados = productos.filter(p => categoriasSeleccionadas.has(p.categoria));
    }
    
    contenedor.innerHTML = productosFiltrados.map(producto => `
    <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow product-card" onclick="openProductDetail(${producto.id})">
        <div class="aspect-square bg-gray-200 relative">
            <div class="absolute inset-0 flex items-center justify-center">
                <img src="${producto.imagenes[0].imagen}" alt="${producto.nombre}" class="w-full h-full object-cover">
            </div>
        </div>
        <div class="p-3"> 
            <h4 class="text-sm font-medium text-gray-800 mb-3">${producto.nombre}</h4>
            <div class="flex items-center justify-between mb-1">
                <p class="text-base text-green">${producto.estado}</p>
                <div class="flex items-center gap-1">
                    <img src="recursos/iconos/solido/estado/estrella.svg" alt="Estrella" class="w-4 h-4 svg-yellow align-middle">
                    <span class="text-base text-gray-500">${producto.calificacion} (${producto.resenas})</span>
                </div>
            </div>
        </div>
    </div>
`).join('');
}

// Generar productos para escritorio (3 columnas)
function generarProductosEscritorio() {
    const contenedor = document.getElementById('desktop-products');
    if (!contenedor) return;
    
    let productosFiltrados;
    
    if (categoriasSeleccionadas.size === 0) {
        productosFiltrados = productos;
    } else {
        productosFiltrados = productos.filter(p => categoriasSeleccionadas.has(p.categoria));
    }
    
    contenedor.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    
    contenedor.innerHTML = productosFiltrados.map(producto => `
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg smooth-transition product-card w-full" onclick="openProductDetail(${producto.id})">
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

// Función para generar estrellas de calificación
function generateStars(calificacion) {
    const fullStars = Math.floor(calificacion);
    const hasHalfStar = calificacion % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHtml = '';
    
    // Estrellas llenas
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<img src="recursos/iconos/solido/estado/estrella.svg" alt="Estrella" class="w-4 h-4 svg-yellow">';
    }
    
    // Media estrella (si la hay)
    if (hasHalfStar) {
        starsHtml += '<img src="recursos/iconos/solido/estado/estrella.svg" alt="Media estrella" class="w-4 h-4 svg-yellow opacity-50">';
    }
    
    // Estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<img src="recursos/iconos/contorno/estado/estrella.svg" alt="Estrella vacía" class="w-4 h-4 svg-gray-300">';
    }
    
    return starsHtml;
}

// Función para obtener productos relacionados
function getRelatedProducts(productId) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) return [];
    
    // Filtrar productos de la misma categoría, excluyendo el producto actual
    const relacionados = productos.filter(p => 
        p.categoria === producto.categoria && p.id !== productId
    );
    
    // Retornar máximo 3 productos relacionados
    return relacionados.slice(0, 3);
}

// Function to open product detail with new design
function openProductDetail(productId) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;
    
    // Save current view state
    guardarVistaAnterior();
    ocultarContenidoOriginal();
    
    // Get related products
    const productosRelacionados = getRelatedProducts(productId);
    
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
            <div class="w-full px-1 py-10">
                <!-- Main product card -->
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-4" style="background: linear-gradient(135deg, #719177 0%, #8fa685 100%);">
                    <div class="p-4">
                        <div class="grid lg:grid-cols-2 gap-6 items-stretch">
                        <!-- Product image section -->
                        <div class="relative lg:col-span-1 flex items-center justify-center bg-white rounded-2xl overflow-hidden shadow-inner">
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

                            <!-- Main image -->
                            <img src="${producto.imagenes?.[0]?.imagen || 'ruta/placeholder.png'}"
                                alt="${producto.nombre}"
                                class="h-full w-auto object-cover" />
                        </div>

                        <!-- Product information -->
                        <div class="text-white space-y-3 flex flex-col justify-between">
                            <!-- Title and time -->
                            <div>
                                <h1 class="text-xl lg:text-xl mb-1 leading-tight">${producto.nombre}</h1>
                                <p class="text-white text-opacity-90 text-sm">Publicado hace ${producto.publicadoHace}</p>
                            </div>
                            
                            <!-- Seller info with rating -->
                            <div class="flex items-center justify-between w-full">
                                <div class="flex items-center space-x-2">
                                    <span class="text-sm text-white text-opacity-70">de</span>
                                        ${(() => {
                                            let avatarUrl = producto.vendedor.avatar || '';
                                            // La ruta ya viene correcta desde el PHP, no modificar
                                            return avatarUrl 
                                                ? `<img src="${avatarUrl}" alt="${producto.vendedor.nombre}" class="w-8 h-8 rounded-full border-2 border-white border-opacity-30 object-cover" onerror="this.onerror=null; this.src='recursos/iconos/avatar.svg';">`
                                                : `<div class="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-white text-xs font-bold border-2 border-white border-opacity-30">${producto.vendedor.nombre.charAt(0).toUpperCase()}</div>`;
                                        })()}
                                    <span class="text-sm text-white font-medium">${producto.vendedor.nombre}</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <svg class="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <span class="text-white text-opacity-90 text-sm">${producto.calificacion} (${producto.resenas})</span>
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
                            <div id="product-detail-map" class="w-full h-32 bg-white bg-opacity-50 rounded-lg z-10"></div>

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
                            
                            <!-- Make offer button -->
                            <button onclick="hacerOferta(${producto.id})" class="w-full bg-white text-green font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors mt-6">
                                Hacer oferta
                            </button>
                        </div>
                    </div>

                    </div>
                </div>
                
                <!-- Related products - no cards, simple grid -->
                ${productosRelacionados.length > 0 ? `
                <div>
                    <h2 class="text-2xl text-black mb-6 mt-6">Productos relacionados</h2>
                    <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 pb-8">
                        ${productosRelacionados.map(prod => `
                            <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow product-card w-full" onclick="openProductDetail(${prod.id})">
                                <div class="aspect-square bg-gray-200 relative">
                                    <div class="absolute inset-0 flex items-center justify-center">
                                        <img src="${prod.imagenes[0].imagen}" alt="${prod.nombre}" class="w-full h-full object-cover">
                                    </div>
                                </div>
                                <div class="p-3">
                                    <h4 class="text-sm font-medium text-gray-800 mb-3">${prod.nombre}</h4>
                                    <div class="flex items-center justify-between mb-1">
                                        <p class="text-base text-green">${prod.estado}</p>
                                        <div class="flex items-center gap-1">
                                            <img src="recursos/iconos/solido/estado/estrella.svg" alt="Estrella" class="w-4 h-4 svg-yellow align-middle">
                                            <span class="text-base text-gray-500">${prod.calificacion} (${prod.resenas})</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        </div>
    `;

    console.log('Scroll antes de ir al top:', window.pageYOffset);

    // Hacer scroll al top para ver el producto desde arriba
    setTimeout(() => {
        const isMobile = window.innerWidth < 1024;
        if (isMobile) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const desktopMain = document.querySelector('.desktop-main');
            if (desktopMain) {
                desktopMain.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }, 50);

    // Replace main content with detail view
    reemplazarVistaConDetalle(detailHTML);

    // Scroll inmediato al top (sin animación)
    window.scrollTo(0, 0);
    console.log('Scroll movido a 0');

    // Initialize map after a brief delay
    setTimeout(() => {
        initProductDetailMap(producto.coordenadas, producto.ubicacion);
    }, 100);
}

// Función para guardar la vista anterior
function guardarVistaAnterior() {
    // Si ya estamos en una vista de detalle Y ya tenemos una vista guardada, NO sobrescribir
    if (document.querySelector('.product-detail-view') && vistaAnterior !== null) {
        console.log('Ya hay vista guardada, no sobrescribir');
        return;
    }
    
    const isMobile = window.innerWidth < 1024;
    
    // CORRECCIÓN: En desktop también usar window.pageYOffset
    scrollAnterior = window.pageYOffset || document.documentElement.scrollTop;
    
    console.log('Guardando vista, scroll:', scrollAnterior);
    
    if (isMobile) {
        // Guardar contenido móvil
        const mobileContainer = document.querySelector('.lg\\:hidden');
        vistaAnterior = {
            tipo: 'mobile',
            contenido: mobileContainer ? mobileContainer.innerHTML : null,
            scroll: scrollAnterior || 0
        };
    } else {
        // Guardar contenido desktop
        const desktopMain = document.querySelector('.desktop-main main');
        vistaAnterior = {
            tipo: 'desktop',
            contenido: desktopMain ? desktopMain.innerHTML : null,
            scroll: scrollAnterior || 0
        };
    }
    
    console.log('Vista guardada:', vistaAnterior);
}

// Función para ocultar el contenido original de la página
function ocultarContenidoOriginal() {
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) {
        // Eliminar completamente el contenedor principal móvil
        const containerMovil = document.querySelector('.lg\\:hidden .w-full.bg-white.min-h-screen');
        if (containerMovil) {
            containerMovil.style.display = 'none';
        }
    } else {
        // Ocultar sección de bienvenida, categorías y productos en desktop
        const bienvenida = document.querySelector('.desktop-main main > div:first-child');
        const categorias = document.querySelector('.categories-section');
        const productosDesktop = document.querySelector('#desktop-products')?.parentElement;
        
        if (bienvenida) bienvenida.style.display = 'none';
        if (categorias) categorias.style.display = 'none';
        if (productosDesktop) productosDesktop.style.display = 'none';
    }
}

// Función para mostrar el contenido original de la página
function mostrarContenidoOriginal() {
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) {
        // Mostrar el contenedor principal móvil
        const containerMovil = document.querySelector('.lg\\:hidden .w-full.bg-white.min-h-screen');
        if (containerMovil) {
            containerMovil.style.display = 'block';
        }
    } else {
        const bienvenida = document.querySelector('.desktop-main main > div:first-child');
        const categorias = document.querySelector('.categories-section');
        const productosDesktop = document.querySelector('#desktop-products')?.parentElement;
        
        if (bienvenida) bienvenida.style.display = 'block';
        if (categorias) categorias.style.display = 'block';
        if (productosDesktop) productosDesktop.style.display = 'block';
    }
}

// Función para mostrar el contenido original de la página
function mostrarContenidoOriginal() {
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) {
        const categoriasMovil = document.querySelector('#categorias-movil')?.parentElement?.parentElement;
        const productosMovil = document.querySelector('#mobile-products')?.parentElement;
        
        if (categoriasMovil) categoriasMovil.style.display = 'block';
        if (productosMovil) productosMovil.style.display = 'block';
    } else {
        const bienvenida = document.querySelector('.desktop-main main > div:first-child');
        const categorias = document.querySelector('.categories-section');
        const productosDesktop = document.querySelector('#desktop-products')?.parentElement;
        
        if (bienvenida) bienvenida.style.display = 'block';
        if (categorias) categorias.style.display = 'block';
        if (productosDesktop) productosDesktop.style.display = 'block';
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
            // Quitar min-height para evitar espacio vacío
            const bgContainer = mobileContainer.querySelector('.w-full.bg-white.min-h-screen');
            if (bgContainer) {
                bgContainer.classList.remove('min-h-screen');
            }
        }
    } else {
        // Reemplazar contenido desktop principal
        const desktopMain = document.querySelector('.desktop-main main');
        if (desktopMain) {
            desktopMain.innerHTML = detailHTML;
            // Ajustar padding para que no haya tanto espacio
            desktopMain.style.paddingBottom = '2rem';
        }
    }
}

// Función para volver a la vista anterior
function volverVistaAnterior() {
    if (!vistaAnterior || !vistaAnterior.contenido) {
        location.reload();
        return;
    }
    
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile && vistaAnterior.tipo === 'mobile') {
        // Restaurar vista móvil
        const mobileContainer = document.querySelector('.lg\\:hidden');
        if (mobileContainer && vistaAnterior.contenido) {
            mobileContainer.innerHTML = vistaAnterior.contenido;
            generarProductosMovil();
            configurarBusqueda();
            
            // Restaurar scroll más rápido
            const scrollPos = vistaAnterior.scroll || 0;
            requestAnimationFrame(() => {
                window.scrollTo({ top: scrollPos, behavior: 'instant' });
            });

            mostrarContenidoOriginal(); // ← AGREGAR ESTA LÍNEA

            vistaAnterior = null;
            scrollAnterior = 0;
        }
    } else if (!isMobile && vistaAnterior.tipo === 'desktop') {
        // Restaurar vista desktop
        const desktopMain = document.querySelector('.desktop-main main');
        if (desktopMain && vistaAnterior.contenido) {
            desktopMain.innerHTML = vistaAnterior.contenido;
            generarProductosEscritorio();
            configurarBusqueda();
            
            // Restaurar scroll más rápido
            const scrollPos = vistaAnterior.scroll || 0;
            requestAnimationFrame(() => {
                window.scrollTo({ top: scrollPos, behavior: 'instant' });
            });
            
            vistaAnterior = null;
            scrollAnterior = 0;
        }
    }
}

// Función para volver al detalle del producto desde el formulario de oferta
function volverADetalleProducto(productId) {
    openProductDetail(productId);
}

// Función para inicializar el mapa de detalle
function initProductDetailMap(coordinates, locationName) {
    const mapContainer = document.getElementById('product-detail-map');
    if (!mapContainer) return;
    
    mapContainer.innerHTML = '';
    
    try {
        const map = L.map('product-detail-map').setView(coordinates, 14);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        L.marker(coordinates)
            .addTo(map)
            .bindPopup(locationName);
    } catch (error) {
        console.log('Mapa no disponible, mostrando ubicación de texto');
        mapContainer.innerHTML = `
            <div class="flex items-center justify-center h-full bg-white bg-opacity-50 rounded-lg">
                <div class="text-center">
                    <svg class="w-8 h-8 text-green mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <p class="text-gray-700 font-medium">${locationName}</p>
                </div>
            </div>
        `;
    }
}

// Función para hacer oferta
function hacerOferta(productId) {
    // Verificar si el usuario está logueado
    if (typeof usuarioLogueado === 'undefined' || !usuarioLogueado) {
        // Usar SweetAlert como en el menú
        if (window.SwalApp) {
            window.SwalApp.fire({
                title: 'Acceso restringido',
                text: 'Debes iniciar sesión para hacer una oferta.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Iniciar sesión',
                cancelButtonText: 'Volver',
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = baseURL + 'php/iniciar-sesion.php';
                }
                // Si cancela, simplemente no hace nada (se queda en la página)
            });
        } else {
            // Fallback si SweetAlert no está disponible
            alert('Acceso restringido');
        }
        return;
    }
    
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;

    console.log('Datos del producto:', producto);
    console.log('Avatar del vendedor:', producto.vendedor.avatar);
    
    fotosOferta = [];
    
    // Guardar vista actual
    guardarVistaAnterior();
    ocultarContenidoOriginal();
    
    // Obtener productos relacionados
    const productosRelacionados = getRelatedProducts(productId);
    
    // HTML del formulario de oferta mejorado
    const ofertaHTML = `
        <!-- Formulario de oferta -->
        <div class="w-full px-1 py-1">
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-4" style="background: linear-gradient(135deg, #719177 0%, #8fa685 100%);">
                <div class="p-4">
                    <div class="grid lg:grid-cols-2 gap-6 items-stretch">
                        <!-- Columna izquierda - Imagen del producto (INTACTA) -->
                        <div class="relative lg:col-span-1 flex items-center justify-center bg-white rounded-2xl overflow-hidden shadow-inner">
                            <!-- Botón volver en la imagen -->
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

                            <!-- Main image -->
                            <img src="${producto.imagenes?.[0]?.imagen || 'ruta/placeholder.png'}"
                                alt="${producto.nombre}"
                                class="h-full w-auto object-cover" />
                        </div>

                        <!-- Columna derecha - Formulario con fondo blanco -->
                        <div class="bg-white rounded-2xl p-6 text-gray-800 space-y-4 flex flex-col justify-center">
                            <h2 class="text-lg font-semibold text-gray-800">Hacer oferta</h2>
                            
                            <form id="form-oferta" class="space-y-4">
                                <!-- Upload fotos -->
                                <div class="form-section">
                                    <input type="file" id="file-input-oferta" accept="image/*" class="hidden" onchange="handleFileSelect(event)">
                                    <div id="fotos-container" class="grid grid-cols-3 gap-2"></div>
                                </div>
                                
                                <!-- Título -->
                                <div class="form-section">
                                    <input 
                                        type="text" 
                                        id="titulo-oferta" 
                                        placeholder="Título" 
                                        class="form-input-compact w-full"
                                        required
                                    >
                                </div>
                                
                                <!-- Estado -->
                                <div class="form-section">
                                    <div class="relative">
                                        <select 
                                            id="estado-oferta" 
                                            class="form-select-compact w-full"
                                            required
                                        >
                                            <option value="">Estado</option>
                                            <option value="Nuevo">Nuevo</option>
                                            <option value="Usado">Usado</option>
                                            <option value="Reacondicionado">Reacondicionado</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <!-- Descripción -->
                                <div class="form-section">
                                    <textarea 
                                        id="descripcion-oferta" 
                                        placeholder="Escribe una descripción" 
                                        rows="5" 
                                        class="form-textarea-compact w-full"
                                        required
                                    ></textarea>
                                </div>
                                
                                <!-- Botones -->
                                <div class="flex flex-col sm:flex-row gap-2">
                                    <button 
                                        type="button"
                                        onclick="enviarOferta(${productId})" 
                                        class="flex-1 bg-green text-white py-2.5 px-5 rounded-full font-semibold text-sm hover:bg-opacity-90 transition-all"
                                    >
                                        Enviar oferta
                                    </button>
                                    <button 
                                    type="button"
                                    onclick="volverADetalleProducto(${productId})" 
                                    class="flex-1 bg-white text-gray-700 border border-gray-300 py-2.5 px-5 rounded-full font-semibold text-sm hover:bg-gray-50 transition-all"
                                >
                                    Cancelar
                                </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Productos relacionados -->
            ${productosRelacionados.length > 0 ? `
            <div>
                <h2 class="text-2xl text-black mb-6 mt-6">Productos relacionados</h2>
                <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
                    ${productosRelacionados.map(prod => `
                        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow product-card w-full" onclick="openProductDetail(${prod.id})">
                            <div class="aspect-square bg-gray-200 relative">
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <img src="${prod.imagenes[0].imagen}" alt="${prod.nombre}" class="w-full h-full object-cover">
                                </div>
                            </div>
                            <div class="p-3">
                                <h4 class="text-sm font-medium text-gray-800 mb-3">${prod.nombre}</h4>
                                <div class="flex items-center justify-between mb-1">
                                    <p class="text-base text-green">${prod.estado}</p>
                                    <div class="flex items-center gap-1">
                                        <img src="recursos/iconos/solido/estado/estrella.svg" alt="Estrella" class="w-4 h-4 svg-yellow align-middle">
                                        <span class="text-base text-gray-500">${prod.calificacion} (${prod.resenas})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        ` : ''}
    `;
    
   // Reemplazar vista actual con el formulario
    reemplazarVistaConDetalle(ofertaHTML);
    
    // Inicializar el renderizado de fotos
    renderizarFotos();
}

// Array global para almacenar las fotos seleccionadas
let fotosOferta = [];

// Función para manejar la selección de archivos
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validar que no supere el máximo de 3 fotos
    if (fotosOferta.length >= 3) {
        alert('Máximo 3 fotos permitidas');
        return;
    }
    
    // Leer la foto y agregarla al array
    const reader = new FileReader();
    reader.onload = function(e) {
        fotosOferta.push({
            dataURL: e.target.result,
            file: file
        });
        renderizarFotos();
    };
    reader.readAsDataURL(file);
    
    // Limpiar el input para permitir seleccionar la misma foto nuevamente
    event.target.value = '';
}

// Función para renderizar las fotos y placeholders
function renderizarFotos() {
    const container = document.getElementById('fotos-container');
    container.innerHTML = '';
    
    // Renderizar fotos existentes
    fotosOferta.forEach((foto, index) => {
        const div = document.createElement('div');
        div.className = 'relative rounded-2xl overflow-hidden border-2 border-gray-200 bg-white';
        div.style.aspectRatio = '1';
        div.innerHTML = `
            <img src="${foto.dataURL}" class="w-full h-full object-cover">
            <button onclick="eliminarFoto(${index})" type="button" class="absolute top-2 right-2 bg-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-100 transition-all shadow-lg border border-gray-200">
                <svg class="w-4 h-4" fill="none" stroke="#719177" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        `;
        container.appendChild(div);
    });
    
    // Mostrar placeholder solo si hay menos de 3 fotos
    if (fotosOferta.length < 3) {
        const placeholder = document.createElement('div');
        placeholder.className = 'border-2 border-dashed border-gray-300 rounded-2xl text-center hover:border-green transition-colors cursor-pointer bg-gray-50 flex flex-col items-center justify-center';
        placeholder.style.aspectRatio = '1';
        placeholder.onclick = () => document.getElementById('file-input-oferta').click();
        placeholder.innerHTML = `
            <svg class="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <p class="text-gray-500 text-xs font-medium px-2">Adjuntar foto</p>
        `;
        container.appendChild(placeholder);
    }
    
    // Rellenar espacios vacíos para mantener el grid
    const espaciosVacios = 3 - fotosOferta.length - (fotosOferta.length < 3 ? 1 : 0);
    for (let i = 0; i < espaciosVacios; i++) {
        const divVacio = document.createElement('div');
        divVacio.style.aspectRatio = '1';
        container.appendChild(divVacio);
    }
}

// Función para eliminar foto del array
function eliminarFoto(index) {
    fotosOferta.splice(index, 1);
    renderizarFotos();
}

// Función para cerrar el modal
function cerrarModalOferta() {
    const modal = document.getElementById('modal-oferta');
    if (modal) {
        modal.remove();
    }
}

// Función para enviar la oferta
async function enviarOferta(productId) {
    const titulo = document.getElementById('titulo-oferta').value.trim();
    const estado = document.getElementById('estado-oferta').value;
    const descripcion = document.getElementById('descripcion-oferta').value.trim();
    const fileInput = document.getElementById('file-input-oferta');
    
    // Validaciones
    if (!titulo) {
        alert('Por favor ingresa un título');
        return;
    }
    if (!estado) {
        alert('Por favor selecciona un estado');
        return;
    }
    if (!descripcion) {
        alert('Por favor ingresa una descripción');
        return;
    }
    if (fotosOferta.length === 0) {
        alert('Por favor adjunta al menos una foto');
        return;
    }
    
    // Crear FormData para enviar archivos
    const formData = new FormData();
    formData.append('id_producto', productId);
    formData.append('titulo', titulo);
    formData.append('estado', estado);
    formData.append('descripcion', descripcion);
    
    // Agregar todas las fotos
    fotosOferta.forEach((foto, index) => {
        formData.append(`fotos[]`, foto.file);
    });
    
    try {
        const response = await fetch('php/crear-oferta.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Guardar flag para mostrar toast después del redirect
            sessionStorage.setItem('ofertaEnviada', 'true');
            // Redirigir al index después de enviar la oferta
            window.location.href = 'index.php';
        } else {
            alert('Error al enviar oferta: ' + (data.message || 'Error desconocido'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
    }
}

// Cerrar modal al presionar ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        cerrarModalOferta();
    }
});

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
            <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow product-card" onclick="openProductDetail(${producto.id})">
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
        // Mantener las 3 columnas en el filtrado
        contenedorEscritorio.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
        contenedorEscritorio.innerHTML = productosFiltrados.map(producto => `
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg smooth-transition product-card w-full" onclick="openProductDetail(${producto.id})">
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

// Función para mostrar/ocultar dropdown del menú - Mejorada para elementos dinámicos
function showDropdown() {
    const menu = document.getElementById('menu');
    if (menu) {
        // Si el menú existe, alternar su visibilidad
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
        } else {
            // Si el menú ya está visible, ocultarlo
            menu.classList.add('hidden');
        }
    } else {
        // Si el menú no existe, significa que el HTML se generó dinámicamente
        // y necesitamos esperar un momento para que esté disponible
        setTimeout(() => {
            const menuRetry = document.getElementById('menu');
            if (menuRetry) {
                menuRetry.classList.remove('hidden');
            }
        }, 10);
    }
}

// Función auxiliar para cerrar todos los dropdowns abiertos
function cerrarTodosLosDropdowns() {
    // Cerrar menú si está abierto
    const menu = document.getElementById('menu');
    if (menu && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
    }
    
    // Cerrar notificaciones desktop
    const desktopDropdown = document.getElementById('desktop-notifications-dropdown');
    if (desktopDropdown && !desktopDropdown.classList.contains('hidden')) {
        toggleNotificationsDesktop();
    }
}

// ========== EVENT LISTENERS ==========

// Close notifications when clicking outside
document.addEventListener('click', function(event) {
    // === NOTIFICACIONES ===
    const desktopDropdown = document.getElementById('desktop-notifications-dropdown');
    const desktopButton = document.querySelector('[onclick="toggleNotificationsDesktop()"]');
    
    // Close desktop dropdown if clicking outside
    if (desktopDropdown && !desktopDropdown.classList.contains('hidden')) {
        if (!desktopDropdown.contains(event.target) && !desktopButton.contains(event.target)) {
            toggleNotificationsDesktop();
        }
    }
    
    // === MENÚ DROPDOWN (usando event delegation) ===
    const menu = document.getElementById('menu');
    const menuButton = document.getElementById('menu-button');
    
    // Usar event delegation para manejar clics en el botón del menú
    if (event.target.closest('#menu-button') || event.target.closest('[onclick*="showDropdown"]')) {
        // Si se hace clic en el botón del menú, no hacer nada aquí (será manejado por showDropdown())
        return;
    }
    
    // Cerrar menú si se hace clic fuera y el menú existe
    if (menu && !menu.contains(event.target)) {
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

// Initialize notification system and products when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Verificar si hay que mostrar toast de oferta enviada
    if (sessionStorage.getItem('ofertaEnviada') === 'true') {
        sessionStorage.removeItem('ofertaEnviada');
        showCustomToast('¡Oferta enviada exitosamente!', 3000);
    }
    
    // Cargar datos desde la base de datos
    await cargarProductos();
    cargarNotificaciones();
    updateNotificationBadge();
    configurarBusqueda();
    
    // Category slider indicators
    const slider = document.querySelector('.px-4.mb-6 .flex.overflow-x-auto');
    const caretLeft = document.querySelector('.caret-left-indicador');
    const caretRight = document.querySelector('.caret-right-indicador');
    
    if (slider && caretLeft && caretRight) {
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
    }
});
// Función para cambiar icono a Outline
function cambiarIconoAOutline(icono) {
  const src = icono.src;
  if (src.includes("/solido/")) {
    const nuevoSrc = src.replace("/solido/", "/contorno/");
    icono.src = nuevoSrc;
  }
}

// Función para cambiar icono a Solid
function cambiarIconoASolid(icono) {
  const src = icono.src;
  if (src.includes("/contorno/")) {
    const nuevoSrc = src.replace("/contorno/", "/solido/");
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
  return `<img src="recursos/iconos/contorno/${nombre}.svg" alt="${alt}" class="${tamano} svg-green">`;
}

// ==========================================
// BÚSQUEDA AUTOMÁTICA DESDE CHATBOT
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Si hay búsqueda inicial desde el chatbot
    if (window.busquedaInicialChatbot && window.busquedaInicialChatbot.trim() !== '') {
        console.log('Búsqueda desde chatbot:', window.busquedaInicialChatbot);
        
        // Esperar un poco para que el header y el buscador se carguen
        setTimeout(() => {
            // Buscar el input de búsqueda en el header
            const searchInput = document.querySelector('input[type="search"]') || 
                              document.querySelector('#buscador') ||
                              document.querySelector('input[placeholder*="Buscar"]') ||
                              document.querySelector('input[placeholder*="buscar"]');
            
            if (searchInput) {
                // Establecer el valor
                searchInput.value = window.busquedaInicialChatbot;
                
                // Hacer focus en el input
                searchInput.focus();
                
                // Disparar eventos de búsqueda
                searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                searchInput.dispatchEvent(new Event('change', { bubbles: true }));
                searchInput.dispatchEvent(new KeyboardEvent('keyup', { 
                    bubbles: true,
                    key: 'Enter',
                    keyCode: 13
                }));
                
                // Si hay un botón de búsqueda, clickearlo
                const searchButton = document.querySelector('button[type="submit"]') ||
                                   document.querySelector('.search-button') ||
                                   searchInput.closest('form')?.querySelector('button');
                
                if (searchButton) {
                    setTimeout(() => searchButton.click(), 100);
                }
                
                // Scroll suave a los productos después de 500ms
                setTimeout(() => {
                    const productsContainer = document.getElementById('mobile-products') || 
                                            document.getElementById('desktop-products');
                    if (productsContainer) {
                        productsContainer.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }
                }, 500);
                
                console.log('✅ Búsqueda automática ejecutada:', window.busquedaInicialChatbot);
            } else {
                console.warn('⚠️ No se encontró el input de búsqueda en el header');
            }
        }, 300);
    }
});