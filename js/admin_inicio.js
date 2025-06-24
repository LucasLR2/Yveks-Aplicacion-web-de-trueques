// Sample user data
const users = [
    {
        id: '01',
        name: 'Alejandro Méndez',
        email: 'amendez@gmail.com',
        password: '••••••••••',
        birthDate: '26 de abril de 1990',
        location: 'Montevideo, Uruguay',
        role: 'Propietario',
        avatar: 'AM'
    },
    {
        id: '02',
        name: 'José Giménez',
        email: 'jgimenez@gmail.com',
        password: '••••••••••',
        birthDate: '21 de febrero de 1998',
        location: 'Montevideo, Uruguay',
        role: 'Usuario',
        avatar: 'JG'
    },
    {
        id: '03',
        name: 'Susana Giménez',
        email: 'sugimenez@gmail.com',
        password: '••••••••••',
        birthDate: '4 de marzo de 2001',
        location: 'Montevideo, Uruguay',
        role: 'Usuario',
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

        const roleClass = user.role === 'Propietario' ? 'bg-purple-100 text-purple-800' :
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
            tab.classList.remove('active', 'border-green-500', 'text-green-600');
            tab.classList.add('border-transparent', 'text-gray-500');
        });

        // Add active class to clicked tab
        this.classList.add('active', 'border-green-500', 'text-green-600');
        this.classList.remove('border-transparent', 'text-gray-500');

        // Here you would typically load different content based on the tab
        const tabType = this.getAttribute('data-tab');
        if (tabType === 'ratings') {
            // Show ratings content
            console.log('Showing ratings');
        } else {
            // Show users content
            console.log('Showing users');
        }
    });
});

// Sidebar navigation
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', function () {
        // Remove active class from all items
        document.querySelectorAll('.sidebar-item').forEach(sidebarItem => {
            sidebarItem.classList.remove('active-sidebar');
        });

        // Add active class to clicked item
        this.classList.add('active-sidebar');
    });
});

// Initialize the table
renderUsersTable();