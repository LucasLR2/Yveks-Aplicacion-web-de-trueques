class ChatManager {
    constructor() {
        this.conversacionActual = null;
        this.conversaciones = [];
        this.polling = null;
        this.isMobile = window.innerWidth < 1024;
        this.imagenesSeleccionadas = [];
        this.lightboxImagenes = [];
        this.lightboxIndex = 0;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
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
        }
        
        if (contenedorDesktop) {
            const estabaEnElFondo = contenedorDesktop.scrollHeight - contenedorDesktop.scrollTop <= contenedorDesktop.clientHeight + 100;
            contenedorDesktop.innerHTML = html;
            if (estabaEnElFondo || mensajes.length <= 5) {
                contenedorDesktop.scrollTop = contenedorDesktop.scrollHeight;
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
        fecha.setHours(fecha.getHours() - 3);
        const tiempo = fecha.toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit' });

        let contenidoHTML = '';
        
        // Detectar si tiene imágenes
        if (msg.imagenes && msg.imagenes.length > 0) {
            const imagenes = typeof msg.imagenes === 'string' ? JSON.parse(msg.imagenes) : msg.imagenes;
            const gridClass = imagenes.length === 1 ? 'single' : 
                            imagenes.length === 2 ? 'double' : 
                            imagenes.length === 3 ? 'triple' : 'multiple';
            
            contenidoHTML += `<div class="mensaje-imagenes-grid ${gridClass}">`;
            
            imagenes.forEach((img, index) => {
                if (index < 4) {
                    const extraClass = imagenes.length === 3 && index === 2 ? 'triple-third' : '';
                    const overlay = index === 3 && imagenes.length > 4 ? 
                        `<div class="mensaje-imagen-overlay">+${imagenes.length - 4}</div>` : '';
                    
                    contenidoHTML += `
                        <div class="mensaje-imagen-item ${extraClass}" data-imagenes='${JSON.stringify(imagenes)}' data-index="${index}">
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
            contenidoHTML = msg.contenido;
        }

        return `
            <div class="mensaje-bubble ${msg.es_mio ? 'mensaje-mio' : 'mensaje-otro'} ${msg.imagenes ? 'mensaje-con-imagenes' : ''}">
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
        
        // Validar que haya contenido o imágenes
        if (!contenido && this.imagenesSeleccionadas.length === 0) return;
        if (!this.conversacionActual) return;

        try {
            const formData = new FormData();
            formData.append('id_conversacion', this.conversacionActual);
            
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

            const data = await response.json();

            if (data.success) {
                input.value = '';
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
        }, 5000); // Cada 8 segundos
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