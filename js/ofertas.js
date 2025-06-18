// Datos de ofertas
const offers = {
    received: [
        {
            id: 1,
            product: "Buzo salomon",
            brand: "Salomon",
            size: "L",
            price: "$45",
            originalPrice: "$60",
            buyer: "Josefina Rodriguez",
            buyerAvatar: "JR",
            status: "pending",
            statusText: "Pendiente",
            time: "2h",
            image: "fas fa-tshirt",
            gradient: "from-blue-100 to-blue-200",
            iconColor: "text-blue-600"
        },
        {
            id: 2,
            product: "Auriculares Sony",
            brand: "Sony",
            model: "WH-1000XM4",
            price: "$120",
            originalPrice: "$150",
            buyer: "Carlos Martinez",
            buyerAvatar: "CM",
            status: "accepted",
            statusText: "Aceptada",
            time: "1d",
            image: "fas fa-headphones",
            gradient: "from-purple-100 to-purple-200",
            iconColor: "text-purple-600"
        },
        {
            id: 3,
            product: "Cámara Canon",
            brand: "Canon",
            model: "EOS R6",
            price: "$800",
            originalPrice: "$1000",
            buyer: "Ana García",
            buyerAvatar: "AG",
            status: "pending",
            statusText: "Pendiente",
            time: "3h",
            image: "fas fa-camera",
            gradient: "from-red-100 to-red-200",
            iconColor: "text-red-600"
        }
    ],
    made: [
        {
            id: 4,
            product: "MacBook Pro",
            brand: "Apple",
            model: "13 inch",
            price: "$900",
            originalPrice: "$1200",
            seller: "Tech Store",
            sellerAvatar: "TS",
            status: "rejected",
            statusText: "Rechazada",
            time: "2d",
            image: "fas fa-laptop",
            gradient: "from-gray-100 to-gray-200",
            iconColor: "text-gray-600"
        },
        {
            id: 5,
            product: "iPhone 14",
            brand: "Apple",
            model: "128GB",
            price: "$650",
            originalPrice: "$799",
            seller: "MobileShop",
            sellerAvatar: "MS",
            status: "pending",
            statusText: "Pendiente",
            time: "5h",
            image: "fas fa-mobile-alt",
            gradient: "from-green-100 to-green-200",
            iconColor: "text-green-600"
        },
        {
            id: 6,
            product: "Tablet Samsung",
            brand: "Samsung",
            model: "Galaxy Tab S8",
            price: "$400",
            originalPrice: "$550",
            seller: "ElectroWorld",
            sellerAvatar: "EW",
            status: "accepted",
            statusText: "Aceptada",
            time: "1d",
            image: "fas fa-tablet-alt",
            gradient: "from-orange-100 to-orange-200",
            iconColor: "text-orange-600"
        }
    ]
};

let currentOfferType = 'received';

// Función para generar ofertas móvil
function generateMobileOffers(type) {
    const container = document.getElementById('mobile-offers');
    const offerList = offers[type];

    container.innerHTML = offerList.map(offer => `
                <div class="offer-card bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4 cursor-pointer">
                    <div class="flex items-start space-x-3">
                        <!-- Imagen del producto -->
                        <div class="w-16 h-16 product-image rounded-lg flex items-center justify-center flex-shrink-0">
                            <div class="bg-gradient-to-br ${offer.gradient} w-full h-full rounded-lg flex items-center justify-center">
                                <i class="${offer.image} text-2xl ${offer.iconColor}"></i>
                            </div>
                        </div>

                        <!-- Información del producto -->
                        <div class="flex-1 min-w-0">
                            <div class="flex items-start justify-between mb-2">
                                <div>
                                    <h3 class="text-sm font-semibold text-gray-800 truncate">${offer.product}</h3>
                                    <p class="text-xs text-gray-500"${offer.brand}${offer.model ? ' • ' + offer.model : ''}${offer.size ? ' • ' + offer.size : ''}</p>
                                </div>
                                <span class="text-xs text-gray-400">${offer.time}</span>
                            </div>

                            <!-- Precio y persona -->
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center space-x-2">
                                    <span class="text-sm font-bold text-gray-800">${offer.price}</span>
                                    <span class="text-xs text-gray-400 line-through">${offer.originalPrice}</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <div class="w-6 h-6 bg-green rounded-full flex items-center justify-center">
                                        <span class="text-xs text-white font-medium">${offer.buyerAvatar || offer.sellerAvatar}</span>
                                    </div>
                                    <span class="text-xs text-gray-600">${offer.buyer || offer.seller}</span>
                                </div>
                            </div>

                            <!-- Estado y acciones -->
                            <div class="flex items-center justify-between">
                                <span class="status-badge status-${offer.status}">${offer.statusText}</span>
                                <div class="flex space-x-2">
                                    ${offer.status === 'pending' ? `
                                        ${type === 'received' ? `
                                            <button class="px-3 py-1 bg-green text-white text-xs rounded-full font-medium" onclick="acceptOffer(${offer.id})">
                                                Aceptar
                                            </button>
                                            <button class="px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-full font-medium" onclick="rejectOffer(${offer.id})">
                                                Rechazar
                                            </button>
                                        ` : `
                                            <button class="px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-full font-medium" onclick="cancelOffer(${offer.id})">
                                                Cancelar
                                            </button>
                                        `}
                                    ` : `
                                        <button class="px-3 py-1 bg-green text-white text-xs rounded-full font-medium" onclick="messageUser(${offer.id})">
                                            Mensaje
                                        </button>
                                    `}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
}

// Función para generar ofertas desktop
function generateDesktopOffers(type) {
    const container = document.getElementById('desktop-offers');
    const offerList = offers[type];

    container.innerHTML = offerList.map(offer => `
                <div class="offer-card bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-3">
                            <div class="w-12 h-12 product-image rounded-lg flex items-center justify-center">
                                <div class="bg-gradient-to-br ${offer.gradient} w-full h-full rounded-lg flex items-center justify-center">
                                    <i class="${offer.image} text-xl ${offer.iconColor}"></i>
                                </div>
                            </div>
                            <div>
                                <h3 class="text-base font-semibold text-gray-800">${offer.product}</h3>
                                <p class="text-sm text-gray-500">${offer.brand}${offer.model ? ' • ' + offer.model : ''}${offer.size ? ' • ' + offer.size : ''}</p>
                            </div>
                        </div>
                        <span class="text-sm text-gray-400">${offer.time}</span>
                    </div>

                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-2">
                            <span class="text-lg font-bold text-gray-800">${offer.price}</span>
                            <span class="text-sm text-gray-400 line-through">${offer.originalPrice}</span>
                        </div>
                        <span class="status-badge status-${offer.status}">${offer.statusText}</span>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <div class="w-8 h-8 bg-green rounded-full flex items-center justify-center">
                                <span class="text-sm text-white font-medium">${offer.buyerAvatar || offer.sellerAvatar}</span>
                            </div>
                            <span class="text-sm text-gray-600">${offer.buyer || offer.seller}</span>
                        </div>
                        <div class="flex space-x-2">
                            ${offer.status === 'pending' ? `
                                ${type === 'received' ? `
                                    <button class="px-4 py-2 bg-green text-white text-sm rounded-full font-medium hover:bg-opacity-90 smooth-transition" onclick="acceptOffer(${offer.id})">
                                        Aceptar
                                    </button>
                                    <button class="px-4 py-2 bg-gray-200 text-gray-600 text-sm rounded-full font-medium hover:bg-gray-300 smooth-transition" onclick="rejectOffer(${offer.id})">
                                        Rechazar
                                    </button>
                                ` : `
                                    <button class="px-4 py-2 bg-gray-200 text-gray-600 text-sm rounded-full font-medium hover:bg-gray-300 smooth-transition" onclick="cancelOffer(${offer.id})">
                                        Cancelar
                                    </button>
                                `}
                            ` : `
                                <button class="px-4 py-2 bg-green text-white text-sm rounded-full font-medium hover:bg-opacity-90 smooth-transition" onclick="messageUser(${offer.id})">
                                    Mensaje
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            `).join('');
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

// Función para manejar navegación móvil
function setActiveTab(element, index, device) {
    const bubbleId = device === 'mobile' ? 'mobile-bubble' : 'desktop-bubble';
    const bubble = document.getElementById(bubbleId);
    const buttons = document.querySelectorAll(`[onclick*="setActiveTab"][onclick*="${device}"]`);

    if (index === 2) {
        bubble.style.opacity = '0';
        const centralBtn = buttons[2];
        centralBtn.style.transform = 'scale(1.2)';
        centralBtn.style.transition = 'transform 0.3s ease';

        buttons.forEach((btn, i) => {
            if (i !== 2) {
                const icon = btn.querySelector('i');
                btn.classList.remove('text-green');
                btn.classList.add('text-gray-300');
                icon.style.transform = 'translateY(0)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
    } else {
        bubble.style.opacity = '1';

        const centralBtn = buttons[2];
        centralBtn.style.transform = 'scale(1)';
        centralBtn.style.transition = 'transform 0.3s ease';

        const containerWidth = element.parentElement.offsetWidth;
        const buttonPosition = index * (containerWidth / 5);
        const bubbleOffset = buttonPosition + (containerWidth / 10) - 24;

        bubble.style.transform = `translateX(${bubbleOffset}px) translateY(11px)`;

        buttons.forEach((btn, i) => {
            const icon = btn.querySelector('i');

            if (btn.classList.contains('bg-white')) {
                return;
            }

            if (i === index) {
                btn.classList.remove('text-gray-300');
                btn.classList.add('text-green');
                icon.style.transform = 'translateY(-8px)';
                icon.style.transition = 'transform 0.3s ease';
            } else {
                btn.classList.remove('text-green');
                btn.classList.add('text-gray-300');
                icon.style.transform = 'translateY(0)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    generateMobileOffers(currentOfferType);
    generateDesktopOffers(currentOfferType);
});