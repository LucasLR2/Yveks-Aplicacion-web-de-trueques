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

// centro de ayuda (para mobile)
function showHelpOverlay() {
    const overlay = document.getElementById("config-overlay");
    if (!overlay) return;

    const configPanelContent = overlay.innerHTML;

    overlay.innerHTML = `
        <div class="flex items-center justify-center px-6 py-4 mt-4 relative">
            <button id="back-to-config" class="absolute left-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                <img src="${baseURL}recursos/iconos/solido/navegacion/atras.svg" alt="Volver" class="w-8 h-8">
            </button>
            <h2 class="text-lg font-semibold text-gray-900">Centro de Ayuda</h2>
        </div>
        <div class="flex-1 overflow-y-auto p-6 modal-scroll">
            <p class="mb-4 text-sm text-gray-700 leading-relaxed">
                Aquí encontrarás información que las personas comúnmente buscan sobre el uso de la plataforma. 
                Si no encontrás lo que necesitás, podés escribir a <strong>yveks2025@gmail.com</strong> para recibir asistencia personalizada.
            </p>
            <div class="pl-4 space-y-6">
                <div>
                    <strong style="color:#719177; font-size:1.1rem;">• Cómo crear una publicación:</strong>
                    <p class="text-sm text-gray-700 leading-relaxed mt-1">Para crear una publicación, primero hacé clic en el botón <em>Nueva publicación</em>. Luego, seleccioná la categoría adecuada, completá el título y la descripción detallada del producto o servicio, agregá imágenes de calidad y, finalmente, presioná <em>Publicar</em>. Esto hará que tu publicación sea visible para otros usuarios.</p>
                </div>

                <div>
                    <strong style="color:#719177; font-size:1.1rem;">• Gestión de tus publicaciones:</strong>
                    <p class="text-sm text-gray-700 leading-relaxed mt-1">Para editar una publicación, accedé a tu panel de publicaciones, seleccioná la que querés modificar y hacé clic en <em>Editar</em>. Podés cambiar la descripción, el título o las imágenes. Para eliminar una publicación, seleccioná la opción <em>Eliminar</em> y confirmá la acción. También podés pausar temporalmente una publicación si no querés que esté activa.</p>
                </div>

                <div>
                    <strong style="color:#719177; font-size:1.1rem;">• Chat y comunicación:</strong>
                    <p class="text-sm text-gray-700 leading-relaxed mt-1">Para enviar un mensaje a otro usuario, hacé clic en el botón de chat en la publicación o en el perfil del usuario. Podés responder a los mensajes recibidos desde la bandeja de entrada. Las notificaciones te alertarán cuando haya nuevos mensajes para que no pierdas ninguna comunicación.</p>
                </div>

                <div>
                    <strong style="color:#719177; font-size:1.1rem;">• Notificaciones:</strong>
                    <p class="text-sm text-gray-700 leading-relaxed mt-1">Las notificaciones se muestran en el icono correspondiente en el encabezado. Podés revisar los mensajes, respuestas a tus publicaciones y novedades importantes. Haciendo clic en cada notificación, se abrirá el detalle correspondiente.</p>
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

// politicas de privacidad (para mobile)
function showPrivacyOverlay() {
    const overlay = document.getElementById("config-overlay");
    if (!overlay) return;

    const configPanelContent = overlay.innerHTML;

    overlay.innerHTML = `
        <div class="flex items-center justify-center px-6 py-4 mt-4 relative">
            <button id="back-to-config-privacy" class="absolute left-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                <img src="${baseURL}recursos/iconos/solido/navegacion/atras.svg" alt="Volver" class="w-8 h-8">
            </button>
            <h2 class="text-lg font-semibold text-gray-900">Políticas de privacidad</h2>
        </div>
        <div class="flex-1 overflow-y-auto p-6 modal-scroll">
            <p class="text-sm text-gray-700 leading-relaxed mb-3 text-justify">
                Valoramos la <span style="color:#719177; text-decoration: underline;">privacidad</span> y la seguridad de tus datos personales. Toda la información que compartís, como datos de contacto, publicaciones y actividad en la plataforma, es tratada con confidencialidad y utilizada únicamente para mejorar tu experiencia de usuario y ofrecerte servicios personalizados.
            </p>
            <p class="text-sm text-gray-700 leading-relaxed mb-3 text-justify">
                Te recomendamos mantener tus credenciales seguras, revisar periódicamente tus <span style="color:#719177; text-decoration: underline;">ajustes de privacidad</span> y ser cuidadoso al compartir información sensible.
            </p>
            <p class="text-sm text-gray-700 leading-relaxed text-justify">
                Si tenés dudas sobre cómo protegemos tus datos o necesitás asistencia, podés contactarnos a <span style="color:#719177; text-decoration: underline;">yveks2025@gmail.com</span>.
            </p>
        </div>
    `;

    // volver al menu config
    document.getElementById("back-to-config-privacy").addEventListener("click", () => {
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

// Función para expandir el dropdown y mostrar contenido adicional
function expandDropdownWithContent(contentType) {
    const menu = document.getElementById('menu');
    if (!menu) return;

    // Guardar el contenido original si no existe
    if (!menu.dataset.originalContent) {
        menu.dataset.originalContent = menu.innerHTML;
    }

    let contentHTML = '';
    let title = '';

    if (contentType === 'centro-ayuda') {
        title = 'Centro de Ayuda';
        contentHTML = `
            <p class="mb-4 text-sm text-gray-700 text-justify">
                Aquí encontrarás información que las personas comúnmente buscan sobre el uso de la plataforma. 
                Si no encontrás lo que necesitás, podés escribir a <strong>yveks2025@gmail.com</strong> para recibir asistencia personalizada.
            </p>
            <div class="space-y-4">
                <div>
                    <strong style="color:#719177; font-size:0.875rem;">• Cómo crear una publicación:</strong>
                    <p class="text-sm text-gray-600 mt-1 text-justify">Para crear una publicación, primero hacé clic en el botón <em>Nueva publicación</em>. Luego, seleccioná la categoría adecuada, completá el título y la descripción detallada del producto o servicio, agregá imágenes de calidad y, finalmente, presioná <em>Publicar</em>. Esto hará que tu publicación sea visible para otros usuarios.</p>
                </div>

                <div>
                    <strong style="color:#719177; font-size:0.875rem;">• Gestión de tus publicaciones:</strong>
                    <p class="text-sm text-gray-600 mt-1 text-justify">Para editar una publicación, accedé a tu panel de publicaciones, seleccioná la que querés modificar y hacé clic en <em>Editar</em>. Podés cambiar la descripción, el título o las imágenes. Para eliminar una publicación, seleccioná la opción <em>Eliminar</em> y confirmá la acción. También podés pausar temporalmente una publicación si no querés que esté activa.</p>
                </div>

                <div>
                    <strong style="color:#719177; font-size:0.875rem;">• Chat y comunicación:</strong>
                    <p class="text-sm text-gray-600 mt-1 text-justify">Para enviar un mensaje a otro usuario, hacé clic en el botón de chat en la publicación o en el perfil del usuario. Podés responder a los mensajes recibidos desde la bandeja de entrada. Las notificaciones te alertarán cuando haya nuevos mensajes para que no pierdas ninguna comunicación.</p>
                </div>

                <div>
                    <strong style="color:#719177; font-size:0.875rem;">• Notificaciones:</strong>
                    <p class="text-sm text-gray-600 mt-1 text-justify">Las notificaciones se muestran en el icono correspondiente en el encabezado. Podés revisar los mensajes, respuestas a tus publicaciones y novedades importantes. Haciendo clic en cada notificación, se abrirá el detalle correspondiente.</p>
                </div>
            </div>
        `;
    } else if (contentType === 'politicas-privacidad') {
        title = 'Políticas de privacidad';
        contentHTML = `
            <p class="text-sm text-gray-700 leading-relaxed mb-3 text-justify">
                Valoramos la <span style="color:#719177; text-decoration: underline;">privacidad</span> y la seguridad de tus datos personales. Toda la información que compartís, como datos de contacto, publicaciones y actividad en la plataforma, es tratada con confidencialidad y utilizada únicamente para mejorar tu experiencia de usuario y ofrecerte servicios personalizados.
            </p>
            <p class="text-sm text-gray-700 leading-relaxed mb-3 text-justify">
                Te recomendamos mantener tus credenciales seguras, revisar periódicamente tus <span style="color:#719177; text-decoration: underline;">ajustes de privacidad</span> y ser cuidadoso al compartir información sensible.
            </p>
            <p class="text-sm text-gray-700 leading-relaxed text-justify">
                Si tenés dudas sobre cómo protegemos tus datos o necesitás asistencia, podés contactarnos a <span style="color:#719177; text-decoration: underline;">yveks2025@gmail.com</span>.
            </p>
        `;
    }

    // Cambiar el contenido del dropdown pero mantenerlo abierto con tamaño fijo
    menu.className = "absolute right-0 z-10 mt-4 w-80 h-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden p-6 flex flex-col";
    
    menu.innerHTML = `
        <div class="flex items-center justify-center mb-4 pb-4 border-b border-gray-200 relative">
            <button id="back-to-menu" class="absolute left-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                <img src="${baseURL}recursos/iconos/solido/navegacion/atras.svg" alt="Volver" class="w-6 h-6">
            </button>
            <h3 class="text-base font-semibold text-gray-900">${title}</h3>
        </div>
        <div class="flex-1 overflow-y-auto pr-4">
            ${contentHTML}
        </div>
    `;

    // Botón para volver al menú original
    document.getElementById('back-to-menu').addEventListener('click', (e) => {
        e.stopPropagation();
        menu.className = "hidden absolute right-0 z-10 mt-4 w-80 h-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden p-6 flex flex-col";
        menu.innerHTML = menu.dataset.originalContent;
        menu.classList.remove('hidden');
    });
}

// Confirmación de cierre de sesión
function showLogoutConfirmation() {
    window.location.href = "../php/cerrar-sesion.php"; // Cierra sesión directamente
}

// ================= EVENTOS DEL DOM =================

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded ejecutado");
    
// ===== HEADER DESKTOP DINÁMICO =====
const contenedor = document.getElementById('desktop-header-actions');

if (contenedor) {
    fetch(baseURL + 'php/verificar-sesion.php')
        .then(response => response.json())
        .then(data => {
            if (data.logueado) {
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
                            class="hidden absolute right-0 z-10 mt-4 w-80 h-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden p-6 flex flex-col"
                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            
                            <!-- Info del usuario -->
                            <div class="flex items-center gap-x-4 mb-4">
                                <img class="rounded-full w-12 h-12" src="${baseURL}recursos/imagenes/josegimenez.jpg">
                                <div>
                                    <div class="font-medium text-base text-gray-800">José Martínez</div>
                                    <p class="text-xs text-green">jsemartinez@gmail</p>
                                </div>
                            </div>

                            <!-- Opciones del dropdown con data-action -->
                            <ul class="flex flex-col divide-y divide-gray-200 mt-2 w-full space-y-1">
                                <li><button class="config-item w-full flex items-center justify-between py-3 text-gray-600 hover:bg-gray-50 transition-colors text-sm" data-action="datos-personales"><div class="flex items-center gap-4"><img src="${baseURL}recursos/iconos/solido/navegacion/User.svg" class="w-5 h-5"><span class="text-gray-500 font-normal text-base">Datos personales</span></div><img src="${baseURL}recursos/iconos/solido/interfaz/next.svg" class="w-4 h-4"></button></li>
                                <li><button class="config-item w-full flex items-center justify-between py-3 text-gray-600 hover:bg-gray-50 transition-colors text-sm" data-action="cambiar-contrasena"><div class="flex items-center gap-4"><img src="${baseURL}recursos/iconos/solido/interfaz/Key.svg" class="w-5 h-5"><span class="text-gray-500 font-normal text-base">Cambiar contraseña</span></div><img src="${baseURL}recursos/iconos/solido/interfaz/next.svg" class="w-4 h-4"></button></li>
                                <li><button class="config-item w-full flex items-center justify-between py-3 text-gray-600 hover:bg-gray-50 transition-colors text-sm" data-action="centro-ayuda"><div class="flex items-center gap-4"><img src="${baseURL}recursos/iconos/solido/interfaz/Info.svg" class="w-5 h-5"><span class="text-gray-500 font-normal text-base">Centro de ayuda</span></div><img src="${baseURL}recursos/iconos/solido/interfaz/next.svg" class="w-4 h-4"></button></li>
                                <li><button class="config-item w-full flex items-center justify-between py-3 text-gray-600 hover:bg-gray-50 transition-colors text-sm" data-action="politicas-privacidad"><div class="flex items-center gap-4"><img src="${baseURL}recursos/iconos/solido/interfaz/Lock.svg" class="w-5 h-5"><span class="text-gray-500 font-normal text-base">Políticas de privacidad</span></div><img src="${baseURL}recursos/iconos/solido/interfaz/next.svg" class="w-4 h-4"></button></li>
                                <li><button class="config-item w-full flex items-center justify-between py-3 text-gray-600 hover:bg-gray-50 transition-colors text-sm" data-action="cerrar-sesion"><div class="flex items-center gap-4"><img src="${baseURL}recursos/iconos/solido/interfaz/Logout.svg" class="w-5 h-5"><span class="text-gray-500 font-normal text-base">Cerrar sesión</span></div><img src="${baseURL}recursos/iconos/solido/interfaz/next.svg" class="w-4 h-4"></button></li>
                            </ul>
                        </div>
                    </div>
                `;

                // ===== Delegación de eventos para el dropdown desktop =====
                document.addEventListener('click', (e) => {
                    const btn = e.target.closest('.config-item');
                    if (!btn) return;

                    const action = btn.dataset.action;

                    switch(action) {
                        case 'datos-personales': 
                            console.log('Abrir datos personales'); 
                            break;
                        case 'cambiar-contrasena': 
                            console.log('Abrir cambiar contraseña'); 
                            break;
                        case 'centro-ayuda': 
                            expandDropdownWithContent('centro-ayuda');
                            break;
                        case 'politicas-privacidad': 
                            expandDropdownWithContent('politicas-privacidad');
                            break;
                        case 'cerrar-sesion': 
                            showLogoutConfirmation();
                            break;
                    }
                });

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