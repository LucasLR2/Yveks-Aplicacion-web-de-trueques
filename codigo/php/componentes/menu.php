
<!-- LAYOUT MÓVIL Y TABLET (hasta lg) -->
  <div class="lg:hidden">
    <!-- Container principal para móvil -->
    <div class="w-full bg-white min-h-screen relative">
      <!-- Header con ubicación -->
      <div class="bg-white px-6 md:px-16 pb-2 pt-3">
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
      </div>
      <!-- Categorías -->
      <div class="px-6 md:px-16 mb-6">
        <h3 class="text-lg text-gray-800 mb-4">Categorías</h3>
        <div class="relative">
          <div class="flex gap-x-4 overflow-x-auto scrollbar-hide">
            <div class="flex flex-col items-center space-y-2 cursor-pointer mobile-category min-w-[72px]"
              onclick="seleccionarCategoria(this)" data-category="tecnologia">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                <img src="recursos/iconos/contorno/dispositivos/procesador.svg" alt="Tecnología" class="w-5 h-5 svg-green">
              </div>
              <span class="text-xs text-gray-600 text-center truncate w-full block" title="Tecnología">Tecnología</span>
            </div>

            <div class="flex flex-col items-center space-y-2 cursor-pointer mobile-category min-w-[72px]"
              onclick="seleccionarCategoria(this)" data-category="hogar">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                <img src="recursos/iconos/contorno/dispositivos/sillon.svg" alt="Hogar" class="w-5 h-5 svg-green">
              </div>
              <span class="text-xs text-gray-600 text-center truncate w-full block" title="Hogar">Hogar</span>
            </div>

            <div class="flex flex-col items-center space-y-2 cursor-pointer mobile-category min-w-[72px]"
              onclick="seleccionarCategoria(this)" data-category="ropa">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                <img src="recursos/iconos/contorno/dispositivos/remera.svg" alt="Ropa" class="w-5 h-5 svg-green">
              </div>
              <span class="text-xs text-gray-600 text-center truncate w-full block" title="Ropa">Ropa</span>
            </div>

            <div class="flex flex-col items-center space-y-2 cursor-pointer mobile-category min-w-[72px]"
              onclick="seleccionarCategoria(this)" data-category="accesorios">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                <img src="recursos/iconos/contorno/dispositivos/lentes.svg" alt="Accesorios" class="w-5 h-5 svg-green">
              </div>
              <span class="text-xs text-gray-600 text-center truncate w-full block" title="Accesorios">Accesorios</span>
            </div>
            
            <!-- Deportes -->
            <div
              class="flex flex-col items-center space-y-2 cursor-pointer mobile-category flex-shrink-0 w-20 snap-start"
              onclick="seleccionarCategoria(this)" data-category="deportes">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                <img src="recursos/iconos/contorno/dispositivos/pelota.svg" alt="Deportes" class="w-5 h-5 svg-green">
              </div>
              <span class="text-xs text-gray-600 text-center">Deportes</span>
            </div>

            <!-- Entretenimiento -->
            <div
              class="flex flex-col items-center space-y-2 cursor-pointer mobile-category flex-shrink-0 w-20 snap-start"
              onclick="seleccionarCategoria(this)" data-category="entretenimiento">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                <img src="recursos/iconos/contorno/dispositivos/dado.svg" alt="Entretenimiento" class="w-5 h-5 svg-green">
              </div>
              <span class="text-xs text-gray-600 text-center">Entretenimiento</span>
            </div>

            <!-- Mascotas -->
            <div
              class="flex flex-col items-center space-y-2 cursor-pointer mobile-category flex-shrink-0 w-20 snap-start"
              onclick="seleccionarCategoria(this)" data-category="mascotas">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                <img src="recursos/iconos/contorno/dispositivos/pata.svg" alt="Mascotas" class="w-5 h-5 svg-green">
              </div>
              <span class="text-xs text-gray-600 text-center">Mascotas</span>
            </div>

            <!-- Herramientas -->
            <div
              class="flex flex-col items-center space-y-2 cursor-pointer mobile-category flex-shrink-0 w-20 snap-start"
              onclick="seleccionarCategoria(this)" data-category="herramientas">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                <img src="recursos/iconos/contorno/dispositivos/herramientas.svg" alt="Herramientas" class="w-5 h-5 svg-green">
              </div>
              <span class="text-xs text-gray-600 text-center">Herramientas</span>
            </div>

            <!-- Servicios -->
            <div
              class="flex flex-col items-center space-y-2 cursor-pointer mobile-category flex-shrink-0 w-20 snap-start"
              onclick="seleccionarCategoria(this)" data-category="servicios">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                <img src="recursos/iconos/contorno/dispositivos/servicio.svg" alt="Servicios" class="w-5 h-5 svg-green">
              </div>
              <span class="text-xs text-gray-600 text-center">Servicios</span>
            </div>
          </div>
        </div>
      </div>
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
  </div>

  <!-- LAYOUT DESKTOP (lg y superior) -->
  <div class="hidden lg:block">
    <!-- Sidebar Navigation -->
    <div class="desktop-sidebar bg-white border-r border-gray-200 custom-scrollbar overflow-y-auto">
      <!-- Header del sidebar -->
      <div class="p-6 border-b border-gray-100">
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-10 h-10 bg-green rounded-full flex items-center justify-center">
            <img src="recursos/iconos/solido/general/bolsa_compras.svg" alt="Tienda" class="w-5 h-5 svg-white">
          </div>
          <div>
            <h1 class="text-xl text-gray-800">Tienda</h1>
            <p class="text-sm text-gray-500">Tu tienda favorita</p>
          </div>
        </div>

        <!-- Ubicación en sidebar -->
        <div>
          <div class="text-xs text-gray-500 mb-1">Ubicación</div>
          <div class="flex items-center space-x-2">
            <img src="recursos/iconos/solido/navegacion/ubicacion.svg" alt="Ubicación" class="w-5 h-5 svg-green">
            <span class="text-sm text-gray-800">Montevideo, Uruguay</span>
            <img src="recursos/iconos/solido/interfaz/flecha_abajo.svg" alt="Expandir" class="w-6 h-6 svg-gray-800">
          </div>
        </div>
      </div>

      <!-- Navegación del sidebar -->
      <nav class="p-6">
        <ul class="space-y-2">
          <li>
            <div id="inicio" class="desktop-nav-item active flex items-center space-x-3 px-4 py-3 rounded-lg bg-green text-white cursor-pointer hover:bg-green-600 smooth-transition"
              onclick="setDesktopActiveNav(this)">
              <img src="recursos/iconos/solido/general/inicio.svg" alt="Inicio" class="w-5 h-5 svg-white">
              <span>Inicio</span>
            </div>
          </li>
          <li>
            <div class="desktop-nav-item flex items-center space-x-3 px-4 py-3 rounded-lg text-green hover:bg-gray-50 smooth-transition cursor-pointer"
              onclick="Verificacion('ofertas.html', this); setDesktopActiveNav(this);">
              <img src="recursos/iconos/contorno/general/etiqueta.svg" alt="Ofertas" class="w-5 h-5 svg-green">
              <span>Ofertas</span>
            </div>
          </li>
          <li>
            <div class="desktop-nav-item flex items-center space-x-3 px-4 py-3 rounded-lg text-green hover:bg-gray-50 smooth-transition cursor-pointer"
              onclick="Verificacion('perfil.html', this); setDesktopActiveNav(this)">
              <img src="recursos/iconos/contorno/comunicacion/usuario.svg" alt="Perfil" class="w-5 h-5 svg-green">
              <span>Perfil</span>
            </div>
          </li>
        </ul>
      </nav>

      <!-- Categorías en sidebar -->
      <div class="p-6 border-t border-gray-100">
        <h3 class="text-sm text-gray-800 mb-4">Categorías</h3>
        <div class="space-y-2">
          <div
            class="desktop-category flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-50 smooth-transition"
            onclick="seleccionarCategoriaEscritorio(this, 'tecnologia')">
            <img src="recursos/iconos/contorno/dispositivos/procesador.svg" alt="Tecnología" class="w-5 h-5 svg-green">
            <span class="text-sm text-green">Tecnología</span>
          </div>
          <div
            class="desktop-category flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-50 smooth-transition"
            onclick="seleccionarCategoriaEscritorio(this, 'hogar')">
            <img src="recursos/iconos/contorno/dispositivos/sillon.svg" alt="Hogar" class="w-5 h-5 svg-green">
            <span class="text-sm text-green">Hogar</span>
          </div>
          <div
            class="desktop-category flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-50 smooth-transition"
            onclick="seleccionarCategoriaEscritorio(this, 'ropa')">
            <img src="recursos/iconos/contorno/dispositivos/remera.svg" alt="Ropa" class="w-5 h-5 svg-green">
            <span class="text-sm text-green">Ropa</span>
          </div>
          <div
            class="desktop-category flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-50 smooth-transition"
            onclick="seleccionarCategoriaEscritorio(this, 'accesorios')">
            <img src="recursos/iconos/contorno/dispositivos/lentes.svg" alt="Accesorios" class="w-5 h-5 svg-green">
            <span class="text-sm text-green">Accesorios</span>
          </div>
          <div
            class="desktop-category flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-50 smooth-transition"
            onclick="seleccionarCategoriaEscritorio(this, 'deportes')">
            <img src="recursos/iconos/contorno/dispositivos/pelota.svg" alt="Deportes" class="w-4 h-4 svg-green">
            <span class="text-sm text-green">Deportes</span>
          </div>
          <div
            class="desktop-category flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-50 smooth-transition"
            onclick="seleccionarCategoriaEscritorio(this, 'entretenimiento')">
            <img src="recursos/iconos/contorno/dispositivos/dado.svg" alt="Entretenimiento" class="w-4 h-4 svg-green">
            <span class="text-sm text-green">Entretenimiento</span>
          </div>
          <div
            class="desktop-category flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-50 smooth-transition"
            onclick="seleccionarCategoriaEscritorio(this, 'mascotas')">
            <img src="recursos/iconos/contorno/dispositivos/pata.svg" alt="Mascotas" class="w-4 h-4 svg-green">
            <span class="text-sm text-green">Mascotas</span>
          </div>
          <div
            class="desktop-category flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-50 smooth-transition"
            onclick="seleccionarCategoriaEscritorio(this, 'herramientas')">
            <img src="recursos/iconos/contorno/dispositivos/herramientas.svg" alt="Herramientas" class="w-4 h-4 svg-green">
            <span class="text-sm text-green">Herramientas</span>
          </div>
          <div
            class="desktop-category flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-50 smooth-transition"
            onclick="seleccionarCategoriaEscritorio(this, 'servicios')">
            <img src="recursos/iconos/contorno/dispositivos/servicio.svg" alt="Servicios" class="w-4 h-4 svg-green">
            <span class="text-sm text-green">Servicios</span>
          </div>
        </div>
      </div>
    </div>
    
  <script src="https://cdnjs.cloudflare.com/ajax/libs/botui/0.2.1/botui.min.js"></script>
  <script src="js/principal.js"></script>
  <script src="js/inicio.js"></script>
  </body>
</html>