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

// Funciones de navegación móvil
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

// Funciones de navegación desktop
function setDesktopActiveNav(element) {
    document.querySelectorAll('.desktop-nav-item').forEach(item => {
        item.classList.remove('active', 'bg-green', 'text-white');
        item.classList.add('text-gray-600', 'hover:bg-gray-50');
    });

    element.classList.remove('text-gray-600', 'hover:bg-gray-50');
    element.classList.add('active', 'bg-green', 'text-white');
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

// Función para manejar redimensionamiento de ventana
window.addEventListener('resize', function () {
    // Aquí puedes agregar lógica global para el redimensionamiento
    console.log('Ventana redimensionada');
});

// Inicialización global
document.addEventListener('DOMContentLoaded', function () {
    // Activar primera pestaña móvil por defecto
    const firstMobileTab = document.querySelector('[onclick*="setActiveTab"][onclick*="mobile"]');
    if (firstMobileTab) {
        setActiveTab(firstMobileTab, 0, 'mobile');
    }
});