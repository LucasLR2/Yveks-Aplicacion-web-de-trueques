// Sample user data
const users = [
    {
        id: '01',
        name: 'Alejandro Méndez',
        email: 'amendez@gmail.com',
        password: '••••••••••',
        birthDate: '26 de abril de 1990',
        location: 'Montevideo, Uruguay',
        role: 'Moderador',
        avatar: 'AM'
    },
    {
        id: '02',
        name: 'José Giménez',
        email: 'jgimenez@gmail.com',
        password: '••••••••••',
        birthDate: '21 de febrero de 1998',
        location: 'Montevideo, Uruguay',
        role: 'Verificado',
        avatar: 'JG'
    },
    {
        id: '03',
        name: 'Susana Giménez',
        email: 'sugimenez@gmail.com',
        password: '••••••••••',
        birthDate: '4 de marzo de 2001',
        location: 'Montevideo, Uruguay',
        role: 'No verificado',
        avatar: 'SG'
    },
    {
        id: '04',
        name: 'Victoria García',
        email: 'vgarcia@gmail.com',
        password: '••••••••••',
        birthDate: '10 de agosto de 1999',
        location: 'Montevideo, Uruguay',
        role: 'Moderador',
        avatar: 'VG'
    }
];

// Function to render users table
function renderUsersTable(usersToRender = users) {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';

    usersToRender.forEach(user => {
        const row = document.createElement('tr');
        row.className = 'table-row';

        const roleClass = user.role === 'No verificado' ? 'bg-red-100 text-red-800' :
            user.role === 'Verificado' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800';
            user.role === 'Moderador' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800';

        row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.id}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="user-avatar mr-3">${user.avatar}</div>
                            <div class="text-sm font-medium text-gray-900">${user.name}</div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.email}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.password}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.birthDate}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.location}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex px-2 py-1 text-xs rounded-full ${roleClass}">
                            ${user.role}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div class="flex space-x-2">
                            <button class="action-btn" title="Editar">
                                <img src="recursos/iconos/contorno/interface/Edit.svg" alt="Editar" class="w-5 h-5 svg-gray-600">
                            </button>
                            <button class="action-btn" title="Eliminar">
                                <img src="recursos/iconos/contorno/interface/Trash.svg" alt="Eliminar" class="w-5 h-5 svg-gray-600">
                            </button>
                        </div>
                    </td>
                `;
        tbody.appendChild(row);
    });
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.role.toLowerCase().includes(searchTerm)
    );
    renderUsersTable(filteredUsers);
});

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
        this.currentActiveIndex = 1; // Usuarios está activo por defecto
        
        // Definir los iconos para cada elemento del menú
        this.menuIcons = {
            0: { outline: 'recursos/iconos/contorno/general/Chart-pie-alt.svg', solid: 'recursos/iconos/solido/general/Chart-pie-alt.svg' },
            1: { outline: 'recursos/iconos/contorno/comunicacion/User.svg', solid: 'recursos/iconos/solido/comunicacion/User.svg' },
            2: { outline: 'recursos/iconos/contorno/general/Box.svg', solid: 'recursos/iconos/solido/general/Box.svg' },
            3: { outline: 'recursos/iconos/contorno/estado/Info-triangle.svg', solid: 'recursos/iconos/solido/estado/Info-triangle.svg' },
            4: { outline: 'recursos/iconos/contorno/comunicacion/Envelope.svg', solid: 'recursos/iconos/solido/comunicacion/Envelope.svg' },
            5: { outline: 'recursos/iconos/contorno/estado/Notification.svg', solid: 'recursos/iconos/solido/estado/Notification.svg' }
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
        console.log(`Navegando a: ${sections[index]}`);
        
        switch(index) {
            case 0:
                // Lógica para Resumen
                break;
            case 1:
                // Lógica para Usuarios (actual)
                this.showUsersSection();
                break;
            case 2:
                // Lógica para Productos
                break;
            case 3:
                // Lógica para Incidencias
                break;
            case 4:
                // Lógica para Mensajes
                break;
            case 5:
                // Lógica para Notificaciones
                break;
        }
    }
    
    showUsersSection() {
        const header = document.querySelector('header h2');
        if (header) header.textContent = 'Usuarios';
    }
}

// Initialize sidebar navigation
document.addEventListener('DOMContentLoaded', function() {
    new SidebarNavigation();
    renderUsersTable();
});