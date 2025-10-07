<?php
$rutaActual = basename($_SERVER['PHP_SELF'], ".php");
include __DIR__ . '/../categorias.php';
?>

<!-- MENÚ MÓVIL -->
<div class="lg:hidden">

    <!-- Bottom Navigation -->
      <div class="fixed bottom-0 left-0 w-screen z-50 right-0">
        <div class="w-full h-3 bg-white"></div>
        <div class="relative bg-green overflow-hidden">
          <!-- Burbuja animada -->
          <div id="mobile-bubble" class="absolute left-1/2 bottom-7 -translate-x-1/2 w-12 h-12 bg-white bubble-u-shape">
          </div>
          <div class="flex py-2 relative z-10">
            <button class="flex flex-col items-center py-2 text-gray-300 transition-colors" style="width: 20%;"
              onclick="setActiveTab(this, 0, 'mobile'); window.location.href='index.php'">
              <img src="recursos/iconos/contorno/general/inicio.svg" alt="Inicio" class="w-6 h-6 mb-1 svg-gray-300">
            </button>
            <button class="flex flex-col items-center py-2 text-gray-300 transition-colors" style="width: 20%;"
              onclick="setActiveTab(this, 1, 'mobile'); window.location.href='ofertas.html'">
              <img src="recursos/iconos/solido/general/etiqueta.svg" alt="Ofertas" class="w-6 h-6 mb-1 svg-gray-300">
            </button>
            <button
              class="w-10 h-10 flex items-center justify-center bg-white text-green rounded-full shadow-lg transition-colors relative z-20 mx-auto"
              onclick="setActiveTab(this, 2, 'mobile'); window.location.href='nuevo_producto.html'">
              <img src="recursos/iconos/solido/interfaz/mas.svg" alt="Agregar" class="w-4 h-4 svg-green">
            </button>
            <button class="flex flex-col items-center py-2 text-gray-300 transition-colors" style="width: 20%;"
              onclick="setActiveTab(this, 3, 'mobile')">
              <img src="recursos/iconos/contorno/comunicacion/comentario.svg" alt="Comentarios"
                class="w-6 h-6 mb-1 svg-gray-300">
            </button>
            <button class="flex flex-col items-center py-2 text-gray-300 transition-colors" style="width: 20%;"
              onclick="setActiveTab(this, 4, 'mobile')">
              <img src="recursos/iconos/contorno/comunicacion/usuario.svg" alt="Usuario" class="w-6 h-6 mb-1 svg-gray-300">
            </button>
          </div>
        </div>
  </div>
</div>


<!-- MENÚ DESKTOP -->
<div class="hidden lg:block">
  <div class="desktop-sidebar bg-white border-r border-gray-200 custom-scrollbar overflow-y-auto h-screen fixed left-0 top-0 w-[280px] flex flex-col justify-between">
    
    <!-- Logo y ubicación -->
    <div>
      <!-- Logo -->
      <div class="p-6 flex items-center">
        <img src="recursos/iconos/dreva.svg" alt="Dreva">
      </div>

      <!-- Filtro de ubicación (en el futuro dinámico) -->
      <div class="px-6 pb-6 border-b border-gray-100">
        <span class="text-xs text-gray-500 mb-1 block">Ubicación</span>
        <div class="flex items-center space-x-2 cursor-pointer">
          <img src="recursos/iconos/solido/navegacion/ubicacion.svg" alt="Ubicación" class="w-5 h-5 svg-green">
          <span class="text-sm text-gray-800">Montevideo, Uruguay</span>
          <img src="recursos/iconos/solido/interfaz/flecha_abajo.svg" alt="Cambiar" class="w-5 h-5 svg-gray-800">
        </div>
      </div>

      <!-- Navegación principal -->
      <nav class="p-6">
        <ul class="space-y-2">
          <li>
            <a href="index.php" class="desktop-nav-item flex items-center space-x-3 px-4 py-3 rounded-lg text-green hover:bg-gray-50 smooth-transition <?= $rutaActual === 'index' ? 'bg-green text-white' : '' ?>">
              <img src="recursos/iconos/contorno/general/inicio.svg" alt="Inicio" class="w-5 h-5 <?= $rutaActual === 'index' ? 'svg-white' : 'svg-green' ?>">
              <span>Inicio</span>
            </a>
          </li>
          <li>
            <a href="ofertas.html" class="desktop-nav-item flex items-center space-x-3 px-4 py-3 rounded-lg text-green hover:bg-gray-50 smooth-transition <?= $rutaActual === 'ofertas' ? 'bg-green text-white' : '' ?>">
              <img src="recursos/iconos/contorno/general/etiqueta.svg" alt="Ofertas" class="w-5 h-5 <?= $rutaActual === 'ofertas' ? 'svg-white' : 'svg-green' ?>">
              <span>Ofertas</span>
            </a>
          </li>
          <li>
            <a href="perfil.html" class="desktop-nav-item flex items-center space-x-3 px-4 py-3 rounded-lg text-green hover:bg-gray-50 smooth-transition <?= $rutaActual === 'perfil' ? 'bg-green text-white' : '' ?>">
              <img src="recursos/iconos/contorno/comunicacion/usuario.svg" alt="Perfil" class="w-5 h-5 <?= $rutaActual === 'perfil' ? 'svg-white' : 'svg-green' ?>">
              <span>Perfil</span>
            </a>
          </li>
        </ul>
      </nav>
      <div id="categorias-desktop">
        <div class="p-6 border-t border-gray-100">
             <?= $categoriasDesktop ?? '' ?>
        </div>
      </div>
    </div>
  </div>
</div>
