// ================= FUNCIONES =================

// Funciones del dropdown de configuración
function showConfigOverlay() {
    
    let overlay = document.getElementById("config-overlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "config-overlay";
        overlay.className = "fixed inset-0 bg-white z-50 flex flex-col overflow-y-auto";
        
        overlay.innerHTML = `
            <div class="flex items-center px-6 py-4 mt-4">
                <button id="close-config" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors mr-4">
                    <img src="${baseURL}recursos/iconos/solido/navegacion/atras.svg" alt="Volver" class="w-8 h-8">
                </button>
                <h2 class="text-lg font-normal text-gray-900">Configuración y actividad</h2>
            </div>
            <div class="flex-1 px-6 py-4">
                <ul class="divide-y divide-gray-200 mt-8">
                    <li>
                        <button class="config-item w-full flex items-center justify-between py-4 text-gray-600 hover:bg-gray-50 transition-colors" data-action="datos">
                            <div class="flex items-center gap-4">
                                <img src="${baseURL}recursos/iconos/solido/navegacion/User.svg" alt="Datos personales" class="w-6 h-6">
                                <span class="text-gray-500 font-normal">Datos personales</span>
                            </div>
                            <img src="${baseURL}recursos/iconos/solido/interfaz/next.svg" alt="" class="w-5 h-5">
                        </button>
                    </li>
                    <li>
                        <button class="config-item w-full flex items-center justify-between py-4 text-gray-600 hover:bg-gray-50 transition-colors" data-action="password">
                            <div class="flex items-center gap-4">
                                <img src="${baseURL}recursos/iconos/solido/interfaz/Key.svg" alt="Cambiar contraseña" class="w-6 h-6">
                                <span class="text-gray-500 font-normal">Cambiar contraseña</span>
                            </div>
                            <img src="${baseURL}recursos/iconos/solido/interfaz/next.svg" alt="" class="w-5 h-5">
                        </button>
                    </li>
                    <li>
                        <button class="config-item w-full flex items-center justify-between py-4 text-gray-600 hover:bg-gray-50 transition-colors" data-action="ayuda">
                            <div class="flex items-center gap-4">
                                <img src="${baseURL}recursos/iconos/solido/interfaz/Info.svg" alt="Centro de ayuda" class="w-6 h-6">
                                <span class="text-gray-500 font-normal">Centro de ayuda</span>
                            </div>
                            <img src="${baseURL}recursos/iconos/solido/interfaz/next.svg" alt="" class="w-5 h-5">
                        </button>
                    </li>
                    <li>
                        <button class="config-item w-full flex items-center justify-between py-4 text-gray-600 hover:bg-gray-50 transition-colors" data-action="privacidad">
                            <div class="flex items-center gap-4">
                                <img src="${baseURL}recursos/iconos/solido/interfaz/Lock.svg" alt="Políticas de privacidad" class="w-6 h-6">
                                <span class="text-gray-500 font-normal">Políticas de privacidad</span>
                            </div>
                            <img src="${baseURL}recursos/iconos/solido/interfaz/next.svg" alt="" class="w-5 h-5">
                        </button>
                    </li>
                    <li>
                        <button class="config-item w-full flex items-center justify-between py-4 text-gray-600 hover:bg-gray-50 transition-colors" data-action="logout">
                            <div class="flex items-center gap-4">
                                <img src="${baseURL}recursos/iconos/solido/interfaz/Logout.svg" alt="Cerrar sesión" class="w-6 h-6">
                                <span class="text-gray-500 font-normal">Cerrar sesión</span>
                            </div>
                            <img src="${baseURL}recursos/iconos/solido/interfaz/next.svg" alt="" class="w-5 h-5">
                        </button>
                    </li>
                </ul>
            </div>
        `;
        
        document.body.appendChild(overlay);

        // Botón para cerrar el overlay principal
        document.getElementById("close-config").addEventListener("click", () => {
            overlay.style.display = "none";
        });

        // Detectar clic en funcionalidades específicos
        overlay.querySelectorAll(".config-item").forEach(btn => {
            btn.addEventListener("click", () => {
                const action = btn.dataset.action;
                if (action === "ayuda") showHelpOverlay();
                if (action === "privacidad") showPrivacyOverlay();
                if (action === "logout") showLogoutConfirmation();
            });
        });
    } else {
        overlay.style.display = "flex";
    }
}

// ================= OVERLAYS SECUNDARIOS =================

// centro de ayuda
function showHelpOverlay() {
    const overlay = document.getElementById("config-overlay");
    if (!overlay) return;

    const configPanelContent = overlay.innerHTML;

    overlay.innerHTML = `
        <div class="flex items-center px-6 py-4 mt-4">
            <button id="back-to-config" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors mr-4">
                <img src="${baseURL}recursos/iconos/solido/navegacion/atras.svg" alt="Volver" class="w-8 h-8">
            </button>
            <h2 class="text-lg font-semibold text-gray-900">Centro de Ayuda</h2>
        </div>
        <div class="flex-1 overflow-y-auto p-6 modal-scroll">
            <p class="mb-4">
                Aquí encontrarás información que las personas comúnmente buscan sobre el uso de la plataforma. 
                Si no encontrás lo que necesitás, podés escribir a <strong>yveks2025@gmail.com</strong> para recibir asistencia personalizada.
            </p>
            <div class="pl-4 space-y-6">
                <div>
                    <strong style="color:#719177; font-size:1.1rem;">• Cómo crear una publicación:</strong>
                    <p>Para crear una publicación, primero hacé clic en el botón <em>Nueva publicación</em>. Luego, seleccioná la categoría adecuada, completá el título y la descripción detallada del producto o servicio, agregá imágenes de calidad y, finalmente, presioná <em>Publicar</em>. Esto hará que tu publicación sea visible para otros usuarios.</p>
                </div>

                <div>
                    <strong style="color:#719177; font-size:1.1rem;">• Gestión de tus publicaciones:</strong>
                    <p>Para editar una publicación, accedé a tu panel de publicaciones, seleccioná la que querés modificar y hacé clic en <em>Editar</em>. Podés cambiar la descripción, el título o las imágenes. Para eliminar una publicación, seleccioná la opción <em>Eliminar</em> y confirmá la acción. También podés pausar temporalmente una publicación si no querés que esté activa.</p>
                </div>

                <div>
                    <strong style="color:#719177; font-size:1.1rem;">• Chat y comunicación:</strong>
                    <p>Para enviar un mensaje a otro usuario, hacé clic en el botón de chat en la publicación o en el perfil del usuario. Podés responder a los mensajes recibidos desde la bandeja de entrada. Las notificaciones te alertarán cuando haya nuevos mensajes para que no pierdas ninguna comunicación.</p>
                </div>

                <div>
                    <strong style="color:#719177; font-size:1.1rem;">• Notificaciones:</strong>
                    <p>Las notificaciones se muestran en el icono correspondiente en el encabezado. Podés revisar los mensajes, respuestas a tus publicaciones y novedades importantes. Haciendo clic en cada notificación, se abrirá el detalle correspondiente.</p>
                </div>
            </div>
        </div>
    `;

    // volver al menu config
    document.getElementById("back-to-config").addEventListener("click", () => {
        overlay.innerHTML = configPanelContent;

        overlay.querySelectorAll(".config-item").forEach(btn => {
            btn.addEventListener("click", () => {
                const action = btn.dataset.action;
                if (action === "ayuda") showHelpOverlay();
                if (action === "privacidad") showPrivacyOverlay();
                if (action === "logout") showLogoutConfirmation();
            });
        });

        // Botón cerrar configuración
        document.getElementById("close-config").addEventListener("click", () => {
            overlay.style.display = "none";
        });
    });
}

// Overlay: Políticas de privacidad
function showPrivacyOverlay() {
    const overlay = document.createElement("div");
    overlay.className = "fixed inset-0 bg-white z-50 flex flex-col";

    overlay.innerHTML = `
        <div class="flex flex-col px-6 py-4 mt-4">
            <div class="flex items-center mb-2">
                <button id="close-privacy" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors mr-4">
                    <img src="${baseURL}recursos/iconos/solido/navegacion/atras.svg" class="w-8 h-8">
                </button>
                <h2 class="text-lg font-semibold text-gray-900">Políticas de privacidad</h2>
            </div>
        </div>
        <div class="flex-1 overflow-y-auto p-6 modal-scroll space-y-4">
            <p class="text-gray-700 leading-relaxed">
                Valoramos la <span style="color:#719177; text-decoration: underline;">privacidad</span> y la seguridad de tus datos personales. Toda la información que compartís, como datos de contacto, publicaciones y actividad en la plataforma, es tratada con confidencialidad y utilizada únicamente para mejorar tu experiencia de usuario y ofrecerte servicios personalizados.
            </p>
            <p class="text-gray-700 leading-relaxed">
                Te recomendamos mantener tus credenciales seguras, revisar periódicamente tus <span style="color:#719177; text-decoration: underline;">ajustes de privacidad</span> y ser cuidadoso al compartir información sensible. Si tenés dudas sobre cómo protegemos tus datos o necesitás asistencia, podés contactarnos a <span style="color:#719177; text-decoration: underline;">yveks2025@gmail.com</span>.
            </p>
        </div>
    `;

    document.body.appendChild(overlay);

    // Botón de volver que cierra el overlay
    document.getElementById("close-privacy").addEventListener("click", () => overlay.remove());
}

// Confirmación de cierre de sesión
function showLogoutConfirmation() {
    window.location.href = "../php/cerrar-sesion.php"; // Cierra sesión directamente
}

// ================= EVENTOS DEL DOM =================

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded ejecutado");
    
    // ================= HEADER DESKTOP DINÁMICO =================
    const contenedor = document.getElementById('desktop-header-actions');

    if (contenedor) {
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
                        <button class="w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center smooth-transition">
                            <img src="${baseURL}recursos/iconos/solido/comunicacion/comentario.svg" alt="Comentarios" class="w-5 h-5 svg-gray-800">
                        </button>

                        <!-- Botón notificaciones -->
                        <button onclick="toggleNotificationsDesktop()" class="w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center smooth-transition relative">
                            <img src="${baseURL}recursos/iconos/solido/estado/notificacion.svg" alt="Notificaciones" class="w-5 h-5 svg-gray-800">
                            <span id="desktop-notification-badge" class="hidden absolute -top-1 -right-1 bg-green text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">0</span>
                        </button>

                        <!-- Perfil con dropdown -->
                        <div class="relative inline-block text-left">
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
    }

    // ================= CONFIGURACIÓN MÓVIL =================
    // Usar event delegation para el botón de configuración
    const btnConfig = document.getElementById('btn-config-mobile');
    if (btnConfig) {
        console.log("Botón de configuración encontrado, agregando listener");
        btnConfig.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("¡Click en configuración detectado!");
            showConfigOverlay();
        });
    } else {
        console.log("Botón de configuración NO encontrado");
    }
});

// ================= CERRAR DROPDOWN SI SE HACE CLIC FUERA =================
document.addEventListener('click', function(event) {
    const menu = document.getElementById('menu');
    const button = document.getElementById('menu-button');
    if(menu && button && !menu.contains(event.target) && !button.contains(event.target)) {
        menu.classList.add('hidden');
    }
});