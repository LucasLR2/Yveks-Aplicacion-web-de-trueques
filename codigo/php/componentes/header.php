<!-- HEADER MOBILE -->
<div class="lg:hidden bg-white px-6 md:px-16 pb-2 pt-3">
  <div class="flex flex-col">
    <span class="text-xs text-gray-600 mb-0">Ubicación</span>
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <img src="recursos/iconos/solido/navegacion/ubicacion.svg" alt="Ubicación" class="w-5 h-5 svg-green">
        <span class="text-sm text-gray-800">Montevideo, Uruguay</span>
        <img src="recursos/iconos/solido/interfaz/flecha_abajo.svg" alt="Expandir" class="w-6 h-6 svg-gray-800">
      </div>
      <div class="w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center">
        <img src="recursos/iconos/solido/estado/notificacion.svg" alt="Notificaciones"
             class="w-5 h-5 svg-gray-800">
      </div>
    </div>
  </div>

  <!-- Barra de búsqueda móvil -->
  <div class="pt-2 pb-3">
    <div class="relative">
      <img src="recursos/iconos/solido/interfaz/buscar.svg" alt="Buscar"
           class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 svg-green">
      <input type="text" placeholder="Buscar" id="mobile-search"
             class="w-full pl-12 pr-4 py-3 rounded-full text-sm border border-gray-600 focus:outline-none text-gray-600 placeholder-gray-600">
    </div>
  </div>
</div>

<!-- HEADER DESKTOP -->
<header class="hidden lg:block bg-white border-b border-gray-200 px-20 py-4 sticky top-0 z-40" style="margin-left: 280px;">
  <div class="flex items-center justify-between">
    <!-- Barra de búsqueda expandida -->
    <div class="flex-1 max-w-2xl mr-6">
      <div class="relative">
        <img src="recursos/iconos/solido/interfaz/buscar.svg" alt="Buscar"
             class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 svg-green">
        <input type="text" placeholder="Buscar productos, marcas, categorías..." id="desktop-search"
               class="w-full pl-12 pr-4 py-3 rounded-full text-sm border border-gray-600 focus:outline-none text-gray-600 placeholder-gray-600">
      </div>
    </div>

    <!-- Contenedor de acciones dinámicas (se llena con JS) -->
    <div class="flex items-center space-x-4 flex-shrink-0" id="desktop-header-actions"></div>
  </div>
</header>
