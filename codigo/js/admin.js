// In-memory cache for fetched resources
const cache = {
    users: [],
    currentSection: 'usuarios',
    currentTab: null,
    currentTabData: [], // Store current tab data for search functionality
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0
};

// Tabs configuration per section
const sectionTabs = {
    resumen: [],
    usuarios: ['users', 'valoraciones'],
    productos: ['productos', 'imagenes_producto', 'categorias'],
    incidencias: ['incidencias', 'propuestas'],
    mensajes: ['conversaciones', 'chat_mensajes'],
    notificaciones: ['notificaciones']
};

const tabLabels = {
    users: 'Listado de Usuarios',
    valoraciones: 'Valoraciones',
    productos: 'Listado de Productos',
    imagenes_producto: 'Imágenes de Productos',
    categorias: 'Categorías',
    incidencias: 'Listado de Incidencias',
    propuestas: 'Propuestas de Intercambio',
    conversaciones: 'Conversaciones',
    chat_mensajes: 'Mensajes de Chat',
    notificaciones: 'Notificaciones'
};

// Function to render users table
function renderUsersTable(usersToRender = cache.users) {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';
    const caps = (window.__capabilities && window.__capabilities['users']) || { update: false, delete: false };
    const canEditUsers = !!caps.update;
    const canDeleteUsers = !!caps.delete;
    usersToRender.forEach(user => {
        const row = document.createElement('tr');
        row.className = 'table-row';

        let roleClass = 'bg-gray-100 text-gray-800';
        if (user.role === 'No verificado') roleClass = 'bg-gray-custom text-green';
        else if (user.role === 'Verificado') roleClass = 'bg-gray-custom text-green';
        else if (user.role === 'Moderador') roleClass = 'bg-gray-custom text-green';

        // Generar avatar (imagen o iniciales)
        let avatarHTML = '';
        if (user.img_usuario) {
            avatarHTML = `<img src="${user.img_usuario}" alt="${user.nombre || 'Usuario'}" class="w-10 h-10 rounded-full object-cover">`;
        } else {
            avatarHTML = user.avatar || '';
        }

        row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.id}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="user-avatar mr-3">${avatarHTML}</div>
                            <div class="text-sm font-medium text-gray-900">${user.nombre || user.name || ''}</div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.email || ''}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.password || '••••••••••'}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.birthDate || ''}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.ubicacion || user.location || ''}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex px-2 py-1 text-xs rounded-full ${roleClass}">
                            ${user.rol || user.role || ''}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div class="flex space-x-2">
                            ${canEditUsers ? `<button class="action-btn edit-user" data-id="${user.id}" title="editar">
                                <img src="../../recursos/iconos/contorno/interfaz/editar.svg" alt="Editar" class="w-5 h-5 svg-gray-600">
                            </button>` : ''}
                            ${canDeleteUsers ? `<button class="action-btn delete-user" data-id="${user.id}" title="Eliminar">
                                <img src="../../recursos/iconos/contorno/interfaz/papelera.svg" alt="Eliminar" class="w-5 h-5 svg-gray-600">
                            </button>` : ''}
                        </div>
                    </td>
                `;
        tbody.appendChild(row);
    });

    // Attach delete handlers
    document.querySelectorAll('.delete-user').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            if (!confirm('¿Eliminar usuario ID ' + id + '?')) return;
            fetch(`../backend/admin_api.php?action=delete&resource=users&id=${id}`, { method: 'POST' })
                .then(r => r.json())
                .then(res => {
                    if (res.ok) {
                        // remove from cache and re-render
                        cache.users = cache.users.filter(u => String(u.id) !== String(id));
                        renderUsersTable(cache.users);
                    } else alert('Error: ' + (res.error || 'desconocido'));
                })
                .catch(err => alert('Error de red: ' + err));
        });
    });
}

// Universal search functionality (server-side across all tabs) with debounce
function initSearchDebounce() {
    const searchInput = document.getElementById('tableSearchInput');
    let searchTimer = null;
    function debounceSearch() {
        if (!cache.currentTab) return;
        loadTab(cache.currentTab, 1);
    }
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            if (searchTimer) clearTimeout(searchTimer);
            searchTimer = setTimeout(debounceSearch, 300);
        });
    }
}

document.addEventListener('DOMContentLoaded', initSearchDebounce);

// Tab functionality
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function () {
        // Remove active class from all tabs
        document.querySelectorAll('.tab-button').forEach(tab => {
            tab.classList.remove('active', 'seleccionar-tabla', 'text-green');
            tab.classList.add('border-transparent', 'text-gray-500');
        });

        // Add active class to clicked tab
        this.classList.add('active', 'seleccionar-tabla', 'text-green');
        this.classList.remove('border-transparent', 'text-gray-500');

        // Here you would typically load different content based on the tab
        const tabType = this.getAttribute('data-tab');
        if (tabType === 'ratings') {
            // Show ratings content
            console.log('Mostrando valoraciones');
        } else {
            // Show users content
            console.log('Mostrando usuarios');
        }
    });
});

// Sidebar navigation component
class SidebarNavigation {
    constructor() {
        this.menuItems = document.querySelectorAll('.menu-item');
        this.selectionIndicator = document.getElementById('selectionIndicator');
        this.currentActiveIndex = 0; // Resumen está activo por defecto
        
        // Definir los iconos para cada elemento del menú
        this.menuIcons = {
            0: { outline: '../../recursos/iconos/contorno/general/grafica.svg', solid: '../../recursos/iconos/solido/general/grafica.svg' },
            1: { outline: '../../recursos/iconos/contorno/comunicacion/usuario.svg', solid: '../../recursos/iconos/solido/comunicacion/usuario.svg' },
            2: { outline: '../../recursos/iconos/contorno/general/caja.svg', solid: '../../recursos/iconos/solido/general/caja.svg' },
            3: { outline: '../../recursos/iconos/contorno/estado/informacion_triangulo.svg', solid: '../../recursos/iconos/solido/estado/informacion_triangulo.svg' },
            4: { outline: '../../recursos/iconos/contorno/comunicacion/correo.svg', solid: '../../recursos/iconos/solido/comunicacion/correo.svg' },
            5: { outline: '../../recursos/iconos/contorno/estado/notificacion.svg', solid: '../../recursos/iconos/solido/estado/notificacion.svg' }
        };
        
        this.init();
    }
    
    init() {
        // Posicionar el indicador en el elemento activo inicial
        this.updateIndicatorPosition(this.currentActiveIndex);
        
        // Agregar event listeners a todos los items
        this.menuItems.forEach((item, index) => {
            item.addEventListener('click', () => this.selectItem(index));
        });
    }
    
    selectItem(index) {
        if (index === this.currentActiveIndex) return;
        
        // Cambiar icono del elemento anterior a contorno
        this.updateMenuItemIcon(this.currentActiveIndex, 'outline');
        this.menuItems[this.currentActiveIndex].classList.remove('active');
        
        // Cambiar icono del nuevo elemento a sólido
        this.updateMenuItemIcon(index, 'solid');
        this.menuItems[index].classList.add('active');
        
        this.updateIndicatorPosition(index);
        
        this.currentActiveIndex = index;
        
        this.handleNavigation(index);
    }
    
    updateMenuItemIcon(index, type) {
        const menuItem = this.menuItems[index];
        const iconImg = menuItem.querySelector('img');
        if (iconImg && this.menuIcons[index]) {
            iconImg.src = this.menuIcons[index][type];
            // Cambiar la clase de color según el tipo
            if (type === 'solid') {
                iconImg.className = iconImg.className.replace('svg-white', 'svg-green');
            } else {
                iconImg.className = iconImg.className.replace('svg-green', 'svg-white');
            }
        }
    }
    
    updateIndicatorPosition(index) {
        const targetItem = this.menuItems[index];
        const itemHeight = 46;
        const offsetY = index * itemHeight;
        
        this.selectionIndicator.style.transform = `translateY(${offsetY}px)`;
    }
    
    handleNavigation(index) {
        const sections = ['resumen', 'usuarios', 'productos', 'incidencias', 'mensajes', 'notificaciones'];
        const section = sections[index] || 'resumen';
        console.log(`Navegando a: ${section}`);
        
        // Llamar a la función global si existe
        if (window.adminLoadSection) {
            window.adminLoadSection(section);
        }
    }
}

// Initialize admin app after DOM is ready
function initAdmin() {
    const sidebar = new SidebarNavigation();
    // Cargar capacidades primero para alinear UI con permisos del backend
    fetch('../backend/admin_api.php?action=capabilities')
        .then(r => r.json())
        .then(res => {
            if (res && res.ok) {
                window.__capabilities = res.capabilities || {};
                if (res.role) window.__userRole = res.role;
            } else {
                window.__capabilities = {};
            }
        })
        .catch(() => { window.__capabilities = {}; })
        .finally(() => {
            // Load default section (Resumen/Dashboard) 
            loadSection('resumen');
    });

    // Helper to load section data and render appropriate tables
    function loadSection(section) {
        console.log('🔄 Loading section:', section);
        cache.currentSection = section;
        const header = document.querySelector('header h2');
        if (header) header.textContent = section.charAt(0).toUpperCase() + section.slice(1);

        // Render tabs for this section
        renderTabs(section);

        // Load first tab content if available
        const tabs = sectionTabs[section] || [];
        console.log('📑 Tabs para la sección:', tabs);
        if (tabs.length > 0) {
            console.log('✅ Sección con tabs, mostrando tablas');
            // Remove dashboard when loading sections with tabs
            const dashboardContainer = document.getElementById('dashboardContainer');
            if (dashboardContainer) {
                console.log('🗑️ Eliminando dashboard');
                dashboardContainer.remove();
            }
            // Show table container, search bar and pagination
            const tableContainer = document.querySelector('.overflow-x-auto');
            if (tableContainer) {
                console.log('📊 Mostrando tabla');
                tableContainer.style.display = 'block';
            }
            const searchBar = document.querySelector('.p-4.flex.justify-between');
            if (searchBar) {
                console.log('🔍 Mostrando barra de búsqueda');
                searchBar.style.display = 'flex';
            }
            const paginationControls = document.querySelector('.px-4.py-3.flex.items-center.justify-between.border-t');
            if (paginationControls) {
                console.log('📄 Mostrando paginación');
                paginationControls.style.display = 'flex';
            }
            
            loadTab(tabs[0]);
        } else if (section === 'resumen') {
            console.log('📊 Cargando dashboard');
            loadDashboard();
        }
    }

    // Expose section loader for sidebar navigation
    window.adminLoadSection = loadSection;

    function loadDashboard() {
        hideAllTableHeaders();
        
        // Ocultar barra de búsqueda
        const searchBar = document.querySelector('.p-4.flex.justify-between');
        if (searchBar) searchBar.style.display = 'none';
        
        // Ocultar tabla y scroll container
        const tableContainer = document.querySelector('.overflow-x-auto');
        if (tableContainer) tableContainer.style.display = 'none';
        
        // Ocultar controles de paginación
        const paginationControls = document.querySelector('.px-4.py-3.flex.items-center.justify-between.border-t');
        if (paginationControls) paginationControls.style.display = 'none';
        
        // Crear o mostrar contenedor del dashboard
        let dashboardContainer = document.getElementById('dashboardContainer');
        if (!dashboardContainer) {
            dashboardContainer = document.createElement('div');
            dashboardContainer.id = 'dashboardContainer';
            const mainContent = document.querySelector('main .bg-white.rounded-lg.shadow');
            if (mainContent) {
                mainContent.appendChild(dashboardContainer);
            }
        }
        dashboardContainer.style.display = 'block';
        dashboardContainer.innerHTML = '<div class="p-6 text-center">Cargando estadísticas...</div>';
        
        console.log('Cargando dashboard...');
        
        fetch('../backend/admin_api.php?action=dashboard')
            .then(r => r.json())
            .then(res => {
                console.log('Respuesta del dashboard:', res);
                if (res.ok) {
                    renderDashboard(res.data);
                } else {
                    console.error('Error en respuesta:', res.error);
                    dashboardContainer.innerHTML = '<div class="p-6 text-center text-red-600">Error al cargar estadísticas: ' + (res.error || 'Desconocido') + '</div>';
                }
            })
            .catch(err => {
                console.error('Error de red:', err);
                dashboardContainer.innerHTML = '<div class="p-6 text-center text-red-600">Error de red: ' + err.message + '</div>';
            });
    }

    function renderDashboard(data) {
        console.log('Renderizando dashboard con data:', data);
        const dashboardContainer = document.getElementById('dashboardContainer');
        console.log('Contenedor del dashboard:', dashboardContainer);
        if (!dashboardContainer) {
            console.error('No se encontró el contenedor del dashboard');
            return;
        }
        
        dashboardContainer.innerHTML = `
            <div class="p-6">
                <!-- Cards de estadísticas -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <!-- Total Usuarios -->
                    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500 mb-1">Total Usuarios</p>
                                <p class="text-3xl font-bold text-gray-900">${data.totalUsers}</p>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Intercambios Activos -->
                    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500 mb-1">Intercambios en Proceso</p>
                                <p class="text-3xl font-bold text-gray-900">${data.activeExchanges}</p>
                            </div>
                            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Incidencias Nuevas -->
                    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500 mb-1">Incidencias Nuevas</p>
                                <p class="text-3xl font-bold text-gray-900">${data.incidencias.nueva}</p>
                            </div>
                            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Incidencias Resueltas -->
                    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500 mb-1">Incidencias Resueltas</p>
                                <p class="text-3xl font-bold text-gray-900">${data.incidencias.resuelta}</p>
                            </div>
                            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Gráficas -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <!-- Gráfica de barras: Productos por mes -->
                    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Productos Publicados (${new Date().getFullYear()})</h3>
                        <div id="barChart" class="h-64"></div>
                    </div>
                    
                    <!-- Gráfica de dona: Productos por categoría -->
                    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Productos por Categoría</h3>
                        <div id="donutChart" class="h-64 flex items-center justify-center"></div>
                    </div>
                </div>
                
                <!-- Tablas -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Últimas incidencias -->
                    <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <h3 class="text-lg font-semibold text-gray-900">Últimas Incidencias</h3>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500">ID</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500">Descripción</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500">Estado</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500">Usuario</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    ${data.lastIncidencias.map(inc => `
                                        <tr class="hover:bg-gray-50">
                                            <td class="px-4 py-3 text-sm text-gray-900">${inc.id}</td>
                                            <td class="px-4 py-3 text-sm text-gray-900">${(inc.descripcion || 'Sin descripción').substring(0, 30)}...</td>
                                            <td class="px-4 py-3 text-sm">
                                                <span class="inline-flex px-2 py-1 text-xs rounded-full ${getEstadoBadgeClass(inc.estado)}">
                                                    ${inc.estado}
                                                </span>
                                            </td>
                                            <td class="px-4 py-3 text-sm text-gray-900">${inc.usuario_nombre || 'Desconocido'}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <!-- Últimos usuarios -->
                    <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <h3 class="text-lg font-semibold text-gray-900">Últimos Usuarios Registrados</h3>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500">Usuario</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500">Correo</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500">Rol</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    ${data.lastUsers.map(user => `
                                        <tr class="hover:bg-gray-50">
                                            <td class="px-4 py-3">
                                                <div class="flex items-center">
                                                    ${user.img_usuario ? 
                                                        `<img src="${user.img_usuario}" alt="${user.nombre}" class="w-8 h-8 rounded-full object-cover mr-2">` :
                                                        `<div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700 mr-2">${getInitials(user.nombre)}</div>`
                                                    }
                                                    <span class="text-sm text-gray-900">${user.nombre}</span>
                                                </div>
                                            </td>
                                            <td class="px-4 py-3 text-sm text-gray-900">${user.correo}</td>
                                            <td class="px-4 py-3 text-sm">
                                                <span class="inline-flex px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                                                    ${user.rol}
                                                </span>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Render charts
        console.log('Renderizando gráficas...');
        renderBarChart(data.productsByMonth);
        renderDonutChart(data.productsByCategory);
        console.log('Dashboard renderizado completamente!');
    }

    function getEstadoBadgeClass(estado) {
        const estadoLower = (estado || '').toLowerCase();
        if (estadoLower === 'nueva' || estadoLower === 'nuevo' || estadoLower === 'pendiente') {
            return 'bg-red-100 text-red-800';
        } else if (estadoLower === 'en progreso' || estadoLower === 'en_progreso' || estadoLower === 'procesando') {
            return 'bg-yellow-100 text-yellow-800';
        } else if (estadoLower === 'resuelta' || estadoLower === 'cerrada' || estadoLower === 'completada') {
            return 'bg-green-100 text-green-800';
        }
        return 'bg-gray-100 text-gray-800';
    }

    function getInitials(name) {
        if (!name) return '??';
        const words = name.trim().split(' ');
        if (words.length >= 2) {
            return (words[0][0] + words[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }

    function renderBarChart(productsByMonth) {
        const container = document.getElementById('barChart');
        if (!container) return;
        
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const maxValue = Math.max(...productsByMonth, 1);
        
        let html = '<div class="flex items-end justify-between h-full px-2 pb-8">';
        productsByMonth.forEach((value, index) => {
            const heightPercent = (value / maxValue) * 100;
            html += `
                <div class="flex-1 flex flex-col items-center justify-end h-full mx-1">
                    <div class="text-xs text-gray-600 mb-1">${value}</div>
                    <div class="w-full bg-green rounded-t" style="height: ${heightPercent}%; min-height: ${value > 0 ? '8px' : '0'}; background-color: #719177;"></div>
                    <div class="text-xs text-gray-500 mt-2">${months[index]}</div>
                </div>
            `;
        });
        html += '</div>';
        container.innerHTML = html;
    }

    function renderDonutChart(productsByCategory) {
        const container = document.getElementById('donutChart');
        if (!container) return;
        
        if (!productsByCategory || productsByCategory.length === 0) {
            container.innerHTML = '<p class="text-gray-500">No hay datos disponibles</p>';
            return;
        }
        
        const total = productsByCategory.reduce((sum, cat) => sum + cat.total, 0);
        const colors = ['#719177', '#5a7a5f', '#8fa891', '#a8c0aa', '#c1d8c3', '#dae8db'];
        
        // SVG Donut Chart
        let currentAngle = 0;
        const radius = 80;
        const holeRadius = 50;
        const cx = 120;
        const cy = 100;
        
        let paths = '';
        productsByCategory.slice(0, 6).forEach((cat, index) => {
            const percentage = (cat.total / total) * 100;
            const angle = (percentage / 100) * 360;
            const endAngle = currentAngle + angle;
            
            const x1 = cx + radius * Math.cos((currentAngle - 90) * Math.PI / 180);
            const y1 = cy + radius * Math.sin((currentAngle - 90) * Math.PI / 180);
            const x2 = cx + radius * Math.cos((endAngle - 90) * Math.PI / 180);
            const y2 = cy + radius * Math.sin((endAngle - 90) * Math.PI / 180);
            
            const largeArc = angle > 180 ? 1 : 0;
            
            const pathData = [
                `M ${cx} ${cy}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
                'Z'
            ].join(' ');
            
            paths += `<path d="${pathData}" fill="${colors[index % colors.length]}" opacity="0.9"/>`;
            currentAngle = endAngle;
        });
        
        container.innerHTML = `
            <div class="flex items-center w-full">
                <svg width="240" height="200" viewBox="0 0 240 200" class="flex-shrink-0">
                    ${paths}
                    <circle cx="${cx}" cy="${cy}" r="${holeRadius}" fill="white"/>
                    <text x="${cx}" y="${cy}" text-anchor="middle" dy="0.3em" class="text-2xl font-bold" fill="#374151">${total}</text>
                </svg>
                <div class="ml-6 flex-1">
                    ${productsByCategory.slice(0, 6).map((cat, index) => `
                        <div class="flex items-center mb-2">
                            <div class="w-3 h-3 rounded-full mr-2" style="background-color: ${colors[index % colors.length]}"></div>
                            <span class="text-sm text-gray-700 flex-1">${cat.categoria}</span>
                            <span class="text-sm font-semibold text-gray-900">${cat.total}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function hideAllTableHeaders() {
        const allHeaders = ['usersTableHead', 'productsTableHead', 'productosTableHead', 'valoracionesTableHead', 
                           'imagenes_productoTableHead', 'categoriasTableHead', 'incidenciasTableHead',
                           'propuestasTableHead', 'conversacionesTableHead', 'chat_mensajesTableHead', 
                           'notificacionesTableHead'];
        allHeaders.forEach(headerId => {
            const header = document.getElementById(headerId);
            if (header) header.style.display = 'none';
        });
    }

    function updateSearchAndButtons(tabName) {
        const searchInput = document.getElementById('tableSearchInput');
        
        // Update search placeholder
        const placeholders = {
            'users': 'Buscar usuarios...',
            'productos': 'Buscar productos...',
            'valoraciones': 'Buscar valoraciones...',
            'imagenes_producto': 'Buscar imágenes...',
            'categorias': 'Buscar categorías...',
            'incidencias': 'Buscar incidencias...',
            'propuestas': 'Buscar propuestas...',
            'conversaciones': 'Buscar conversaciones...',
            'chat_mensajes': 'Buscar mensajes...',
            'notificaciones': 'Buscar notificaciones...'
        };
        if (searchInput) {
            searchInput.placeholder = placeholders[tabName] || 'Buscar...';
            // No limpiar el valor aquí: preserva el término al recargar la misma pestaña
        }
        
        // Hide all add buttons first
        const allButtons = ['addUserBtn', 'addProductBtn', 'addValoracionBtn', 'addCategoriaBtn', 
                           'addIncidenciaBtn', 'addPropuestaBtn', 'addNotificacionBtn',
                           'addImagenBtn', 'addConversacionBtn', 'addChatMensajeBtn'];
        allButtons.forEach(btnId => {
            const btn = document.getElementById(btnId);
            if (btn) btn.style.display = 'none';
        });
        
        // Show appropriate add button based on current tab
        const buttonMap = {
            'users': 'addUserBtn',
            'productos': 'addProductBtn',
            'valoraciones': 'addValoracionBtn',
            'imagenes_producto': 'addImagenBtn',
            'categorias': 'addCategoriaBtn',
            'incidencias': 'addIncidenciaBtn',
            'propuestas': 'addPropuestaBtn',
            'conversaciones': 'addConversacionBtn',
            'chat_mensajes': 'addChatMensajeBtn',
            'notificaciones': 'addNotificacionBtn'
        };

        // Determinar permisos de creación según capacidades del backend
        function canAdd(tab) {
            const caps = (window.__capabilities && window.__capabilities[tab]) || null;
            return !!(caps && caps.create);
        }

        const btnId = buttonMap[tabName];
        if (btnId) {
            const btn = document.getElementById(btnId);
            if (btn && canAdd(tabName)) btn.style.display = 'block';
        }
    }

    function renderTabs(section) {
        const tabs = sectionTabs[section] || [];
        const tabContainer = document.querySelector('.border-b.border-gray-200 nav');
        if (!tabContainer) return;

        tabContainer.innerHTML = '';

        tabs.forEach((tab, index) => {
            const btn = document.createElement('button');
            btn.className = `tab-button py-2 px-1 border-b-2 ${index === 0 ? 'active seleccionar-tabla text-green' : 'border-transparent text-gray-500'} font-medium text-sm`;
            btn.setAttribute('data-tab', tab);
            btn.textContent = tabLabels[tab] || tab;
            btn.addEventListener('click', function() {
                // Remove active from all
                tabContainer.querySelectorAll('.tab-button').forEach(t => {
                    t.classList.remove('active', 'seleccionar-tabla', 'text-green');
                    t.classList.add('border-transparent', 'text-gray-500');
                });
                // Add active to clicked
                this.classList.add('active', 'seleccionar-tabla', 'text-green');
                this.classList.remove('border-transparent', 'text-gray-500');
                // Load tab content
                loadTab(tab);
            });
            tabContainer.appendChild(btn);
        });
    }

    function loadTab(tabName, page = 1) {
        cache.currentTab = tabName;
        cache.currentPage = page;
        
        // Remove dashboard completely and show table
        const dashboardContainer = document.getElementById('dashboardContainer');
        if (dashboardContainer) {
            dashboardContainer.remove();
        }
        
        // Mostrar tabla
        const tableContainer = document.querySelector('.overflow-x-auto');
        if (tableContainer) tableContainer.style.display = 'block';
        
        // Mostrar barra de búsqueda
        const searchBar = document.querySelector('.p-4.flex.justify-between');
        if (searchBar) searchBar.style.display = 'flex';
        
        // Mostrar controles de paginación
        const paginationControls = document.querySelector('.px-4.py-3.flex.items-center.justify-between.border-t');
        if (paginationControls) paginationControls.style.display = 'flex';
        
        // Update search bar and action buttons
        updateSearchAndButtons(tabName);

        // Hide all headers first
        hideAllTableHeaders();

        // Fetch and render data for this tab with pagination and optional search
        const qEl = document.getElementById('tableSearchInput');
        const q = qEl ? (qEl.value || '').trim() : '';
        const url = `../backend/admin_api.php?action=list&resource=${encodeURIComponent(tabName)}&page=${page}&limit=50${q ? `&q=${encodeURIComponent(q)}` : ''}`;
        fetch(url)
            .then(r => r.json())
            .then(res => {
                if (res.ok) {
                    const data = res.data || [];
                    // Store data and pagination info in cache
                    cache.currentTabData = data;
                    cache.totalPages = res.totalPages || 1;
                    cache.totalRecords = res.total || 0;
                    cache.currentPage = res.page || 1;
                    
                    // Update pagination controls
                    updatePaginationControls();
                    
                    if (tabName === 'users') {
                        // Show users header
                        const usersHead = document.getElementById('usersTableHead');
                        if (usersHead) usersHead.style.display = '';
                        cache.users = data;
                        renderUsersTable(cache.users);
                    } else {
                        renderGenericTable(tabName, data);
                    }
                } else {
                    console.error('API error', res.error);
                    document.getElementById('usersTableBody').innerHTML = `<tr><td class="p-6">Error: ${res.error}</td></tr>`;
                }
            })
            .catch(() => {
                document.getElementById('usersTableBody').innerHTML = `<tr><td class="p-6">Error de red</td></tr>`;
            });

    }

    function updatePaginationControls() {
        const startRecord = ((cache.currentPage - 1) * 50) + 1;
        const endRecord = Math.min(cache.currentPage * 50, cache.totalRecords);
        
        document.getElementById('startRecord').textContent = cache.totalRecords > 0 ? startRecord : 0;
        document.getElementById('endRecord').textContent = endRecord;
        document.getElementById('totalRecords').textContent = cache.totalRecords;
        document.getElementById('currentPageNum').textContent = cache.currentPage;
        document.getElementById('totalPagesNum').textContent = cache.totalPages;
        
        // Enable/disable buttons
        const prevButtons = [document.getElementById('prevPage'), document.getElementById('prevPageMobile')];
        const nextButtons = [document.getElementById('nextPage'), document.getElementById('nextPageMobile')];
        
        prevButtons.forEach(btn => {
            if (btn) {
                btn.disabled = cache.currentPage <= 1;
                btn.style.opacity = cache.currentPage <= 1 ? '0.5' : '1';
                btn.style.cursor = cache.currentPage <= 1 ? 'not-allowed' : 'pointer';
            }
        });
        
        nextButtons.forEach(btn => {
            if (btn) {
                btn.disabled = cache.currentPage >= cache.totalPages;
                btn.style.opacity = cache.currentPage >= cache.totalPages ? '0.5' : '1';
                btn.style.cursor = cache.currentPage >= cache.totalPages ? 'not-allowed' : 'pointer';
            }
        });
    }

    // Generic table renderer for non-user resources
    function renderGenericTable(tabName, items) {
        const tbody = document.getElementById('usersTableBody');
        tbody.innerHTML = '';
        
        // Show/hide appropriate table headers
        hideAllTableHeaders();
        // Special case: "productos" uses "productsTableHead" in HTML
        const headerName = tabName === 'productos' ? 'productsTableHead' : `${tabName}TableHead`;
        const headerElement = document.getElementById(headerName);
        if (headerElement) headerElement.style.display = '';

        if (!items.length) {
            tbody.innerHTML = `<tr><td class="p-6 text-center">No hay registros para ${tabLabels[tabName] || tabName}.</td></tr>`;
            return;
        }

        // Render specific tables based on resource type
        switch(tabName) {
            case 'productos':
                const capsProd = (window.__capabilities && window.__capabilities['productos']) || {};
                const showEditProd = !!capsProd.update;
                const showDeleteProd = !!capsProd.delete;
                items.forEach(p => {
                    const tr = document.createElement('tr');
                    tr.className = 'table-row';
                    tr.innerHTML = `
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${p.id}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${p.nombre || ''}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${p.estado || ''}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${p.categoria || ''}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${p.f_publicacion || ''}</td>
                        <td class="px-6 py-4 text-sm text-gray-900">${(p.descripcion || '').substring(0,50)}...</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div class="flex space-x-2">
                                ${showEditProd ? `<button class="action-btn edit-generic" data-resource="${tabName}" data-id="${p.id}" title="editar">
                                    <img src="../../recursos/iconos/contorno/interfaz/editar.svg" alt="Editar" class="w-5 h-5 svg-gray-600">
                                </button>` : ''}
                                ${showDeleteProd ? `<button class="action-btn delete-generic" data-resource="${tabName}" data-id="${p.id}" title="Eliminar">
                                    <img src="../../recursos/iconos/contorno/interfaz/papelera.svg" alt="Eliminar" class="w-5 h-5 svg-gray-600">
                                </button>` : ''}
                            </div>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
                attachGenericDeleteHandlers(tabName);
                break;

            case 'valoraciones':
                renderTableWithColumns(items, ['id', 'puntuacion', 'comentario', 'fecha', 'emisor_nombre', 'receptor_nombre'], tabName);
                break;

            case 'imagenes_producto':
                renderTableWithColumns(items, ['id', 'url_imagen', 'id_producto', 'producto_nombre'], tabName);
                break;

            case 'categorias':
                renderTableWithColumns(items, ['id', 'nombre', 'slug', 'url_imagen', 'descripcion'], tabName);
                break;

            case 'incidencias':
                renderTableWithColumns(items, ['id', 'fecha', 'estado', 'descripcion', 'id_usuario'], tabName);
                break;

            case 'propuestas':
                renderTableWithColumns(items, ['id', 'producto_solicitado', 'producto_ofrecido', 'estado', 'fecha', 'usuario_nombre'], tabName);
                break;

            case 'conversaciones':
                renderTableWithColumns(items, ['id', 'usuario1_nombre', 'usuario2_nombre', 'producto_nombre', 'fecha_inicio', 'ultimo_mensaje'], tabName);
                break;

            case 'chat_mensajes':
                renderTableWithColumns(items, ['id', 'id_conversacion', 'emisor_nombre', 'contenido', 'enviado_en', 'leido'], tabName);
                break;

            case 'notificaciones':
                renderTableWithColumns(items, ['id', 'tipo', 'titulo', 'descripcion', 'fecha', 'leida', 'id_usuario'], tabName);
                break;

            default:
                // Fallback: render as key-value pairs
                items.forEach(it => {
                    const tr = document.createElement('tr');
                    tr.className = 'table-row';
                    const td = document.createElement('td');
                    td.colSpan = 8;
                    td.className = 'px-6 py-4';
                    const inner = document.createElement('div');
                    inner.className = 'text-sm text-gray-900';
                    Object.keys(it).forEach(k => {
                        const div = document.createElement('div');
                        div.innerHTML = `<strong>${k}:</strong> ${it[k]}`;
                        inner.appendChild(div);
                    });
                    td.appendChild(inner);
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                });
        }
    }

    function renderTableWithColumns(items, columns, tabName) {
        const tbody = document.getElementById('usersTableBody');
        function canEdit(tab) {
            const caps = (window.__capabilities && window.__capabilities[tab]) || null;
            return !!(caps && caps.update);
        }
        function canDelete(tab) {
            const caps = (window.__capabilities && window.__capabilities[tab]) || null;
            return !!(caps && caps.delete);
        }
        items.forEach(item => {
            const tr = document.createElement('tr');
            tr.className = 'table-row';
            columns.forEach(col => {
                const td = document.createElement('td');
                td.className = 'px-6 py-4 whitespace-nowrap text-sm text-gray-900';
                td.textContent = item[col] !== null && item[col] !== undefined ? item[col] : '';
                tr.appendChild(td);
            });
            // Add actions column
            const tdActions = document.createElement('td');
            tdActions.className = 'px-6 py-4 whitespace-nowrap text-sm font-medium';
            const showEdit = canEdit(tabName);
            const showDelete = canDelete(tabName);
            tdActions.innerHTML = `
                <div class="flex space-x-2">
                    ${showEdit ? `<button class="action-btn edit-generic" data-resource="${tabName}" data-id="${item.id}" title="editar">
                        <img src="../../recursos/iconos/contorno/interfaz/editar.svg" alt="Editar" class="w-5 h-5 svg-gray-600">
                    </button>` : ''}
                    ${showDelete ? `<button class="action-btn delete-generic" data-resource="${tabName}" data-id="${item.id}" title="Eliminar">
                        <img src="../../recursos/iconos/contorno/interfaz/papelera.svg" alt="Eliminar" class="w-5 h-5 svg-gray-600">
                    </button>` : ''}
                </div>
            `;
            tr.appendChild(tdActions);
            tbody.appendChild(tr);
        });
        attachGenericDeleteHandlers(tabName);
    }

    function attachGenericDeleteHandlers(resource) {
        document.querySelectorAll(`.delete-generic[data-resource="${resource}"]`).forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                if (!confirm(`¿Eliminar registro ID ${id}?`)) return;
                fetch(`../backend/admin_api.php?action=delete&resource=${resource}&id=${id}`, { method: 'POST' })
                    .then(r => r.json())
                    .then(res => {
                        if (res.ok) {
                            loadTab(cache.currentTab); // Reload current tab
                        } else alert('Error: ' + (res.error || 'desconocido'));
                    })
                    .catch(err => alert('Error de red: ' + err));
            });
        });
    }
    
    // Create modal container (single shared modal)
    const modalRoot = document.createElement('div');
    modalRoot.id = 'adminModalRoot';
    modalRoot.style.display = 'none';
    modalRoot.innerHTML = `
        <div id="adminModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white rounded-lg w-3/4 max-w-2xl p-6">
                <h3 id="modalTitle" class="text-xl mb-4"></h3>
                <form id="modalForm" class="space-y-4">
                    <!-- dynamic fields -->
                    <div class="flex justify-end">
                        <button type="button" id="modalCancel" class="mr-2 px-4 py-2 border rounded">Cancelar</button>
                        <button type="submit" id="modalSubmit" class="px-4 py-2 bg-green text-white rounded">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modalRoot);

    function openModal({title = 'Editar', fields = [], onSubmit}){
        const root = document.getElementById('adminModalRoot');
        root.style.display = 'block';
        document.getElementById('modalTitle').textContent = title;
        const form = document.getElementById('modalForm');
        // clear previous fields
        form.querySelectorAll('.dynamic-field')?.forEach(n => n.remove());

        fields.forEach(f => {
            const wrapper = document.createElement('div');
            wrapper.className = 'dynamic-field';
            
            // Don't show label for hidden fields
            if (f.type !== 'hidden') {
                wrapper.innerHTML = `<label class="block text-sm font-medium mb-1">${f.label}</label>`;
            }
            
            let input;
            if (f.type === 'textarea') {
                input = document.createElement('textarea');
                input.className = 'w-full border p-2 rounded';
                input.rows = 4;
                input.name = f.name;
                input.value = f.value || '';
            } else if (f.type === 'select') {
                input = document.createElement('select');
                input.className = 'w-full border p-2 rounded';
                input.name = f.name;
                const opts = f.options || [];
                opts.forEach(opt => {
                    const o = document.createElement('option');
                    o.value = String(opt.value);
                    o.textContent = opt.label;
                    input.appendChild(o);
                });
                if (f.value !== undefined && f.value !== null) {
                    input.value = String(f.value);
                }
            } else {
                input = document.createElement('input');
                input.type = f.type || 'text';
                input.className = 'w-full border p-2 rounded';
                input.name = f.name;
                input.value = f.value || '';
            }
            
            // Hide the wrapper completely for hidden fields
            if (f.type === 'hidden') {
                wrapper.style.display = 'none';
            }
            
            wrapper.appendChild(input);
            form.insertBefore(wrapper, form.firstChild);
        });

        // Cancel
        document.getElementById('modalCancel').onclick = () => { root.style.display = 'none'; };

        // Submit
        form.onsubmit = function(e){
            e.preventDefault();
            const formData = new FormData(form);
            const payload = {};
            formData.forEach((v,k) => payload[k] = v);
            onSubmit(payload).then(() => {
                root.style.display = 'none';
            }).catch(err => {
                alert('Error: ' + (err.message || err));
            });
        };
    }

    // Options cache and helper
    const optionsCache = { users: null, productos: null, conversaciones: null };
    function fetchOptions(resource) {
        if (optionsCache[resource]) return Promise.resolve(optionsCache[resource]);
        return fetch(`../backend/admin_api.php?action=options&resource=${resource}`)
            .then(r=>r.json())
            .then(res=>{
                if (!res.ok) throw new Error(res.error || 'Error al cargar opciones');
                const mapped = (res.data||[]).map(x=>({ value: x.id, label: `${x.label}` }));
                optionsCache[resource] = mapped;
                return mapped;
            });
    }

    // Expose add/edit actions for users and products
    document.addEventListener('click', function(e){
        // Add user
        if (e.target.matches('#addUserBtn') || e.target.closest('#addUserBtn')) {
            openModal({
                title: 'Crear usuario',
                fields: [
                    {label:'Nombre', name:'nombre'},
                    {label:'Correo', name:'correo', type:'email'},
                    {label:'Contraseña', name:'contrasena', type:'password'},
                    {label:'Rol', name:'rol'},
                    {label:'Ubicación', name:'ubicacion'},
                    {label:'Fecha Nacimiento', name:'f_nacimiento', type:'date'}
                ],
                onSubmit: (data) => {
                    return fetch('../backend/admin_api.php?action=create&resource=users', {method:'POST', body: new URLSearchParams(data)})
                        .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('users'));
                }
            });
        }

        // Edit user
        if (e.target.matches('.edit-user') || e.target.closest('.edit-user')) {
            const id = e.target.closest('.edit-user').getAttribute('data-id');
            const user = cache.users.find(u => String(u.id) === String(id));
            if (!user) return alert('Usuario no encontrado');
            openModal({
                title: 'Editar usuario',
                fields: [
                    {label:'Nombre', name:'nombre', value: user.nombre},
                    {label:'Correo', name:'correo', type:'email', value: user.email},
                    {label:'Contraseña (dejar en blanco para no cambiar)', name:'contrasena', type:'password', value: ''},
                    {label:'Rol', name:'rol', value: user.rol},
                    {label:'Ubicación', name:'ubicacion', value: user.ubicacion},
                    {label:'Fecha Nacimiento', name:'f_nacimiento', type:'date', value: user.birthDate ? convertDateForInput(user.birthDate) : ''},
                    {label:'ID', name:'id', type:'hidden', value: user.id}
                ],
                onSubmit: (data) => {
                    return fetch('../backend/admin_api.php?action=update&resource=users', {method:'POST', body: new URLSearchParams(data)})
                        .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('users'));
                }
            });
        }

        // Add product
        if (e.target.matches('#addProductBtn') || e.target.closest('#addProductBtn')) {
            openModal({
                title: 'Crear producto',
                fields: [
                    {label:'Nombre', name:'nombre'},
                    {label:'Estado', name:'estado'},
                    {label:'Categoria', name:'categoria'},
                    {label:'Descripcion', name:'descripcion', type:'textarea'}
                ],
                onSubmit: (data) => {
                    return fetch('../backend/admin_api.php?action=create&resource=productos', {method:'POST', body: new URLSearchParams(data)})
                        .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('productos'));
                }
            });
        }

        // Edit product (legacy support, but now we use edit-generic)
        if (e.target.matches('.edit-product') || e.target.closest('.edit-product')) {
            const id = e.target.closest('.edit-product').getAttribute('data-id');
            fetch(`../backend/admin_api.php?action=list&resource=productos`).then(r=>r.json()).then(res=>{
                if (!res.ok) throw res.error;
                const prod = (res.data || []).find(p=>String(p.id)===String(id));
                if (!prod) throw 'Producto no encontrado';
                openModal({
                    title: 'Editar producto',
                    fields: [
                        {label:'Nombre', name:'nombre', value: prod.nombre},
                        {label:'Estado', name:'estado', value: prod.estado},
                        {label:'Categoria', name:'categoria', value: prod.categoria},
                        {label:'Descripcion', name:'descripcion', type:'textarea', value: prod.descripcion},
                        {label:'ID', name:'id', type:'hidden', value: prod.id}
                    ],
                    onSubmit: (data) => {
                        return fetch('../backend/admin_api.php?action=update&resource=productos', {method:'POST', body: new URLSearchParams(data)})
                            .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('productos'));
                    }
                });
            }).catch(err=>alert('Error: '+err));
        }

        // Edit product with edit-generic class
        if (e.target.matches('.edit-generic[data-resource="productos"]') || e.target.closest('.edit-generic[data-resource="productos"]')) {
            const id = e.target.closest('.edit-generic').getAttribute('data-id');
            const item = cache.currentTabData.find(i => String(i.id) === String(id));
            if (!item) return alert('Producto no encontrado');
            openModal({
                title: 'Editar producto',
                fields: [
                    {label:'Nombre', name:'nombre', value: item.nombre},
                    {label:'Estado', name:'estado', value: item.estado},
                    {label:'Categoria', name:'categoria', value: item.categoria},
                    {label:'Descripcion', name:'descripcion', type:'textarea', value: item.descripcion},
                    {label:'ID', name:'id', type:'hidden', value: item.id}
                ],
                onSubmit: (data) => {
                    return fetch('../backend/admin_api.php?action=update&resource=productos', {method:'POST', body: new URLSearchParams(data)})
                        .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('productos'));
                }
            });
        }

        // ====== VALORACIONES ======
        if (e.target.matches('#addValoracionBtn') || e.target.closest('#addValoracionBtn')) {
            fetchOptions('users').then(userOpts => {
                openModal({
                    title: 'Crear valoración',
                    fields: [
                        {label:'Usuario Emisor', name:'id_usuario_emisor', type:'select', options: userOpts},
                        {label:'Usuario Receptor', name:'id_usuario_receptor', type:'select', options: userOpts},
                        {label:'Puntuación (1-5)', name:'puntuacion', type:'number'},
                        {label:'Comentario', name:'comentario', type:'textarea'},
                        {label:'Fecha', name:'fecha', type:'date'}
                    ],
                    onSubmit: (data) => {
                        return fetch('../backend/admin_api.php?action=create&resource=valoraciones', {method:'POST', body: new URLSearchParams(data)})
                            .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('valoraciones'));
                    }
                });
            });
        }

        if (e.target.matches('.edit-generic[data-resource="valoraciones"]') || e.target.closest('.edit-generic[data-resource="valoraciones"]')) {
            const id = e.target.closest('.edit-generic').getAttribute('data-id');
            const item = cache.currentTabData.find(i => String(i.id) === String(id));
            if (!item) return alert('Valoración no encontrada');
            fetchOptions('users').then(userOpts => {
                openModal({
                    title: 'Editar valoración',
                    fields: [
                        {label:'Usuario Emisor', name:'id_usuario_emisor', type:'select', options: userOpts, value: item.id_usuario_emisor},
                        {label:'Usuario Receptor', name:'id_usuario_receptor', type:'select', options: userOpts, value: item.id_usuario_receptor},
                        {label:'Puntuación (1-5)', name:'puntuacion', type:'number', value: item.puntuacion},
                        {label:'Comentario', name:'comentario', type:'textarea', value: item.comentario},
                        {label:'Fecha', name:'fecha', type:'date', value: item.fecha},
                        {label:'ID', name:'id', type:'hidden', value: item.id}
                    ],
                    onSubmit: (data) => {
                        return fetch('../backend/admin_api.php?action=update&resource=valoraciones', {method:'POST', body: new URLSearchParams(data)})
                            .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('valoraciones'));
                    }
                });
            });
        }

        // ====== CATEGORIAS ======
        if (e.target.matches('#addCategoriaBtn') || e.target.closest('#addCategoriaBtn')) {
            openModal({
                title: 'Crear categoría',
                fields: [
                    {label:'Nombre', name:'nombre'},
                    {label:'Slug', name:'slug'},
                    {label:'URL Imagen', name:'url_imagen'},
                    {label:'Descripción', name:'descripcion', type:'textarea'}
                ],
                onSubmit: (data) => {
                    return fetch('../backend/admin_api.php?action=create&resource=categorias', {method:'POST', body: new URLSearchParams(data)})
                        .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('categorias'));
                }
            });
        }

        if (e.target.matches('.edit-generic[data-resource="categorias"]') || e.target.closest('.edit-generic[data-resource="categorias"]')) {
            const id = e.target.closest('.edit-generic').getAttribute('data-id');
            const item = cache.currentTabData.find(i => String(i.id) === String(id));
            if (!item) return alert('Categoría no encontrada');
            openModal({
                title: 'Editar categoría',
                fields: [
                    {label:'Nombre', name:'nombre', value: item.nombre},
                    {label:'Slug', name:'slug', value: item.slug},
                    {label:'URL Imagen', name:'url_imagen', value: item.url_imagen},
                    {label:'Descripción', name:'descripcion', type:'textarea', value: item.descripcion},
                    {label:'ID', name:'id', type:'hidden', value: item.id}
                ],
                onSubmit: (data) => {
                    return fetch('../backend/admin_api.php?action=update&resource=categorias', {method:'POST', body: new URLSearchParams(data)})
                        .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('categorias'));
                }
            });
        }

        // ====== INCIDENCIAS ======
        if (e.target.matches('#addIncidenciaBtn') || e.target.closest('#addIncidenciaBtn')) {
            fetchOptions('users').then(userOpts => {
                openModal({
                    title: 'Crear incidencia',
                    fields: [
                        {label:'Usuario Reporta', name:'id_usuario_reporta', type:'select', options: userOpts},
                        {label:'Tipo', name:'tipo'},
                        {label:'Descripción', name:'descripcion', type:'textarea'},
                        {label:'Estado', name:'estado'},
                        {label:'Fecha Reporte', name:'fecha_reporte', type:'date'}
                    ],
                    onSubmit: (data) => {
                        return fetch('../backend/admin_api.php?action=create&resource=incidencias', {method:'POST', body: new URLSearchParams(data)})
                            .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('incidencias'));
                    }
                });
            });
        }

        if (e.target.matches('.edit-generic[data-resource="incidencias"]') || e.target.closest('.edit-generic[data-resource="incidencias"]')) {
            const id = e.target.closest('.edit-generic').getAttribute('data-id');
            const item = cache.currentTabData.find(i => String(i.id) === String(id));
            if (!item) return alert('Incidencia no encontrada');
            fetchOptions('users').then(userOpts => {
                openModal({
                    title: 'Editar incidencia',
                    fields: [
                        {label:'Usuario Reporta', name:'id_usuario_reporta', type:'select', options: userOpts, value: item.id_usuario},
                        {label:'Tipo', name:'tipo', value: item.tipo},
                        {label:'Descripción', name:'descripcion', type:'textarea', value: item.descripcion},
                        {label:'Estado', name:'estado', value: item.estado},
                        {label:'Fecha Reporte', name:'fecha_reporte', type:'date', value: item.fecha},
                        {label:'ID', name:'id', type:'hidden', value: item.id}
                    ],
                    onSubmit: (data) => {
                        return fetch('../backend/admin_api.php?action=update&resource=incidencias', {method:'POST', body: new URLSearchParams(data)})
                            .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('incidencias'));
                    }
                });
            });
        }

        // ====== PROPUESTAS ======
        if (e.target.matches('#addPropuestaBtn') || e.target.closest('#addPropuestaBtn')) {
            Promise.all([fetchOptions('productos'), fetchOptions('users')]).then(([prodOpts, userOpts]) => {
                openModal({
                    title: 'Crear propuesta',
                    fields: [
                        {label:'Producto Ofrecido', name:'id_producto_ofrecido', type:'select', options: prodOpts},
                        {label:'Producto Solicitado', name:'id_producto_solicitado', type:'select', options: prodOpts},
                        {label:'Usuario Propone', name:'id_usuario_propone', type:'select', options: userOpts},
                        {label:'Estado', name:'estado'},
                        {label:'Fecha Propuesta', name:'fecha_propuesta', type:'date'},
                        {label:'Mensaje', name:'mensaje', type:'textarea'}
                    ],
                    onSubmit: (data) => {
                        return fetch('../backend/admin_api.php?action=create&resource=propuestas', {method:'POST', body: new URLSearchParams(data)})
                            .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('propuestas'));
                    }
                });
            });
        }

        if (e.target.matches('.edit-generic[data-resource="propuestas"]') || e.target.closest('.edit-generic[data-resource="propuestas"]')) {
            const id = e.target.closest('.edit-generic').getAttribute('data-id');
            const item = cache.currentTabData.find(i => String(i.id) === String(id));
            if (!item) return alert('Propuesta no encontrada');
            Promise.all([fetchOptions('productos'), fetchOptions('users')]).then(([prodOpts, userOpts]) => {
                openModal({
                    title: 'Editar propuesta',
                    fields: [
                        {label:'Producto Ofrecido', name:'id_producto_ofrecido', type:'select', options: prodOpts, value: item.id_producto_ofrecido},
                        {label:'Producto Solicitado', name:'id_producto_solicitado', type:'select', options: prodOpts, value: item.id_producto_solicitado},
                        {label:'Usuario Propone', name:'id_usuario_propone', type:'select', options: userOpts, value: item.id_usuario_propone},
                        {label:'Estado', name:'estado', value: item.estado},
                        {label:'Fecha Propuesta', name:'fecha_propuesta', type:'date', value: item.fecha_propuesta},
                        {label:'Mensaje', name:'mensaje', type:'textarea', value: item.mensaje},
                        {label:'ID', name:'id', type:'hidden', value: item.id}
                    ],
                    onSubmit: (data) => {
                        return fetch('../backend/admin_api.php?action=update&resource=propuestas', {method:'POST', body: new URLSearchParams(data)})
                            .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('propuestas'));
                    }
                });
            });
        }

        // ====== NOTIFICACIONES ======
        if (e.target.matches('#addNotificacionBtn') || e.target.closest('#addNotificacionBtn')) {
            fetchOptions('users').then(userOpts => {
                openModal({
                    title: 'Crear notificación',
                    fields: [
                        {label:'Usuario', name:'id_usuario', type:'select', options: userOpts},
                        {label:'Tipo', name:'tipo'},
                        {label:'Título', name:'titulo'},
                        {label:'Descripción', name:'descripcion', type:'textarea'},
                        {label:'Fecha', name:'fecha', type:'datetime-local'},
                        {label:'Leída', name:'leida', type:'number'}
                    ],
                    onSubmit: (data) => {
                        return fetch('../backend/admin_api.php?action=create&resource=notificaciones', {method:'POST', body: new URLSearchParams(data)})
                            .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('notificaciones'));
                    }
                });
            });
        }

        if (e.target.matches('.edit-generic[data-resource="notificaciones"]') || e.target.closest('.edit-generic[data-resource="notificaciones"]')) {
            const id = e.target.closest('.edit-generic').getAttribute('data-id');
            const item = cache.currentTabData.find(i => String(i.id) === String(id));
            if (!item) return alert('Notificación no encontrada');
            fetchOptions('users').then(userOpts => {
                openModal({
                    title: 'Editar notificación',
                    fields: [
                        {label:'Usuario', name:'id_usuario', type:'select', options: userOpts, value: item.id_usuario},
                        {label:'Tipo', name:'tipo', value: item.tipo},
                        {label:'Título', name:'titulo', value: item.titulo},
                        {label:'Descripción', name:'descripcion', type:'textarea', value: item.descripcion},
                        {label:'Fecha', name:'fecha', type:'datetime-local', value: item.fecha},
                        {label:'Leída', name:'leida', type:'number', value: item.leida},
                        {label:'ID', name:'id', type:'hidden', value: item.id}
                    ],
                    onSubmit: (data) => {
                        return fetch('../backend/admin_api.php?action=update&resource=notificaciones', {method:'POST', body: new URLSearchParams(data)})
                            .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('notificaciones'));
                    }
                });
            });
        }

        // ====== IMAGENES PRODUCTO ======
        if (e.target.matches('#addImagenBtn') || e.target.closest('#addImagenBtn')) {
            fetchOptions('productos').then(prodOpts => {
                openModal({
                    title: 'Agregar imagen de producto',
                    fields: [
                        {label:'URL Imagen', name:'url_imagen'},
                        {label:'Producto', name:'id_producto', type:'select', options: prodOpts}
                    ],
                    onSubmit: (data) => {
                        return fetch('../backend/admin_api.php?action=create&resource=imagenes_producto', {method:'POST', body: new URLSearchParams(data)})
                            .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('imagenes_producto'));
                    }
                });
            });
        }
        if (e.target.matches('.edit-generic[data-resource="imagenes_producto"]') || e.target.closest('.edit-generic[data-resource="imagenes_producto"]')) {
            const id = e.target.closest('.edit-generic').getAttribute('data-id');
            const item = cache.currentTabData.find(i => String(i.id) === String(id));
            if (!item) return alert('Imagen no encontrada');
            fetchOptions('productos').then(prodOpts => {
                openModal({
                    title: 'Editar imagen de producto',
                    fields: [
                        {label:'URL Imagen', name:'url_imagen', value: item.url_imagen},
                        {label:'Producto', name:'id_producto', type:'select', options: prodOpts, value: item.id_producto},
                        {label:'ID', name:'id', type:'hidden', value: item.id}
                    ],
                    onSubmit: (data) => {
                        return fetch('../backend/admin_api.php?action=update&resource=imagenes_producto', {method:'POST', body: new URLSearchParams(data)})
                            .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('imagenes_producto'));
                    }
                });
            });
        }

        // ====== CONVERSACIONES ======
        if (e.target.matches('#addConversacionBtn') || e.target.closest('#addConversacionBtn')) {
            Promise.all([fetchOptions('users'), fetchOptions('productos')]).then(([userOpts, prodOpts]) => {
                openModal({
                    title: 'Crear conversación',
                    fields: [
                        {label:'Usuario 1', name:'id_usuario1', type:'select', options: userOpts},
                        {label:'Usuario 2', name:'id_usuario2', type:'select', options: userOpts},
                        {label:'Producto', name:'id_producto', type:'select', options: prodOpts},
                        {label:'Último mensaje (contenido)', name:'ultimo_mensaje_contenido', type:'textarea'}
                    ],
                    onSubmit: (data) => {
                        return fetch('../backend/admin_api.php?action=create&resource=conversaciones', {method:'POST', body: new URLSearchParams(data)})
                            .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('conversaciones'));
                    }
                });
            });
        }
        if (e.target.matches('.edit-generic[data-resource="conversaciones"]') || e.target.closest('.edit-generic[data-resource="conversaciones"]')) {
            const id = e.target.closest('.edit-generic').getAttribute('data-id');
            const item = cache.currentTabData.find(i => String(i.id) === String(id));
            if (!item) return alert('Conversación no encontrada');
            Promise.all([fetchOptions('users'), fetchOptions('productos')]).then(([userOpts, prodOpts]) => {
                openModal({
                    title: 'Editar conversación',
                    fields: [
                        {label:'Usuario 1', name:'id_usuario1', type:'select', options: userOpts, value: item.id_usuario1},
                        {label:'Usuario 2', name:'id_usuario2', type:'select', options: userOpts, value: item.id_usuario2},
                        {label:'Producto', name:'id_producto', type:'select', options: prodOpts, value: item.id_producto},
                        {label:'Último mensaje (contenido)', name:'ultimo_mensaje_contenido', type:'textarea', value: item.ultimo_mensaje_contenido || ''},
                        {label:'ID', name:'id', type:'hidden', value: item.id}
                    ],
                    onSubmit: (data) => {
                        return fetch('../backend/admin_api.php?action=update&resource=conversaciones', {method:'POST', body: new URLSearchParams(data)})
                            .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('conversaciones'));
                    }
                });
            });
        }

        // ====== CHAT MENSAJES ======
        if (e.target.matches('#addChatMensajeBtn') || e.target.closest('#addChatMensajeBtn')) {
            Promise.all([fetchOptions('conversaciones'), fetchOptions('users')]).then(([convOpts, userOpts]) => {
                openModal({
                    title: 'Crear mensaje de chat',
                    fields: [
                        {label:'Conversación', name:'id_conversacion', type:'select', options: convOpts},
                        {label:'Emisor', name:'id_emisor', type:'select', options: userOpts},
                        {label:'Contenido', name:'contenido', type:'textarea'},
                        {label:'Tipo de mensaje', name:'tipo_mensaje', value: 'texto'},
                        {label:'Leído (0/1)', name:'leido', type:'number', value: 0}
                    ],
                    onSubmit: (data) => {
                        return fetch('../backend/admin_api.php?action=create&resource=chat_mensajes', {method:'POST', body: new URLSearchParams(data)})
                            .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('chat_mensajes'));
                    }
                });
            });
        }
        if (e.target.matches('.edit-generic[data-resource="chat_mensajes"]') || e.target.closest('.edit-generic[data-resource="chat_mensajes"]')) {
            const id = e.target.closest('.edit-generic').getAttribute('data-id');
            const item = cache.currentTabData.find(i => String(i.id) === String(id));
            if (!item) return alert('Mensaje no encontrado');
            Promise.all([fetchOptions('conversaciones'), fetchOptions('users')]).then(([convOpts, userOpts]) => {
                openModal({
                    title: 'Editar mensaje de chat',
                    fields: [
                        {label:'Conversación', name:'id_conversacion', type:'select', options: convOpts, value: item.id_conversacion},
                        {label:'Emisor', name:'id_emisor', type:'select', options: userOpts, value: item.id_emisor},
                        {label:'Contenido', name:'contenido', type:'textarea', value: item.contenido},
                        {label:'Tipo de mensaje', name:'tipo_mensaje', value: item.tipo_mensaje || 'texto'},
                        {label:'Leído (0/1)', name:'leido', type:'number', value: item.leido || 0},
                        {label:'ID', name:'id', type:'hidden', value: item.id}
                    ],
                    onSubmit: (data) => {
                        return fetch('../backend/admin_api.php?action=update&resource=chat_mensajes', {method:'POST', body: new URLSearchParams(data)})
                            .then(r=>r.json()).then(res=>{ if (!res.ok) throw res.error; return res; }).then(()=> loadTab('chat_mensajes'));
                    }
                });
            });
        }
    });

    function convertDateForInput(localized) {
        // localized expected dd/mm/YYYY
        const parts = (localized||'').split('/');
        if (parts.length !== 3) return '';
        return `${parts[2]}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`;
    }

    // Pagination event listeners
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const prevPageMobileBtn = document.getElementById('prevPageMobile');
    const nextPageMobileBtn = document.getElementById('nextPageMobile');

    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (cache.currentPage > 1) {
                loadTab(cache.currentTab, cache.currentPage - 1);
            }
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            if (cache.currentPage < cache.totalPages) {
                loadTab(cache.currentTab, cache.currentPage + 1);
            }
        });
    }

    if (prevPageMobileBtn) {
        prevPageMobileBtn.addEventListener('click', function() {
            if (cache.currentPage > 1) {
                loadTab(cache.currentTab, cache.currentPage - 1);
            }
        });
    }

    if (nextPageMobileBtn) {
        nextPageMobileBtn.addEventListener('click', function() {
            if (cache.currentPage < cache.totalPages) {
                loadTab(cache.currentTab, cache.currentPage + 1);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initAdmin);