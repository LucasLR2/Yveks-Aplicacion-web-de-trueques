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
            product: "MacBook Pro 13",
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
    <div class="offer-card bg-transparent rounded-2xl shadow-sm ring-green p-4 mb-4 w-full">
        <div class="flex space-x-4">
            <!-- Imagen principal del producto ofrecido/querido -->
            <div class="flex-shrink-0">
                <img src="recursos/imagenes/${offer.id}.jpg" alt="${offer.product}" class="w-40 h-40 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-lg lg:rounded-xl">
            </div>
            
            <!-- Información del producto -->
            <div class="flex-1 min-w-0">
                <!-- Nombre del producto -->
                <h3 class="text-2xl text-gray-800 mb-1 text-left truncate">${offer.product}</h3>
                
                <!-- Estado del producto -->
                <p class="text-base text-green mb-2">${offer.condition}</p>
                
                <!-- Sección "Por" -->
                <div class="flex flex-col space-y-2">
                    <span class="text-xs text-black">Por</span>
                    <div class="flex items-center space-x-2">
                        <img src="recursos/imagenes/${offer.id + 5}.jpg" alt="Mi producto" class="w-16 h-16 md:w-10 md:h-10 lg:w-16 lg:h-16 object-cover rounded lg:rounded-lg flex-shrink-0">
                        <span class="text-xs md:text-sm lg:text-base text-black">Mi Producto</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Información del usuario -->
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
        
        <!-- Botones -->
        <div class="flex space-x-2 mt-4">
            <button class="btn-primary flex-1 px-2 py-1.5 text-xs" onclick="messageUser(${offer.id})">Mensaje</button>
            <button class="btn-primary flex-1 px-2 py-1.5 text-xs" onclick="acceptOffer(${offer.id})">Aceptar</button>
            <button class="btn-secondary flex-1 px-2 py-1.5 text-xs" onclick="rejectOffer(${offer.id})">Cancelar</button>
        </div>
    </div>
`).join('');
}

// Función para generar ofertas desktop
function generateDesktopOffers(type) {
    const container = document.getElementById('desktop-offers');
    const offerList = offers[type];

    container.innerHTML = offerList.map(offer => `
    <div class="offer-card bg-transparent rounded-3xl shadow-sm ring-green p-8 w-full">
        <div class="flex space-x-8">
            <!-- Imagen principal del producto ofrecido/querido -->
            <div class="flex-shrink-0">
                <img src="recursos/imagenes/${offer.id}.jpg" alt="${offer.product}" class="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-lg lg:rounded-xl">
            </div>
            
            <!-- Información del producto -->
            <div class="flex-1 min-w-0">
                <!-- Nombre del producto -->
                <h3 class="text-2xl text-gray-800 mb-3 text-left">${offer.product}</h3>
                
                <!-- Estado del producto -->
                <p class="text-base text-green mb-5">${offer.condition}</p>
                
                <!-- Sección "Por" -->
                <div class="flex flex-col space-y-3">
                    <span class="text-base text-black">Por</span>
                    <div class="flex items-center space-x-3">
                        <img src="recursos/imagenes/${offer.id + 5}.jpg" alt="Mi producto" class="w-6 h-6 md:w-10 md:h-10 lg:w-16 lg:h-16 object-cover rounded lg:rounded-lg flex-shrink-0">
                        <span class="text-xs md:text-sm lg:text-base text-black">Mi Producto</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Información del usuario -->
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
        
        <!-- Botones -->
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
function setActiveTab(elemento, indice, dispositivo) {
    const idBurbuja = dispositivo === "mobile" ? "mobile-bubble" : "desktop-bubble";
    const burbuja = document.getElementById(idBurbuja);
    const botones = document.querySelectorAll(`[onclick*="setActiveTab"][onclick*="${dispositivo}"]`);

    // Navegación
    const rutas = [
        "index.html",
        "ofertas.html",
        "publicar.html",
        "comentarios.html",
        "perfil.html"
    ];
    // Detectar página actual por el índice
    const paginaActual = window.location.pathname.split("/").pop();
    if (rutas[indice] !== paginaActual) {
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
            }
        });
    }
}

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

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    generateMobileOffers(currentOfferType);
    generateDesktopOffers(currentOfferType);
    // Activar el tab de Ofertas (índice 1)
    const tabOfertas = document.querySelectorAll('[onclick*="setActiveTab"][onclick*="mobile"]')[1];
    if (tabOfertas) {
        setActiveTab(tabOfertas, 1, 'mobile');
    }
});