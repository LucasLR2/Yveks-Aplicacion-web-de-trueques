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
                        onclick="window.location.href='${baseURL}php/nuevo_producto.php'">
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

// Cerrar dropdown si se hace clic fuera
document.addEventListener('click', function(event) {
    const menu = document.getElementById('menu');
    const button = document.getElementById('menu-button');
    if(menu && button && !menu.contains(event.target) && !button.contains(event.target)) {
        menu.classList.add('hidden');
    }
});
