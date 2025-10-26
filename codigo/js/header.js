// ================= HEADER DESKTOP DINÁMICO =================
document.addEventListener('DOMContentLoaded', function() {
    const contenedor = document.getElementById('desktop-header-actions');

    // Verificar sesión en el servidor
    fetch(baseURL + 'php/verificar-sesion.php')
        .then(response => response.json())
        .then(data => {
            if (data.logueado) {
                // Usuario con sesión
                contenedor.innerHTML = `
                    <!-- Botón Nueva publicación -->
                    <button class="bg-green text-white px-6 h-10 smooth-transition redondeado-personalizado primary-button flex items-center text-sm whitespace-nowrap"
                        onclick="window.location.href='${baseURL}nuevo_producto.php'">
                        <img src="${baseURL}recursos/iconos/solido/interfaz/mas.svg" alt="Publicar" class="w-3 h-3 svg-white mr-2">
                        Nueva publicación
                    </button>

                    <!-- Botón chat -->
                    <button onclick="Verificacion('php/mensajes.php', this)" class="w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center smooth-transition">
                        <img src="${baseURL}recursos/iconos/solido/comunicacion/comentario.svg" alt="Comentarios" class="w-5 h-5 svg-gray-800">
                    </button>

                    <!-- Botón notificaciones -->
                    <button onclick="toggleNotificationsDesktop()" class="w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center smooth-transition relative">
                        <img src="${baseURL}recursos/iconos/solido/estado/notificacion.svg" alt="Notificaciones" class="w-5 h-5 svg-gray-800">
                        <span id="desktop-notification-badge" class="hidden absolute -top-1 -right-1 bg-green text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">0</span>
                    </button>

                    <!-- Perfil con dropdown -->
                    <div class="relative inline-block text-left">
                        <!-- config-funcionalidad: aqui debes hacer que el boton configuracion funcione y que aparezcan las opciones de configuracion en el dropdown (esto es de escritorio)-->
                        <div>
                            <button class="w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center smooth-transition"
                                id="menu-button" onclick="showDropdown()" aria-expanded="true" aria-haspopup="true">
                                <img src="${baseURL}recursos/iconos/solido/comunicacion/usuario.svg" alt="Usuario" class="w-5 h-5 svg-gray-800">
                            </button>
                        </div>

                        <div id="menu"
                            class="hidden absolute right-4 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden p-6 pr-6"
                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="flex items-center gap-x-4 mb-4 dropDownProfileConteiner">
                                <img class="rounded-full w-12 h-12" src="${baseURL}recursos/imagenes/josegimenez.jpg">
                                <div>
                                    <div class="font-medium text-base text-gray-800">José Martínez</div>
                                    <p class="text-xs text-green">jsemartinez@gmail</p>
                                </div>
                            </div>
                            <div class="py-1" role="none">
                                <a href="#" class="block px-4 py-2 text-sm text-gray-600 flex items-center" role="menuitem" tabindex="-1">
                                    <img src="${baseURL}recursos/iconos/contorno/interfaz/configuracion.svg" alt="Configuración" class="w-4 h-4 svg-gray-800 mr-2 mb-3 mt-3">
                                    Configuración
                                </a>
                            </div>
                            <div class="py-1 pt-3" role="none">
                                <a href="#" class="block px-4 py-2 text-sm text-gray-600 flex items-center" role="menuitem" tabindex="-1"
                                   onclick="window.location.href='${baseURL}php/cerrar-sesion.php'">
                                    <img src="${baseURL}recursos/iconos/contorno/interfaz/cerrar_sesion.svg" alt="Cerrar sesión" class="w-4 h-4 svg-red-400 mr-2 self-center">
                                    Cerrar sesión
                                </a>
                            </div>
                        </div>
                    </div>
                `;

                // Agregar dropdown de notificaciones desktop
                setTimeout(() => {
                    const headerElement = document.querySelector('header.hidden.lg\\:block');
                    if (headerElement && !document.getElementById('desktop-notifications-dropdown')) {
                        const dropdownHTML = `
                            <div id="desktop-notifications-dropdown" class="hidden absolute right-20 top-16 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden transition-all duration-300 opacity-0">
                                <div id="desktop-notifications-content">
                                    <!-- Las notificaciones se generarán dinámicamente -->
                                </div>
                            </div>
                        `;
                        headerElement.insertAdjacentHTML('beforeend', dropdownHTML);
                    }
                    iniciarPollingNotificaciones();
                }, 100);

                setTimeout(() => {
                    const headerElement = document.querySelector('header.hidden.lg\\:block');
                    if (headerElement && !document.getElementById('desktop-notifications-dropdown')) {
                        const dropdownHTML = `
                            <div id="desktop-notifications-dropdown" class="hidden absolute right-20 top-16 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden transition-all duration-300 opacity-0">
                                <div id="desktop-notifications-content">
                                    <!-- Las notificaciones se generarán dinámicamente -->
                                </div>
                            </div>
                        `;
                        headerElement.insertAdjacentHTML('beforeend', dropdownHTML);
                    }
                    
                    // ⭐ INICIAR POLLING AQUÍ
                    iniciarPollingNotificaciones();
                }, 100);
            } else {
                // Usuario sin sesión → botones iniciar sesión y registrarse
                contenedor.innerHTML = `
                    <button class="bg-green text-white px-8 h-10 redondeado-personalizado smooth-transition primary-button flex items-center text-sm whitespace-nowrap mr-2"
                        onclick="window.location.href='${baseURL}php/iniciar-sesion.php'">
                        Iniciar sesión
                    </button>
                    <button class="bg-white text-green border border-green px-8 h-10 redondeado-personalizado secondary-button smooth-transition flex items-center text-sm whitespace-nowrap hover:bg-green hover:text-white group"
                        onclick="window.location.href='${baseURL}php/registrarse.php'">
                        Registrarse
                    </button>
                `;
            }
        })
        .catch(error => console.error('Error verificando sesión:', error));
});

// ================= FUNCIONES DEL DROPDOWN =================
function showDropdown() {
    const menu = document.getElementById('menu');
    if(menu) menu.classList.toggle('hidden');
}

// ================= SISTEMA DE NOTIFICACIONES =================
let notificationsPolling = null;
let notificationsDropdownOpen = false;

// Toggle notificaciones desktop
function toggleNotificationsDesktop() {
    const dropdown = document.getElementById('desktop-notifications-dropdown');
    if (!dropdown) return;
    
    notificationsDropdownOpen = !notificationsDropdownOpen;
    
    if (notificationsDropdownOpen) {
        dropdown.classList.remove('hidden');
        setTimeout(() => dropdown.style.opacity = '1', 10);
        cargarNotificaciones();
    } else {
        dropdown.style.opacity = '0';
        setTimeout(() => dropdown.classList.add('hidden'), 300);
    }
}

// Toggle notificaciones móvil
function toggleNotificationsMobile() {
    const overlay = document.getElementById('mobile-notifications-overlay');
    const dropdown = document.getElementById('mobile-notifications-dropdown');
    
    if (!overlay || !dropdown) return;
    
    const isHidden = dropdown.classList.contains('hidden');
    
    if (isHidden) {
        // Abrir
        overlay.classList.remove('hidden');
        dropdown.classList.remove('hidden');
        setTimeout(() => {
            overlay.style.opacity = '1';
            dropdown.style.transform = 'translateY(0)';
        }, 10);
        cargarNotificaciones();
    } else {
        // Cerrar
        overlay.style.opacity = '0';
        dropdown.style.transform = 'translateY(100%)';
        setTimeout(() => {
            overlay.classList.add('hidden');
            dropdown.classList.add('hidden');
        }, 300);
    }
}

// Cargar notificaciones
async function cargarNotificaciones() {
    try {
        const response = await fetch(baseURL + 'php/obtener-notificaciones.php');
        const data = await response.json();
        
        if (data.error) {
            console.error('Error:', data.error);
            return;
        }
        
        const notificaciones = data.notificaciones || [];
        renderizarNotificaciones(notificaciones);
        actualizarBadges(notificaciones);
        
    } catch (error) {
        console.error('Error cargando notificaciones:', error);
    }
}

// Renderizar notificaciones (usando el estilo de inicio.js)
function renderizarNotificaciones(notificaciones) {
    const contentDesktop = document.getElementById('desktop-notifications-content');
    const contentMobile = document.getElementById('mobile-notifications-content');
    
    const notificacionesRecientes = notificaciones.filter(n => !n.leida);
    const notificacionesAnteriores = notificaciones.filter(n => n.leida);
    
    // Si no hay notificaciones en absoluto
    if (notificaciones.length === 0) {
        const emptyHTML = `
            <div class="flex flex-col items-center justify-center h-96 px-4">
                <img src="${baseURL}recursos/iconos/solido/estado/notificacion.svg" alt="Sin notificaciones" class="w-16 h-16 svg-gray-400 mb-4 opacity-50">
                <p class="text-gray-500 text-center text-base">No tienes notificaciones en este momento</p>
            </div>
        `;
        if (contentDesktop) contentDesktop.innerHTML = emptyHTML;
        if (contentMobile) contentMobile.innerHTML = emptyHTML;
        return;
    }
    
    let html = `
        <div class="p-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-800">Notificaciones</h3>
                <button onclick="marcarTodasLeidas(event)" class="text-sm text-green hover:text-green-700 transition-colors">
                    Marcar todos como leído
                </button>
            </div>
        </div>
        <div class="max-h-96 overflow-y-auto custom-scrollbar">
    `;
    
    // Recent notifications (HOY)
    if (notificacionesRecientes.length > 0) {
        html += `
            <div class="p-4">
                <h4 class="text-sm font-medium text-gray-600 mb-3">HOY</h4>
                ${notificacionesRecientes.map(notif => generateNotificationItem(notif)).join('')}
            </div>
        `;
    }
    
    // Previous notifications (ANTERIORES)
    if (notificacionesAnteriores.length > 0) {
        html += `
            <div class="p-4 border-t border-gray-100">
                <h4 class="text-sm font-medium text-gray-600 mb-3">ANTERIORES</h4>
                ${notificacionesAnteriores.map(notif => generateNotificationItem(notif)).join('')}
            </div>
        `;
    }
    
    html += '</div>';
    
    if (contentDesktop) contentDesktop.innerHTML = html;
    if (contentMobile) contentMobile.innerHTML = html;
}

// Generar item individual de notificación
function generateNotificationItem(notif) {
    const iconBg = notif.leida ? 'bg-gray-100' : getIconBgColor(notif.tipo);
    const textColor = notif.leida ? 'text-gray-500' : 'text-gray-800';
    const timeColor = notif.leida ? 'text-gray-400' : 'text-gray-500';
    const checkIcon = notif.leida ? `
        <div class="absolute -top-1 -right-1 w-5 h-5 bg-green rounded-full flex items-center justify-center">
            <img src="${baseURL}recursos/iconos/solido/estado/verificado.svg" alt="Leída" class="w-3 h-3 svg-white">
        </div>
    ` : '';
    
    return `
        <div class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors mb-2 relative" onclick="marcarComoLeida(${notif.id})">
            <div class="relative">
                <div class="w-10 h-10 ${iconBg} rounded-full flex items-center justify-center flex-shrink-0">
                    <img src="${baseURL}${notif.icono}" alt="${notif.tipo}" class="w-5 h-5 ${getIconColor(notif.tipo, notif.leida)}">
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

// Get icon background color
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

// Get icon color
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

async function marcarTodasLeidas(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    try {
        const response = await fetch(baseURL + 'php/marcar-notificacion-leida.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ marcar_todas: true })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Recargar notificaciones
            await cargarNotificaciones();
        } else {
            console.error('Error:', data.error || 'Error desconocido');
        }
    } catch (error) {
        console.error('Error marcando todas como leídas:', error);
    }
}

// Actualizar badges
function actualizarBadges(notificaciones) {
    const noLeidas = notificaciones.filter(n => !n.leida).length;
    const mensajesNoLeidos = notificaciones.filter(n => n.tipo === 'mensaje' && !n.leida).length;
    
    // Badge de notificaciones desktop
    const badgeDesktop = document.getElementById('desktop-notification-badge');
    if (badgeDesktop) {
        if (noLeidas > 0) {
            badgeDesktop.textContent = noLeidas > 9 ? '9+' : noLeidas;
            badgeDesktop.classList.remove('hidden');
        } else {
            badgeDesktop.classList.add('hidden');
        }
    }
    
    // Badge de notificaciones móvil
    const badgeMobile = document.getElementById('mobile-notification-badge');
    const countMobile = document.getElementById('mobile-notification-count');
    if (badgeMobile) {
        if (noLeidas > 0) {
            badgeMobile.textContent = noLeidas > 9 ? '9+' : noLeidas;
            badgeMobile.classList.remove('hidden');
        } else {
            badgeMobile.classList.add('hidden');
        }
    }
    if (countMobile) {
        countMobile.textContent = `+${noLeidas}`;
    }
    
    // Badge de chat desktop (solo mensajes)
    const badgeChat = document.getElementById('desktop-chat-badge');
    if (badgeChat) {
        if (mensajesNoLeidos > 0) {
            badgeChat.textContent = mensajesNoLeidos > 9 ? '9+' : mensajesNoLeidos;
            badgeChat.classList.remove('hidden');
        } else {
            badgeChat.classList.add('hidden');
        }
    }
}

async function marcarComoLeida(idNotificacion) {
    try {
        console.log('🔵 Marcando notificación:', idNotificacion);
        
        // Obtener info de la notificación primero
        const response = await fetch(baseURL + 'php/obtener-notificaciones.php');
        const data = await response.json();
        
        console.log('🔵 Notificaciones obtenidas:', data);
        
        if (data.notificaciones) {
            const notif = data.notificaciones.find(n => n.id === idNotificacion);
            console.log('🔵 Notificación encontrada:', notif);
            
            if (!notif) {
                console.error('❌ Notificación no encontrada');
                return;
            }
            
            // Determinar URL de redirección ANTES de marcar como leída
            let urlRedireccion = null;

            if (notif.tipo === 'solicitud_chat') {
                console.log('🔵 Tipo: Solicitud de chat');
                urlRedireccion = baseURL + 'php/mensajes.php?tab=solicitudes';
            } else if (notif.tipo === 'solicitud_aceptada') {
                console.log('🔵 Tipo: Solicitud aceptada, id_referencia:', notif.id_referencia);
                if (notif.id_referencia) {
                    urlRedireccion = baseURL + 'php/mensajes.php?conversacion=' + notif.id_referencia;
                } else {
                    urlRedireccion = baseURL + 'php/mensajes.php';
                }
            } else if (notif.tipo === 'solicitud_rechazada') {
                console.log('🔵 Tipo: Solicitud rechazada');
            } else if (notif.tipo === 'mensaje') {
                console.log('🔵 Tipo: Mensaje, id_referencia:', notif.id_referencia);
                if (notif.id_referencia) {
                    urlRedireccion = baseURL + 'php/mensajes.php?conversacion=' + notif.id_referencia;
                } else {
                    urlRedireccion = baseURL + 'php/mensajes.php';
                }
            } else if (notif.tipo === 'oferta' || notif.tipo === 'oferta_aceptada' || notif.tipo === 'oferta_cancelada') {
                console.log('🔵 Tipo: Oferta');
                urlRedireccion = baseURL + 'php/ofertas.php';
            }
            
            console.log('🔵 urlRedireccion final:', urlRedireccion);
            
            // Marcar como leída
            const formData = new FormData();
            formData.append('id_notificacion', idNotificacion);
            
            await fetch(baseURL + 'php/marcar-notificacion-leida.php', {
                method: 'POST',
                body: formData
            });
            
            console.log('✅ Notificación marcada como leída');
            
            // Redirigir si corresponde
            if (urlRedireccion) {
                console.log('🔵 Redirigiendo a:', urlRedireccion);
                window.location.href = urlRedireccion;
            } else {
                // Si no hay redirección, solo recargar notificaciones
                await cargarNotificaciones();
            }
        }
        
    } catch (error) {
        console.error('❌ Error marcando notificación:', error);
    }
}

// Iniciar polling de notificaciones
function iniciarPollingNotificaciones() {
    if (notificationsPolling) return;
    
    // Cargar inmediatamente
    cargarNotificaciones();
    
    // Polling cada 5 segundos
    notificationsPolling = setInterval(() => {
        cargarNotificaciones();
    }, 5000);
}

// Detener polling
function detenerPollingNotificaciones() {
    if (notificationsPolling) {
        clearInterval(notificationsPolling);
        notificationsPolling = null;
    }
}

// Cerrar dropdown al hacer clic fuera
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('desktop-notifications-dropdown');
    const button = event.target.closest('button[onclick*="toggleNotificationsDesktop"]');
    
    if (dropdown && !dropdown.contains(event.target) && !button && notificationsDropdownOpen) {
        toggleNotificationsDesktop();
    }
});

// Cerrar dropdown si se hace clic fuera
document.addEventListener('click', function(event) {
    const menu = document.getElementById('menu');
    const button = document.getElementById('menu-button');
    if(menu && button && !menu.contains(event.target) && !button.contains(event.target)) {
        menu.classList.add('hidden');
    }
});
