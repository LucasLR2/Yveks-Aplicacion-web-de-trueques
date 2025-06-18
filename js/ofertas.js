// Datos de ofertas
const offers = {
    received: [
        {
            id: 1,
            product: "Cámara Canon",
            condition: "Reacondicionado",
            reason: "Cambio por celular con buena cámara",
            buyer: "Ana García",
            buyerAvatar: "AG",
            rating: 4,
            reviews: 12
        },
        {
            id: 2,
            product: "Auriculares Sony",
            condition: "Nuevo",
            reason: "Prefiero un modelo con cable",
            buyer: "Carlos Martínez",
            buyerAvatar: "CM",
            rating: 5,
            reviews: 8
        },
        {
            id: 3,
            product: "Buzo Salomon",
            condition: "Usado",
            reason: "Me queda chico, busco otro talle",
            buyer: "Josefina Rodríguez",
            buyerAvatar: "JR",
            rating: 3,
            reviews: 5
        },
        {
            id: 4,
            product: "Teclado Mecánico Logitech",
            condition: "Nuevo",
            reason: "Quiero cambiarlo por uno con switches rojos",
            buyer: "Matías Pérez",
            buyerAvatar: "MP",
            rating: 4,
            reviews: 18
        },
        {
            id: 5,
            product: "Cámara GoPro Hero 9",
            condition: "Usado",
            reason: "Busco un celular con buena estabilización",
            buyer: "Valentina Díaz",
            buyerAvatar: "VD",
            rating: 5,
            reviews: 23
        },
        {
            id: 6,
            product: "Smartwatch Huawei",
            condition: "Reacondicionado",
            reason: "Quiero un modelo compatible con iOS",
            buyer: "Esteban Morales",
            buyerAvatar: "EM",
            rating: 4,
            reviews: 10
        }
    ],
    made: [
        {
            id: 7,
            product: "iPhone 14",
            condition: "Nuevo",
            reason: "Busco una laptop potente para editar videos",
            seller: "MobileShop",
            sellerAvatar: "MS",
            rating: 5,
            reviews: 14
        },
        {
            id: 8,
            product: "MacBook Pro 13”",
            condition: "Reacondicionado",
            reason: "Quiero una cámara profesional como la EOS R6",
            seller: "Tech Store",
            sellerAvatar: "TS",
            rating: 4,
            reviews: 20
        },
        {
            id: 9,
            product: "Tablet Samsung Tab S8",
            condition: "Nuevo",
            reason: "Busco consola portátil tipo Switch",
            seller: "ElectroWorld",
            sellerAvatar: "EW",
            rating: 4,
            reviews: 11
        },
        {
            id: 10,
            product: "Monitor LG UltraWide",
            condition: "Usado",
            reason: "Quiero cambiar por uno curvo gamer",
            seller: "OfiTech",
            sellerAvatar: "OT",
            rating: 3,
            reviews: 6
        },
        {
            id: 11,
            product: "Auriculares JBL Tune 510BT",
            condition: "Nuevo",
            reason: "Busco modelo con cancelación activa",
            seller: "AudioHouse",
            sellerAvatar: "AH",
            rating: 5,
            reviews: 9
        },
        {
            id: 12,
            product: "Nintendo Switch",
            condition: "Usado",
            reason: "Quiero una tablet para estudiar",
            seller: "GamingUY",
            sellerAvatar: "GU",
            rating: 4,
            reviews: 17
        }
    ]
};

// Estado actual de las ofertas
let currentOfferType = 'received';

// Función para generar ofertas móvil
function generateMobileOffers(type) {
    const container = document.getElementById('mobile-offers');
    const offerList = offers[type];

    container.innerHTML = offerList.map(offer => `
    <div class="offer-card bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
        <!-- Nombre del producto -->
        <h3 class="text-base font-semibold text-gray-800 mb-1">${offer.product}</h3>

        <!-- Estado del producto -->
        <p class="text-sm text-gray-500 mb-1">Estado: ${offer.condition}</p>

        <!-- Motivo del intercambio -->
        <p class="text-sm text-gray-600 mb-3">Motivo: ${offer.reason}</p>

        <!-- Persona que ofrece -->
        <div class="flex items-center mb-4 space-x-2">
            <div class="w-6 h-6 bg-green rounded-full flex items-center justify-center text-white text-xs font-bold">
                ${offer.buyerAvatar || offer.sellerAvatar}
            </div>
            <div>
                <p class="text-sm font-medium text-gray-800">${offer.buyer || offer.seller}</p>
                <p class="text-xs text-gray-500">
                    ${'★'.repeat(Math.floor(offer.rating))}${'☆'.repeat(5 - Math.floor(offer.rating))} (${offer.reviews} reseñas)
                </p>
            </div>
        </div>

        <!-- Botones -->
        <div class="flex space-x-2">
            <button class="flex-1 px-3 py-1 bg-green text-white text-xs rounded-full font-medium" onclick="messageUser(${offer.id})">Mensaje</button>
            <button class="flex-1 px-3 py-1 bg-blue-600 text-white text-xs rounded-full font-medium" onclick="acceptOffer(${offer.id})">Aceptar</button>
            <button class="flex-1 px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-full font-medium" onclick="rejectOffer(${offer.id})">Cancelar</button>
        </div>
    </div>
`).join('');
}

// Función para generar ofertas desktop
function generateDesktopOffers(type) {
    const container = document.getElementById('desktop-offers');
    const offerList = offers[type];

    container.innerHTML = offerList.map(offer => `
    <div class="offer-card bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <!-- Nombre del producto -->
        <h3 class="text-lg font-semibold text-gray-800 mb-1">${offer.product}</h3>

        <!-- Estado del producto -->
        <p class="text-sm text-gray-500 mb-2">Estado: ${offer.condition}</p>

        <!-- Motivo del intercambio -->
        <p class="text-sm text-gray-600 mb-4">Motivo: ${offer.reason}</p>

        <!-- Usuario que ofrece -->
        <div class="flex items-center mb-4 space-x-3">
            <div class="w-8 h-8 bg-green rounded-full flex items-center justify-center text-white text-sm font-bold">
                ${offer.buyerAvatar || offer.sellerAvatar}
            </div>
            <div>
                <p class="text-sm font-medium text-gray-800">${offer.buyer || offer.seller}</p>
                <p class="text-xs text-gray-500">
                    ${'★'.repeat(Math.floor(offer.rating))}${'☆'.repeat(5 - Math.floor(offer.rating))} (${offer.reviews} reseñas)
                </p>
            </div>
        </div>

        <!-- Botones -->
        <div class="flex space-x-2">
            <button class="flex-1 px-4 py-2 bg-green text-white text-sm rounded-full font-medium hover:bg-opacity-90" onclick="messageUser(${offer.id})">
                Mensaje
            </button>
            <button class="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-full font-medium hover:bg-opacity-90" onclick="acceptOffer(${offer.id})">
                Aceptar
            </button>
            <button class="flex-1 px-4 py-2 bg-gray-200 text-gray-600 text-sm rounded-full font-medium hover:bg-gray-300" onclick="rejectOffer(${offer.id})">
                Cancelar
            </button>
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