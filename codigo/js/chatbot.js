class ChatbotManager {
    constructor() {
        this.isOpen = false;
        this.mensajes = [];
        this.esperandoRespuesta = false;
        this.init();
    }

    init() {
        this.crearWidget();
        this.cargarHistorial();
        this.verificarNuevoUsuario();
        this.setupEventListeners();
    }

    crearWidget() {
        const botonHTML = '';

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
        const toggle = document.getElementById('chatbot-btn');
        const minimize = document.getElementById('chatbot-minimize');
        const input = document.getElementById('chatbot-input');
        const send = document.getElementById('chatbot-send');

        toggle.addEventListener('click', () => this.toggleChat());
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
        const toggle = document.getElementById('chatbot-btn');
        const badge = document.getElementById('chatbot-badge');

        if (this.isOpen) {
            container.classList.add('active');
            badge.style.display = 'none';
            this.marcarComoVisto();
            
            // Focus en input
            setTimeout(() => {
                document.getElementById('chatbot-input').focus();
            }, 300);
        } else {
            container.classList.remove('active');
        }
    }

    async verificarNuevoUsuario() {
        try {
            const response = await fetch('php/chatbot.php?es_nuevo');
            const data = await response.json();
            
            if (data.es_nuevo) {
                // Mostrar badge y mensaje de bienvenida después de 2 segundos
                setTimeout(() => {
                    const badge = document.getElementById('chatbot-badge');
                    if (badge) badge.style.display = 'flex';
                    
                    // Auto-abrir y mostrar mensaje de bienvenida
                    setTimeout(() => {
                        this.toggleChat();
                        this.agregarMensajeBot(
                            "¡Hola! 👋 Soy el asistente de Dreva. Estoy aquí para ayudarte a encontrar productos, hacer intercambios y resolver tus dudas. ¿En qué puedo ayudarte?",
                            ['🔍 Buscar productos', '❓ ¿Cómo funciona?', '📦 Publicar producto']
                        );
                    }, 500);
                }, 2000);
            }
        } catch (error) {
            console.error('Error verificando usuario:', error);
        }
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
        
        // Agregar mensaje del usuario
        this.agregarMensajeUsuario(mensaje);
        input.value = '';
        document.getElementById('chatbot-send').disabled = true;
        
        // Mostrar indicador de escritura
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
            
            const data = await response.json();
            
            // Ocultar indicador de escritura
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

    agregarMensajeUsuario(texto, scroll = true) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const mensajeHTML = `
            <div class="chatbot-message user-message">
                <div class="message-content">${this.escapeHtml(texto)}</div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', mensajeHTML);
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
        
        // Actualizar sugerencias si existen
        if (sugerencias && sugerencias.length > 0) {
            this.mostrarSugerencias(sugerencias);
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