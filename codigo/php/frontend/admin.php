<?php
session_start();
require '../database.php';

$role = isset($_SESSION['rol']) ? $_SESSION['rol'] : '';
$allowedAdminRoles = [
    'Staff',
    'Moderador de Reportes',
    'Supervisor de Trueques',
    'Gestor de Denuncias',
    'Asistente Administrativo'
];
if (!isset($_SESSION['nombre']) || !in_array($role, $allowedAdminRoles)) {
    http_response_code(403);
    echo '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Acceso denegado</title></head><body><h1>403 - Acceso denegado</h1><p>No tenés permisos para acceder al panel de administración.</p></body></html>';
    exit;
}

// Obtener información completa del usuario desde la base de datos
$userId = $_SESSION['id'];
$userName = $_SESSION['nombre'];
$userEmail = $_SESSION['correo'];
$userRole = $_SESSION['rol'];
$userAvatar = null;

$stmt = $conn->prepare("SELECT img_usuario FROM Usuario WHERE id_usuario = ?");
if ($stmt) {
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result && $result->num_rows === 1) {
        $userData = $result->fetch_assoc();
        $userAvatar = $userData['img_usuario'];
    }
    $stmt->close();
}
$conn->close();

// Generar iniciales para el avatar si no hay imagen
function getInitials($name) {
    $words = explode(' ', trim($name));
    if (count($words) >= 2) {
        return strtoupper(substr($words[0], 0, 1) . substr($words[1], 0, 1));
    }
    return strtoupper(substr($name, 0, 2));
}
$userInitials = getInitials($userName);
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="../../css/admin.css">
    <link rel="stylesheet" href="../../css/estilos-generales.css">
    <!-- jQuery (required for dashboard temperature AJAX) -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <!-- SweetAlert2 y wrapper (para modales coherentes en admin) -->
    <link rel="stylesheet" href="../../css/swal.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../../js/swal.js"></script>
        <script>
            window.__userRole = <?php echo json_encode($role ?: ''); ?>;
        </script>
</head>

<!-- Pasar a .php y hacer includes de header y sidebar -->

<body class="bg-gray-100 font-sans">
    <div class="flex h-screen">
        <!-- Sidebar -->
        <div class="w-64 bg-gradient-to-b bg-green text-white flex flex-col">
            <!-- Logo -->
            <div class="p-6 border-b ring-green">
                <h1 class="text-xl">Dreva</h1>
            </div>

            <!-- Navigation Menu -->
            <nav class="flex-1 py-4">
                <div class="px-4 sidebar-nav">
                    <!-- Indicador de selección que se mueve -->
                    <div class="selection-indicator" id="selectionIndicator"></div>
                    
                    <!-- Items del menú -->
                    <div class="menu-item active" data-index="0">
                        <img src="../../recursos/iconos/solido/general/grafica.svg" alt="Resumen" class="w-6 h-6 svg-green">
                        <span>Resumen</span>
                    </div>
                    <div class="menu-item" data-index="1">
                        <img src="../../recursos/iconos/contorno/comunicacion/usuario.svg" alt="Usuarios" class="w-6 h-6 svg-white">
                        <span>Usuarios</span>
                    </div>
                    <div class="menu-item" data-index="2">
                        <img src="../../recursos/iconos/contorno/general/caja.svg" alt="Productos" class="w-6 h-6 svg-white">
                        <span>Productos</span>
                    </div>
                    <div class="menu-item" data-index="3">
                        <img src="../../recursos/iconos/contorno/estado/informacion_triangulo.svg" alt="Incidencias" class="w-6 h-6 svg-white">
                        <span>Incidencias</span>
                    </div>
                    <div class="menu-item" data-index="4">
                        <img src="../../recursos/iconos/contorno/comunicacion/correo.svg" alt="Mensajes" class="w-6 h-6 svg-white">
                        <span>Mensajes</span>
                    </div>
                    <div class="menu-item" data-index="5">
                        <img src="../../recursos/iconos/contorno/estado/notificacion.svg" alt="Notificaciones" class="w-6 h-6 svg-white">
                        <span>Notificaciones</span>
                    </div>
                </div>
            </nav>
        </div>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Header -->
            <header class="bg-gray-100 px-6 py-4">
                <div class="flex items-center justify-between">
                    <h2 class="text-2xl text-gray-800">Resumen</h2>
                    <div class="flex items-center space-x-4">
                        <!-- Temperatura en header (se actualizará vía JS) -->
                        <div id="header-temperatura" class="hidden items-center space-x-3 text-sm text-gray-700 mr-4">
                            <div id="header-temperatura-icon" class="text-2xl">☀️</div>
                            <div class="flex flex-col leading-none">
                                <span class="valor">Cargando...</span>
                                <span id="header-temperatura-city" class="text-xs text-gray-500">--</span>
                            </div>
                        </div>

                        <!-- User Profile -->
                        <div class="relative">
                            <div id="userProfileBtn" class="flex items-center space-x-3 cursor-pointer group">
                                <?php if ($userAvatar): ?>
                                    <img src="<?php echo htmlspecialchars($userAvatar); ?>" alt="<?php echo htmlspecialchars($userName); ?>" class="w-10 h-10 rounded-full object-contain bg-gray-100">
                                <?php else: ?>
                                    <img src="../../recursos/iconos/avatar.svg" alt="<?php echo htmlspecialchars($userName); ?>" class="w-10 h-10 rounded-full object-contain bg-gray-100">
                                <?php endif; ?>
                                <div class="flex items-center space-x-1">
                                    <span class="text-gray-700 font-medium"><?php echo htmlspecialchars($userName); ?></span>
                                    <img src="../../recursos/iconos/solido/interfaz/flecha_abajo.svg" alt="Expandir" class="w-5 h-5 svg-gray-500 group-hover:svg-gray-700 transition-colors">
                                </div>
                            </div>
                            
                            <!-- Dropdown Menu -->
                            <div id="userDropdown" class="hidden absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <div class="p-4 border-b border-gray-200">
                                    <div class="flex items-center space-x-3">
                                        <?php if ($userAvatar): ?>
                                            <img src="<?php echo htmlspecialchars($userAvatar); ?>" alt="<?php echo htmlspecialchars($userName); ?>" class="w-12 h-12 rounded-full object-contain bg-gray-100">
                                        <?php else: ?>
                                            <img src="../../recursos/iconos/avatar.svg" alt="<?php echo htmlspecialchars($userName); ?>" class="w-12 h-12 rounded-full object-contain bg-gray-100">
                                        <?php endif; ?>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-semibold text-gray-900 truncate"><?php echo htmlspecialchars($userName); ?></p>
                                            <p class="text-xs text-gray-500 truncate"><?php echo htmlspecialchars($userEmail); ?></p>
                                        </div>
                                    </div>
                                    <div class="mt-2">
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-verde-claro text-white">
                                            <?php echo htmlspecialchars($userRole); ?>
                                        </span>
                                    </div>
                                </div>
                                <div class="py-2">
                                    <a href="../cerrar-sesion.php" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                        <div class="flex items-center space-x-2">
                                            <img src="../../recursos/iconos/contorno/interfaz/cerrar_sesion.svg" alt="Cerrar sesión" class="w-5 h-5 svg-gray-600">
                                            <span>Cerrar sesión</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Content Area -->
            <main class="flex-1 overflow-y-auto p-6">
                <!-- Tabs -->
                <div class="mb-6">
                    <div class="border-b border-gray-200">
                        <nav class="-mb-px flex space-x-8">
                            <button
                                class="tab-button active py-2 px-1 border-b-2 seleccionar-tabla font-medium text-sm text-green"
                                data-tab="users">
                                Listado de usuarios
                            </button>
                            <button
                                class="tab-button py-2 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500"
                                data-tab="ratings">
                                Valoraciones
                            </button>
                        </nav>
                    </div>
                </div>

                <!-- Users Table -->
                <div class="bg-white rounded-lg shadow overflow-hidden">
                    <div class="p-4 flex justify-between items-center">
                        <div class="relative w-full max-w-md">
                            <img src="../../recursos/iconos/solido/interfaz/buscar.svg" alt="Buscar" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 svg-gray-400">
                            <input type="text" placeholder="Buscar..." id="tableSearchInput"
                                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                        </div>
                        <div class="flex space-x-2">
                            <button id="addUserBtn" class="px-4 py-2 bg-green text-white rounded" style="display:none;">Agregar usuario</button>
                            <button id="addProductBtn" class="px-4 py-2 bg-green text-white rounded" style="display:none;">Agregar producto</button>
                            <button id="addValoracionBtn" class="px-4 py-2 bg-green text-white rounded" style="display:none;">Agregar valoración</button>
                            <button id="addCategoriaBtn" class="px-4 py-2 bg-green text-white rounded" style="display:none;">Agregar categoría</button>
                            <button id="addIncidenciaBtn" class="px-4 py-2 bg-green text-white rounded" style="display:none;">Agregar incidencia</button>
                            <button id="addPropuestaBtn" class="px-4 py-2 bg-green text-white rounded" style="display:none;">Agregar propuesta</button>
                            <button id="addNotificacionBtn" class="px-4 py-2 bg-green text-white rounded" style="display:none;">Agregar notificación</button>
                            <button id="addImagenBtn" class="px-4 py-2 bg-green text-white rounded" style="display:none;">Agregar imagen</button>
                            <button id="addConversacionBtn" class="px-4 py-2 bg-green text-white rounded" style="display:none;">Agregar conversación</button>
                            <button id="addChatMensajeBtn" class="px-4 py-2 bg-green text-white rounded" style="display:none;">Agregar mensaje</button>
                        </div>
                    </div>
                    <!-- Contenedor con scroll horizontal -->
                    <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead id="usersTableHead" class="encabezado-tabla">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">ID</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Nombre</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Correo</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Contraseña</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Fecha de nacimiento</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Ubicación</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Rol</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"></th>
                            </tr>
                        </thead>
                        <thead id="productsTableHead" class="encabezado-tabla" style="display:none;">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">ID</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Nombre</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Estado</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Categoria</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Publicado</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Descripcion</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Acciones</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"></th>
                            </tr>
                        </thead>
                        <thead id="valoracionesTableHead" class="encabezado-tabla" style="display:none;">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">ID</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Puntuación</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Comentario</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Fecha</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Emisor</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Receptor</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <thead id="imagenes_productoTableHead" class="encabezado-tabla" style="display:none;">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">ID</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">URL Imagen</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">ID Producto</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Producto</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <thead id="categoriasTableHead" class="encabezado-tabla" style="display:none;">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">ID</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Nombre</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Slug</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">URL Imagen</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Descripción</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <thead id="incidenciasTableHead" class="encabezado-tabla" style="display:none;">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">ID</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Fecha</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Estado</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Descripción</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">ID Usuario</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <thead id="propuestasTableHead" class="encabezado-tabla" style="display:none;">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">ID</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Producto Solicitado</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Producto Ofrecido</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Estado</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Fecha</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Usuario</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <thead id="conversacionesTableHead" class="encabezado-tabla" style="display:none;">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">ID</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Usuario 1</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Usuario 2</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Producto</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Fecha Inicio</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Último Mensaje</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <thead id="chat_mensajesTableHead" class="encabezado-tabla" style="display:none;">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">ID</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">ID Conversación</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Emisor</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Contenido</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Enviado En</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Leído</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <thead id="notificacionesTableHead" class="encabezado-tabla" style="display:none;">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">ID</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Tipo</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Título</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Descripción</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Fecha</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Leída</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">ID Usuario</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200" id="usersTableBody">
                            <!-- User rows will be populated by JavaScript -->
                        </tbody>
                    </table>
                    </div>
                    <!-- Fin contenedor con scroll horizontal -->
                    
                    <!-- Pagination Controls -->
                    <div class="px-4 py-3 flex items-center justify-between border-t border-gray-200">
                        <div class="flex-1 flex justify-between sm:hidden">
                            <button id="prevPageMobile" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                Anterior
                            </button>
                            <button id="nextPageMobile" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                Siguiente
                            </button>
                        </div>
                        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p class="text-sm text-gray-700" id="paginationInfo">
                                    Mostrando <span class="font-medium" id="startRecord">1</span> a <span class="font-medium" id="endRecord">50</span> de <span class="font-medium" id="totalRecords">0</span> resultados
                                </p>
                            </div>
                            <div>
                                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <button id="prevPage" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <span class="sr-only">Anterior</span>
                                        ← Anterior
                                    </button>
                                    <span id="currentPageDisplay" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                        Página <span id="currentPageNum">1</span> de <span id="totalPagesNum">1</span>
                                    </span>
                                    <button id="nextPage" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <span class="sr-only">Siguiente</span>
                                        Siguiente →
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
    
    <script>
        // Dropdown del perfil de usuario
        document.addEventListener('DOMContentLoaded', function() {
            const userProfileBtn = document.getElementById('userProfileBtn');
            const userDropdown = document.getElementById('userDropdown');
            
            if (userProfileBtn && userDropdown) {
                // Toggle dropdown al hacer click
                userProfileBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    userDropdown.classList.toggle('hidden');
                });
                
                // Cerrar dropdown al hacer click fuera
                document.addEventListener('click', function(e) {
                    if (!userDropdown.contains(e.target) && !userProfileBtn.contains(e.target)) {
                        userDropdown.classList.add('hidden');
                    }
                });
                
                // Prevenir que el dropdown se cierre al hacer click dentro de él
                userDropdown.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            }
        });
    </script>
    
    <script src="../../js/admin.js"></script>
    <script src="../../js/dashboard.js"></script>
</body>

</html>