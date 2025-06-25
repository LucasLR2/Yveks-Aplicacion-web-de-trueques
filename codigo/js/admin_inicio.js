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
                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${roleClass}">
                            ${user.role}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div class="flex space-x-2">
                            <button class="action-btn text-green-600 hover:text-green-900" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn text-red-600 hover:text-red-900" title="Eliminar">
                                <i class="fas fa-trash"></i>
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
        
        this.menuItems[this.currentActiveIndex].classList.remove('active');
        
        this.menuItems[index].classList.add('active');
        
        this.updateIndicatorPosition(index);
        
        this.currentActiveIndex = index;
        
        this.handleNavigation(index);
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

// Inicializar el componente de navegación
const sidebarNav = new SidebarNavigation();
// Initialize the table
renderUsersTable();