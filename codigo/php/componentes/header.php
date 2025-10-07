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
<div class="lg:hidden bg-white px-6 md:px-16 pb-2 pt-3">
    <?php if ($paginaActual === 'index'): ?>
    <div class="flex flex-col">
        <span class="text-xs text-gray-600 mb-0">Ubicación</span>
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <img src="<?= $baseURL ?>recursos/iconos/solido/navegacion/ubicacion.svg" alt="Ubicación" class="w-5 h-5 svg-green">
                <span class="text-sm text-gray-800">Montevideo, Uruguay</span>
                <img src="<?= $baseURL ?>recursos/iconos/solido/interfaz/flecha_abajo.svg" alt="Expandir" class="w-6 h-6 svg-gray-800">
            </div>
            <div class="w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center">
                <img src="<?= $baseURL ?>recursos/iconos/solido/estado/notificacion.svg" alt="Notificaciones"
                     class="w-5 h-5 svg-gray-800">
            </div>
        </div>
    </div>

    <!-- Barra de búsqueda móvil -->
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

        <!-- Contenedor de acciones dinámicas -->
        <div class="flex items-center space-x-4 flex-shrink-0" id="desktop-header-actions"></div>
    </div>
</header>

<!-- ================= SCRIPT DINÁMICO DE BOTONES DE USUARIO ================= -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    const contenedor = document.getElementById('desktop-header-actions');

    fetch('<?= $baseURL ?>php/verificar-sesion.php')
        .then(response => response.json())
        .then(data => {
            if(data.logueado) {
                contenedor.innerHTML = `
                    <!-- Botón Nueva publicación -->
                    <button class="bg-green text-white px-4 h-8 rounded-full smooth-transition flex items-center text-sm whitespace-nowrap"
                    onclick="window.location.href='<?= $baseURL ?>php/nuevo_producto.php'">
                        <img src="<?= $baseURL ?>recursos/iconos/solido/interfaz/mas.svg" alt="Publicar" class="w-3 h-3 svg-white mr-2">
                        Nueva publicación
                    </button>

                    <!-- Botón chat -->
                    <button class="w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center smooth-transition">
                        <img src="<?= $baseURL ?>recursos/iconos/solido/comunicacion/comentario.svg" alt="Comentarios" class="w-5 h-5 svg-gray-800">
                    </button>

                    <!-- Botón notificaciones -->
                    <button class="w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center smooth-transition">
                        <img src="<?= $baseURL ?>recursos/iconos/solido/estado/notificacion.svg" alt="Notificaciones" class="w-5 h-5 svg-gray-800">
                    </button>

                    <!-- Perfil con dropdown -->
                    <div class="relative inline-block text-left">
                        <div>
                            <button class="w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center smooth-transition"
                            id="menu-button" onclick="showDropdown()" aria-expanded="true" aria-haspopup="true">
                                <img src="<?= $baseURL ?>recursos/iconos/solido/comunicacion/usuario.svg" alt="Usuario" class="w-5 h-5 svg-gray-800">
                            </button>
                        </div>

                        <div id="menu"
                            class="hidden absolute right-4 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden p-6 pr-6"
                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="flex items-center gap-x-4 mb-4 dropDownProfileConteiner">
                                <img class="rounded-full w-12 h-12" src="<?= $baseURL ?>recursos/imagenes/josegimenez.jpg">
                                <div>
                                    <div class="font-medium text-base text-gray-800">José Martínez</div>
                                    <p class="text-xs text-green">jsemartinez@gmail</p>
                                </div>
                            </div>
                            <div class="py-1" role="none">
                                <a href="#" class="block px-4 py-2 text-sm text-gray-600 flex items-center" role="menuitem" tabindex="-1">
                                    <img src="<?= $baseURL ?>recursos/iconos/contorno/interfaz/configuracion.svg" alt="Configuración" class="w-4 h-4 svg-gray-800 mr-2 mb-3 mt-3">
                                    Configuración
                                </a>
                            </div>
                            <div class="py-1 pt-3" role="none">
                                <a href="#" class="block px-4 py-2 text-sm text-gray-600 flex items-center" role="menuitem" tabindex="-1" onclick="window.location.href='<?= $baseURL ?>php/cerrar-sesion.php'">
                                    <img src="<?= $baseURL ?>recursos/iconos/contorno/interfaz/cerrar_sesion.svg" alt="Cerrar sesión" class="w-4 h-4 svg-red-400 mr-2 self-center">
                                    Cerrar sesión
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                contenedor.innerHTML = `
                    <button class="bg-green text-white px-4 h-8 rounded-full smooth-transition flex items-center text-sm whitespace-nowrap mr-2"
                      onclick="window.location.href='<?= $baseURL ?>php/iniciar-sesion.php'">
                      <img src="<?= $baseURL ?>recursos/iconos/solido/comunicacion/usuario.svg" alt="Iniciar sesión" class="w-3 h-3 svg-white mr-2">
                      Iniciar sesión
                    </button>
                    <button class="bg-white text-green border border-green px-4 h-8 rounded-full smooth-transition flex items-center text-sm whitespace-nowrap hover:bg-green hover:text-white group"
                      onclick="window.location.href='<?= $baseURL ?>php/registrarse.php'">
                      <img src="<?= $baseURL ?>recursos/iconos/solido/interfaz/mas.svg" alt="Registrarse" class="w-3 h-3 svg-green group-hover:svg-white mr-2">
                      Registrarse
                    </button>
                `;
            }
        })
        .catch(error => console.error('Error verificando sesión:', error));
});
</script>
