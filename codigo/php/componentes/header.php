<?php
// --------------------------
// HEADER UNIVERSAL
// --------------------------

// Definir baseURL para rutas absolutas desde la raíz del proyecto
$baseURL = '/Yveks-Aplicacion-web-de-trueques/codigo/';

// Detectar en qué página estamos
$paginaActual = basename($_SERVER['PHP_SELF'], ".php");

// Solo incluir categorías si estamos en index.php
if ($paginaActual === 'index') {
    include __DIR__ . '/../categorias.php';
}
?>
<!-- ================= HEADER MOBILE ================= -->
<div class="lg:hidden bg-white px-6 md:px-16 pb-2 pt-8 relative">
    <!-- Botón notificaciones fijo a la derecha -->
    <div class="absolute right-6 top-8 w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center z-10">
        <img src="<?= $baseURL ?>recursos/iconos/solido/estado/notificacion.svg" alt="Notificaciones"
             class="w-5 h-5 svg-gray-800">
    </div>

    <!-- Contenido del header a la izquierda -->
    <div class="flex flex-col">
        <?php if ($paginaActual === 'index'): ?>
            <span class="text-xs text-gray-600 mb-1">Ubicación</span>
            <div class="flex items-center space-x-2">
                <img src="<?= $baseURL ?>recursos/iconos/solido/navegacion/ubicacion.svg" alt="Ubicación" class="w-5 h-5 svg-green">
                <span class="text-sm text-gray-800">Montevideo, Uruguay</span>
                <img src="<?= $baseURL ?>recursos/iconos/solido/interfaz/flecha_abajo.svg" alt="Expandir" class="w-6 h-6 svg-gray-800">
            </div>
        <?php elseif ($paginaActual === 'ofertas'): ?>
            <h1 class="text-2xl text-black mb-0"> <?= $paginaActual === 'ofertas' ? 'Ofertas' : 'Perfil' ?> </h1>
        <?php else: ?>
            <span class="text-xs text-transparent mb-1">Ubicación</span>
            <div class="flex items-center space-x-2">
                <span class="text-sm text-transparent">Placeholder</span>
            </div>
        <?php endif; ?>
    </div>
    <!-- Switch de ofertas debajo del header (solo ofertas.php) -->
    <?php if ($paginaActual === 'ofertas'): ?>
        <div class="md:px-16 mt-2">
            <div class="switch-button flex mb-4">
                <div class="switch-option active" onclick="switchOfferType('received', this)">
                    Recibidas
                </div>
                <div class="switch-option" onclick="switchOfferType('made', this)">
                    Hechas
                </div>
            </div>
        </div>
    <?php endif; ?>

    <!-- Barra de búsqueda solo en index -->
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
