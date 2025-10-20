class ChatManager {
    constructor() {
        this.conversacionActual = null;
        this.conversaciones = [];
        this.polling = null;
        this.isMobile = window.innerWidth < 1024;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.cargarConversaciones();
        this.iniciarPolling();
    }

    setupEventListeners() {
        // Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.cambiarTab(e.target));
        });

        // Búsqueda
        const buscarMovil = document.getElementById('buscar-conversacion');
        const buscarDesktop = document.getElementById('buscar-conversacion-desktop');
        
        if (buscarMovil) {
            buscarMovil.addEventListener('input', (e) => this.buscarConversacion(e.target.value));
        }
        if (buscarDesktop) {
            buscarDesktop.addEventListener('input', (e) => this.buscarConversacion(e.target.value));
        }

        // Móvil
        const btnVolver = document.getElementById('btn-volver');
        if (btnVolver) {
            btnVolver.addEventListener('click', () => this.cerrarChat());
        }

        const inputMovil = document.getElementById('input-mensaje');
        const btnEnviarMovil = document.getElementById('btn-enviar');
        
        if (inputMovil) {
            inputMovil.addEventListener('input', (e) => {
                btnEnviarMovil.disabled = !e.target.value.trim();
            });
            inputMovil.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                    this.enviarMensaje();
                }
            });
        }
        
        if (btnEnviarMovil) {
            btnEnviarMovil.addEventListener('click', () => this.enviarMensaje());
        }

        // Desktop
        const inputDesktop = document.getElementById('input-mensaje-desktop');
        const btnEnviarDesktop = document.getElementById('btn-enviar-desktop');
        
        if (inputDesktop) {
            inputDesktop.addEventListener('input', (e) => {
                btnEnviarDesktop.disabled = !e.target.value.trim();
            });
            inputDesktop.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                    this.enviarMensaje();
                }
            });
        }
        
        if (btnEnviarDesktop) {
            btnEnviarDesktop.addEventListener('click', () => this.enviarMensaje());
        }
    }

    cambiarTab(btn) {
        const container = btn.closest('.tabs-container');
        const isRightTab = btn.classList.contains('tab-btn-right');
        
        // Animar el slider
        if (isRightTab) {
            container.classList.add('slide-right');
        } else {
            container.classList.remove('slide-right');
        }
        
        // Remover active de todos los tabs en el mismo contenedor
        container.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove('active');
        });
        
        // Agregar active al tab clickeado
        btn.classList.add('active');
    }

    async cargarConversaciones(busqueda = '') {
        try {
            const url = busqueda 
                ? `/php/chat/obtener-conversaciones.php?busqueda=${encodeURIComponent(busqueda)}`
                : '/php/chat/obtener-conversaciones.php';
            
            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                this.conversaciones = data.conversaciones;
                this.renderConversaciones();
            }
        } catch (error) {
            console.error('Error cargando conversaciones:', error);
        }
    }

    renderConversaciones() {
        const listaMovil = document.getElementById('conversaciones-lista');
        const listaDesktop = document.getElementById('conversaciones-lista-desktop');

        const html = this.conversaciones.length === 0 
            ? this.getEmptyStateHTML()
            : this.conversaciones.map(c => this.getConversacionHTML(c)).join('');

        if (listaMovil) listaMovil.innerHTML = html;
        if (listaDesktop) listaDesktop.innerHTML = html;

        // Agregar event listeners
        document.querySelectorAll('.conversacion-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                this.abrirConversacion(id);
            });
        });
    }

    getConversacionHTML(conv) {
        return `
            <div class="conversacion-item ${conv.id_conversacion === this.conversacionActual ? 'active' : ''}" 
                 data-id="${conv.id_conversacion}">
                <div class="flex items-center gap-3">
                    <div class="relative">
                        <img src="${conv.avatar}" alt="${conv.nombre}" 
                             class="w-12 h-12 rounded-full object-cover">
                        ${conv.mensajes_sin_leer > 0 ? '<div class="status-online"></div>' : ''}
                    </div>
                    
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-1">
                            <h3 class="text-gray-800 truncate">${conv.nombre}</h3>
                            <span class="text-xs text-gray-500">${conv.tiempo}</span>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <p class="text-sm text-gray-600 truncate flex-1">
                                ${conv.yo_envie_ultimo ? '<span class="text-gray-400">Tú: </span>' : ''}
                                ${conv.ultimo_mensaje || 'Sin mensajes'}
                            </p>
                            ${conv.mensajes_sin_leer > 0 ? `
                                <span class="badge-sin-leer ml-2">${conv.mensajes_sin_leer}</span>
                            ` : ''}
                        </div>
                        
                        ${conv.producto ? `
                            <p class="text-xs text-green mt-1">📦 ${conv.producto}</p>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    getEmptyStateHTML() {
        return `
            <div class="empty-state">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <p class="text-lg font-medium">No hay conversaciones</p>
                <p class="text-sm">Comienza a chatear con otros usuarios</p>
            </div>
        `;
    }

    async abrirConversacion(idConversacion) {
        this.conversacionActual = idConversacion;
        const conv = this.conversaciones.find(c => c.id_conversacion === idConversacion);
        
        if (!conv) return;

        // Actualizar UI
        if (this.isMobile) {
            document.getElementById('chat-view').classList.remove('hidden');
            document.getElementById('chat-avatar').src = conv.avatar;
            document.getElementById('chat-nombre').textContent = conv.nombre;
            document.getElementById('chat-producto').textContent = conv.producto || '';
        } else {
            document.getElementById('chat-desktop-empty').classList.add('hidden');
            document.getElementById('chat-desktop-view').classList.remove('hidden');
            document.getElementById('chat-avatar-desktop').src = conv.avatar;
            document.getElementById('chat-nombre-desktop').textContent = conv.nombre;
            document.getElementById('chat-producto-desktop').textContent = conv.producto || '';
        }

        // Marcar como activa
        document.querySelectorAll('.conversacion-item').forEach(item => {
            item.classList.toggle('active', parseInt(item.dataset.id) === idConversacion);
        });

        // Cargar mensajes
        await this.cargarMensajes();
        
        // Marcar como leído
        await this.marcarComoLeido();
    }

    async cargarMensajes() {
        try {
            const response = await fetch(`/php/chat/obtener-mensajes.php?id_conversacion=${this.conversacionActual}`);
            const data = await response.json();

            if (data.success) {
                this.renderMensajes(data.mensajes);
            }
        } catch (error) {
            console.error('Error cargando mensajes:', error);
        }
    }

    renderMensajes(mensajes) {
        const contenedorMovil = document.getElementById('chat-mensajes');
        const contenedorDesktop = document.getElementById('chat-mensajes-desktop');

        const html = mensajes.length === 0
            ? '<div class="empty-state"><p>No hay mensajes aún</p></div>'
            : mensajes.map(m => this.getMensajeHTML(m)).join('');

        if (contenedorMovil) {
            const estabaEnElFondo = contenedorMovil.scrollHeight - contenedorMovil.scrollTop <= contenedorMovil.clientHeight + 100;
            contenedorMovil.innerHTML = html;
            if (estabaEnElFondo || mensajes.length <= 5) {
                contenedorMovil.scrollTop = contenedorMovil.scrollHeight;
            }
        }
        
        if (contenedorDesktop) {
            const estabaEnElFondo = contenedorDesktop.scrollHeight - contenedorDesktop.scrollTop <= contenedorDesktop.clientHeight + 100;
            contenedorDesktop.innerHTML = html;
            if (estabaEnElFondo || mensajes.length <= 5) {
                contenedorDesktop.scrollTop = contenedorDesktop.scrollHeight;
            }
        }
    }

    async cargarMensajesSilencioso() {
        if (!this.conversacionActual) return;
        
        try {
            const response = await fetch(`/php/chat/obtener-mensajes.php?id_conversacion=${this.conversacionActual}`);
            const data = await response.json();

            if (data.success && data.mensajes.length > 0) {
                this.renderMensajes(data.mensajes);
            }
        } catch (error) {
            console.error('Error cargando mensajes:', error);
        }
    }

    getMensajeHTML(msg) {
        const fecha = new Date(msg.enviado_en);
        // Adelantar 9 horas
        fecha.setHours(fecha.getHours() - 3);
        const tiempo = fecha.toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit' });

        let contenidoHTML = msg.contenido;
        
        // Detectar si es una foto
        if (msg.contenido.toLowerCase().includes('foto') || msg.contenido === '📷 Foto') {
            contenidoHTML = `
                <div class="mensaje-imagen">
                    <img src="${baseURL}recursos/imagenes/7.jpg" alt="Imagen compartida" class="rounded-lg max-w-xs">
                </div>
            `;
        }
        
        // Detectar si es audio
        if (msg.contenido.toLowerCase().includes('audio') || msg.contenido.includes('🎵')) {
            contenidoHTML = `
                <div class="mensaje-audio flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-3 py-2">
                    <button class="audio-play-btn">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                        </svg>
                    </button>
                    <div class="flex-1 flex items-center gap-1">
                        <div class="w-1 h-3 bg-current rounded" style="animation: pulse 1s infinite;"></div>
                        <div class="w-1 h-4 bg-current rounded" style="animation: pulse 1s infinite 0.1s;"></div>
                        <div class="w-1 h-5 bg-current rounded" style="animation: pulse 1s infinite 0.2s;"></div>
                        <div class="w-1 h-4 bg-current rounded" style="animation: pulse 1s infinite 0.3s;"></div>
                        <div class="w-1 h-3 bg-current rounded" style="animation: pulse 1s infinite 0.4s;"></div>
                    </div>
                    <span class="text-xs">0:13</span>
                </div>
            `;
        }

        return `
            <div class="mensaje-bubble ${msg.es_mio ? 'mensaje-mio' : 'mensaje-otro'}">
                <div>${contenidoHTML}</div>
            </div>
            <div class="mensaje-tiempo">${tiempo}</div>
        `;
    }

    async enviarMensaje() {
        const input = this.isMobile 
            ? document.getElementById('input-mensaje')
            : document.getElementById('input-mensaje-desktop');
        
        const contenido = input.value.trim();
        if (!contenido || !this.conversacionActual) return;

        try {
            const formData = new FormData();
            formData.append('id_conversacion', this.conversacionActual);
            formData.append('contenido', contenido);

            const response = await fetch('/php/chat/enviar-mensaje.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                input.value = '';
                const btnEnviar = this.isMobile 
                    ? document.getElementById('btn-enviar')
                    : document.getElementById('btn-enviar-desktop');
                btnEnviar.disabled = true;
                
                await this.cargarMensajes();
                
                // Agregar clase 'nuevo' solo al último mensaje
                const contenedor = this.isMobile 
                    ? document.getElementById('chat-mensajes')
                    : document.getElementById('chat-mensajes-desktop');
                const ultimoMensaje = contenedor.lastElementChild;
                if (ultimoMensaje) {
                    ultimoMensaje.classList.add('nuevo');
                }
                
                await this.cargarConversaciones();
            } else {
                alert('Error al enviar mensaje: ' + data.error);
            }
        } catch (error) {
            console.error('Error enviando mensaje:', error);
            alert('Error al enviar el mensaje');
        }
    }

    async marcarComoLeido() {
        try {
            const formData = new FormData();
            formData.append('id_conversacion', this.conversacionActual);

            await fetch('/php/chat/marcar-leido.php', {
                method: 'POST',
                body: formData
            });

            await this.cargarConversaciones();
        } catch (error) {
            console.error('Error marcando como leído:', error);
        }
    }

    cerrarChat() {
        document.getElementById('chat-view').classList.add('hidden');
        this.conversacionActual = null;
    }

    buscarConversacion(termino) {
        this.cargarConversaciones(termino);
    }

    iniciarPolling() {
        this.polling = setInterval(async () => {
            if (this.conversacionActual) {
                // Si hay conversación activa, solo actualizar mensajes
                await this.cargarMensajesSilencioso();
            } else {
                // Si no hay conversación activa, actualizar lista de conversaciones
                await this.cargarConversaciones();
            }
        }, 5000); // Cada 8 segundos
    }

    detenerPolling() {
        if (this.polling) {
            clearInterval(this.polling);
        }
    }
}

// Inicializar cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
    window.chatManager = new ChatManager();
});

// Limpiar al salir
window.addEventListener('beforeunload', () => {
    if (window.chatManager) {
        window.chatManager.detenerPolling();
    }
});