<?php
$rutaActual = basename($_SERVER['PHP_SELF'], ".php");

// Solo incluir categorías si estamos en index.php
if ($rutaActual === 'index') {
    include __DIR__ . '/../categorias.php';
}

// Definimos una ruta base absoluta
$baseURL = '/Yveks-Aplicacion-web-de-trueques/codigo/';
?>

<!-- MENÚ MÓVIL -->
<div class="lg:hidden">
  <div class="fixed bottom-0 left-0 w-screen z-50 right-0">
    <div class="w-full h-3 bg-white"></div>
    <div class="relative bg-green overflow-hidden">
      <div id="mobile-bubble" class="absolute left-1/2 bottom-7 -translate-x-1/2 w-12 h-12 bg-white bubble-u-shape"></div>

      <div class="flex py-2 relative z-10">
        <!-- INICIO -->
        <button class="flex flex-col items-center py-2 text-gray-300 transition-colors" style="width: 20%;"
          onclick="window.location.href='<?= $baseURL ?>index.php'">
          <img src="<?= $baseURL ?>recursos/iconos/contorno/general/inicio.svg" alt="Inicio" class="w-6 h-6 mb-1 svg-gray-300">
        </button>

        <!-- OFERTAS -->
        <button class="flex flex-col items-center py-2 text-gray-300 transition-colors" style="width: 20%;"
          onclick="Verificacion('<?= $baseURL ?>php/ofertas.php', this)">
          <img src="<?= $baseURL ?>recursos/iconos/solido/general/etiqueta.svg" alt="Ofertas" class="w-6 h-6 mb-1 svg-gray-300">
        </button>

        <!-- NUEVA PUBLICACIÓN -->
        <button class="w-10 h-10 flex items-center justify-center bg-white text-green rounded-full shadow-lg transition-colors relative z-20 mx-auto"
          onclick="Verificacion('<?= $baseURL ?>php/nuevo_producto.php', this)">
          <img src="<?= $baseURL ?>recursos/iconos/solido/interfaz/mas.svg" alt="Agregar" class="w-4 h-4 svg-green">
        </button>

        <!-- COMENTARIOS / MENSAJES -->
        <button class="flex flex-col items-center py-2 text-gray-300 transition-colors" style="width: 20%;"
          onclick="Verificacion('<?= $baseURL ?>php/mensajes.php', this)">
          <img src="<?= $baseURL ?>recursos/iconos/contorno/comunicacion/comentario.svg" alt="Comentarios" class="w-6 h-6 mb-1 svg-gray-300">
        </button>

        <!-- PERFIL / USUARIO -->
        <button class="flex flex-col items-center py-2 text-gray-300 transition-colors" style="width: 20%;"
          onclick="Verificacion('<?= $baseURL ?>php/perfil.php', this)">
          <img src="<?= $baseURL ?>recursos/iconos/contorno/comunicacion/usuario.svg" alt="Usuario" class="w-6 h-6 mb-1 svg-gray-300">
        </button>
      </div>
    </div>
  </div>
</div>

<!-- MENÚ DESKTOP -->
<div class="hidden lg:block">
  <div class="desktop-sidebar bg-white border-r border-gray-200 custom-scrollbar overflow-y-auto h-screen fixed left-0 top-0 w-[280px] flex flex-col justify-between">
    <div>
      <!-- Logo -->
      <div class="p-6 pl-6 flex items-center">
        <img src="<?= $baseURL ?>recursos/iconos/dreva.svg" alt="Dreva">
      </div>

      <!-- Ubicación -->
      <div class="px-6 pb-6 border-b border-gray-100">
        <span class="text-xs text-gray-500 mb-1 block">Ubicación</span>
        <div class="flex items-center space-x-2 cursor-pointer">
          <img src="<?= $baseURL ?>recursos/iconos/solido/navegacion/ubicacion.svg" alt="Ubicación" class="w-5 h-5 svg-green">
          <span class="text-sm text-gray-800">Montevideo, Uruguay</span>
          <img src="<?= $baseURL ?>recursos/iconos/solido/interfaz/flecha_abajo.svg" alt="Cambiar" class="w-5 h-5 svg-gray-800">
        </div>
      </div>

      <!-- Navegación -->
      <nav class="p-4">
        <ul class="space-y-2">
          <li>
      <a href="<?= $baseURL ?>index.php"
      class="desktop-nav-item flex items-center space-x-3 px-6 py-3 redondeado-personalizado smooth-transition <?= $rutaActual === 'index' ? 'boton-sidebar-seleccionado text-green' : 'boton-sidebar-deseleccionado text-green' ?>">
        <img src="<?= $baseURL ?>recursos/iconos/contorno/general/inicio.svg"
          alt="Inicio"
          class="w-5 h-5 <?= $rutaActual === 'index' ? 'svg-white' : 'svg-green' ?>">
        <span>Inicio</span>
      </a>
          </li>

          <li>
      <a href="javascript:void(0)"
      class="desktop-nav-item flex items-center space-x-3 px-6 py-3 redondeado-personalizado smooth-transition <?= $rutaActual === 'ofertas' ? 'boton-sidebar-seleccionado text-green' : 'boton-sidebar-deseleccionado text-green' ?>"
      onclick="Verificacion('<?= $baseURL ?>php/ofertas.php', this)">
        <img src="<?= $baseURL ?>recursos/iconos/contorno/general/etiqueta.svg"
          alt="Ofertas"
          class="w-5 h-5 <?= $rutaActual === 'ofertas' ? 'svg-white' : 'svg-green' ?>">
        <span>Ofertas</span>
      </a>
          </li>

          <li>
      <a href="javascript:void(0)"
      class="desktop-nav-item flex items-center space-x-3 px-6 py-3 redondeado-personalizado smooth-transition <?= $rutaActual === 'perfil' ? 'boton-sidebar-seleccionado text-green' : 'boton-sidebar-deseleccionado text-green' ?>"
      onclick="Verificacion('<?= $baseURL ?>php/perfil.php', this)">
        <img src="<?= $baseURL ?>recursos/iconos/contorno/comunicacion/usuario.svg"
          alt="Perfil"
          class="w-5 h-5 <?= $rutaActual === 'perfil' ? 'svg-white' : 'svg-green' ?>">
        <span>Perfil</span>
      </a>
          </li>
        </ul>
      </nav>
        
      <!-- Categorías solo en index -->
      <div id="categorias-desktop">
        <?php if ($rutaActual === 'index'): ?>
          <div class="p-6 border-t border-gray-100">
            <?= $categoriasDesktop ?? '' ?>
          </div>
        <?php endif; ?>
      </div>
    </div>
  </div>
</div>

<!-- Verificacion JS -->
<script>
function Verificacion(destino, elemento) {
    fetch('<?= $baseURL ?>php/verificar-sesion.php')
        .then(response => response.json())
        .then(data => {
            if(data.logueado) {
                window.location.href = destino;
            } else {
                const popup = document.createElement('div');
                popup.id = 'popup';
                popup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';

                popup.innerHTML = `
                    <div class="bg-white rounded-xl p-6 shadow-lg text-center max-w-sm">
                        <h2 class="text-xl font-bold mb-4">Acceso restringido</h2>
                        <p class="mb-4">Debes iniciar sesión para acceder a esta sección.</p>
                        <div class="flex justify-center gap-4">
                            <a href="<?= $baseURL ?>php/iniciar-sesion.php"
                               class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Iniciar sesión</a>
                            <a href="<?= $baseURL ?>index.php"
                               class="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400">Volver</a>
                        </div>
                    </div>
                `;
                document.body.appendChild(popup);
            }
        })
        .catch(error => console.error('Error verificando sesión:', error));
}
</script>
