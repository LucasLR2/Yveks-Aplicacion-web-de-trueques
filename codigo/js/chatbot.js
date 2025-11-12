class ChatbotManager {
    constructor() {
    this.isOpen = false;
    this.mensajes = [];
    this.esperandoRespuesta = false;
    this.estadoUsuario = null;
    this.mensajeBienvenidaPreparado = null;
    this.init();
    }

    init() {
        this.crearWidget();
        this.verificarEstadoUsuario();
        this.setupEventListeners();
    }

    crearWidget() {
        // Botón flotante con badge de notificación
        const botonHTML = `
            <button id="chatbot-toggle" class="chatbot-toggle" style="display: flex !important;">
                <svg class="chatbot-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                </svg>
                <svg class="chatbot-close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <span id="chatbot-badge" class="chatbot-badge">1</span>
            </button>
        `;

        // Contenedor del chat
        const chatHTML = `
            <div id="chatbot-container" class="chatbot-container">
                <div class="chatbot-header">
                    <div class="chatbot-header-info">
                        <div class="chatbot-avatar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                <path d="M2 17l10 5 10-5"></path>
                                <path d="M2 12l10 5 10-5"></path>
                            </svg>
                        </div>
                        <div>
                            <div class="chatbot-title">Asistente Dreva</div>
                            <div class="chatbot-status">
                                <span class="status-dot"></span>
                                Siempre disponible
                            </div>
                        </div>
                    </div>
                    <button id="chatbot-minimize" class="chatbot-minimize">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>

                <div id="chatbot-messages" class="chatbot-messages">
                    <!-- Mensajes se cargan aquí -->
                </div>

                <div id="chatbot-suggestions" class="chatbot-suggestions">
                    <!-- Sugerencias rápidas -->
                </div>

                <div class="chatbot-input-container">
                    <input 
                        type="text" 
                        id="chatbot-input" 
                        class="chatbot-input" 
                        placeholder="Escribe tu pregunta..."
                        autocomplete="off"
                    />
                    <button id="chatbot-send" class="chatbot-send" disabled>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', botonHTML + chatHTML);
    }

    setupEventListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const toggleDesktop = document.getElementById('chatbot-btn');
        const minimize = document.getElementById('chatbot-minimize');
        const input = document.getElementById('chatbot-input');
        const send = document.getElementById('chatbot-send');

        // Botón flotante (móvil)
        if (toggle) {
            toggle.addEventListener('click', () => this.toggleChat());
        }
        
        // Botón desktop (si existe)
        if (toggleDesktop) {
            toggleDesktop.addEventListener('click', () => this.toggleChat());
        }
        
        minimize.addEventListener('click', () => this.toggleChat());
        
        input.addEventListener('input', (e) => {
            send.disabled = !e.target.value.trim();
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey && input.value.trim()) {
                e.preventDefault();
                this.enviarMensaje();
            }
        });

        send.addEventListener('click', () => this.enviarMensaje());

        // Delegación de eventos para sugerencias
        document.getElementById('chatbot-suggestions').addEventListener('click', (e) => {
            const btn = e.target.closest('.suggestion-btn');
            if (btn) {
                const texto = btn.textContent.trim();
                document.getElementById('chatbot-input').value = texto;
                this.enviarMensaje();
            }
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const container = document.getElementById('chatbot-container');
        const toggleMobile = document.getElementById('chatbot-toggle');
        const toggleDesktop = document.getElementById('chatbot-btn');
        const badge = document.getElementById('chatbot-badge');

        if (this.isOpen) {
            container.classList.add('active');
            if (toggleMobile) toggleMobile.classList.add('active');
            if (badge) badge.style.display = 'none';
            this.marcarComoVisto();
            
            // Si hay un mensaje de bienvenida preparado, mostrarlo ahora
            if (this.mensajeBienvenidaPreparado) {
                setTimeout(() => {
                    this.agregarMensajeBot(
                        this.mensajeBienvenidaPreparado.texto,
                        this.mensajeBienvenidaPreparado.sugerencias
                    );
                    this.mensajeBienvenidaPreparado = null;
                }, 300);
            }
            
            // Focus en input
            setTimeout(() => {
                document.getElementById('chatbot-input').focus();
            }, 300);
        } else {
            container.classList.remove('active');
            if (toggleMobile) toggleMobile.classList.remove('active');
        }
    }

    async verificarEstadoUsuario() {
        try {
            // Obtener TODO desde chatbot.php - UNA SOLA LLAMADA
            const response = await fetch('php/chatbot.php?estado_usuario');
            const data = await response.json();
            
            console.log('Datos completos:', data); // Debug
            
            this.estadoUsuario = {
                logueado: data.logueado === true,
                nombre: data.nombre || 'Usuario',
                esNuevo: data.es_nuevo,
                primerVisita: data.primer_visita,
                productosPublicados: data.productos_publicados || 0,
                ofertasPendientes: data.ofertas_pendientes || 0
            };
            
            console.log('Estado final:', this.estadoUsuario);

            // Cargar historial primero
            await this.cargarHistorial();
            
            // Decidir si mostrar mensaje de bienvenida
            this.decidirMensajeBienvenida();
            
        } catch (error) {
            console.error('Error verificando estado:', error);
            this.estadoUsuario = {
                logueado: false,
                esNuevo: true,
                primerVisita: true
            };
            this.mostrarMensajeBienvenidaInvitado();
        }
    }

    decidirMensajeBienvenida() {
        const estado = this.estadoUsuario;
        
        // Si ya hay historial, no mostrar bienvenida
        if (this.mensajes.length > 0) {
            return;
        }
        
        // Usuario no logueado - Primera visita
        if (!estado.logueado && estado.primerVisita) {
            this.mostrarMensajeBienvenidaInvitado();
        }
        // Usuario logueado - Primera vez usando el chatbot
        else if (estado.logueado && estado.esNuevo) {
            this.mostrarMensajeBienvenidaLogueado();
        }
        // Usuario logueado sin productos
        else if (estado.logueado && estado.productosPublicados === 0 && estado.primerVisita) {
            this.mostrarMensajeSinProductos();
        }
    }

    mostrarMensajeBienvenidaInvitado() {
        const badge = document.getElementById('chatbot-badge');
        if (badge) badge.style.display = 'flex';
        
        this.mensajeBienvenidaPreparado = {
            texto: "¡Hola! 👋 Bienvenido a Dreva, la plataforma de intercambio de productos.\n\n" +
                "Veo que aún no has iniciado sesión. Para comenzar a intercambiar necesitas:\n\n" +
                "1️⃣ Crear una cuenta o iniciar sesión\n" +
                "2️⃣ Completar tu perfil\n" +
                "3️⃣ Publicar productos que quieras intercambiar\n" +
                "4️⃣ ¡Buscar lo que necesitas y hacer ofertas!\n\n" +
                "¿Quieres que te guíe en el proceso?",
            sugerencias: ['🔐 Iniciar sesión', '📝 Crear cuenta', '🔍 Explorar productos', '❓ ¿Cómo funciona?']
        };
    }

    mostrarMensajeBienvenidaLogueado() {
        const badge = document.getElementById('chatbot-badge');
        if (badge) badge.style.display = 'flex';
        
        const nombre = this.estadoUsuario.nombre.split(' ')[0];
        
        if (this.estadoUsuario.productosPublicados === 0) {
            this.mensajeBienvenidaPreparado = {
                texto: `¡Hola ${nombre}! 👋 Me alegra verte por aquí.\n\n` +
                    "Veo que acabas de crear tu cuenta. Para comenzar a intercambiar:\n\n" +
                    "1️⃣ Publica tu primer producto (lo que ya no uses)\n" +
                    "2️⃣ Busca productos que te interesen\n" +
                    "3️⃣ Haz ofertas de intercambio\n" +
                    "4️⃣ Chatea y concreta el trueque\n\n" +
                    "¿Quieres que te ayude a publicar tu primer producto?",
                sugerencias: ['📦 Publicar producto', '🔍 Buscar productos', '❓ Más información']
            };
        } else {
            this.mensajeBienvenidaPreparado = {
                texto: `¡Hola ${nombre}! 👋 ¿En qué puedo ayudarte hoy?\n\n` +
                    `Tienes ${this.estadoUsuario.productosPublicados} producto(s) publicado(s)` +
                    (this.estadoUsuario.ofertasPendientes > 0 
                        ? ` y ${this.estadoUsuario.ofertasPendientes} oferta(s) pendiente(s).` 
                        : '.'),
                sugerencias: ['🔍 Buscar productos', '📋 Ver mis ofertas', '💬 Ayuda']
            };
        }
    }

    mostrarMensajeSinProductos() {
        const badge = document.getElementById('chatbot-badge');
        if (badge) badge.style.display = 'flex';
        
        const nombre = this.estadoUsuario.nombre.split(' ')[0];
        
        this.mensajeBienvenidaPreparado = {
            texto: `Hola ${nombre} 😊\n\n` +
                "Noto que aún no has publicado ningún producto. " +
                "Para poder hacer intercambios necesitas tener al menos un producto publicado.\n\n" +
                "¿Te gustaría que te ayude a publicar tu primer producto?",
            sugerencias: ['📦 Sí, publicar ahora', '🔍 Primero quiero explorar', '❓ Más información']
        };
    }

    async marcarComoVisto() {
        try {
            await fetch('php/chatbot.php?marcar_visto');
        } catch (error) {
            console.error('Error marcando como visto:', error);
        }
    }

    async cargarHistorial() {
        try {
            const response = await fetch('php/chatbot.php?historial');
            const data = await response.json();
            
            if (data.success && data.mensajes.length > 0) {
                data.mensajes.forEach(msg => {
                    this.agregarMensajeUsuario(msg.mensaje_usuario, false);
                    this.agregarMensajeBot(msg.respuesta_bot, null, false);
                });
            }
        } catch (error) {
            console.error('Error cargando historial:', error);
        }
    }

    async enviarMensaje() {
        const input = document.getElementById('chatbot-input');
        const mensaje = input.value.trim();
        
        if (!mensaje || this.esperandoRespuesta) return;
        
        if (this.procesarComandoEspecial(mensaje)) {
            input.value = '';
            document.getElementById('chatbot-send').disabled = true;
            return;
        }
        
        this.agregarMensajeUsuario(mensaje);
        input.value = '';
        document.getElementById('chatbot-send').disabled = true;
        
        this.mostrarEscribiendo();
        this.esperandoRespuesta = true;
        
        try {
            const response = await fetch('php/chatbot.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mensaje })
            });
            
            const text = await response.text(); // Cambiar a text() temporalmente
            console.log('Respuesta del servidor:', text); // Ver qué devuelve
            
            const data = JSON.parse(text); // Intentar parsear
            
            this.ocultarEscribiendo();
            
            if (data.success) {
                this.agregarMensajeBot(data.respuesta, data.sugerencias);
            } else {
                this.agregarMensajeBot('Lo siento, ocurrió un error. ¿Puedes intentar de nuevo?');
            }
        } catch (error) {
            console.error('Error enviando mensaje:', error);
            this.ocultarEscribiendo();
            this.agregarMensajeBot('Error de conexión. Por favor, intenta nuevamente.');
        } finally {
            this.esperandoRespuesta = false;
        }
    }

    procesarComandoEspecial(mensaje) {
        const msg = mensaje.toLowerCase().trim();
        
        // NUEVO: Búsqueda de productos específicos
        const productosBuscables = {
            'cinto': 'cinto',
            'cinturón': 'cinto',
            'remera': 'remera',
            'camiseta': 'remera',
            'celular': 'celular',
            'teléfono': 'celular',
            'laptop': 'laptop',
            'computadora': 'laptop',
            'libro': 'libro',
            'zapato': 'zapato',
            'zapatilla': 'zapatilla',
            'pantalón': 'pantalon',
            'jean': 'jean',
            'reloj': 'reloj',
            'auricular': 'auricular',
            'audífono': 'auricular'
        };
        
        // Buscar si el mensaje contiene algún producto buscable
        for (const [palabra, termino] of Object.entries(productosBuscables)) {
            if (msg.includes(palabra)) {
                this.buscarProducto(termino, palabra);
                return true;
            }
        }
        
        // Comando: Iniciar sesión
        if (msg.includes('iniciar sesión') || msg.includes('iniciar sesion') || msg === 'iniciar sesión') {
            this.agregarMensajeBot(
                "Te voy a redirigir a la página de inicio de sesión. ¡Nos vemos pronto! 👋",
                null
            );
            setTimeout(() => {
                window.location.href = 'php/iniciar-sesion.php';
            }, 1500);
            return true;
        }
        
        // Comando: Crear cuenta
        if (msg.includes('crear cuenta') || msg.includes('registrar') || msg === 'crear cuenta') {
            this.agregarMensajeBot(
                "¡Perfecto! Te llevaré al registro. Solo tomará un momento. 😊",
                null
            );
            setTimeout(() => {
                window.location.href = 'php/registrarse.php';
            }, 1500);
            return true;
        }
        
        // Comando: Publicar producto
        if (msg.includes('publicar producto') || msg === 'publicar producto' || msg === 'publicar ahora' || msg === 'sí, publicar ahora') {
            if (!this.estadoUsuario.logueado) {
                this.agregarMensajeBot(
                    "Para publicar productos necesitas iniciar sesión primero. ¿Quieres hacerlo ahora?",
                    ['Sí, iniciar sesión', 'Crear cuenta']
                );
            } else {
                this.agregarMensajeBot(
                    "¡Genial! Te llevaré a la página para publicar tu producto. 📦",
                    null
                );
                setTimeout(() => {
                    window.location.href = 'nuevo_producto.php';
                }, 1500);
            }
            return true;
        }
        
        // Comando: Explorar productos
        if (msg.includes('explorar') || msg.includes('buscar producto') || msg === '🔍 explorar productos' || msg === '🔍 primero quiero explorar') {
            this.agregarMensajeBot(
                "Puedes explorar productos desde la página principal. Usa el buscador o navega por categorías. ¡Hay muchas cosas interesantes! 🎁",
                ['Tecnología', 'Hogar', 'Ropa', 'Deportes']
            );
            return false;
        }
        
        return false;
    }

    // NUEVA FUNCIÓN: Buscar producto y redirigir
    buscarProducto(termino, palabraOriginal) {
        this.agregarMensajeBot(
            `¡Perfecto! Voy a buscar "${palabraOriginal}" en el catálogo. 🔍\n\nTe redirijo al buscador...`,
            null
        );
        
        setTimeout(() => {
            // Redirigir a index.php con el parámetro de búsqueda
            window.location.href = `index.php?busqueda=${encodeURIComponent(termino)}`;
        }, 1500);
    }

    agregarMensajeUsuario(texto, scroll = true) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const mensajeHTML = `
            <div class="chatbot-message user-message">
                <div class="message-content">${this.escapeHtml(texto)}</div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', mensajeHTML);
        this.mensajes.push({ tipo: 'usuario', texto });
        if (scroll) this.scrollToBottom();
    }

    agregarMensajeBot(texto, sugerencias = null, scroll = true) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const mensajeHTML = `
            <div class="chatbot-message bot-message">
                <div class="bot-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5"></path>
                        <path d="M2 12l10 5 10-5"></path>
                    </svg>
                </div>
                <div class="message-content">${this.escapeHtml(texto).replace(/\n/g, '<br>')}</div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', mensajeHTML);
        this.mensajes.push({ tipo: 'bot', texto });
        
        // Actualizar sugerencias si existen
        if (sugerencias && sugerencias.length > 0) {
            this.mostrarSugerencias(sugerencias);
        } else {
            // Ocultar sugerencias si no hay
            document.getElementById('chatbot-suggestions').style.display = 'none';
        }
        
        if (scroll) this.scrollToBottom();
    }

    mostrarSugerencias(sugerencias) {
        const container = document.getElementById('chatbot-suggestions');
        const html = sugerencias.map(sug => 
            `<button class="suggestion-btn">${this.escapeHtml(sug)}</button>`
        ).join('');
        container.innerHTML = html;
        container.style.display = 'flex';
    }

    mostrarEscribiendo() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingHTML = `
            <div class="chatbot-message bot-message typing-indicator" id="typing-indicator">
                <div class="bot-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5"></path>
                        <path d="M2 12l10 5 10-5"></path>
                    </svg>
                </div>
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        this.scrollToBottom();
    }

    ocultarEscribiendo() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Inicializar el chatbot cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
    // Verificar que NO estamos en la página de mensajes
    const pathname = window.location.pathname;
    
    if (!pathname.includes('mensajes.php')) {
        window.chatbot = new ChatbotManager();
    }
});