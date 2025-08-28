const notificaciones = [
    {
        id: 1,
        tipo: "solicitud_chat",
        titulo: "Solicitud de chat",
        descripcion: "Tienes una solicitud de chat de José Martínez",
        tiempo: "20s",
        icono: "recursos/iconos/solido/comunicacion/comentario.svg",
        leida: false,
        usuario: "José Martínez"
    },
    {
        id: 2,
        tipo: "oferta",
        titulo: "Oferta por remera adidas",
        descripcion: "Cristian Ramírez ofertó por tu remera adidas",
        tiempo: "4min",
        icono: "recursos/iconos/contorno/general/etiqueta.svg",
        leida: false,
        usuario: "Cristian Ramírez"
    },
    {
        id: 3,
        tipo: "mensaje",
        titulo: "Nuevo mensaje",
        descripcion: "Tienes un nuevo mensaje de Roberto Pérez",
        tiempo: "12h",
        icono: "recursos/iconos/solido/comunicacion/comentario.svg",
        leida: false,
        usuario: "Roberto Pérez"
    },
    {
        id: 4,
        tipo: "oferta_cancelada",
        titulo: "Oferta cancelada",
        descripcion: "Julieta González canceló su oferta por tu remera adidas",
        tiempo: "2d",
        icono: "recursos/iconos/solido/interfaz/cerrar.svg",
        leida: true,
        usuario: "Julieta González"
    },
    {
        id: 5,
        tipo: "oferta_aceptada",
        titulo: "Oferta aceptada",
        descripcion: "Martín Piña aceptó tu oferta para auriculares inalámbricos",
        tiempo: "8sem",
        icono: "recursos/iconos/solido/estado/verificado.svg",
        leida: true,
        usuario: "Martín Piña"
    },
    {
        id: 6,
        tipo: "resena",
        titulo: "Nueva reseña",
        descripcion: "Obtuviste 5 estrellas de una reseña de Pedro López",
        tiempo: "8sem",
        icono: "recursos/iconos/solido/estado/estrella.svg",
        leida: true,
        usuario: "Pedro López"
    }
];

// Toggle notification dropdown for mobile
function toggleNotificationsMobile() {
    const dropdown = document.getElementById('mobile-notifications-dropdown');
    const overlay = document.getElementById('mobile-notifications-overlay');
    
    if (dropdown.classList.contains('hidden')) {
        // Show dropdown
        dropdown.classList.remove('hidden');
        overlay.classList.remove('hidden');
        generateNotificationsContent('mobile-notifications-content');
        // Add animation
        setTimeout(() => {
            dropdown.classList.add('show');
            overlay.classList.add('show');
        }, 10);
    } else {
        // Hide dropdown
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
        // Show dropdown
        dropdown.classList.remove('hidden');
        generateNotificationsContent('desktop-notifications-content');
        // Add animation
        setTimeout(() => {
            dropdown.classList.add('show');
        }, 10);
    } else {
        // Hide dropdown
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
    
    let html = `
        <div class="p-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-800">Notificaciones</h3>
                <button onclick="markAllAsRead()" class="text-sm text-green hover:text-green-700 transition-colors">
                    Marcar todos como leído
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
        <div class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors mb-2 relative"
             onclick="handleNotificationClick(${notif.id})">
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
function handleNotificationClick(notifId) {
    const notif = notificaciones.find(n => n.id === notifId);
    if (!notif) return;
    
    // Mark as read
    notif.leida = true;
    
    // Handle different notification types
    switch(notif.tipo) {
        case 'solicitud_chat':
            console.log(`Abriendo chat con ${notif.usuario}`);
            break;
        case 'oferta':
            console.log(`Viendo oferta de ${notif.usuario}`);
            break;
        case 'mensaje':
            console.log(`Abriendo mensaje de ${notif.usuario}`);
            break;
        default:
            console.log(`Manejando notificación: ${notif.titulo}`);
    }
    
    // Refresh notifications
    updateNotificationBadge();
    const mobileContent = document.getElementById('mobile-notifications-content');
    const desktopContent = document.getElementById('desktop-notifications-content');
    
    if (mobileContent && !document.getElementById('mobile-notifications-dropdown').classList.contains('hidden')) {
        generateNotificationsContent('mobile-notifications-content');
    }
    if (desktopContent && !document.getElementById('desktop-notifications-dropdown').classList.contains('hidden')) {
        generateNotificationsContent('desktop-notifications-content');
    }
}

// Mark all notifications as read
function markAllAsRead() {
    notificaciones.forEach(notif => notif.leida = true);
    updateNotificationBadge();
    
    // Refresh content if dropdown is open
    const mobileContent = document.getElementById('mobile-notifications-content');
    const desktopContent = document.getElementById('desktop-notifications-content');
    
    if (mobileContent && !document.getElementById('mobile-notifications-dropdown').classList.contains('hidden')) {
        generateNotificationsContent('mobile-notifications-content');
    }
    if (desktopContent && !document.getElementById('desktop-notifications-dropdown').classList.contains('hidden')) {
        generateNotificationsContent('desktop-notifications-content');
    }
}

// Update notification badge
function updateNotificationBadge() {
    const unreadCount = notificaciones.filter(n => !n.leida).length;
    const mobileBadge = document.getElementById('mobile-notification-badge');
    const desktopBadge = document.getElementById('desktop-notification-badge');
    
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
    } else {
        if (mobileBadge) mobileBadge.classList.add('hidden');
        if (desktopBadge) desktopBadge.classList.add('hidden');
    }
}

// Close notifications when clicking outside
document.addEventListener('click', function(event) {
    const mobileDropdown = document.getElementById('mobile-notifications-dropdown');
    const desktopDropdown = document.getElementById('desktop-notifications-dropdown');
    const mobileButton = document.querySelector('[onclick="toggleNotificationsMobile()"]');
    const desktopButton = document.querySelector('[onclick="toggleNotificationsDesktop()"]');
    
    // Close mobile dropdown if clicking outside
    if (mobileDropdown && !mobileDropdown.classList.contains('hidden')) {
        if (!mobileDropdown.contains(event.target) && !mobileButton.contains(event.target)) {
            toggleNotificationsMobile();
        }
    }
    
    // Close desktop dropdown if clicking outside
    if (desktopDropdown && !desktopDropdown.classList.contains('hidden')) {
        if (!desktopDropdown.contains(event.target) && !desktopButton.contains(event.target)) {
            toggleNotificationsDesktop();
        }
    }
});

// Initialize notification system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateNotificationBadge();
});

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
