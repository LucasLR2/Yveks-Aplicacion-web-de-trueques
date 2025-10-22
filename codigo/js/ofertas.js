// Datos de ofertas (serán cargados desde la BD)
let offers = {
    received: [],
    made: []
};

// Estado actual de las ofertas
let currentOfferType = 'received';

// Función para cargar ofertas desde la BD
async function cargarOfertas() {
    try {
        const response = await fetch('obtener-ofertas.php');
        const data = await response.json();
        
        if (data.success) {
            offers.received = data.received;
            offers.made = data.made;
            
            // Actualizar la vista actual
            generateMobileOffers(currentOfferType);
            generateDesktopOffers(currentOfferType);
        } else {
            console.error('Error al cargar ofertas:', data.message);
            mostrarMensaje('Error al cargar las ofertas', 'error');
        }
    } catch (error) {
        console.error('Error en fetch:', error);
        mostrarMensaje('Error al conectar con el servidor', 'error');
    }
}

// Función para mostrar mensajes al usuario
function mostrarMensaje(mensaje, tipo) {
    // Puedes implementar un sistema de alertas visual aquí
    console.log(`[${tipo}] ${mensaje}`);
}

// Función para generar ofertas móvil
function generateMobileOffers(type) {
    const container = document.getElementById('mobile-offers');
    const offerList = offers[type];

    if (!offerList || offerList.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500 py-8">No hay ofertas disponibles</p>';
        return;
    }

    container.innerHTML = offerList.map(offer => {
        if (type === 'made') {
            let status = offer.status || 'pending';
            let statusText = '';
            let statusTextColor = '';
            let dotColor = '';
            if (status === 'pending') {
                statusText = 'En espera';
                statusTextColor = 'text-yellow';
                dotColor = 'bg-yellow-400';
            } else if (status === 'accepted') {
                statusText = 'Aceptada';
                statusTextColor = 'text-green';
                dotColor = 'bg-green';
            } else if (status === 'cancelled') {
                statusText = 'Cancelada';
                statusTextColor = 'text-red';
                dotColor = 'bg-red-500';
            }
            return `
            <div class="offer-card bg-transparent rounded-2xl shadow-sm ring-green p-4 mb-4 w-full">
                <div class="flex space-x-4">
                    <div class="flex-shrink-0">
                        <img src="${offer.productImage}" alt="${offer.product}" class="w-40 h-40 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-lg lg:rounded-xl">
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-2xl text-gray-800 mb-1 text-left truncate">${offer.product}</h3>
                        <p class="text-base text-green mb-2">${offer.condition}</p>
                        <div class="flex flex-col space-y-2">
                            <span class="text-xs text-black">Por</span>
                            <div class="flex items-center space-x-2">
                                <img src="${offer.offeredProductImage}" alt="${offer.offeredProduct}" class="w-16 h-16 md:w-10 md:h-10 lg:w-16 lg:h-16 object-cover rounded lg:rounded-lg flex-shrink-0">
                                <span class="text-xs md:text-sm lg:text-base text-black">${offer.offeredProduct}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between mt-4 mb-3">
                    <div class="flex items-center space-x-2">
                        <span class="text-xs text-black">De</span>
                        <div class="w-5 h-5 bg-green rounded-full flex items-center justify-center text-white text-xs">
                            ${offer.sellerAvatar}
                        </div>
                        <span class="text-xs text-black truncate">${offer.seller}</span>
                    </div>
                </div>
                <div class="flex items-center space-x-2 mt-4">
                    <span class="w-3 h-3 rounded-full ${dotColor} inline-block"></span>
                    <span class="text-xs font-medium ${statusTextColor}">${statusText}</span>
                    <div class="flex-1"></div>
                    <button class="btn-primary flex-1 px-2 py-1.5 text-xs" onclick="messageUser(${offer.id})">Ver chat</button>
                    <button class="btn-secondary flex-1 px-2 py-1.5 text-xs" onclick="${status === 'cancelled' ? `deleteOffer(${offer.id})` : `rejectOffer(${offer.id})`}" >${status === 'cancelled' ? 'Eliminar' : 'Cancelar'}</button>
                </div>
            </div>
            `;
        }
        // Ofertas recibidas
        return `
        <div class="offer-card bg-transparent rounded-2xl shadow-sm ring-green p-4 mb-4 w-full">
            <div class="flex space-x-4">
                <div class="flex-shrink-0">
                    <img src="${offer.productImage}" alt="${offer.product}" class="w-40 h-40 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-lg lg:rounded-xl">
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="text-2xl text-gray-800 mb-1 text-left truncate">${offer.product}</h3>
                    <p class="text-base text-green mb-2">${offer.condition}</p>
                    <div class="flex flex-col space-y-2">
                        <span class="text-xs text-black">Por</span>
                        <div class="flex items-center space-x-2">
                            <img src="${offer.offeredProductImage}" alt="${offer.offeredProduct}" class="w-16 h-16 md:w-10 md:h-10 lg:w-16 lg:h-16 object-cover rounded lg:rounded-lg flex-shrink-0">
                            <span class="text-xs md:text-sm lg:text-base text-black">${offer.offeredProduct}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between mt-4 mb-3">
                <div class="flex items-center space-x-2">
                    <span class="text-xs text-black">De</span>
                    <div class="w-5 h-5 bg-green rounded-full flex items-center justify-center text-white text-xs">
                        ${offer.buyerAvatar}
                    </div>
                    <span class="text-xs text-black truncate">${offer.buyer}</span>
                </div>
            </div>
            <div class="flex space-x-2 mt-4">
                <button class="btn-primary flex-1 px-2 py-1.5 text-xs" onclick="messageUser(${offer.id})">Mensaje</button>
                <button class="btn-primary flex-1 px-2 py-1.5 text-xs" onclick="acceptOffer(${offer.id})">Aceptar</button>
                <button class="btn-secondary flex-1 px-2 py-1.5 text-xs" onclick="rejectOffer(${offer.id})">Cancelar</button>
            </div>
        </div>
        `;
    }).join('');
}

// Función para generar ofertas desktop
function generateDesktopOffers(type) {
    const container = document.getElementById('desktop-offers');
    const offerList = offers[type];

    if (!offerList || offerList.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500 py-8">No hay ofertas disponibles</p>';
        return;
    }

    container.innerHTML = offerList.map(offer => {
        if (type === 'made') {
            let status = offer.status || 'pending';
            let statusText = '';
            let statusTextColor = '';
            let dotColor = '';
            if (status === 'pending') {
                statusText = 'En espera';
                statusTextColor = 'text-yellow';
                dotColor = 'bg-yellow-400';
            } else if (status === 'accepted') {
                statusText = 'Aceptada';
                statusTextColor = 'text-green';
                dotColor = 'bg-green';
            } else if (status === 'cancelled') {
                statusText = 'Cancelada';
                statusTextColor = 'text-red';
                dotColor = 'bg-red-500';
            }
            return `
            <div class="offer-card bg-transparent rounded-3xl shadow-sm ring-green p-8 w-full">
                <div class="flex space-x-8">
                    <div class="flex-shrink-0">
                        <img src="${offer.productImage}" alt="${offer.product}" class="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-lg lg:rounded-xl">
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-2xl text-gray-800 mb-3 text-left">${offer.product}</h3>
                        <p class="text-base text-green mb-5">${offer.condition}</p>
                        <div class="flex flex-col space-y-3">
                            <span class="text-base text-black">Por</span>
                            <div class="flex items-center space-x-3">
                                <img src="${offer.offeredProductImage}" alt="${offer.offeredProduct}" class="w-6 h-6 md:w-10 md:h-10 lg:w-16 lg:h-16 object-cover rounded lg:rounded-lg flex-shrink-0">
                                <span class="text-xs md:text-sm lg:text-base text-black">${offer.offeredProduct}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between mt-8 mb-6">
                    <div class="flex items-center space-x-4">
                        <span class="text-base text-black">De</span>
                        <div class="w-10 h-10 bg-green rounded-full flex items-center justify-center text-white text-base">
                            ${offer.sellerAvatar}
                        </div>
                        <span class="text-base text-black">${offer.seller}</span>
                    </div>
                </div>
                <div class="flex items-center space-x-3 mt-8">
                    <span class="w-4 h-4 rounded-full ${dotColor} inline-block"></span>
                    <span class="text-base font-medium ${statusTextColor}">${statusText}</span>
                    <div class="flex-1"></div>
                    <button class="btn-primary flex-1 px-6 py-2 text-base" onclick="messageUser(${offer.id})">Ver chat</button>
                    <button class="btn-secondary flex-1 px-6 py-2 text-base" onclick="${status === 'cancelled' ? `deleteOffer(${offer.id})` : `rejectOffer(${offer.id})`}">${status === 'cancelled' ? 'Eliminar' : 'Cancelar'}</button>
                </div>
            </div>
            `;
        }
        // Ofertas recibidas
        return `
        <div class="offer-card bg-transparent rounded-3xl shadow-sm ring-green p-8 w-full">
            <div class="flex space-x-8">
                <div class="flex-shrink-0">
                    <img src="${offer.productImage}" alt="${offer.product}" class="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-lg lg:rounded-xl">
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="text-2xl text-gray-800 mb-3 text-left">${offer.product}</h3>
                    <p class="text-base text-green mb-5">${offer.condition}</p>
                    <div class="flex flex-col space-y-3">
                        <span class="text-base text-black">Por</span>
                        <div class="flex items-center space-x-3">
                            <img src="${offer.offeredProductImage}" alt="${offer.offeredProduct}" class="w-6 h-6 md:w-10 md:h-10 lg:w-16 lg:h-16 object-cover rounded lg:rounded-lg flex-shrink-0">
                            <span class="text-xs md:text-sm lg:text-base text-black">${offer.offeredProduct}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between mt-8 mb-6">
                <div class="flex items-center space-x-4">
                    <span class="text-base text-black">De</span>
                    <div class="w-10 h-10 bg-green rounded-full flex items-center justify-center text-white text-base">
                        ${offer.buyerAvatar}
                    </div>
                    <span class="text-base text-black">${offer.buyer}</span>
                </div>
            </div>
            <div class="flex space-x-4 mt-8">
                <button class="btn-primary flex-1 px-6 py-2 text-base" onclick="messageUser(${offer.id})">
                    Mensaje
                </button>
                <button class="btn-primary flex-1 px-6 py-2 text-base" onclick="acceptOffer(${offer.id})">
                    Aceptar
                </button>
                <button class="btn-secondary flex-1 px-6 py-2 text-base" onclick="rejectOffer(${offer.id})">
                    Cancelar
                </button>
            </div>
        </div>
        `;
    }).join('');
}

// Función para cambiar tipo de ofertas
function switchOfferType(type, element) {
    currentOfferType = type;

    // Actualizar switches
    document.querySelectorAll('.switch-option').forEach(option => {
        option.classList.remove('active');
    });
    element.classList.add('active');

    // Regenerar ofertas
    generateMobileOffers(type);
    generateDesktopOffers(type);
}

// Funciones de acción de ofertas
function acceptOffer(id) {
    console.log('Aceptar oferta:', id);
    // Aquí iría la lógica para aceptar la oferta
}

function rejectOffer(id) {
    console.log('Rechazar oferta:', id);
    // Aquí iría la lógica para rechazar la oferta
}

function cancelOffer(id) {
    console.log('Cancelar oferta:', id);
    // Aquí iría la lógica para cancelar la oferta
}

function messageUser(id) {
    console.log('Enviar mensaje:', id);
    // Aquí iría la lógica para enviar mensaje
}
document.addEventListener('DOMContentLoaded', function() {
    // Cargar ofertas desde la base de datos
    cargarOfertas();
});
