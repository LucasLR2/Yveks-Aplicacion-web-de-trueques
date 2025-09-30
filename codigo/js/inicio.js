// Datos de notificaciones
const notificaciones = [
    { id: 1, tipo: "solicitud_chat", titulo: "Solicitud de chat", descripcion: "Tienes una solicitud de chat de José Martínez", tiempo: "20s", icono: "recursos/iconos/solido/comunicacion/comentario.svg", leida: false, usuario: "José Martínez" },
    { id: 2, tipo: "oferta", titulo: "Oferta por remera adidas", descripcion: "Cristian Ramírez ofertó por tu remera adidas", tiempo: "4min", icono: "recursos/iconos/contorno/general/etiqueta.svg", leida: false, usuario: "Cristian Ramírez" },
    { id: 3, tipo: "mensaje", titulo: "Nuevo mensaje", descripcion: "Tienes un nuevo mensaje de Roberto Pérez", tiempo: "12h", icono: "recursos/iconos/solido/comunicacion/comentario.svg", leida: false, usuario: "Roberto Pérez" },
    { id: 4, tipo: "oferta_cancelada", titulo: "Oferta cancelada", descripcion: "Julieta González canceló su oferta por tu remera adidas", tiempo: "2d", icono: "recursos/iconos/solido/interfaz/cerrar.svg", leida: true, usuario: "Julieta González" },
    { id: 5, tipo: "oferta_aceptada", titulo: "Oferta aceptada", descripcion: "Martín Piña aceptó tu oferta para auriculares inalámbricos", tiempo: "8sem", icono: "recursos/iconos/solido/estado/verificado.svg", leida: true, usuario: "Martín Piña" },
    { id: 6, tipo: "resena", titulo: "Nueva reseña", descripcion: "Obtuviste 5 estrellas de una reseña de Pedro López", tiempo: "8sem", icono: "recursos/iconos/solido/estado/estrella.svg", leida: true, usuario: "Pedro López" }
];

// Datos de productos ampliados con información detallada
const productos = [
    {
        id: 1,
        nombre: "Lentes retro rojos",
        estado: "Usado",
        calificacion: 4.5,
        resenas: 12,
        imagenes: [{ imagen: "recursos/imagenes/1.jpg" }],
        categoria: "accesorios",
        publicadoHace: "2 días",
        vendedor: {
            nombre: "María González",
            reputacion: 4.8,
            ventas: 45,
            avatar: "recursos/avatars/mg.jpg"
        },
        ubicacion: "Pocitos, Montevideo",
        coordenadas: [-34.9175, -56.1500],
        descripcion: "Lentes de sol retro en perfecto estado. Muy cómodos y con protección UV. Ideales para el verano.",
        preferenciasIntercambio: ["Remera estilizada", "Pañuelo original", "Gadget tecnológico"]
    },
    {
        id: 2,
        nombre: "Auriculares inalámbricos",
        estado: "Nuevo",
        calificacion: 4.2,
        resenas: 32,
        imagenes: [{ imagen: "recursos/imagenes/2.jpg" }],
        categoria: "tecnologia",
        publicadoHace: "1 hora",
        vendedor: {
            nombre: "Carlos Rodríguez",
            reputacion: 4.9,
            ventas: 128,
            avatar: "recursos/avatars/cr.jpg"
        },
        ubicacion: "Ciudad Vieja, Montevideo",
        coordenadas: [-34.9058, -56.2017],
        descripcion: "Auriculares Bluetooth de alta calidad. Batería de larga duración y excelente calidad de sonido.",
        preferenciasIntercambio: ["Cargador magnético", "Proyector pequeño", "Powerbank"],
    },
    {
        id: 3,
        nombre: "Cargador magnético",
        estado: "Usado",
        calificacion: 4.8,
        resenas: 8,
        imagenes: [{ imagen: "recursos/imagenes/3.jpg" }],
        categoria: "tecnologia",
        publicadoHace: "5 horas",
        vendedor: {
            nombre: "Ana Silva",
            reputacion: 4.6,
            ventas: 67,
            avatar: "recursos/avatars/as.jpg"
        },
        ubicacion: "Cordón, Montevideo",
        coordenadas: [-34.9011, -56.1914],
        descripcion: "Cargador magnético original, funciona perfectamente. Compatible con múltiples dispositivos.",
        preferenciasIntercambio: ["Auriculares inalámbricos", "Cable USB de calidad", "Powerbank"],
    },
    {
        id: 4,
        nombre: "Proyector",
        estado: "Nuevo",
        calificacion: 4.3,
        resenas: 15,
        imagenes: [{ imagen: "recursos/imagenes/4.jpg" }],
        categoria: "tecnologia",
        publicadoHace: "3 días",
        vendedor: {
            nombre: "Roberto Fernández",
            reputacion: 4.7,
            ventas: 23,
            avatar: "recursos/avatars/rf.jpg"
        },
        ubicacion: "Punta Carretas, Montevideo",
        coordenadas: [-34.9217, -56.1533],
        descripcion: "Proyector HD portátil, ideal para presentaciones o entretenimiento en casa. Incluye cables.",
        preferenciasIntercambio: ["Auriculares inalámbricos", "Pantalla portátil", "Smart TV Box"],
    },
    {
        id: 5,
        nombre: "Remera Suzuki con estampado",
        estado: "Nuevo",
        calificacion: 4.6,
        resenas: 23,
        imagenes: [{ imagen: "recursos/imagenes/5.jpg" }],
        categoria: "ropa",
        publicadoHace: "1 día",
        vendedor: {
            nombre: "Diego Martínez",
            reputacion: 4.5,
            ventas: 89,
            avatar: "recursos/avatars/dm.jpg"
        },
        ubicacion: "Tres Cruces, Montevideo",
        coordenadas: [-34.8941, -56.1706],
        descripcion: "Remera original Suzuki, talla M. Material de alta calidad, nunca usada.",
        preferenciasIntercambio: ["Otra remera", "Pañuelo de diseño", "Gorra de moda"],
    },
    {
        id: 6,
        nombre: "Sillón naranja",
        estado: "Usado",
        calificacion: 4.4,
        resenas: 18,
        imagenes: [{ imagen: "recursos/imagenes/6.jpg" }],
        categoria: "hogar",
        publicadoHace: "4 días",
        vendedor: {
            nombre: "Laura Pérez",
            reputacion: 4.8,
            ventas: 34,
            avatar: "recursos/avatars/lp.jpg"
        },
        ubicacion: "Malvín, Montevideo",
        coordenadas: [-34.8889, -56.1056],
        descripcion: "Sillón cómodo en buen estado, color naranja vibrante. Perfecto para sala de estar.",
        preferenciasIntercambio: ["Sillón cómodo", "Silla de oficina premium", "Mueble de almacenamiento"],
    },
    {
        id: 7,
        nombre: "Zapatillas Adidas Aggresive",
        estado: "Usado",
        calificacion: 4.9,
        resenas: 11,
        imagenes: [{ imagen: "recursos/imagenes/7.jpg" }],
        categoria: "ropa",
        publicadoHace: "2 días",
        vendedor: {
            nombre: "Fernando Suárez",
            reputacion: 4.7,
            ventas: 56,
            avatar: "recursos/avatars/fs.jpg"
        },
        ubicacion: "Buceo, Montevideo",
        coordenadas: [-34.9089, -56.1389],
        descripcion: "Zapatillas Adidas en buen estado, talla 42. Muy cómodas para deportes.",
        preferenciasIntercambio: ["Otra zapatilla deportiva", "Gorra de marca", "Mochila deportiva"],
    },
    {
        id: 8,
        nombre: "Libro The Laws of Human Nature",
        estado: "Nuevo",
        calificacion: 3.8,
        resenas: 5,
        imagenes: [{ imagen: "recursos/imagenes/8.jpg" }],
        categoria: "entretenimiento",
        publicadoHace: "1 semana",
        vendedor: {
            nombre: "Patricia Morales",
            reputacion: 4.6,
            ventas: 23,
            avatar: "recursos/avatars/pm.jpg"
        },
        ubicacion: "Centro, Montevideo",
        coordenadas: [-34.9045, -56.1917],
        descripcion: "Libro nuevo, nunca leído. Excelente para desarrollo personal.",
        preferenciasIntercambio: ["Otro libro", "Cuaderno de notas", "Marcadores/bolígrafos de calidad"],
    },
    {
        id: 9,
        nombre: "Remera Illicit Bloc denim claro",
        estado: "Nuevo",
        calificacion: 5.0,
        resenas: 15,
        imagenes: [{ imagen: "recursos/imagenes/9.jpg" }],
        categoria: "ropa",
        publicadoHace: "3 horas",
        vendedor: {
            nombre: "Andrés Vega",
            reputacion: 4.9,
            ventas: 78,
            avatar: "recursos/avatars/av.jpg"
        },
        ubicacion: "Parque Rodó, Montevideo",
        coordenadas: [-34.9167, -56.1639],
        descripcion: "Remera nueva con etiqueta, talla L. Diseño exclusivo y material premium.",
       preferenciasIntercambio: ["Remera estampada", "Pañuelo de diseño", "Gorra de moda"],
    },
    {
        id: 10,
        nombre: "Lámpara de escritorio",
        estado: "Usado",
        calificacion: 3.9,
        resenas: 7,
        imagenes: [{ imagen: "recursos/imagenes/10.jpg" }],
        categoria: "hogar",
        publicadoHace: "5 días",
        vendedor: {
            nombre: "Carmen López",
            reputacion: 4.4,
            ventas: 29,
            avatar: "recursos/avatars/cl.jpg"
        },
        ubicacion: "Aguada, Montevideo",
        coordenadas: [-34.8889, -56.1944],
        descripcion: "Lámpara LED ajustable, perfecta para estudiar o trabajar. Funciona perfectamente.",
        preferenciasIntercambio: ["Lámpara LED", "Organizador de escritorio", "Gadget tecnológico pequeño"],
    }
];

let categoriaActual = 'todas';
let categoriasSeleccionadas = new Set();
let vistaAnterior = null; // Para guardar el estado anterior

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
function handleNotificationClick(notifId) {
    const notif = notificaciones.find(n => n.id === notifId);
    if (!notif) return;
    
    notif.leida = true;
    
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
            <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-semibold text-gray-800">${producto.nombre}</h4>
                <span class="px-2 py-1 text-xs rounded-full 
                             ${producto.estado === 'Nuevo' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}">
                    ${producto.estado}
                </span>
            </div>
            
            <!-- Calificación -->
            <div class="flex items-center gap-2">
                <img src="recursos/iconos/solido/estado/estrella.svg" alt="Estrella" class="w-4 h-4 svg-yellow">
                <span class="text-base text-gray-500">${producto.calificacion} (${producto.resenas})</span>
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
                                    <img src="${producto.imagenes[0].imagen}" alt="${producto.nombre}" class="w-full h-full object-cover aspect-square">
                                </div>
                            </div>
                            
                            <!-- Product information - constrained width -->
                            <div class="text-white space-y-3 max-w-md">
                                <!-- Title and time -->
                                <div>
                                    <h1 class="text-xl lg:text-xl mb-1 leading-tight">${producto.nombre}</h1>
                                    <p class="text-white text-opacity-90 text-sm">Publicado hace ${producto.publicadoHace}</p>
                                </div>
                                
                                <!-- Seller info with rating - Una línea -->
                                <div class="flex items-center justify-between w-full">
                                    <div class="flex items-center space-x-2">
                                        <span class="text-sm text-white text-opacity-70">de</span>
                                        <img src="${producto.vendedor.avatar}" alt="${producto.vendedor.nombre}" class="w-8 h-8 rounded-full border-2 border-white border-opacity-30">
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
                <div class="mb-4 px-4">
                    <h2 class="text-xl font-semibold text-gray-900 mb-6">Productos relacionados</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${productosRelacionados.map(prod => `
                            <div class="cursor-pointer hover:opacity-90 transition-opacity" onclick="openProductDetail(${prod.id})">
                                <div class="aspect-square bg-gray-200 rounded-2xl overflow-hidden mb-3">
                                    <img src="${prod.imagenes[0].imagen}" alt="${prod.nombre}" class="w-full h-full object-cover">
                                </div>
                                <div class="space-y-2">
                                    <h3 class="font-medium text-gray-900 truncate">${prod.nombre}</h3>
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm px-3 py-1 rounded-full ${prod.estado === 'Nuevo' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}">${prod.estado}</span>
                                        <div class="flex items-center space-x-1">
                                            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                            <span class="text-sm text-gray-600">${prod.calificacion} (${prod.resenas})</span>
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
            // Reinicializar productos
            generarProductosMovil();
            configurarBusqueda();
        }
    } else if (!isMobile && vistaAnterior.tipo === 'desktop') {
        // Restaurar vista desktop
        const desktopMain = document.querySelector('.desktop-main main');
        if (desktopMain && vistaAnterior.contenido) {
            desktopMain.innerHTML = vistaAnterior.contenido;
            // Reinicializar productos
            generarProductosEscritorio();
            configurarBusqueda();
        }
    }
    
    // Limpiar vista anterior
    vistaAnterior = null;
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
    alert('Funcionalidad de hacer oferta - Producto ID: ' + productId);
}

// Selección de categoría móvil
function seleccionarCategoria(elemento) {
    const nombreCategoria = elemento.querySelector('span').textContent.trim().toLowerCase();
    const mapCategoria = {
        'tecnología': 'tecnologia',
        'hogar': 'hogar',
        'ropa': 'ropa',
        'accesorios': 'accesorios'
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
            if (seccionBienvenida) {
                seccionBienvenida.after(seccionCategorias);
            }
        }
        
        const gridCategorias = document.getElementById('selected-categories');
        if (gridCategorias) {
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
    }
    
    generarProductosMovil();
    generarProductosEscritorio();
    
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
        'tecnologia': { icono: 'Processor' },
        'hogar': { icono: 'armchair' },
        'ropa': { icono: 'shirt' },
        'accesorios': { icono: 'glasses' },
        'deportes': { icono: 'Voleibol' },
        'entretenimiento': { icono: 'dado' },
        'mascotas': { icono: 'Pata' },
        'herramientas': { icono: 'herramientas' },
        'servicios': { icono: 'servicio' }
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
document.addEventListener('DOMContentLoaded', function() {
    updateNotificationBadge();
    generarProductosMovil();
    generarProductosEscritorio();
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



// Funcion para impedir el acceso a usuarios no registrados
function Verificacion(destino, elemento) {
    // Se verifica sesión en el servidor
    fetch('verificar-sesion.php')
        .then(response => response.json())
        .then(data => {
            if(data.logueado) {
                // Usuario con sesión
                console.log('Usuario con sesión, no se muestra popup.');
                window.location.href = destino; // Redirigir a la página de destino
            } else {
                // Usuario sin sesión → se muestra popup y se bloquea interacción
                console.log('Usuario sin sesión, mostrando popup de acceso restringido.');
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
                        // Activar el botón de Inicio después de cerrar el popup
                        const botonInicio = document.getElementById('inicio');
                        if (botonInicio) {
                            setDesktopActiveNav(botonInicio);
                        }
                    });
                }
            }
        })
    .catch(error => console.error('Error verificando sesión:', error));
}

// Función de navegación escritorio
function setDesktopActiveNav(elemento) {
  document.querySelectorAll(".desktop-nav-item").forEach((item) => {
    item.classList.remove("active", "bg-green", "text-white");
    item.classList.add("text-green", "hover:bg-gray-50");
    // Cambiar iconos a Outline
    const icono = item.querySelector("img");
    if (icono) {
      cambiarIconoAOutline(icono);
      icono.classList.remove("svg-white");
      icono.classList.add("svg-green");
    }
  });
  elemento.classList.remove("text-green", "hover:bg-gray-50");
  elemento.classList.add("active", "bg-green", "text-white");
  // Cambiar icono a Solid
  const icono = elemento.querySelector("img");
  if (icono) {
    cambiarIconoASolid(icono);
    icono.classList.remove("svg-green");
    icono.classList.add("svg-white");
  }
}

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

// Verificación de sesión para mostrar botones de usuario en el header
document.addEventListener('DOMContentLoaded', function() {
    const contenedor = document.getElementById('desktop-header-actions');
    
    // Se verifica sesión en el servidor
    fetch('verificar-sesion.php')
        .then(response => response.json())
        .then(data => {
            if(data.logueado) {
                // Usuario con sesión
                contenedor.innerHTML = `
                    <!-- Botón Nueva publicación -->
                    <button class="bg-green text-white px-4 h-8 rounded-full smooth-transition flex items-center text-sm whitespace-nowrap"
                    onclick="window.location.href='nuevo_producto.html'">
                    <img src="recursos/iconos/solido/interfaz/mas.svg" alt="Publicar" class="w-3 h-3 svg-white mr-2">
                    Nueva publicación
                    </button>

                    <!-- Boton chat -->
                    <button class="w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center smooth-transition">
                    <img src="recursos/iconos/solido/comunicacion/comentario.svg" alt="Comentarios" class="w-5 h-5 svg-gray-800">
                    </button>

                    <!-- Boton notificaciones -->
                    <button class="w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center smooth-transition">
                    <img src="recursos/iconos/solido/estado/notificacion.svg" alt="Notificaciones"
                        class="w-5 h-5 svg-gray-800">
                    </button>
                    
                    <!-- Perfil con dropdown -->
                    <div class="relative inline-block text-left">
                    <div>
                        <button class="w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center smooth-transition"
                        id="menu-button" onclick="showDropdown()" aria-expanded="true" aria-haspopup="true">
                        <img src="recursos/iconos/solido/comunicacion/usuario.svg" alt="Usuario" class="w-5 h-5 svg-gray-800">
                        </button>
                    </div>

                    <div id="menu"
                        class="hidden absolute right-4 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden p-6 pr-6"
                        role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                        <div class="flex items-center gap-x-4 mb-4 dropDownProfileConteiner">
                        <img class="rounded-full w-12 h-12" src="recursos/imagenes/josegimenez.jpg">
                        <div>
                            <div class="font-medium text-base text-gray-800">José Martínez</div>
                            <p class="text-xs text-green">jsemartinez@gmail</p>
                        </div>
                        </div>
                        <div class="py-1" role="none">
                        <a href="#" class="block px-4 py-2 text-sm text-gray-600 flex items-center" role="menuitem" tabindex="-1"
                            id="menu-item-5"> <img src="recursos/iconos/contorno/interfaz/configuracion.svg" alt="Configuración"
                            class="w-4 h-4 svg-gray-800 mr-2 mb-3 mt-3">Configuración</a>
                        </div>
                        <div class="py-1 pt-3" role="none">
                        <a href="#" class="block px-4 py-2 text-sm text-gray-600 flex items-center" role="menuitem" tabindex="-1"
                            id="menu-item-6" onclick="window.location.href='cerrar-sesion.php'">
                            <img src="recursos/iconos/contorno/interfaz/cerrar_sesion.svg" alt="Cerrar sesión"
                            class="w-4 h-4 svg-red-400 mr-2 self-center">Cerrar sesión</a>
                        </div>
                    </div>
                    </div>
                `;
            } else {
                // Usuario sin sesión → se muestran botones de iniciar sesión y registrarse
                contenedor.innerHTML = `
                    <button class="bg-green text-white px-4 h-8 rounded-full smooth-transition flex items-center text-sm whitespace-nowrap mr-2"
                      onclick="window.location.href='iniciar-sesion.php'">
                      <img src="recursos/iconos/solido/comunicacion/usuario.svg" alt="Iniciar sesión" class="w-3 h-3 svg-white mr-2">
                      Iniciar sesión
                    </button>
                    <button class="bg-white text-green border border-green px-4 h-8 rounded-full smooth-transition flex items-center text-sm whitespace-nowrap hover:bg-green hover:text-white group"
                      onclick="window.location.href='registrarse.php'">
                      <img src="recursos/iconos/solido/interfaz/mas.svg" alt="Registrarse" class="w-3 h-3 svg-green group-hover:svg-white mr-2">
                      Registrarse
                    </button>
                `;
                
            }
        })
    .catch(error => console.error('Error verificando sesión:', error));
});

// chatbot
document.addEventListener("DOMContentLoaded", function () {
  
  const chatbotBtn = document.getElementById("chatbot-btn");
  const chatbotContainer = document.getElementById("chatbot-container");
  const inputField = document.getElementById('chatbot-input'); 
  const sendBtn = document.getElementById('chatbot-send');     
  let botInitialized = false;
  let botui;
  let esperandoProducto = false; 

  function normalizarTexto(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); 
  }

  function procesarRespuesta(producto, resultados) {
    const productoNormalizado = normalizarTexto(producto);

    const filtrados = resultados.filter(item => {
      return normalizarTexto(item) !== productoNormalizado;
    });

    if (filtrados.length > 0) {
      return filtrados;
    } else {
      return [];
    }
  }

  chatbotBtn.addEventListener("click", function (event) {
    event.preventDefault();
    chatbotContainer.classList.toggle("hidden");

    if (!botInitialized) {
      botui = new BotUI('botui-app');

      botui.message.add({ content: '¡Hola! Soy tu asistente de trueques 🤝' })
        .then(() => botui.message.add({
          delay: 500,
          content: 'Elegí cómo iniciar la conversación:'
        }))
        .then(() => mostrarMenu());

      botInitialized = true;
    }
  });

  function mostrarMenu() {
    const botonesOpciones = document.querySelectorAll('.chat-options .option-btn');

    botonesOpciones.forEach(boton => {
      boton.addEventListener('click', function () {
        const valor = boton.dataset.value;

        botonesOpciones.forEach(b => b.disabled = true);

        switch (valor) {
          case 'intercambiar':
            botui.message.add({ content: 'Escribí un producto y descubrí opciones de intercambio' });
            esperandoProducto = true; 
            break;
          case 'solicitados':
            if (typeof mostrarProductosSolicitados === 'function') {
              mostrarProductosSolicitados();
            } else {
              botui.message.add({ content: 'Función mostrarProductosSolicitados() no definida.' });
            }
            break;
          case 'otro':
            botui.message.add({ content: 'Funcionalidad en desarrollo.' });
            break;
          default:
            console.log('Opción no definida');
        }

        setTimeout(() => {
          botonesOpciones.forEach(b => b.disabled = false);
        }, 500);
      });
    });
  }

  sendBtn.addEventListener('click', enviarMensaje);
  inputField.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') enviarMensaje();
  });

  function enviarMensaje() {
    const mensaje = inputField.value.trim();
    if (!mensaje) return;

    botui.message.add({ content: mensaje, human: true });
    inputField.value = '';

    if (esperandoProducto) {
      fetch(`${baseUrl}/codigo/php/chatbot.php?producto=${encodeURIComponent(mensaje)}`)
        .then(res => res.json())
        .then(data => {
          esperandoProducto = false;

          if (data.error) {
            botui.message.add({ content: data.error });
          } else if (data.mensaje) {
            botui.message.add({ content: data.mensaje });
          } else if (data.categorias) {
            let fetches = data.categorias.map(cat =>
              fetch(`${baseUrl}/codigo/php/chatbot.php?categoria=${encodeURIComponent(cat)}`)
                .then(r => r.json())
                .then(catData => ({ categoria: cat, productos: catData.productos || [] }))
            );

            Promise.all(fetches).then(results => {
              let todosProductos = [];
              results.forEach(r => { todosProductos.push(...r.productos); });

              const productosFiltrados = procesarRespuesta(mensaje, todosProductos);

              if (productosFiltrados.length === 0) {
                botui.message.add({ content: `No encontré productos para intercambiar por ${mensaje}.` });
                return;
              }

              botui.message.add({ content: `A cambio de ${mensaje} podés intercambiar:` }).then(() => {
                productosFiltrados.forEach(prod => {
                  botui.message.add({
                    content: prod,
                    delay: 200,
                    cssClass: 'chatbot-producto',
                    click: () => {
                      alert(`Mostrar info de la publicación de: ${prod}`);
                    }
                  });
                });
              });
            });
          }
        })
        .catch(err => {
          botui.message.add({ content: 'Hubo un error al conectarse con el servidor.' });
          console.error(err);
        });
    } else {
      fetch(`${baseUrl}/codigo/php/chatbot.php?mensaje=${encodeURIComponent(mensaje)}`)
        .then(res => res.json())
        .then(data => {
          botui.message.add({ content: data.respuesta || 'No hay respuesta.' });
        })
        .catch(err => {
          botui.message.add({ content: 'Error al conectarse al servidor.' });
          console.error(err);
        });
    }
  }

  function mostrarProductosSolicitados() {
    fetch(`${baseUrl}/codigo/php/chatbot.php?productos_solicitados=1`)
      .then(res => res.json())
      .then(data => {
        if (!data.productos || data.productos.length === 0) {
          botui.message.add({ content: 'No hay productos solicitados en este momento.' });
          return;
        }

        botui.message.add({ content: 'Los productos que la gente solicita actualmente son:' }).then(() => {
          data.productos.forEach(prod => {
            botui.message.add({
              content: prod,
              delay: 200,
              cssClass: 'chatbot-producto'
            });
          });
        });
      })
      .catch(err => {
        botui.message.add({ content: 'Hubo un error al conectarse con el servidor.' });
        console.error(err);
      });
  }

});

