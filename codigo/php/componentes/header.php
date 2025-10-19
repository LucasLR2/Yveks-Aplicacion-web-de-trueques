<?php
// --------------------------
// HEADER UNIVERSAL
// --------------------------

// Definir baseURL para rutas absolutas desde la raíz del proyecto
$baseURL = '/Yveks-Aplicacion-web-de-trueques/codigo/';

// Detectar en qué página estamos
$paginaActual = pathinfo($_SERVER['SCRIPT_NAME'], PATHINFO_FILENAME);

// Solo incluir categorías si estamos en index.php
if ($paginaActual === 'index') {
    include __DIR__ . '/../categorias.php';
}

?>

<!-- ================= HEADER MOBILE ================= -->
<div class="lg:hidden bg-white px-6 md:px-16 pb-2 pt-8 relative">

  <!-- Botones a la derecha: Notificaciones + Hamburguer -->
  <div class="absolute right-6 top-8 flex items-center gap-3 z-10">
    <!-- Botón notificaciones -->
    <button onclick="toggleNotificationsMobile()" 
            class="relative w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center">
      <img src="<?= $baseURL ?>recursos/iconos/solido/estado/notificacion.svg" alt="Notificaciones" class="w-5 h-5 svg-gray-800">
      <span id="mobile-notification-badge" 
            class="hidden absolute -top-1 -right-1 bg-green text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        0
      </span>
    </button>
    
</button>
<!-- fin botón notificaciones -->

<?php if ($paginaActual==='perfil'): ?>
    <!-- Botón hamburguer -->
    <button onclick="toggleConfigMobile()" 
            class="w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center">
      <img src="<?= $baseURL ?>recursos/iconos/solido/interfaz/hamburguer.svg" alt="Configuración" class="w-5 h-5 svg-gray-800">
    </button>
<?php endif; ?>

</div> <!-- cierre del header móvil -->


  <!-- Contenido del header a la izquierda -->
  <div class="flex flex-col mb-2">
    <?php if ($paginaActual === 'index'): ?>
      <span class="text-xs text-gray-600 mb-1">Ubicación</span>
      <div class="flex items-center space-x-2">
        <img src="<?= $baseURL ?>recursos/iconos/solido/navegacion/ubicacion.svg" alt="Ubicación" class="w-5 h-5 svg-green">
        <span class="text-sm text-gray-800">Montevideo, Uruguay</span>
        <img src="<?= $baseURL ?>recursos/iconos/solido/interfaz/flecha_abajo.svg" alt="Expandir" class="w-6 h-6 svg-gray-800">
      </div>
    <?php elseif ($paginaActual === 'ofertas'): ?>
      <h1 class="text-2xl text-black mb-0">Ofertas</h1>
    <?php else: ?>
      <span class="text-xs text-transparent mb-1">Ubicación</span>
      <div class="flex items-center space-x-2">
        <span class="text-sm text-transparent">Placeholder</span>
      </div>
    <?php endif; ?>
  </div>

  <!-- Switch de ofertas (solo ofertas.php) -->
  <?php if ($paginaActual === 'ofertas'): ?>
    <div class="md:px-16 mt-2">
      <div class="switch-button flex mb-4">
        <div class="switch-option active" onclick="switchOfferType('received', this)">Recibidas</div>
        <div class="switch-option" onclick="switchOfferType('made', this)">Hechas</div>
      </div>
    </div>
  <?php endif; ?>

  <!-- Barra de búsqueda (solo index.php) -->
  <?php if ($paginaActual === 'index'): ?>
    <div class="pt-2 pb-3">
      <div class="relative">
        <img src="<?= $baseURL ?>recursos/iconos/solido/interfaz/buscar.svg" alt="Buscar"
             class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 svg-green">
        <input type="text" placeholder="Buscar" id="mobile-search"
               class="w-full pl-12 pr-4 py-3 rounded-full text-sm border border-gray-600 focus:outline-none text-gray-600 placeholder-gray-600">
      </div>
    </div>
  <?php endif; ?>

</div>


<!-- Dropdown de notificaciones móvil -->
<div id="mobile-notifications-overlay" class="hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"></div>
<div id="mobile-notifications-dropdown" class="hidden fixed inset-0 bg-white z-50 transform translate-y-full transition-transform duration-300">
    <div class="h-full flex flex-col">
        <!-- Header -->
        <div class="flex items-center p-4 border-b border-gray-200">
            <button onclick="toggleNotificationsMobile()" class="w-8 h-8 flex items-center justify-center mr-3">
                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            <h2 class="text-lg font-semibold text-gray-800 flex-1">Notificaciones</h2>
            <span id="mobile-notification-count" class="bg-green text-white text-xs font-bold rounded-full px-2 py-1">+2</span>
        </div>
        <!-- Content -->
        <div id="mobile-notifications-content" class="flex-1 overflow-y-auto">
            <!-- Las notificaciones se generarán dinámicamente -->
        </div>
    </div>
</div>

<!-- ================= HEADER DESKTOP ================= -->
<header class="hidden lg:block bg-white border-b border-gray-200 px-20 py-4 sticky top-0 z-40" style="margin-left: 280px;">
    <div class="flex items-center justify-between">
        <!-- Barra de búsqueda expandida -->
        <div class="flex-1 max-w-2xl mr-6">
            <div class="relative">
                <img src="<?= $baseURL ?>recursos/iconos/solido/interfaz/buscar.svg" alt="Buscar"
                     class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 svg-green">
                <input type="text" placeholder="Buscar productos, marcas, categorías..." id="desktop-search"
                       class="w-full pl-12 pr-4 py-3 rounded-full text-sm border border-gray-600 focus:outline-none text-gray-600 placeholder-gray-600">
            </div>
        </div>

        <!-- Contenedor de botones dinámicos -->
        <div class="flex items-center space-x-4 flex-shrink-0" id="desktop-header-actions"></div>
    </div>
</header>

<!-- ================= INCLUIR SCRIPT DEL HEADER ================= -->
<script>
    const baseURL = '<?= $baseURL ?>';
</script>
<script src="<?= $baseURL ?>js/header.js"></script>
