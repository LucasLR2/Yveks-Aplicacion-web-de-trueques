// Variables globales
let ofertasActuales = [];
let tipoActual = 'received'; // 'received' o 'made'

// Cargar ofertas al iniciar
document.addEventListener('DOMContentLoaded', function() {
    cargarOfertas('recibidas');
});

// Función para cambiar tipo de oferta
function switchOfferType(type, element) {
    // Actualizar botones activos
    document.querySelectorAll('.switch-option').forEach(btn => {
        btn.classList.remove('active');
    });
    element.classList.add('active');
    
    // Cargar ofertas del tipo seleccionado
    tipoActual = type;
    cargarOfertas(type);
}

// Función para cargar ofertas desde el servidor
async function cargarOfertas(tipo) {
    try {
        const response = await fetch(`obtener-ofertas.php?tipo=${tipo}`);
        const data = await response.json();
        
        console.log('Datos recibidos:', data); // Para debug

        if (data.ofertas && data.ofertas.length > 0) {
            console.log('Primera oferta completa:', data.ofertas[0]);
            console.log('Rating:', data.ofertas[0].rating);
            console.log('Reviews:', data.ofertas[0].reviews);
        }
        
        if (data.success) {
            ofertasActuales = data.ofertas;
            renderizarOfertas(data.ofertas, tipo);
        } else {
            console.error('Error al cargar ofertas:', data.message);
            mostrarMensajeVacio(tipo);
        }
    } catch (error) {
        console.error('Error en fetch:', error);
        mostrarMensajeVacio(tipo);
    }
}

// Función para renderizar ofertas
function renderizarOfertas(ofertas, tipo) {
    const containerDesktop = document.getElementById('desktop-offers');
    const containerMobile = document.getElementById('mobile-offers');
    
    if (ofertas.length === 0) {
        mostrarMensajeVacio(tipo);
        return;
    }
    
    const ofertasHTML = ofertas.map(oferta => generarTarjetaOferta(oferta, tipo)).join('');
    
    if (containerDesktop) {
        containerDesktop.innerHTML = ofertasHTML;
    }
    
    if (containerMobile) {
        containerMobile.innerHTML = `
            <div class="px-4 py-6">
                <div class="flex justify-between items-center mb-4">
                    <h1 class="text-2xl font-semibold text-gray-800">Ofertas</h1>
                </div>
                
                <!-- Switch móvil -->
                <div class="switch-button flex mb-6">
                    <div class="switch-option ${tipo === 'recibidas' ? 'active' : ''}" onclick="switchOfferType('received', this)">
                        Recibidas
                    </div>
                    <div class="switch-option ${tipo === 'hechas' ? 'active' : ''}" onclick="switchOfferType('made', this)">
                        Hechas
                    </div>
                </div>
                
                <div class="space-y-4">
                    ${ofertasHTML}
                </div>
            </div>
        `;
    }
}

// Función para generar HTML de tarjeta de oferta
function generarTarjetaOferta(oferta, tipo) {
    const esRecibida = tipo === 'recibidas';
    const usuario = esRecibida ? oferta.oferente : oferta.dueno;
    
    // Obtener las imágenes de la oferta (ya viene como array desde PHP)
    const imagenes = Array.isArray(oferta.imagenes) ? oferta.imagenes : [];
    let imagenPrincipal = imagenes.length > 0 ? imagenes[0] : '';

    // Ajustar ruta de imagen principal
    if (imagenPrincipal && !imagenPrincipal.startsWith('http')) {
        // Si la ruta empieza con uploads/, agregarle ../
        if (imagenPrincipal.startsWith('uploads/')) {
            imagenPrincipal = '../' + imagenPrincipal;
        }
        // Si empieza con codigo/uploads/, reemplazar por ../uploads/
        else if (imagenPrincipal.startsWith('codigo/uploads/')) {
            imagenPrincipal = imagenPrincipal.replace('codigo/', '../');
        }
        // Si empieza con php/codigo/uploads/, reemplazar por ../uploads/
        else if (imagenPrincipal.startsWith('php/codigo/uploads/')) {
            imagenPrincipal = imagenPrincipal.replace('php/codigo/', '../');
        }
        // Si no tiene ningún prefijo, agregar ../
        else if (!imagenPrincipal.startsWith('../')) {
            imagenPrincipal = '../' + imagenPrincipal;
        }
    }
    console.log('Ruta imagen oferta:', imagenPrincipal); // Para debug

    // Imagen del producto solicitado
    let imagenProducto = oferta.imagen_producto || '';
    if (imagenProducto && !imagenProducto.startsWith('http')) {
        // Limpiar cualquier prefijo incorrecto
        imagenProducto = imagenProducto.replace('php/codigo/', '').replace('codigo/', '');
        // Asegurar que empiece con ../
        if (!imagenProducto.startsWith('../')) {
            imagenProducto = '../' + imagenProducto;
        }
    }
    console.log('Ruta imagen producto:', imagenProducto); // Para debug

    // Avatar del usuario
    let avatarUrl = usuario.avatar || '';
    if (avatarUrl && !avatarUrl.startsWith('http') && !avatarUrl.startsWith('../')) {
        avatarUrl = '../' + avatarUrl;
    }
    
    return `
        <div class="bg-white rounded-2xl border-2 border-gray-300 overflow-hidden hover:shadow-md transition-all duration-200">
            <div class="p-4">
                <!-- Sección superior: Imagen izquierda + Info derecha -->
                <div class="flex gap-4 mb-4">
                    <!-- Imagen del producto ofrecido -->
                    <div class="flex-shrink-0">
                        ${imagenPrincipal ? `
                            <img src="${imagenPrincipal}" alt="${oferta.titulo}" 
                                 class="w-44 h-44 object-cover rounded-xl"
                                 onerror="this.src='../recursos/iconos/contorno/general/caja.svg'">
                        ` : `
                            <div class="w-44 h-44 bg-gray-200 rounded-xl flex items-center justify-center">
                                <img src="../recursos/iconos/contorno/general/caja.svg" alt="Sin imagen" class="w-16 h-16 opacity-50">
                            </div>
                        `}
                    </div>
                    
                    <!-- Info del producto -->
                    <div class="flex-1 flex flex-col">
                        <h3 class="text-xl font-semibold text-gray-900 mb-1">${oferta.titulo}</h3>
                        <p class="text-sm text-green font-medium mb-3">${oferta.estado_producto}</p>
                        
                        <!-- Sección "Por" -->
                        <div class="mb-auto">
                            <p class="text-xs text-gray-900 mb-2">Por</p>
                            <div class="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
                                ${imagenProducto ? `
                                    <img src="${imagenProducto}" alt="${oferta.producto_solicitado}" 
                                         class="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                                         onerror="this.src='../recursos/iconos/contorno/general/caja.svg'">
                                ` : `
                                    <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <img src="../recursos/iconos/contorno/general/caja.svg" alt="Sin imagen" class="w-6 h-6 opacity-50">
                                    </div>
                                `}
                                <p class="text-sm font-medium text-gray-900 line-clamp-2">${oferta.producto_solicitado}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer: Usuario -->
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-2">
                        <span class="text-xs text-gray-900">De</span>
                        ${avatarUrl ? `
                            <img src="${avatarUrl}" alt="${usuario.nombre}" 
                                 class="w-8 h-8 rounded-full object-cover"
                                 onerror="this.onerror=null; this.src='../recursos/iconos/contorno/general/usuario.svg'">
                        ` : `
                            <div class="w-8 h-8 rounded-full bg-green flex items-center justify-center text-white text-xs font-bold">
                                ${usuario.nombre.charAt(0).toUpperCase()}
                            </div>
                        `}
                        <span class="text-sm text-gray-900 font-medium">${usuario.nombre}</span>
                    </div>
                    ${oferta.rating ? `
                        <div class="flex items-center gap-1">
                            <span class="text-yellow-500 text-base">★</span>
                            <span class="text-sm font-medium text-gray-700">${oferta.rating}</span>
                            <span class="text-sm text-gray-400">(${oferta.reviews || '0'})</span>
                        </div>
                    ` : ''}
                </div>

                <!-- Botones de acción: MENSAJE - ACEPTAR - CANCELAR -->
                <div class="flex gap-2">
                    <button onclick="verDetalleOferta(${oferta.id_propuesta})" 
                            class="btn-primary flex-1 px-4 py-2.5 text-sm">
                        Mensaje
                    </button>
                    ${esRecibida && oferta.estado === 'pendiente' ? `
                        <button onclick="aceptarOferta(${oferta.id_propuesta})" 
                                class="btn-primary flex-1 px-4 py-2.5 text-sm">
                            Aceptar
                        </button>
                    ` : ''}
                    ${oferta.estado === 'pendiente' ? `
                        <button onclick="${esRecibida ? 'rechazarOferta' : 'cancelarOferta'}(${oferta.id_propuesta})" 
                                class="btn-secondary flex-1 px-4 py-2.5 text-sm">
                            Cancelar
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// Función para obtener badge de estado
function obtenerBadgeEstado(estado) {
    const badges = {
        'pendiente': '<span class="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full whitespace-nowrap">Pendiente</span>',
        'aceptada': '<span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full whitespace-nowrap">Aceptada</span>',
        'rechazada': '<span class="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full whitespace-nowrap">Rechazada</span>',
        'cancelada': '<span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full whitespace-nowrap">Cancelada</span>'
    };
    return badges[estado] || badges['pendiente'];
}

// Función para mostrar mensaje vacío
function mostrarMensajeVacio(tipo) {
    const mensaje = tipo === 'recibidas' 
        ? 'No has recibido ofertas aún' 
        : 'No has hecho ofertas aún';
    
    const html = `
        <div class="flex flex-col items-center justify-center py-20">
            <img src="../recursos/iconos/contorno/general/caja.svg" alt="Sin ofertas" class="w-24 h-24 opacity-30 mb-4">
            <p class="text-gray-500 text-lg">${mensaje}</p>
        </div>
    `;
    
    const containerDesktop = document.getElementById('desktop-offers');
    const containerMobile = document.getElementById('mobile-offers');
    
    if (containerDesktop) containerDesktop.innerHTML = html;
    if (containerMobile) containerMobile.innerHTML = `<div class="px-4">${html}</div>`;
}

// Funciones placeholder para acciones
async function verDetalleOferta(id) {
    try {
        // Obtener datos de la oferta actual
        const oferta = ofertasActuales.find(o => o.id_propuesta === id);
        if (!oferta) {
            alert('Oferta no encontrada');
            return;
        }
        
        console.log('Oferta encontrada:', oferta);
        console.log('Tipo actual:', tipoActual);
        
        // Determinar el destinatario según el tipo de oferta
        let idDestinatario;
        // Comparar con ambos valores posibles
        if (tipoActual === 'recibidas' || tipoActual === 'received') {
            idDestinatario = oferta.oferente?.id;
        } else {
            idDestinatario = oferta.dueno?.id;
        }
        
        if (!idDestinatario) {
            console.error('No se pudo obtener el ID del destinatario', oferta);
            alert('Error: No se pudo identificar al destinatario');
            return;
        }
        
        // Crear solicitud de chat
        const formData = new FormData();
        formData.append('id_destinatario', idDestinatario);
        formData.append('id_propuesta', id);
        formData.append('mensaje', `Hola, me interesa hablar sobre: ${oferta.titulo}`);

        // Enviar el producto solicitado (el que el usuario quiere)
        const idProducto = oferta.id_prod_solicitado || oferta.id_producto;
        if (idProducto) {
            formData.append('id_producto', idProducto);
        }
        
        const response = await fetch('/php/chat/crear-solicitud.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            if (data.existe_conversacion) {
                // Ya existe conversación, redirigir directamente
                window.location.href = `mensajes.php?conversacion=${data.id_conversacion}`;
            } else {
                // Solicitud creada, redirigir a mensajes
                alert('Solicitud de chat enviada correctamente');
                window.location.href = 'mensajes.php';
            }
        } else {
            alert(data.error || 'Error al enviar solicitud');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al procesar la solicitud');
    }
}

async function aceptarOferta(id) {
    if (!confirm('¿Estás seguro de aceptar esta oferta?')) return;
    
    try {
        const formData = new FormData();
        formData.append('id_propuesta', id);
        formData.append('accion', 'aceptar');
        
        const response = await fetch('procesar-oferta.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Oferta aceptada correctamente');
            cargarOfertas(tipoActual);
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al procesar la oferta');
    }
}

async function rechazarOferta(id) {
    if (!confirm('¿Estás seguro de rechazar esta oferta?')) return;
    
    try {
        const formData = new FormData();
        formData.append('id_propuesta', id);
        formData.append('accion', 'rechazar');
        
        const response = await fetch('procesar-oferta.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Oferta rechazada');
            cargarOfertas(tipoActual);
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al procesar la oferta');
    }
}

async function cancelarOferta(id) {
    if (!confirm('¿Estás seguro de cancelar esta oferta?')) return;
    
    try {
        const formData = new FormData();
        formData.append('id_propuesta', id);
        formData.append('accion', 'cancelar');
        
        const response = await fetch('procesar-oferta.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Oferta cancelada');
            cargarOfertas(tipoActual);
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al procesar la oferta');
    }
}