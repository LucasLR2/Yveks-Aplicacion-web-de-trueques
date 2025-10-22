class ChatManager {
    constructor() {
        this.conversacionActual = null;
        this.conversaciones = [];
        this.polling = null;
        this.isMobile = window.innerWidth < 1024;
        this.imagenesSeleccionadas = [];
        this.lightboxImagenes = [];
        this.lightboxIndex = 0;
        this.mensajeRespondiendo = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupKeyboardShortcuts();  
        this.cargarConversaciones();
        this.iniciarPolling();
        this.setupLightbox();
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

        // Adjuntar imagen - Móvil
        const btnAdjuntarMovil = document.getElementById('btn-adjuntar');
        const inputImagenMovil = document.getElementById('input-imagen');

        if (btnAdjuntarMovil && inputImagenMovil) {
            btnAdjuntarMovil.addEventListener('click', () => {
                inputImagenMovil.click();
            });
            
            inputImagenMovil.addEventListener('change', (e) => {
                this.handleImageSelect(e, false);
            });
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

        // Adjuntar imagen - Desktop
        const btnAdjuntarDesktop = document.getElementById('btn-adjuntar-desktop');
        const inputImagenDesktop = document.getElementById('input-imagen-desktop');

        if (btnAdjuntarDesktop && inputImagenDesktop) {
            btnAdjuntarDesktop.addEventListener('click', () => {
                inputImagenDesktop.click();
            });
            
            inputImagenDesktop.addEventListener('change', (e) => {
                this.handleImageSelect(e, true);
            });
        }

        // Emoji picker - Móvil
        const btnEmojiMovil = document.getElementById('btn-emoji');
        const emojiPickerMovil = document.getElementById('emoji-picker');

        if (btnEmojiMovil && emojiPickerMovil) {
            this.setupEmojiPicker(btnEmojiMovil, emojiPickerMovil, inputMovil);
        }

        // Emoji picker - Desktop 
        const btnEmojiDesktop = document.getElementById('btn-emoji-desktop');
        const emojiPickerDesktop = document.getElementById('emoji-picker-desktop');

        if (btnEmojiDesktop && emojiPickerDesktop) {
            this.setupEmojiPicker(btnEmojiDesktop, emojiPickerDesktop, inputDesktop);
        }

        // Event listeners para botón de responder
        setTimeout(() => {
            document.querySelectorAll('.mensaje-reply-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const idMensaje = parseInt(btn.dataset.mensajeId);
                    const contenido = btn.dataset.contenido;
                    const nombre = btn.dataset.nombre;
                    this.responderMensaje(idMensaje, contenido, nombre);
                });
            });
        }, 100);

    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // ESC - Salir del chat
            if (e.key === 'Escape' && this.conversacionActual) {
                if (this.isMobile) {
                    this.cerrarChat();
                } else {
                    // En desktop, deseleccionar chat
                    this.conversacionActual = null;
                    document.getElementById('chat-desktop-view').classList.add('hidden');
                    document.getElementById('chat-desktop-empty').classList.remove('hidden');
                    document.querySelectorAll('.conversacion-item').forEach(item => {
                        item.classList.remove('active');
                    });
                }
            }
            
            // ArrowUp - Editar último mensaje propio
            if (e.key === 'ArrowUp' && this.conversacionActual) {
                const input = this.isMobile 
                    ? document.getElementById('input-mensaje')
                    : document.getElementById('input-mensaje-desktop');
                
                // Solo editar si el input está vacío
                if (!input.value.trim()) {
                    e.preventDefault();
                    
                    // Buscar el último mensaje propio
                    const contenedor = this.isMobile 
                        ? document.getElementById('chat-mensajes')
                        : document.getElementById('chat-mensajes-desktop');
                    
                    if (!contenedor) return;
                    
                    const mensajesPropios = Array.from(contenedor.querySelectorAll('.mensaje-mio .mensaje-bubble'))
                        .filter(bubble => !bubble.querySelector('.mensaje-eliminado'));
                    
                    if (mensajesPropios.length === 0) return;
                    
                    const ultimoBubble = mensajesPropios[mensajesPropios.length - 1];
                    const enviadoEn = ultimoBubble.dataset.enviadoEn;
                    
                    // Verificar si puede editar (dentro de 15 minutos)
                    if (this.puedeEditar(enviadoEn)) {
                        this.editarUltimoMensaje();
                    }
                }
            }
        });
    }

    editarUltimoMensaje() {
        // Buscar el último mensaje propio que no esté eliminado
        const contenedor = this.isMobile 
            ? document.getElementById('chat-mensajes')
            : document.getElementById('chat-mensajes-desktop');
        
        if (!contenedor) return;
        
        const mensajesPropios = Array.from(contenedor.querySelectorAll('.mensaje-mio .mensaje-bubble'))
            .filter(bubble => !bubble.querySelector('.mensaje-eliminado'));
        
        if (mensajesPropios.length === 0) return;
        
        // Obtener el último mensaje propio
        const ultimoBubble = mensajesPropios[mensajesPropios.length - 1];
        const idMensaje = parseInt(ultimoBubble.dataset.mensajeId);
        const enviadoEn = ultimoBubble.dataset.enviadoEn;
        
        // Llamar a la función de editar
        this.editarMensaje(idMensaje);
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
                            <p class="text-xs text-green mt-1">${conv.producto}</p>
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

        // Enfocar el input
        setTimeout(() => {
            const input = this.isMobile 
                ? document.getElementById('input-mensaje')
                : document.getElementById('input-mensaje-desktop');
            if (input) {
                input.focus();
            }
        }, 100);
    }

    async cargarMensajes() {
        try {
            const response = await fetch(`/php/chat/obtener-mensajes.php?id_conversacion=${this.conversacionActual}`);
            const text = await response.text();
            console.log('Respuesta de obtener-mensajes.php:', text);
            
            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error('Error parseando JSON:', text);
                return;
            }

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
            : this.agruparMensajes(mensajes);

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

        // Event listeners para abrir imágenes en lightbox
        setTimeout(() => {
            document.querySelectorAll('.mensaje-imagen-item').forEach(item => {
                item.addEventListener('click', () => {
                    const imagenes = JSON.parse(item.dataset.imagenes);
                    const index = parseInt(item.dataset.index);
                    this.abrirLightbox(imagenes, index);
                });
            });
        }, 100);

        // Event listeners para menú de opciones
        setTimeout(() => {
            document.querySelectorAll('.mensaje-options-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const idMensaje = parseInt(btn.dataset.mensajeId);
                    const esMio = btn.dataset.esMio === 'true';
                    this.mostrarMenuMensaje(btn, idMensaje, esMio);
                });
            });
        }, 100);

        // Event listeners para botón de responder
        document.querySelectorAll('.mensaje-reply-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idMensaje = parseInt(btn.dataset.mensajeId);
                const contenido = btn.dataset.contenido;
                const nombre = btn.dataset.nombre;
                this.responderMensaje(idMensaje, contenido, nombre);
            });
        });
    }

    agruparMensajes(mensajes) {
        let html = '';
        let grupoActual = [];
        let emisorActual = null;
        let minutoActual = null;

        for (let i = 0; i < mensajes.length; i++) {
            const msg = mensajes[i];
            const fecha = new Date(msg.enviado_en);
            fecha.setHours(fecha.getHours() - 3);
            const minuto = fecha.toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit' });
            const esMismoEmisor = msg.es_mio === emisorActual;
            const esMismoMinuto = minuto === minutoActual;

            // Si cambió el emisor o el minuto, renderizar el grupo anterior
            if (!esMismoEmisor || !esMismoMinuto) {
                if (grupoActual.length > 0) {
                    html += this.renderGrupoMensajes(grupoActual, emisorActual, minutoActual);
                }
                grupoActual = [];
            }

            // Agregar mensaje al grupo actual
            grupoActual.push(msg);
            emisorActual = msg.es_mio;
            minutoActual = minuto;
        }

        // Renderizar el último grupo
        if (grupoActual.length > 0) {
            html += this.renderGrupoMensajes(grupoActual, emisorActual, minutoActual);
        }

        return html;
    }

    renderGrupoMensajes(mensajes, esMio, tiempo) {
        
        console.log('Renderizando grupo de mensajes:', mensajes);
        const claseAlineacion = esMio ? 'mensaje-mio' : 'mensaje-otro';
        let html = '';

        mensajes.forEach((msg, index) => {
            let contenidoHTML = '';

            console.log('Procesando mensaje:', msg.id, 'responde_a:', msg.responde_a, 'contenido respuesta:', msg.responde_a_contenido);

            // Si es una respuesta, mostrar el contexto PRIMERO
            if (msg.responde_a) {
                console.log('ENTRANDO AL IF - Mostrando contexto de respuesta');
                const colorBorde = esMio ? 'rgba(255, 255, 255, 0.5)' : '#719177';
                contenidoHTML += `
                    <div class="mensaje-reply-context" style="border-left-color: ${colorBorde}">
                        <div class="mensaje-reply-context-author">${msg.responde_a_nombre || 'Usuario'}</div>
                        <div class="mensaje-reply-context-text">${msg.responde_a_contenido || 'Mensaje'}</div>
                    </div>
                `;
            }
            
            // Detectar si tiene imágenes
            if (msg.imagenes && msg.imagenes.length > 0) {
                const imagenes = typeof msg.imagenes === 'string' ? JSON.parse(msg.imagenes) : msg.imagenes;
                const gridClass = imagenes.length === 1 ? 'single' : 
                                imagenes.length === 2 ? 'double' : 
                                imagenes.length === 3 ? 'triple' : 'multiple';
                
                contenidoHTML += `<div class="mensaje-imagenes-grid ${gridClass}">`;
                
                imagenes.forEach((img, idx) => {
                    if (idx < 4) {
                        const extraClass = imagenes.length === 3 && idx === 2 ? 'triple-third' : '';
                        const overlay = idx === 3 && imagenes.length > 4 ? 
                            `<div class="mensaje-imagen-overlay">+${imagenes.length - 4}</div>` : '';
                        
                        contenidoHTML += `
                            <div class="mensaje-imagen-item ${extraClass}" data-imagenes='${JSON.stringify(imagenes)}' data-index="${idx}">
                                <img src="/${img}" alt="Imagen">
                                ${overlay}
                            </div>
                        `;
                    }
                });
                
                contenidoHTML += '</div>';
                
                // Si hay texto además de imágenes
                if (msg.contenido && msg.tipo_mensaje === 'imagen_texto') {
                    contenidoHTML += `<div class="mensaje-texto">${msg.contenido}</div>`;
                }
            }
            // Mensaje de solo texto
            else if (!msg.tipo_mensaje || msg.tipo_mensaje === 'texto') {
                contenidoHTML += `<span class="mensaje-texto-emoji">${msg.contenido}</span>`;
            }

            // Verificar si está eliminado
            let contenidoFinal = contenidoHTML;
            if (msg.eliminado) {
                if (msg.eliminado_para_todos) {
                    contenidoFinal = '<span class="mensaje-eliminado">Este mensaje fue eliminado</span>';
                } else {
                    contenidoFinal = '<span class="mensaje-eliminado">Eliminaste este mensaje</span>';
                }
            }

            html += `
                <div class="mensaje-wrapper ${claseAlineacion}">
                    <div class="mensaje-bubble ${msg.imagenes ? 'mensaje-con-imagenes' : ''}" data-mensaje-id="${msg.id}" data-enviado-en="${msg.enviado_en}">
                        ${!msg.eliminado ? `
                            <button class="mensaje-reply-btn" data-mensaje-id="${msg.id}" data-contenido="${this.escapeHtml(msg.contenido || 'Imagen')}" data-nombre="${msg.es_mio ? 'Tú' : this.getNombreOtroUsuario()}">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M9 14l-4-4 4-4M5 10h11a4 4 0 0 1 0 8h-1"></path>
                                </svg>
                            </button>
                            <button class="mensaje-options-btn" data-mensaje-id="${msg.id}" data-es-mio="${msg.es_mio}">⋮</button>
                        ` : ''}
                        <div>
                            ${contenidoFinal}
                            ${msg.editado && !msg.eliminado ? '<span class="mensaje-editado">editado</span>' : ''}
                        </div>
                    </div>
                </div>
            `;
        });

        // Agregar el tiempo solo una vez al final del grupo
        html += `<div class="mensaje-tiempo">${tiempo}</div>`;

        return html;
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

    async enviarMensaje() {
        console.log('enviarMensaje llamado. mensajeEditando:', this.mensajeEditando);
        
        // Si estamos editando, guardar edición en lugar de enviar nuevo
        if (this.mensajeEditando) {
            console.log('Detectado modo edición, llamando guardarEdicion');
            await this.guardarEdicion();
            return;
        }
        
        const input = this.isMobile 
            ? document.getElementById('input-mensaje')
            : document.getElementById('input-mensaje-desktop');
        
        const contenido = input.value.trim();
        
        // Validar que haya contenido o imágenes
        if (!contenido && this.imagenesSeleccionadas.length === 0) return;
        if (!this.conversacionActual) return;

        try {
            const formData = new FormData();
            formData.append('id_conversacion', this.conversacionActual);

            // Si estamos respondiendo a un mensaje
            if (this.mensajeRespondiendo) {
                formData.append('responde_a', this.mensajeRespondiendo.id);
            }
            
            if (this.imagenesSeleccionadas.length > 0) {
                // Enviar múltiples imágenes
                this.imagenesSeleccionadas.forEach((file, index) => {
                    formData.append(`imagenes[]`, file);
                });
                formData.append('tipo_mensaje', this.imagenesSeleccionadas.length > 0 && contenido ? 'imagen_texto' : 'imagen');
                if (contenido) {
                    formData.append('contenido', contenido);
                }
            } else {
                formData.append('contenido', contenido);
                formData.append('tipo_mensaje', 'texto');
            }

            const response = await fetch('/php/chat/enviar-mensaje.php', {
                method: 'POST',
                body: formData
            });

            const text = await response.text();
            console.log('Respuesta del servidor:', text);

            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error('Error parseando JSON:', text);
                alert('Error del servidor: ' + text.substring(0, 200));
                return;
            }

            if (data.success) {
                input.value = '';
                this.cancelarRespuesta();
                const btnEnviar = this.isMobile 
                    ? document.getElementById('btn-enviar')
                    : document.getElementById('btn-enviar-desktop');
                btnEnviar.disabled = true;
                
                // Limpiar preview e imágenes seleccionadas
                this.imagenesSeleccionadas = [];
                const inputFile = this.isMobile 
                    ? document.getElementById('input-imagen')
                    : document.getElementById('input-imagen-desktop');
                inputFile.value = '';
                this.mostrarPreviewImagenes(!this.isMobile);
                
                await this.cargarMensajes();
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
        }, 2000);
    }

    detenerPolling() {
        if (this.polling) {
            clearInterval(this.polling);
        }
    }

    handleImageSelect(event, isDesktop) {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;

        // Validar máximo 5 imágenes
        const totalImagenes = this.imagenesSeleccionadas.length + files.length;
        if (totalImagenes > 5) {
            alert('Máximo 5 imágenes por mensaje');
            return;
        }

        // Validar cada archivo
        for (const file of files) {
            if (!file.type.startsWith('image/')) {
                alert('Solo se permiten imágenes');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert('Imagen muy grande. Máximo 5MB por imagen');
                return;
            }
        }

        // Agregar a las seleccionadas
        this.imagenesSeleccionadas.push(...files);
        this.mostrarPreviewImagenes(isDesktop);
        
        // Habilitar botón enviar
        const btnEnviar = isDesktop 
            ? document.getElementById('btn-enviar-desktop')
            : document.getElementById('btn-enviar');
        btnEnviar.disabled = false;
    }

    mostrarPreviewImagenes(isDesktop) {
        const container = isDesktop 
            ? document.getElementById('images-preview-desktop')
            : document.getElementById('images-preview');
        
        if (this.imagenesSeleccionadas.length === 0) {
            container.style.display = 'none';
            container.innerHTML = '';
            return;
        }

        container.style.display = 'flex';
        container.innerHTML = '';

        this.imagenesSeleccionadas.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const item = document.createElement('div');
                item.className = 'image-preview-item';
                
                // Mostrar overlay "+N" solo en la 5ta imagen si hay más
                if (index === 4 && this.imagenesSeleccionadas.length > 5) {
                    const remaining = this.imagenesSeleccionadas.length - 4;
                    item.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <div class="image-preview-overlay">+${remaining}</div>
                        <button class="image-preview-close" data-index="${index}">×</button>
                    `;
                } else if (index < 5) {
                    item.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button class="image-preview-close" data-index="${index}">×</button>
                    `;
                    container.appendChild(item);
                }
                
                if (index < 5) {
                    container.appendChild(item);
                }
            };
            reader.readAsDataURL(file);
        });

        // Event listeners para cerrar
        setTimeout(() => {
            container.querySelectorAll('.image-preview-close').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    this.imagenesSeleccionadas.splice(index, 1);
                    this.mostrarPreviewImagenes(isDesktop);
                    
                    // Deshabilitar botón si no hay imágenes ni texto
                    const input = isDesktop 
                        ? document.getElementById('input-mensaje-desktop')
                        : document.getElementById('input-mensaje');
                    const btnEnviar = isDesktop 
                        ? document.getElementById('btn-enviar-desktop')
                        : document.getElementById('btn-enviar');
                    btnEnviar.disabled = this.imagenesSeleccionadas.length === 0 && !input.value.trim();
                });
            });
        }, 100);
    }

    setupLightbox() {
        const lightbox = document.getElementById('image-lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const closeBtn = document.getElementById('lightbox-close');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        const counter = document.getElementById('lightbox-counter');

        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });

        prevBtn.addEventListener('click', () => {
            this.lightboxIndex = (this.lightboxIndex - 1 + this.lightboxImagenes.length) % this.lightboxImagenes.length;
            this.updateLightbox();
        });

        nextBtn.addEventListener('click', () => {
            this.lightboxIndex = (this.lightboxIndex + 1) % this.lightboxImagenes.length;
            this.updateLightbox();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'none') return;
            if (e.key === 'Escape') lightbox.style.display = 'none';
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
        });
    }

    updateLightbox() {
        const lightboxImage = document.getElementById('lightbox-image');
        const counter = document.getElementById('lightbox-counter');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');

        lightboxImage.src = '/' + this.lightboxImagenes[this.lightboxIndex];
        counter.textContent = `${this.lightboxIndex + 1} / ${this.lightboxImagenes.length}`;
        
        // Mostrar/ocultar botones de navegación
        prevBtn.style.display = this.lightboxImagenes.length > 1 ? 'flex' : 'none';
        nextBtn.style.display = this.lightboxImagenes.length > 1 ? 'flex' : 'none';
    }

    abrirLightbox(imagenes, index) {
        this.lightboxImagenes = imagenes;
        this.lightboxIndex = index;
        this.updateLightbox();
        document.getElementById('image-lightbox').style.display = 'flex';
    }

    mostrarMenuMensaje(btnElement, idMensaje, esMio) {
        // Cerrar menú anterior si existe
        this.cerrarMenuMensaje();

        // Crear overlay
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        overlay.onclick = () => this.cerrarMenuMensaje();
        document.body.appendChild(overlay);

        // Crear menú
        const menu = document.createElement('div');
        menu.className = 'mensaje-menu';
        menu.id = 'mensaje-menu-activo';

        // Opciones del menú
        let opciones = '';

        if (esMio) {
            // Verificar si puede editar (dentro de 15 minutos)
            const mensaje = this.obtenerMensajePorId(idMensaje);
            if (mensaje && this.puedeEditar(mensaje.enviado_en)) {
                opciones += `
                    <button class="mensaje-menu-item" onclick="window.chatManager.editarMensaje(${idMensaje})">
                        Editar mensaje
                    </button>
                `;
            }
            
            opciones += `
                <button class="mensaje-menu-item danger" onclick="window.chatManager.eliminarMensaje(${idMensaje}, 'para_todos')">
                    Eliminar para todos
                </button>
            `;
        }

        opciones += `
            <button class="mensaje-menu-item danger" onclick="window.chatManager.eliminarMensaje(${idMensaje}, 'para_mi')">
                Eliminar para mí
            </button>
        `;

        menu.innerHTML = opciones;
        document.body.appendChild(menu);

        // Posicionar menú
        const btnRect = btnElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Hacer visible temporalmente para medir
        menu.style.visibility = 'hidden';
        menu.style.display = 'block';
        const menuHeight = menu.offsetHeight;
        menu.style.visibility = 'visible';

        // Decidir posición vertical según mitad de pantalla
        const mitadPantalla = viewportHeight / 2;

        if (btnRect.top < mitadPantalla) {
            // Está en la mitad superior: menú abajo
            menu.style.top = (btnRect.bottom + 8) + 'px';
        } else {
            // Está en la mitad inferior: menú arriba
            menu.style.top = (btnRect.top - menuHeight - 8) + 'px';
        }

        // Posición horizontal - centrar con el botón
        const menuWidth = menu.offsetWidth;
        menu.style.left = (btnRect.left + (btnRect.width / 2) - (menuWidth / 2)) + 'px';

        // Prevenir que el click en el menú lo cierre
        menu.addEventListener('click', (e) => e.stopPropagation());
    }

    cerrarMenuMensaje() {
        const menu = document.getElementById('mensaje-menu-activo');
        if (menu) menu.remove();

        const overlay = document.querySelector('.menu-overlay');
        if (overlay) overlay.remove();
    }

    async eliminarMensaje(idMensaje, tipo) {
        this.cerrarMenuMensaje();

        try {
            const formData = new FormData();
            formData.append('id_mensaje', idMensaje);
            formData.append('tipo', tipo);

            const response = await fetch('/php/chat/eliminar-mensaje.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                await this.cargarMensajes();
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error eliminando mensaje:', error);
            alert('Error al eliminar el mensaje');
        }
    }

    obtenerMensajePorId(idMensaje) {
        const contenedorMovil = document.getElementById('chat-mensajes');
        const contenedorDesktop = document.getElementById('chat-mensajes-desktop');
        const contenedor = contenedorMovil?.innerHTML ? contenedorMovil : contenedorDesktop;
        
        const bubbles = contenedor.querySelectorAll('.mensaje-bubble');
        for (const bubble of bubbles) {
            if (parseInt(bubble.dataset.mensajeId) === idMensaje) {
                // Buscar en los datos cargados
                const allBubbles = document.querySelectorAll(`[data-mensaje-id="${idMensaje}"]`);
                if (allBubbles.length > 0) {
                    // Necesitamos el timestamp, lo guardaremos cuando renderizamos
                    return { id: idMensaje, enviado_en: bubble.dataset.enviadoEn };
                }
            }
        }
        return null;
    }

    puedeEditar(enviadoEn) {
        const ahora = new Date();
        const fechaEnvio = new Date(enviadoEn);
        
        // Ajustar por la zona horaria si es necesario (tu servidor está en UTC-3)
        fechaEnvio.setHours(fechaEnvio.getHours() - 3);
        
        const diferenciaMinutos = (ahora - fechaEnvio) / (1000 * 60);
        
        console.log('Verificando edición:', {
            ahora: ahora.toLocaleString(),
            fechaEnvio: fechaEnvio.toLocaleString(),
            diferenciaMinutos: diferenciaMinutos,
            puedeEditar: diferenciaMinutos <= 15
        });
        
        return diferenciaMinutos <= 15;
    }

    async editarMensaje(idMensaje) {
        this.cerrarMenuMensaje();
        
        const inputMovil = document.getElementById('input-mensaje');
        const inputDesktop = document.getElementById('input-mensaje-desktop');
        const input = this.isMobile ? inputMovil : inputDesktop;
        
        const bubble = document.querySelector(`[data-mensaje-id="${idMensaje}"]`);
        if (!bubble) return;
        
        const contenidoDiv = bubble.querySelector('div:last-child');
        // Buscar el span de "editado" y excluirlo
        const spanEditado = contenidoDiv.querySelector('.mensaje-editado');
        let textoActual;
        if (spanEditado) {
            // Clonar el div, remover el span de editado y obtener el texto
            const divClonado = contenidoDiv.cloneNode(true);
            const spanEditadoClonado = divClonado.querySelector('.mensaje-editado');
            if (spanEditadoClonado) {
                spanEditadoClonado.remove();
            }
            textoActual = divClonado.textContent.trim();
        } else {
            textoActual = contenidoDiv.textContent.trim();
        }
        
        // Colocar texto en el input
        input.value = textoActual;
        input.focus();
        
        // Crear banner de edición
        const banner = document.createElement('div');
        banner.className = 'edit-banner';
        banner.id = 'edit-banner-activo';
        banner.innerHTML = `
            <div class="edit-banner-content">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                <div class="edit-banner-text">
                    <div class="edit-banner-title">Editando el mensaje</div>
                    <div class="edit-banner-preview">${textoActual.substring(0, 50)}${textoActual.length > 50 ? '...' : ''}</div>
                </div>
            </div>
            <button class="edit-banner-close">×</button>
        `;
        
        const chatContainer = this.isMobile 
            ? document.querySelector('#chat-view .chat-input-container')
            : document.querySelector('#chat-desktop-view .chat-input-container');
        
        chatContainer.parentElement.insertBefore(banner, chatContainer);
        
        // Guardar referencia
        this.mensajeEditando = idMensaje;
        this.textoOriginal = textoActual;
        
        // Event listeners
        const closeBtn = banner.querySelector('.edit-banner-close');
        closeBtn.addEventListener('click', () => this.cancelarEdicion());
        
        // Modificar el evento de enviar
        const btnEnviar = this.isMobile 
            ? document.getElementById('btn-enviar')
            : document.getElementById('btn-enviar-desktop');
        btnEnviar.disabled = false;
    }

    cancelarEdicion() {
        const banner = document.getElementById('edit-banner-activo');
        if (banner) banner.remove();
        
        this.mensajeEditando = null;
        this.textoOriginal = null;
        
        const input = this.isMobile 
            ? document.getElementById('input-mensaje')
            : document.getElementById('input-mensaje-desktop');
        input.value = '';
        
        const btnEnviar = this.isMobile 
            ? document.getElementById('btn-enviar')
            : document.getElementById('btn-enviar-desktop');
        btnEnviar.disabled = true;
    }

    async guardarEdicion() {
        const input = this.isMobile 
            ? document.getElementById('input-mensaje')
            : document.getElementById('input-mensaje-desktop');
        
        const nuevoTexto = input.value.trim();
        
        if (!nuevoTexto || nuevoTexto === this.textoOriginal) {
            this.cancelarEdicion();
            return;
        }
        
        try {
            const formData = new FormData();
            formData.append('id_mensaje', this.mensajeEditando);
            formData.append('contenido', nuevoTexto);
            
            const response = await fetch('/php/chat/editar-mensaje.php', {
                method: 'POST',
                body: formData
            });
            
            const text = await response.text();
            console.log('Respuesta del servidor al editar:', text);
            let data;
            try {
                data = JSON.parse(text);
                console.log('Data parseada:', data);
            } catch (e) {
                console.error('Error parseando JSON:', text);
                alert('Error del servidor');
                return;
            }

            if (data.success) {
                console.log('Edición exitosa, cancelando banner...');
                this.cancelarEdicion();
                await this.cargarMensajes();
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error editando mensaje:', error);
            alert('Error al editar el mensaje');
        }
    }

    setupEmojiPicker(btn, picker, input) {
        const emojis = [
            '😀','😃','😄','😁','😆','😅',
            '🤣','😂','🙂','🙃','😉','😊',
            '😇','🥰','😍','🤩','😘','😗',
            '😚','😙','😋','😛','😜','🤪',
            '😝','🤑','🤗','🤭','🤫','🤔',
            '🤐','🤨','😐','😑','😶','😏',
            '😒','🙄','😬','🤥','😌','😔',
            '😪','🤤','😴','😷','🤒','🤕',
            '🤢','🤮','🤧','🥵','🥶','🥴',
            '😵','🤯','🤠','🥳','😎','🤓',
            '🧐','😕','😟','🙁','☹️','😮',
            '😯','😲','😳','🥺','😦','😧',
            '😨','😰','😥','😢','😭','😱',
            '😖','😣','😞','😓','😩','😫',
            '🥱','😤','😡','😠','🤬','😈',
            '👿','💀','☠️','💩','🤡','👹',
            '👺','👻','👽','👾','🤖','😺',
            '😸','😹','😻','😼','😽','🙀',
            '😿','😾','👋','🤚','🖐️','✋',
            '🖖','👌','🤏','✌️','🤞','🤟',
            '🤘','🤙','👈','👉','👆','👇',
            '☝️','👍','👎','✊','👊','🤛',
            '🤜','👏','🙌','👐','🤲','🤝',
            '🙏','❤️','🧡','💛','💚','💙',
            '💜','🖤','🤍','🤎','💔','❣️',
            '💕','💞','💓','💗','💖','💘',
            '💝','💟','🔥','✨','💫','⭐',
            '🌟','💯','💢','💥','💦','💨',
            '🎉','🎊','🎈','🎁','🏆','🥇',
            '🥈','🥉','⚽','🏀','🏈','⚾',
            '🎾','🏐','🏉','🎱','🥏','🏓',
            '🏸','🥊','🥋','🎯','🎮','🎰',
            '🧩','🎲','🧸','🪀','🪁','🎵',
            '🎶','🎤','🎧','🎹','🥁','🎷',
            '🎺','🎸','🎻','🪕','🎬','🎨',
            '🧵','🧶','🪡','🪚','🔨','⚒️',
            '🛠️','🪛','🧰','⚙️','🪤','💡',
            '🔦','🕯️','🪔','🧯','🪣','🧹',
            '🧺','🧻','🧼','🪥','🧽','🪠',
        ];

        
        // Crear grid de emojis
        const grid = document.createElement('div');
        grid.className = 'emoji-grid';
        emojis.forEach(emoji => {
            const item = document.createElement('span');
            item.className = 'emoji-item';
            item.textContent = emoji;
            item.onclick = () => {
            input.value += emoji;
            input.focus();
            // NO cerrar el picker
            // Habilitar botón enviar
            const btnEnviar = this.isMobile 
                ? document.getElementById('btn-enviar')
                : document.getElementById('btn-enviar-desktop');
            btnEnviar.disabled = false;
        };
            grid.appendChild(item);
        });

        // Convertir emojis a imágenes Twemoji (estilo flat)
        if (typeof twemoji !== 'undefined') {
            twemoji.parse(grid, {
                folder: 'svg',
                ext: '.svg'
            });
        }
        picker.appendChild(grid);
        
        // Toggle picker
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            picker.classList.toggle('show');
        });
        
        // Cerrar al enviar mensaje
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                picker.classList.remove('show');
            }
        });

        const btnEnviar = this.isMobile 
            ? document.getElementById('btn-enviar')
            : document.getElementById('btn-enviar-desktop');
            
        if (btnEnviar) {
            btnEnviar.addEventListener('click', () => {
                picker.classList.remove('show');
            });
        }

        // Cerrar al hacer click fuera
        const closeOnClickOutside = (e) => {
            const isClickInsidePicker = picker.contains(e.target);
            const isClickOnButton = btn.contains(e.target);
            
            if (!isClickInsidePicker && !isClickOnButton && picker.classList.contains('show')) {
                picker.classList.remove('show');
            }
        };

        document.addEventListener('click', closeOnClickOutside);
    }

    responderMensaje(idMensaje, contenido, nombre) {
        const input = this.isMobile 
            ? document.getElementById('input-mensaje')
            : document.getElementById('input-mensaje-desktop');
        
        input.focus();
        
        // Crear banner de respuesta
        const banner = document.createElement('div');
        banner.className = 'reply-banner';
        banner.id = 'reply-banner-activo';
        banner.innerHTML = `
            <div class="reply-banner-content">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 14l-4-4 4-4M5 10h11a4 4 0 0 1 0 8h-1"></path>
                </svg>
                <div class="reply-banner-text">
                    <div class="reply-banner-title">Respondiendo a ${nombre}</div>
                    <div class="reply-banner-preview">${contenido.substring(0, 50)}${contenido.length > 50 ? '...' : ''}</div>
                </div>
            </div>
            <button class="reply-banner-close">×</button>
        `;
        
        const chatContainer = this.isMobile 
            ? document.querySelector('#chat-view .chat-input-container')
            : document.querySelector('#chat-desktop-view .chat-input-container');
        
        chatContainer.parentElement.insertBefore(banner, chatContainer);
        
        // Guardar referencia
        this.mensajeRespondiendo = { id: idMensaje, contenido, nombre };
        
        // Event listener para cerrar
        const closeBtn = banner.querySelector('.reply-banner-close');
        closeBtn.addEventListener('click', () => this.cancelarRespuesta());
    }

    cancelarRespuesta() {
        const banner = document.getElementById('reply-banner-activo');
        if (banner) banner.remove();
        
        this.mensajeRespondiendo = null;
    }

    renderMensajeConRespuesta(msg) {
        let html = '';
        
        // Si el mensaje es una respuesta, mostrar el contexto
        if (msg.responde_a) {
            html += `
                <div class="mensaje-reply-context">
                    <div class="mensaje-reply-context-author">${msg.responde_a_nombre || 'Usuario'}</div>
                    <div class="mensaje-reply-context-text">${msg.responde_a_contenido || 'Mensaje'}</div>
                </div>
            `;
        }
        
        return html;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    getNombreOtroUsuario() {
        // Obtener el nombre del chat header
        const nombreElement = this.isMobile 
            ? document.getElementById('chat-nombre')
            : document.getElementById('chat-nombre-desktop');
        return nombreElement ? nombreElement.textContent : 'Usuario';
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