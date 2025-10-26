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

// Renderizar notificaciones
function renderizarNotificaciones(notificaciones) {
    const contentDesktop = document.getElementById('desktop-notifications-content');
    const contentMobile = document.getElementById('mobile-notifications-content');
    
    let html = '';
    
    if (notificaciones.length === 0) {
        html = `
            <div class="flex flex-col items-center justify-center py-12 px-6 text-center">
                <svg class="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
                <p class="text-gray-500 font-medium">No hay notificaciones</p>
                <p class="text-gray-400 text-sm mt-1">Cuando recibas notificaciones aparecerán aquí</p>
            </div>
        `;
    } else {
        html = notificaciones.map(notif => `
            <div class="notification-item ${notif.leida ? 'read' : 'unread'}" data-id="${notif.id}">
                <div class="flex items-start p-4 hover:bg-gray-50 transition-colors cursor-pointer" onclick="marcarComoLeida(${notif.id})">
                    <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        <img src="${baseURL}${notif.icono}" alt="" class="w-5 h-5 svg-gray-600">
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-800">${notif.titulo}</p>
                        <p class="text-sm text-gray-600 mt-1">${notif.descripcion}</p>
                        <p class="text-xs text-gray-400 mt-1">${notif.tiempo}</p>
                    </div>
                    ${!notif.leida ? '<div class="flex-shrink-0 w-2 h-2 rounded-full bg-green ml-2"></div>' : ''}
                </div>
            </div>
        `).join('');
    }
    
    if (contentDesktop) contentDesktop.innerHTML = html;
    if (contentMobile) contentMobile.innerHTML = html;
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
