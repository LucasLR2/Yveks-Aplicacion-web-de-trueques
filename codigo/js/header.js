// ================= FUNCIONES =================

// Funciones del dropdown de configuración
function showConfigOverlay() {
    
    let overlay = document.getElementById("config-overlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "config-overlay";
        overlay.className = "fixed inset-0 bg-white z-50 flex flex-col overflow-y-auto";
        document.body.appendChild(overlay);
    }
    
    // Siempre resetear al contenido principal del menú
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
    
    // Botón para cerrar el overlay principal
    document.getElementById("close-config").addEventListener("click", () => {
        overlay.style.display = "none";
    });

    // Detectar clic en funcionalidades específicos
    overlay.querySelectorAll(".config-item").forEach(btn => {
        btn.addEventListener("click", () => {
            const action = btn.dataset.action;
            if (action === "password") showPasswordOverlay();
            if (action === "ayuda") showHelpOverlay();
            if (action === "privacidad") showPrivacyOverlay();
            if (action === "logout") showLogoutConfirmation();
        });
    });
    
    // Mostrar el overlay
    overlay.style.display = "flex";
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
                if (action === "password") showPasswordOverlay();
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
                if (action === "password") showPasswordOverlay();
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

// cambiar contraseña (para mobile)
function showPasswordOverlay() {
    const overlay = document.getElementById("config-overlay");
    if (!overlay) return;

    const configPanelContent = overlay.innerHTML;

    overlay.innerHTML = `
        <div class="flex items-center px-6 py-4 mt-4">
            <button id="back-to-config-password" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors mr-4">
                <img src="${baseURL}recursos/iconos/solido/navegacion/atras.svg" alt="Volver" class="w-8 h-8">
            </button>
            <h2 class="text-lg font-semibold text-gray-900">Nueva contraseña</h2>
        </div>
        <div class="flex-1 px-6 py-4">
            <p class="text-sm text-gray-500 mb-6">Tu nueva contraseña debe de ser diferente a otras previas</p>
            
            <form id="form-cambiar-password" class="space-y-6">
                <!-- Contraseña actual -->
                <div>
                    <label for="password-actual" class="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                    <div class="relative">
                        <input type="password" id="password-actual" name="password_actual" 
                               class="w-full px-4 py-3 border border-gray-300 rounded-full pr-12 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent" 
                               placeholder="••••••••••••" required>
                        <button type="button" class="toggle-password absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" data-target="password-actual">
                            <img src="${baseURL}recursos/iconos/solido/estado/ojo_cerrado.svg" alt="Mostrar" class="w-5 h-5">
                        </button>
                    </div>
                </div>

                <!-- Nueva contraseña -->
                <div>
                    <label for="password-nueva" class="block text-sm font-medium text-gray-700 mb-2">Nueva contraseña</label>
                    <div class="relative">
                        <input type="password" id="password-nueva" name="password_nueva" 
                               class="w-full px-4 py-3 border border-gray-300 rounded-full pr-12 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent" 
                               placeholder="••••••••••••" required>
                        <button type="button" class="toggle-password absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" data-target="password-nueva">
                            <img src="${baseURL}recursos/iconos/solido/estado/ojo_cerrado.svg" alt="Mostrar" class="w-5 h-5">
                        </button>
                    </div>
                </div>

                <!-- Confirmar contraseña -->
                <div>
                    <label for="password-confirmar" class="block text-sm font-medium text-gray-700 mb-2">Confirmar contraseña</label>
                    <div class="relative">
                        <input type="password" id="password-confirmar" name="password_confirmar" 
                               class="w-full px-4 py-3 border border-gray-300 rounded-full pr-12 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent" 
                               placeholder="••••••••••••" required>
                        <button type="button" class="toggle-password absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" data-target="password-confirmar">
                            <img src="${baseURL}recursos/iconos/solido/estado/ojo_cerrado.svg" alt="Mostrar" class="w-5 h-5">
                        </button>
                    </div>
                </div>

                <!-- Alerta de error/éxito -->
                <div id="password-alert" class="hidden px-4 py-3 rounded-lg text-sm"></div>

                <!-- Botón -->
                <button type="submit" class="w-full bg-green text-white py-3 rounded-full font-medium hover:bg-green-600 transition-colors">
                    Crear nueva contraseña
                </button>
            </form>
        </div>
    `;

    // Funcionalidad para mostrar/ocultar contraseñas
    overlay.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const input = document.getElementById(targetId);
            const img = this.querySelector('img');
            
            if (input.type === 'password') {
                input.type = 'text';
                img.src = baseURL + 'recursos/iconos/solido/estado/ojo.svg';
            } else {
                input.type = 'password';
                img.src = baseURL + 'recursos/iconos/solido/estado/ojo_cerrado.svg';
            }
        });
    });

    // Manejar envío del formulario
    document.getElementById('form-cambiar-password').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const passwordActual = document.getElementById('password-actual').value;
        const passwordNueva = document.getElementById('password-nueva').value;
        const passwordConfirmar = document.getElementById('password-confirmar').value;
        const alert = document.getElementById('password-alert');
        
        console.log('=== CAMBIAR PASSWORD DEBUG ===');
        console.log('Password actual:', passwordActual ? 'OK (length: ' + passwordActual.length + ')' : 'VACÍO');
        console.log('Password nueva:', passwordNueva ? 'OK (length: ' + passwordNueva.length + ')' : 'VACÍO');
        console.log('Password confirmar:', passwordConfirmar ? 'OK (length: ' + passwordConfirmar.length + ')' : 'VACÍO');
        
        // Validaciones
        if (!passwordActual || !passwordNueva || !passwordConfirmar) {
            console.log('ERROR: Campos vacíos');
            mostrarAlertaPassword('Todos los campos son obligatorios', 'error');
            return;
        }
        
        if (passwordNueva.length < 6) {
            console.log('ERROR: Password nueva muy corta');
            mostrarAlertaPassword('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }
        
        if (passwordNueva !== passwordConfirmar) {
            console.log('ERROR: Passwords no coinciden');
            mostrarAlertaPassword('Las contraseñas no coinciden', 'error');
            return;
        }
        
        if (passwordActual === passwordNueva) {
            console.log('ERROR: Password nueva es igual a la actual');
            mostrarAlertaPassword('La nueva contraseña debe ser diferente a la actual', 'error');
            return;
        }
        
        console.log('Validaciones OK - Enviando al backend...');
        
        // Enviar al backend
        const formData = new FormData();
        formData.append('password_actual', passwordActual);
        formData.append('password_nueva', passwordNueva);
        
        console.log('FormData creado - iniciando fetch...');
        
        fetch(baseURL + 'php/cambiar-password.php', {
            method: 'POST',
            body: formData
        })
        .then(res => {
            console.log('Respuesta recibida, status:', res.status);
            return res.json();
        })
        .then(data => {
            console.log('Datos parseados:', data);
            if (data.success) {
                console.log('SUCCESS: Contraseña cambiada');
                mostrarAlertaPassword('Contraseña actualizada exitosamente', 'success');
                setTimeout(() => {
                    overlay.style.display = "none";
                }, 1500);
            } else {
                console.log('ERROR del servidor:', data.message);
                mostrarAlertaPassword(data.message || 'Error al cambiar la contraseña', 'error');
            }
        })
        .catch(error => {
            console.error('ERROR en fetch:', error);
            mostrarAlertaPassword('Error de conexión. Intenta nuevamente.', 'error');
        });
    });

    // volver al menu config
    document.getElementById("back-to-config-password").addEventListener("click", () => {
        overlay.innerHTML = configPanelContent;

        overlay.querySelectorAll(".config-item").forEach(btn => {
            btn.addEventListener("click", () => {
                const action = btn.dataset.action;
                if (action === "password") showPasswordOverlay();
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

// Función auxiliar para mostrar alertas en el formulario de contraseña
function mostrarAlertaPassword(mensaje, tipo) {
    const alert = document.getElementById('password-alert');
    if (!alert) return;
    
    alert.textContent = mensaje;
    alert.classList.remove('hidden');
    
    if (tipo === 'error') {
        alert.style.backgroundColor = '#FEE2E2';
        alert.style.borderColor = '#F87171';
        alert.style.color = '#7F1D1D';
    } else {
        alert.style.backgroundColor = '#D1FAE5';
        alert.style.borderColor = '#34D399';
        alert.style.color = '#065F46';
    }
    
    setTimeout(() => {
        alert.classList.add('hidden');
    }, 5000);
}

// Modal de cambiar contraseña para DESKTOP
function showPasswordModalDesktop() {
    // Crear el backdrop y modal si no existe
    let modalBackdrop = document.getElementById('password-modal-backdrop');
    
    if (!modalBackdrop) {
        modalBackdrop = document.createElement('div');
        modalBackdrop.id = 'password-modal-backdrop';
        modalBackdrop.className = 'fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4';
        modalBackdrop.style.display = 'none';
        
        modalBackdrop.innerHTML = `
            <div id="password-modal" class="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-semibold text-gray-900">Nueva contraseña</h2>
                        <button id="close-password-modal" class="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <p class="text-sm text-gray-500 mt-2">Tu nueva contraseña debe de ser diferente a otras previas</p>
                </div>
                
                <div class="p-6">
                    <form id="form-cambiar-password-desktop" class="space-y-5">
                        <!-- Contraseña actual -->
                        <div>
                            <label for="password-actual-desktop" class="block text-sm font-medium text-gray-700 mb-2">Contraseña actual</label>
                            <div class="relative">
                                <input type="password" id="password-actual-desktop" name="password_actual" 
                                       class="w-full px-4 py-2.5 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent" 
                                       placeholder="••••••••••••" required>
                                <button type="button" class="toggle-password-desktop absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" data-target="password-actual-desktop">
                                    <img src="${baseURL}recursos/iconos/solido/estado/ojo_cerrado.svg" alt="Mostrar" class="w-5 h-5">
                                </button>
                            </div>
                        </div>

                        <!-- Nueva contraseña -->
                        <div>
                            <label for="password-nueva-desktop" class="block text-sm font-medium text-gray-700 mb-2">Nueva contraseña</label>
                            <div class="relative">
                                <input type="password" id="password-nueva-desktop" name="password_nueva" 
                                       class="w-full px-4 py-2.5 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent" 
                                       placeholder="••••••••••••" required>
                                <button type="button" class="toggle-password-desktop absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" data-target="password-nueva-desktop">
                                    <img src="${baseURL}recursos/iconos/solido/estado/ojo_cerrado.svg" alt="Mostrar" class="w-5 h-5">
                                </button>
                            </div>
                        </div>

                        <!-- Confirmar contraseña -->
                        <div>
                            <label for="password-confirmar-desktop" class="block text-sm font-medium text-gray-700 mb-2">Confirmar contraseña</label>
                            <div class="relative">
                                <input type="password" id="password-confirmar-desktop" name="password_confirmar" 
                                       class="w-full px-4 py-2.5 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent" 
                                       placeholder="••••••••••••" required>
                                <button type="button" class="toggle-password-desktop absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" data-target="password-confirmar-desktop">
                                    <img src="${baseURL}recursos/iconos/solido/estado/ojo_cerrado.svg" alt="Mostrar" class="w-5 h-5">
                                </button>
                            </div>
                        </div>

                        <!-- Alerta de error/éxito -->
                        <div id="password-alert-desktop" class="hidden px-4 py-3 rounded-lg text-sm"></div>

                        <!-- Botones -->
                        <div class="flex gap-3 pt-2">
                            <button type="button" id="cancel-password-desktop" class="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                                Cancelar
                            </button>
                            <button type="submit" class="flex-1 px-4 py-2.5 bg-green text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
                                Guardar cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modalBackdrop);
        
        // Cerrar al hacer clic en el backdrop
        modalBackdrop.addEventListener('click', function(e) {
            if (e.target === modalBackdrop) {
                closePasswordModalDesktop();
            }
        });
        
        // Botón X para cerrar
        document.getElementById('close-password-modal').addEventListener('click', closePasswordModalDesktop);
        
        // Botón cancelar
        document.getElementById('cancel-password-desktop').addEventListener('click', closePasswordModalDesktop);
        
        // Toggle password visibility
        modalBackdrop.querySelectorAll('.toggle-password-desktop').forEach(btn => {
            btn.addEventListener('click', function() {
                const targetId = this.dataset.target;
                const input = document.getElementById(targetId);
                const img = this.querySelector('img');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    img.src = baseURL + 'recursos/iconos/solido/estado/ojo.svg';
                } else {
                    input.type = 'password';
                    img.src = baseURL + 'recursos/iconos/solido/estado/ojo_cerrado.svg';
                }
            });
        });
        
        // Manejar envío del formulario
        document.getElementById('form-cambiar-password-desktop').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const passwordActual = document.getElementById('password-actual-desktop').value;
            const passwordNueva = document.getElementById('password-nueva-desktop').value;
            const passwordConfirmar = document.getElementById('password-confirmar-desktop').value;
            
            console.log('=== CAMBIAR PASSWORD DESKTOP DEBUG ===');
            console.log('Password actual:', passwordActual ? 'OK (length: ' + passwordActual.length + ')' : 'VACÍO');
            console.log('Password nueva:', passwordNueva ? 'OK (length: ' + passwordNueva.length + ')' : 'VACÍO');
            console.log('Password confirmar:', passwordConfirmar ? 'OK (length: ' + passwordConfirmar.length + ')' : 'VACÍO');
            
            // Validaciones
            if (!passwordActual || !passwordNueva || !passwordConfirmar) {
                console.log('ERROR: Campos vacíos');
                mostrarAlertaPasswordDesktop('Todos los campos son obligatorios', 'error');
                return;
            }
            
            if (passwordNueva.length < 6) {
                console.log('ERROR: Password nueva muy corta');
                mostrarAlertaPasswordDesktop('La contraseña debe tener al menos 6 caracteres', 'error');
                return;
            }
            
            if (passwordNueva !== passwordConfirmar) {
                console.log('ERROR: Passwords no coinciden');
                mostrarAlertaPasswordDesktop('Las contraseñas no coinciden', 'error');
                return;
            }
            
            if (passwordActual === passwordNueva) {
                console.log('ERROR: Password nueva es igual a la actual');
                mostrarAlertaPasswordDesktop('La nueva contraseña debe ser diferente a la actual', 'error');
                return;
            }
            
            console.log('Validaciones OK - Enviando al backend...');
            
            // Enviar al backend
            const formData = new FormData();
            formData.append('password_actual', passwordActual);
            formData.append('password_nueva', passwordNueva);
            
            console.log('FormData creado - iniciando fetch...');
            
            fetch(baseURL + 'php/cambiar-password.php', {
                method: 'POST',
                body: formData
            })
            .then(res => {
                console.log('Respuesta recibida, status:', res.status);
                return res.json();
            })
            .then(data => {
                console.log('Datos parseados:', data);
                if (data.success) {
                    console.log('SUCCESS: Contraseña cambiada');
                    mostrarAlertaPasswordDesktop('Contraseña actualizada exitosamente', 'success');
                    setTimeout(() => {
                        closePasswordModalDesktop();
                    }, 1500);
                } else {
                    console.log('ERROR del servidor:', data.message);
                    mostrarAlertaPasswordDesktop(data.message || 'Error al cambiar la contraseña', 'error');
                }
            })
            .catch(error => {
                console.error('ERROR en fetch:', error);
                mostrarAlertaPasswordDesktop('Error de conexión. Intenta nuevamente.', 'error');
            });
        });
    }
    
    // Mostrar el modal
    modalBackdrop.style.display = 'flex';
    
    // Limpiar campos
    document.getElementById('password-actual-desktop').value = '';
    document.getElementById('password-nueva-desktop').value = '';
    document.getElementById('password-confirmar-desktop').value = '';
    document.getElementById('password-alert-desktop').classList.add('hidden');
}

function closePasswordModalDesktop() {
    const modalBackdrop = document.getElementById('password-modal-backdrop');
    if (modalBackdrop) {
        modalBackdrop.style.display = 'none';
    }
}

function mostrarAlertaPasswordDesktop(mensaje, tipo) {
    const alert = document.getElementById('password-alert-desktop');
    if (!alert) return;
    
    alert.textContent = mensaje;
    alert.classList.remove('hidden');
    
    if (tipo === 'error') {
        alert.style.backgroundColor = '#FEE2E2';
        alert.style.borderColor = '#F87171';
        alert.style.color = '#7F1D1D';
    } else {
        alert.style.backgroundColor = '#D1FAE5';
        alert.style.borderColor = '#34D399';
        alert.style.color = '#065F46';
    }
    
    setTimeout(() => {
        alert.classList.add('hidden');
    }, 5000);
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

// Función para abrir/cerrar el dropdown del menú de usuario
function showDropdown() {
    const menu = document.getElementById('menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
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
                // Usar datos reales del usuario
                const nombreUsuario = data.nombre || 'Usuario';
                const correoUsuario = data.correo || '';
                const imgUsuario = data.img_usuario || 'recursos/iconos/solido/comunicacion/usuario.svg';
                
                contenedor.innerHTML = `
                    <!-- Botón Nueva publicación -->
                    <button class="bg-green text-white px-6 h-10 smooth-transition redondeado-personalizado primary-button flex items-center text-sm whitespace-nowrap"
                        onclick="window.location.href='${baseURL}nuevo_producto.php'">
                        <img src="${baseURL}recursos/iconos/solido/interfaz/mas.svg" alt="Publicar" class="w-3 h-3 svg-white mr-2">
                        Nueva publicación
                    </button>

                    <!-- Botón chat -->
                    <button onclick="Verificacion('${baseURL}php/mensajes.php', this)" class="w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center smooth-transition">
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
                            <button class="w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center smooth-transition overflow-hidden"
                                id="menu-button" onclick="showDropdown()" aria-expanded="true" aria-haspopup="true">
                                <img src="${baseURL}${imgUsuario}" alt="Usuario" class="w-full h-full object-cover">
                            </button>
                        </div>

                        <div id="menu"
                            class="hidden absolute right-0 z-10 mt-4 w-80 h-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden p-6 flex flex-col"
                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            
                            <!-- Info del usuario -->
                            <div class="flex items-center gap-x-4 mb-4">
                                <img class="rounded-full w-12 h-12 object-cover" src="${baseURL}${imgUsuario}" alt="${nombreUsuario}">
                                <div>
                                    <div class="font-medium text-base text-gray-800">${nombreUsuario}</div>
                                    <p class="text-xs text-green">${correoUsuario}</p>
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
                            showPasswordModalDesktop();
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
                    Marcar todas como leídas
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
            } else if (notif.tipo === 'oferta_aceptada') {
                console.log('🔵 Tipo: Oferta aceptada');
                console.log('🔵 id_conversacion:', notif.id_conversacion);
                // Si tiene id_conversacion, ir al chat directamente
                if (notif.id_conversacion) {
                    urlRedireccion = baseURL + 'php/mensajes.php?conversacion=' + notif.id_conversacion;
                } else {
                    // Fallback: ir a ofertas
                    urlRedireccion = baseURL + 'php/ofertas.php?tipo=hechas';
                }
                console.log('🔵 URL final:', urlRedireccion);
            } else if (notif.tipo === 'oferta' || notif.tipo === 'oferta_cancelada' || notif.tipo === 'oferta_rechazada') {
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