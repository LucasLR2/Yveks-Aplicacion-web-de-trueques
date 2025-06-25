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
<<<<<<< HEAD
            reviews: 14
        },
        {
            id: 8,
            product: "MacBook Pro 13”",
=======
            reviews: 14,
            status: 'pending'
        },
        {
            id: 8,
            product: "MacBook Pro 13",
>>>>>>> fdfb8caece19eab9a057d18f8a13fd1b1d30898f
            condition: "Reacondicionado",
            reason: "Quiero una cámara profesional como la EOS R6",
            seller: "Tech Store",
            sellerAvatar: "TS",
            rating: 4,
<<<<<<< HEAD
            reviews: 20
=======
            reviews: 20,
            status: 'accepted'
>>>>>>> fdfb8caece19eab9a057d18f8a13fd1b1d30898f
        },
        {
            id: 9,
            product: "Tablet Samsung Tab S8",
            condition: "Nuevo",
            reason: "Busco consola portátil tipo Switch",
            seller: "ElectroWorld",
            sellerAvatar: "EW",
            rating: 4,
<<<<<<< HEAD
            reviews: 11
=======
            reviews: 11,
            status: 'cancelled'
>>>>>>> fdfb8caece19eab9a057d18f8a13fd1b1d30898f
        },
        {
            id: 10,
            product: "Monitor LG UltraWide",
            condition: "Usado",
            reason: "Quiero cambiar por uno curvo gamer",
            seller: "OfiTech",
            sellerAvatar: "OT",
            rating: 3,
<<<<<<< HEAD
            reviews: 6
=======
            reviews: 6,
            status: 'pending'
>>>>>>> fdfb8caece19eab9a057d18f8a13fd1b1d30898f
        },
        {
            id: 11,
            product: "Auriculares JBL Tune 510BT",
            condition: "Nuevo",
            reason: "Busco modelo con cancelación activa",
            seller: "AudioHouse",
            sellerAvatar: "AH",
            rating: 5,
<<<<<<< HEAD
            reviews: 9
=======
            reviews: 9,
            status: 'accepted'
>>>>>>> fdfb8caece19eab9a057d18f8a13fd1b1d30898f
        },
        {
            id: 12,
            product: "Nintendo Switch",
            condition: "Usado",
            reason: "Quiero una tablet para estudiar",
            seller: "GamingUY",
            sellerAvatar: "GU",
            rating: 4,
<<<<<<< HEAD
            reviews: 17
=======
            reviews: 17,
            status: 'cancelled'
>>>>>>> fdfb8caece19eab9a057d18f8a13fd1b1d30898f
        }
    ]
};

// Estado actual de las ofertas
let currentOfferType = 'received';

// Función para generar ofertas móvil
function generateMobileOffers(type) {
    const container = document.getElementById('mobile-offers');
    const offerList = offers[type];

<<<<<<< HEAD
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
=======
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
                        <img src="recursos/imagenes/${offer.id}.jpg" alt="${offer.product}" class="w-40 h-40 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-lg lg:rounded-xl">
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-2xl text-gray-800 mb-1 text-left truncate">${offer.product}</h3>
                        <p class="text-base text-green mb-2">${offer.condition}</p>
                        <div class="flex flex-col space-y-2">
                            <span class="text-xs text-black">Por</span>
                            <div class="flex items-center space-x-2">
                                <img src="recursos/imagenes/${offer.id + 5}.jpg" alt="Mi producto" class="w-16 h-16 md:w-10 md:h-10 lg:w-16 lg:h-16 object-cover rounded lg:rounded-lg flex-shrink-0">
                                <span class="text-xs md:text-sm lg:text-base text-black">Mi Producto</span>
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
                    <div class="flex items-center space-x-1">
                        <img src="recursos/iconos/Solid/Status/Star.svg" alt="Estrella" class="w-3 h-3 svg-yellow">
                        <span class="text-xs text-black">${offer.rating} (${offer.reviews})</span>
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
        // ... original código para 'received' ...
        return `
        <div class="offer-card bg-transparent rounded-2xl shadow-sm ring-green p-4 mb-4 w-full">
            <div class="flex space-x-4">
                <div class="flex-shrink-0">
                    <img src="recursos/imagenes/${offer.id}.jpg" alt="${offer.product}" class="w-40 h-40 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-lg lg:rounded-xl">
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="text-2xl text-gray-800 mb-1 text-left truncate">${offer.product}</h3>
                    <p class="text-base text-green mb-2">${offer.condition}</p>
                    <div class="flex flex-col space-y-2">
                        <span class="text-xs text-black">Por</span>
                        <div class="flex items-center space-x-2">
                            <img src="recursos/imagenes/${offer.id + 5}.jpg" alt="Mi producto" class="w-16 h-16 md:w-10 md:h-10 lg:w-16 lg:h-16 object-cover rounded lg:rounded-lg flex-shrink-0">
                            <span class="text-xs md:text-sm lg:text-base text-black">Mi Producto</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between mt-4 mb-3">
                <div class="flex items-center space-x-2">
                    <span class="text-xs text-black">De</span>
                    <div class="w-5 h-5 bg-green rounded-full flex items-center justify-center text-white text-xs">
                        ${offer.buyerAvatar || offer.sellerAvatar}
                    </div>
                    <span class="text-xs text-black truncate">${offer.buyer || offer.seller}</span>
                </div>
                <div class="flex items-center space-x-1">
                    <img src="recursos/iconos/Solid/Status/Star.svg" alt="Estrella" class="w-3 h-3 svg-yellow">
                    <span class="text-xs text-black">${offer.rating} (${offer.reviews})</span>
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
>>>>>>> fdfb8caece19eab9a057d18f8a13fd1b1d30898f
}

// Función para generar ofertas desktop
function generateDesktopOffers(type) {
    const container = document.getElementById('desktop-offers');
    const offerList = offers[type];

<<<<<<< HEAD
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
=======
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
                        <img src="recursos/imagenes/${offer.id}.jpg" alt="${offer.product}" class="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-lg lg:rounded-xl">
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-2xl text-gray-800 mb-3 text-left">${offer.product}</h3>
                        <p class="text-base text-green mb-5">${offer.condition}</p>
                        <div class="flex flex-col space-y-3">
                            <span class="text-base text-black">Por</span>
                            <div class="flex items-center space-x-3">
                                <img src="recursos/imagenes/${offer.id + 5}.jpg" alt="Mi producto" class="w-6 h-6 md:w-10 md:h-10 lg:w-16 lg:h-16 object-cover rounded lg:rounded-lg flex-shrink-0">
                                <span class="text-xs md:text-sm lg:text-base text-black">Mi Producto</span>
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
                    <div class="flex items-center space-x-3">
                        <img src="recursos/iconos/Solid/Status/Star.svg" alt="Estrella" class="w-6 h-6 svg-yellow">
                        <span class="text-base text-black">${offer.rating} (${offer.reviews})</span>
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
        // ... original código para 'received' ...
        return `
        <div class="offer-card bg-transparent rounded-3xl shadow-sm ring-green p-8 w-full">
            <div class="flex space-x-8">
                <div class="flex-shrink-0">
                    <img src="recursos/imagenes/${offer.id}.jpg" alt="${offer.product}" class="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-lg lg:rounded-xl">
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="text-2xl text-gray-800 mb-3 text-left">${offer.product}</h3>
                    <p class="text-base text-green mb-5">${offer.condition}</p>
                    <div class="flex flex-col space-y-3">
                        <span class="text-base text-black">Por</span>
                        <div class="flex items-center space-x-3">
                            <img src="recursos/imagenes/${offer.id + 5}.jpg" alt="Mi producto" class="w-6 h-6 md:w-10 md:h-10 lg:w-16 lg:h-16 object-cover rounded lg:rounded-lg flex-shrink-0">
                            <span class="text-xs md:text-sm lg:text-base text-black">Mi Producto</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between mt-8 mb-6">
                <div class="flex items-center space-x-4">
                    <span class="text-base text-black">De</span>
                    <div class="w-10 h-10 bg-green rounded-full flex items-center justify-center text-white text-base">
                        ${offer.buyerAvatar || offer.sellerAvatar}
                    </div>
                    <span class="text-base text-black">${offer.buyer || offer.seller}</span>
                </div>
                <div class="flex items-center space-x-3">
                    <img src="recursos/iconos/Solid/Status/Star.svg" alt="Estrella" class="w-6 h-6 svg-yellow">
                    <span class="text-base text-black">${offer.rating} (${offer.reviews})</span>
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
>>>>>>> fdfb8caece19eab9a057d18f8a13fd1b1d30898f
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
<<<<<<< HEAD
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
=======
function setActiveTab(elemento, indice, dispositivo) {
    const idBurbuja = dispositivo === "mobile" ? "mobile-bubble" : "desktop-bubble";
    const burbuja = document.getElementById(idBurbuja);
    const botones = document.querySelectorAll(`[onclick*="setActiveTab"][onclick*="${dispositivo}"]`);

    // Navegación solo para Inicio y Ofertas
    const rutas = [
        "index.html",
        "ofertas.html"
    ];
    const paginaActual = window.location.pathname.split("/").pop();
    if ((indice === 0 || indice === 1) && rutas[indice] !== paginaActual) {
        window.location.href = rutas[indice];
        return;
    }

    if (indice === 2) {
        burbuja.style.opacity = "0";
        const botonCentral = botones[2];
        botonCentral.style.transform = "scale(1.2)";
        botonCentral.style.transition = "transform 0.3s ease";

        botones.forEach((btn, i) => {
            const icono = btn.querySelector("img");
            if (i === 2) return; // No cambiar el plus
            btn.classList.remove("text-green");
            btn.classList.add("text-gray-300");
            icono.classList.remove("svg-green");
            icono.classList.add("svg-white");
            icono.style.transform = "translateY(0)";
            icono.style.transition = "transform 0.3s ease";
            cambiarIconoAOutline(icono);
            icono.classList.remove(
                "svg-green",
                "svg-gray-300",
                "svg-gray-400",
                "svg-gray-600",
                "svg-gray-800",
                "svg-yellow"
            );
        });
    } else {
        burbuja.style.opacity = "1";
        const botonCentral = botones[2];
        botonCentral.style.transform = "scale(1)";
        botonCentral.style.transition = "transform 0.3s ease";
        const contenedorVerde = burbuja.parentElement;
        const anchoContenedor = contenedorVerde.offsetWidth;
        const cantidadBotones = botones.length;
        const anchoBoton = anchoContenedor / cantidadBotones;
        const leftBurbuja = (indice + 0.5) * anchoBoton - burbuja.offsetWidth / 2;
        burbuja.style.left = leftBurbuja + "px";
        burbuja.style.transform = "translateY(11px)";
        botones.forEach((btn, i) => {
            const icono = btn.querySelector("img");
            if (i === 2) return;
            if (btn.classList.contains("bg-white")) {
                return;
            }
            if (i === indice) {
                btn.classList.remove("text-gray-300");
                btn.classList.add("text-green");
                icono.classList.remove(
                    "svg-white",
                    "svg-gray-300",
                    "svg-gray-400",
                    "svg-gray-600",
                    "svg-gray-800",
                    "svg-yellow",
                    "svg-green"
                );
                icono.classList.add("svg-green");
                icono.style.transform = "translateY(-8px)";
                icono.style.transition = "transform 0.3s ease";
                cambiarIconoASolid(icono);
            } else {
                btn.classList.remove("text-green");
                btn.classList.add("text-gray-300");
                icono.classList.remove(
                    "svg-green",
                    "svg-gray-300",
                    "svg-gray-400",
                    "svg-gray-600",
                    "svg-gray-800",
                    "svg-yellow",
                    "svg-white"
                );
                icono.classList.add("svg-white");
                icono.style.transform = "translateY(0)";
                icono.style.transition = "transform 0.3s ease";
                cambiarIconoAOutline(icono);
>>>>>>> fdfb8caece19eab9a057d18f8a13fd1b1d30898f
            }
        });
    }
}

<<<<<<< HEAD
=======
function cambiarIconoAOutline(icono) {
    const src = icono.src;
    if (src.includes("/Solid/")) {
        const nuevoSrc = src.replace("/Solid/", "/Outline/");
        icono.src = nuevoSrc;
    }
}

function cambiarIconoASolid(icono) {
    const src = icono.src;
    if (src.includes("/Outline/")) {
        const nuevoSrc = src.replace("/Outline/", "/Solid/");
        icono.src = nuevoSrc;
    }
}

>>>>>>> fdfb8caece19eab9a057d18f8a13fd1b1d30898f
// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    generateMobileOffers(currentOfferType);
    generateDesktopOffers(currentOfferType);
<<<<<<< HEAD
=======
    // Activar el tab de Ofertas (índice 1)
    const tabOfertas = document.querySelectorAll('[onclick*="setActiveTab"][onclick*="mobile"]')[1];
    if (tabOfertas) {
        setActiveTab(tabOfertas, 1, 'mobile');
    }
>>>>>>> fdfb8caece19eab9a057d18f8a13fd1b1d30898f
});