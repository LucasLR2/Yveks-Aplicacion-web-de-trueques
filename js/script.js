// Datos de productos
const products = [
    {
        id: 1,
        name: "Auriculares inalámbricos",
        condition: "Usados",
        rating: 4.5,
        reviews: 12,
        icon: "fas fa-headphones",
        gradient: "from-blue-100 to-blue-200",
        iconColor: "text-blue-600",
        category: "tecnologia"
    },
    {
        id: 2,
        name: "Gafas con filtro de luz azul",
        condition: "Nuevos",
        rating: 4.2,
        reviews: 32,
        icon: "fas fa-glasses",
        gradient: "from-red-100 to-red-200",
        iconColor: "text-red-600",
        category: "accesorios"
    },
    {
        id: 3,
        name: "Laptop MacBook",
        condition: "Usados",
        rating: 4.8,
        reviews: 8,
        icon: "fas fa-laptop",
        gradient: "from-gray-100 to-gray-200",
        iconColor: "text-gray-600",
        category: "tecnologia"
    },
    {
        id: 4,
        name: "Cámara de seguridad",
        condition: "Nuevos",
        rating: 4.3,
        reviews: 15,
        icon: "fas fa-camera",
        gradient: "from-amber-100 to-amber-200",
        iconColor: "text-amber-600",
        category: "tecnologia"
    },
    {
        id: 5,
        name: "Silla ergonómica",
        condition: "Nuevos",
        rating: 4.6,
        reviews: 23,
        icon: "fas fa-chair",
        gradient: "from-green-100 to-green-200",
        iconColor: "text-green-600",
        category: "hogar"
    },
    {
        id: 6,
        name: "Cafetera automática",
        condition: "Usados",
        rating: 4.4,
        reviews: 18,
        icon: "fas fa-coffee",
        gradient: "from-brown-100 to-brown-200",
        iconColor: "text-brown-600",
        category: "hogar"
    }
];

let currentCategory = 'all';

// Función para generar estrellas
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star text-xs text-yellow-400"></i>';
        } else {
            stars += '<i class="far fa-star text-xs text-yellow-400"></i>';
        }
    }
    return stars;
}

// Función para generar productos móvil
function generateMobileProducts(category = 'all') {
    const container = document.getElementById('mobile-products');
    const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);

    container.innerHTML = filteredProducts.map(product => `
                <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow product-card"
                    onclick="selectProduct(this)">
                    <div class="aspect-square bg-gray-200 relative">
                        <div class="absolute inset-0 bg-gradient-to-br ${product.gradient} flex items-center justify-center">
                            <i class="${product.icon} text-4xl ${product.iconColor}"></i>
                        </div>
                    </div>
                    <div class="p-3">
                        <h4 class="text-sm font-medium text-gray-800 mb-1">${product.name}</h4>
                        <p class="text-xs text-gray-500 mb-2">${product.condition}</p>
                        <div class="flex items-center space-x-1">
                            <div class="flex">
                                ${generateStars(product.rating)}
                            </div>
                            <span class="text-xs text-gray-500">${product.rating} (${product.reviews})</span>
                        </div>
                    </div>
                </div>
            `).join('');
}

// Función para generar productos desktop
function generateDesktopProducts(category = 'all') {
    const container = document.getElementById('desktop-products');
    const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);

    container.innerHTML = filteredProducts.map(product => `
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md smooth-transition product-card text-sm w-[280px]"
        onclick="selectProduct(this)">
        <div class="aspect-square bg-gray-200 relative">
            <div class="absolute inset-0 bg-gradient-to-br ${product.gradient} flex items-center justify-center">
                <i class="${product.icon} text-4xl ${product.iconColor}"></i>
            </div>
        </div>
        <div class="p-3">
            <h4 class="text-base font-medium text-gray-800 mb-1 truncate">${product.name}</h4>
            
            <!-- Estado y Calificación en una sola línea -->
            <div class="flex justify-between items-center">
                <p class="text-gray-500">${product.condition}</p>
                <span class="text-gray-500 text-xs">${product.rating} (${product.reviews})</span>
            </div>
        </div>
    </div>
`).join('');
}

// Funciones móviles
function selectCategory(element) {
    document.querySelectorAll('.mobile-category').forEach(cat => {
        const span = cat.querySelector('span');
        span.classList.remove('text-green');
        span.classList.add('text-gray-600');
    });

    const span = element.querySelector('span');
    span.classList.remove('text-gray-600');
    span.classList.add('text-green');
}

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

// Funciones desktop
function setDesktopActiveNav(element) {
    document.querySelectorAll('.desktop-nav-item').forEach(item => {
        item.classList.remove('active', 'bg-green', 'text-white');
        item.classList.add('text-gray-600', 'hover:bg-gray-50');
    });

    element.classList.remove('text-gray-600', 'hover:bg-gray-50');
    element.classList.add('active', 'bg-green', 'text-white');
}

function selectDesktopCategory(element, category) {
    document.querySelectorAll('.desktop-category').forEach(cat => {
        cat.classList.remove('bg-green-50');
    });

    element.classList.add('bg-green-50');
    currentCategory = category;
    generateMobileProducts(category);
    generateDesktopProducts(category);
}

// Función para seleccionar producto
function selectProduct(element) {
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 150);

    // Aquí puedes agregar lógica para mostrar detalles del producto
    console.log('Producto seleccionado');
}

// Función de búsqueda
function setupSearch() {
    const mobileSearch = document.getElementById('mobile-search');
    const desktopSearch = document.getElementById('desktop-search');

    if (mobileSearch) {
        mobileSearch.addEventListener('input', function (e) {
            const query = e.target.value.toLowerCase();
            filterProducts(query);
        });
    }

    if (desktopSearch) {
        desktopSearch.addEventListener('input', function (e) {
            const query = e.target.value.toLowerCase();
            filterProducts(query);
        });
    }
}

function filterProducts(query) {
    if (!query) {
        generateMobileProducts(currentCategory);
        generateDesktopProducts(currentCategory);
        return;
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.condition.toLowerCase().includes(query)
    );

    // Actualizar productos móvil
    const mobileContainer = document.getElementById('mobile-products');
    if (mobileContainer) {
        mobileContainer.innerHTML = filteredProducts.map(product => `
           <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow product-card"
               onclick="selectProduct(this)">
               <div class="aspect-square bg-gray-200 relative">
                   <div class="absolute inset-0 bg-gradient-to-br ${product.gradient} flex items-center justify-center">
                       <i class="${product.icon} text-4xl ${product.iconColor}"></i>
                   </div>
               </div>
               <div class="p-3">
                   <h4 class="text-sm font-medium text-gray-800 mb-1">${product.name}</h4>
                   <p class="text-xs text-gray-500 mb-2">${product.condition}</p>
                   <div class="flex items-center space-x-1">
                       <div class="flex">
                           ${generateStars(product.rating)}
                       </div>
                       <span class="text-xs text-gray-500">${product.rating} (${product.reviews})</span>
                   </div>
               </div>
           </div>
       `).join('');
    }

    // Actualizar productos desktop
    const desktopContainer = document.getElementById('desktop-products');
    if (desktopContainer) {
        desktopContainer.innerHTML = filteredProducts.map(product => `
           <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg smooth-transition product-card"
               onclick="selectProduct(this)">
               <div class="aspect-square bg-gray-200 relative">
                   <div class="absolute inset-0 bg-gradient-to-br ${product.gradient} flex items-center justify-center">
                       <i class="${product.icon} text-5xl ${product.iconColor}"></i>
                   </div>
               </div>
               <div class="p-4">
                   <h4 class="text-base font-medium text-gray-800 mb-1">${product.name}</h4>
                   <p class="text-sm text-gray-500 mb-2">${product.condition}</p>
                   <div class="flex items-center space-x-1">
                       <div class="flex">
                           ${generateStars(product.rating)}
                       </div>
                       <span class="text-sm text-gray-500">${product.rating} (${product.reviews})</span>
                   </div>
               </div>
           </div>
       `).join('');
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    generateMobileProducts();
    generateDesktopProducts();
    setupSearch();

    // Activar primera pestaña móvil por defecto
    const firstMobileTab = document.querySelector('[onclick*="setActiveTab"][onclick*="mobile"]');
    if (firstMobileTab) {
        setActiveTab(firstMobileTab, 0, 'mobile');
    }
});

// Función para manejar redimensionamiento de ventana
window.addEventListener('resize', function () {
    // Regenerar productos si es necesario
    generateMobileProducts(currentCategory);
    generateDesktopProducts(currentCategory);
});