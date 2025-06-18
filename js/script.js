// Datos de productos
const productos = [
    {
        id: 1,
        name: "Lentes retro",
        condition: "Usado",
        rating: 4.5,
        reviews: 12,
        images: [{ image: "assets/images/1.jpg" }],
        category: "accesorios"
    },
    {
        id: 2,
        name: "Auriculares inalámbricos	",
        condition: "Nuevo",
        rating: 4.2,
        reviews: 32,
        images: [{ image: "assets/images/2.jpg" }],
        category: "tecnologia"
    },
    {
        id: 3,
        name: "Cargador magnético",
        condition: "Usado",
        rating: 4.8,
        reviews: 8,
        images: [{ image: "assets/images/3.jpg" }],
        category: "tecnologia"
    },
    {
        id: 4,
        name: "Proyector",
        condition: "Nuevo",
        rating: 4.3,
        reviews: 15,
        images: [{ image: "assets/images/4.jpg" }],
        category: "tecnologia"
    },
    {
        id: 5,
        name: "Remera Suzuki con estampado",
        condition: "Nuevo",
        rating: 4.6,
        reviews: 23,
        images: [{ image: "assets/images/5.jpg" }],
        category: "ropa"
    },
    {
        id: 6,
        name: "Sillón naranja",
        condition: "Usado",
        rating: 4.4,
        reviews: 18,
        images: [{ image: "assets/images/6.jpg" }],
        category: "hogar"
    }
];

let currentCategory = 'all';
let selectedCategories = new Set();

// Mapa de colores predefinidos
const colorMap = {
    'primary': 'text-green',
    'secondary': 'text-blue-600',
    'accent': 'text-purple-600',
    'warning': 'text-orange-600',
    'success': 'text-green-600',
    'info': 'text-blue-500',
    'danger': 'text-red-600',
    'gray': 'text-gray-600'
};

// Función para generar estrellas
function generateStars(rating) {
    let stars = '';
    const fullStar = '⭐';
    const emptyStar = '☆';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += fullStar;
        } else {
            stars += emptyStar;
        }
    }
    return stars;
}

// Función para generar productos móvil
function generateMobileProducts(category = 'all') {
    const container = document.getElementById('mobile-products');
    let filteredProducts;
    
    if (selectedCategories.size === 0) {
        filteredProducts = productos;
    } else {
        filteredProducts = productos.filter(p => selectedCategories.has(p.category));
    }

    container.innerHTML = filteredProducts.map(product => `
                <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow product-card"
                    onclick="selectProduct(this)">
                    <div class="aspect-square bg-gray-200 relative">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <img src="${product.images[0].image}" alt="${product.name}" class="w-full h-full object-cover">
                        </div>
                    </div>
                    <div class="p-3">
                        <h4 class="text-sm font-medium text-gray-800 mb-1">${product.name}</h4>
                        <p class="text-xs text-green mb-2">${product.condition}</p>
                        <div class="flex items-center gap-2">
                            <img src="assets/icons/Solid/Status/Star.svg" alt="Estrella" class="w-4 h-4 svg-yellow">
                            <span class="text-xs text-gray-500">${product.rating}</span>
                        </div>
                    </div>
                </div>
            `).join('');
}

// Función para generar productos desktop
function generateDesktopProducts(category = 'all') {
    const container = document.getElementById('desktop-products');
    let filteredProducts;
    
    if (selectedCategories.size === 0) {
        filteredProducts = productos;
    } else {
        filteredProducts = productos.filter(p => selectedCategories.has(p.category));
    }

    container.innerHTML = filteredProducts.map(product => `
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg smooth-transition product-card w-full"
        onclick="selectProduct(this)">
        <div class="aspect-square bg-gray-200 relative">
            <div class="absolute inset-0 flex items-center justify-center">
                <img src="${product.images[0].image}" alt="${product.name}" class="w-full h-full object-cover">
            </div>
        </div>
        <div class="p-4">
            <h4 class="text-base font-medium text-gray-800 mb-1 truncate">${product.name}</h4>
            
            <!-- Estado y Calificación en una sola línea -->
            <div class="flex justify-between items-center">
                <p class="text-green">${product.condition}</p>
                <div class="flex items-center gap-2">
                    <img src="assets/icons/Solid/Status/Star.svg" alt="Estrella" class="w-4 h-4 svg-yellow">
                    <span class="text-gray-500 text-xs">${product.rating}</span>
                </div>
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
    const mainContent = document.querySelector('.desktop-main main');
    const categoryName = element.querySelector('span').textContent;
    
    // Toggle la selección de la categoría
    if (selectedCategories.has(category)) {
        // Deseleccionar categoría
        selectedCategories.delete(category);
        element.classList.remove('bg-green-50');

        // Eliminar la card de la categoría
        const categoryCard = document.querySelector(`[data-category="${category}"]`);
        if (categoryCard) {
            categoryCard.remove();
        }
    } else {
        // Seleccionar categoría
        selectedCategories.add(category);
        element.classList.add('bg-green-50');
        
        // Crear o actualizar la sección de categorías
        let categoriesSection = document.querySelector('.categories-section');
        if (!categoriesSection) {
            categoriesSection = document.createElement('div');
            categoriesSection.className = 'categories-section mb-12';
            categoriesSection.innerHTML = `
                <h2 class="text-2xl text-gray-800 mb-6">Explorar por categoría</h2>
                <div class="overflow-x-auto scrollbar-hide">
                    <div class="flex space-x-4" id="selected-categories">
                    </div>
                </div>
            `;
            // Insertar después del mensaje de bienvenida
            const welcomeSection = document.querySelector('.mb-8');
            welcomeSection.after(categoriesSection);
        }
        
        // Agregar la nueva card de categoría
        const categoriesGrid = document.getElementById('selected-categories');
        const categoryCard = document.createElement('div');
        categoryCard.className = 'desktop-category-card bg-gray-100 p-4 rounded-2xl cursor-pointer hover:shadow-lg smooth-transition flex-shrink-0 min-w-[280px]';
        categoryCard.setAttribute('data-category', category);
        categoryCard.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    ${getCategoryIcon(category)}
                </div>
                <div class="flex-1">
                    <h3 class="text-green text-base mb-1">${categoryName}</h3>
                    <p class="text-sm text-gray-600">${getCategoryDescription(category)}</p>
                </div>
            </div>
        `;
        categoriesGrid.appendChild(categoryCard);
    }
    
    // Actualizar productos
    generateMobileProducts(category);
    generateDesktopProducts(category);
    
    // Si no hay categorías seleccionadas, eliminar la sección
    if (selectedCategories.size === 0) {
        const categoriesSection = document.querySelector('.categories-section');
        if (categoriesSection) {
            categoriesSection.remove();
        }
    }
}

// Función genérica para manejar vectores SVG
function getVectorIcon(name, options = {}) {
    const {
        size = 'w-5 h-5',
        color = 'primary',
        alt = name,
        customColor = null
    } = options;

    return `<img src="assets/icons/Outline/${name}.svg" alt="${alt}" class="${size} svg-green">`;
}

// Función específica para iconos de categoría
function getCategoryIcon(category) {
    const categoryIcons = {
        'tecnologia': {
            icon: 'Devices/Processor'
        },
        'hogar': {
            icon: 'Devices/armchair'
        },
        'ropa': {
            icon: 'Devices/shirt'
        },
        'accesorios': {
            icon: 'Devices/glasses'
        }
    };
    
    const categoryConfig = categoryIcons[category] || { icon: 'General/tag' };
    
    return getVectorIcon(categoryConfig.icon, {
        alt: category.charAt(0).toUpperCase() + category.slice(1)
    });
}

function getCategoryDescription(category) {
    const descriptions = {
        'tecnologia': 'Laptops, móviles y más',
        'hogar': 'Muebles y decoración',
        'ropa': 'Moda y accesorios',
        'accesorios': 'Auto y más'
    };
    return descriptions[category] || '';
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
        generateMobileProducts();
        generateDesktopProducts();
        return;
    }

    const filteredProducts = productos.filter(product =>
        (selectedCategories.size === 0 || selectedCategories.has(product.category)) &&
        (product.name.toLowerCase().includes(query) ||
        product.condition.toLowerCase().includes(query))
    );

    // Actualizar productos móvil
    const mobileContainer = document.getElementById('mobile-products');
    if (mobileContainer) {
        mobileContainer.innerHTML = filteredProducts.map(product => `
           <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow product-card"
               onclick="selectProduct(this)">
               <div class="aspect-square bg-gray-200 relative">
                   <div class="absolute inset-0 flex items-center justify-center">
                       <img src="${product.images[0].image}" alt="${product.name}" class="w-full h-full object-cover">
                   </div>
               </div>
               <div class="p-3">
                   <h4 class="text-sm font-medium text-gray-800 mb-1">${product.name}</h4>
                   <p class="text-xs text-green mb-2">${product.condition}</p>
                   <div class="flex items-center gap-2">
                       <img src="assets/icons/Solid/Status/Star.svg" alt="Estrella" class="w-4 h-4 svg-yellow">
                       <span class="text-xs text-gray-500">${product.rating}</span>
                   </div>
               </div>
           </div>
       `).join('');
    }

    // Actualizar productos desktop
    const desktopContainer = document.getElementById('desktop-products');
    if (desktopContainer) {
        desktopContainer.innerHTML = filteredProducts.map(product => `
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg smooth-transition product-card w-full"
            onclick="selectProduct(this)">
            <div class="aspect-square bg-gray-200 relative">
                <div class="absolute inset-0 flex items-center justify-center">
                    <img src="${product.images[0].image}" alt="${product.name}" class="w-full h-full object-cover">
                </div>
            </div>
            <div class="p-4">
                <h4 class="text-base font-medium text-gray-800 mb-1 truncate">${product.name}</h4>
                
                <!-- Estado y Calificación en una sola línea -->
                <div class="flex justify-between items-center">
                    <p class="text-green">${product.condition}</p>
                    <div class="flex items-center gap-2">
                        <img src="assets/icons/Solid/Status/Star.svg" alt="Estrella" class="w-4 h-4 svg-yellow">
                        <span class="text-gray-500 text-xs">${product.rating}</span>
                    </div>
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