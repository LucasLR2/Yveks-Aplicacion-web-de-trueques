<?php
  session_start();
  $usuarioLogeado = isset($_SESSION['nombre']);
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tienda Móvil</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <link rel="stylesheet" href="css/estilos-generales.css">
  <link rel="stylesheet" href="css/inicio.css">
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <!-- Vue 2 -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>

  <!-- BotUI CSS -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/botui/0.2.1/botui.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/botui/0.2.1/botui-theme-default.css" rel="stylesheet">
</head>

<body class="bg-white lg:bg-gray-50">
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

      <!-- Barra de búsqueda -->
      <div class="px-6 md:px-16 pt-1 pb-3">
        <div class="relative">
          <img src="recursos/iconos/solido/interfaz/buscar.svg" alt="Buscar"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 svg-green">
          <input type="text" placeholder="Buscar" id="mobile-search"
            class="w-full pl-12 pr-4 py-3 rounded-full text-sm border border-gray-600 focus:outline-none text-gray-600 placeholder-gray-600">
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

      <!-- Productos recomendados -->
      <div class="px-6 md:px-16 mb-20">
        <h3 class="text-lg text-gray-800 mb-4">Inspirado en tus intereses</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3" id="mobile-products">
          <!-- Los productos se generarán dinámicamente -->
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

    <!-- Main Content Area -->
    <div class="desktop-main overflow-y-auto">
      <!-- Top Header -->
      <header class="bg-white border-b border-gray-200 px-20 py-4 sticky top-0 z-40">
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

          <!-- Contenedor derecho con botón y acciones -->
          <div class="flex items-center space-x-4 flex-shrink-0" id="desktop-header-actions">
            
          </div>
        </div>
      </header>
      <!-- Content -->
      <main class="p-20">
        <!-- Sección de bienvenida -->
        <div class="mb-8">
          <h1 class="text-3xl text-gray-800 mb-4">¡Bienvenido de vuelta!</h1>
          <p class="text-gray-600">Descubre los mejores productos para ti</p>
          <a href="#" id="chatbot-btn" class="chatbot-btn">
            <img src="recursos/iconos/contorno/comunicacion/chatbot.svg" alt="Chatbot" class="chatbot-icon">
          </a>
        </div>
        <!-- Categorías destacadas (desktop) -->
        <div class="mb-12 categories-section">
          <!-- Esta sección se llenará dinámicamente por JS si hay categorías seleccionadas -->
        </div>

        <!-- Productos recomendados (desktop) -->
        <div class="mb-12">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl text-gray-800 mb-6">Inspirado en tus intereses</h2>
          </div>
          <div class="desktop-grid grid gap-3" id="desktop-products">
            <!-- Productos dinámicos -->
          </div>
        </div>
        <!-- Contenedor del chatbot -->
        <div id="chatbot-container" class="hidden fixed w-80 h-96 bg-white rounded-lg shadow-xl border z-50 bottom-[5.75rem] right-0 -translate-x-[10px] flex flex-col">
          <!-- Header del chatbot -->
          <div class="chatbot-header text-white font-semibold text-center py-2 rounded-t-lg" style="background-color: #3866389d;">ChatAI</div>
            <!-- Cuerpo con scroll -->
            <div id="botui-app" class="chatbot-body flex-1 overflow-y-auto px-3 py-2">
              <bot-ui></bot-ui>
              <!-- Opciones en fila horizontal con scroll -->
              <div class="chat-options mt-3">
                <button class="option-btn" data-value="intercambiar">Qué puedo intercambiar por…</button>
                <button class="option-btn" data-value="solicitados">Qué productos la gente solicita</button>
                <button class="option-btn" data-value="otro">Otro</button>
              </div>
            </div>
            <!-- Input con icono de enviar adaptado -->
            <div class="chatbot-input flex items-center border-t bg-gray-50 px-2 py-2">
              <input 
                type="text" 
                id="chatbot-input" 
                placeholder="Escribe tu mensaje..." 
                class="flex-1 text-sm px-3 py-2 rounded-full border focus:outline-none focus:ring focus:ring-blue-300"
              >
              <button id="chatbot-send" class="ml-2 p-2 rounded-full hover:bg-gray-200">
                <img src="recursos/iconos/contorno/comunicacion/enviar.svg" alt="Enviar" class="w-5 h-5">
              </button>
            </div>
        </div>
      </div>
        <!-- Modal de detalle de producto -->
        <div id="product-modal" class="fixed inset-0 z-50 hidden modal-overlay">
          <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <!-- Overlay -->
            <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onclick="closeProductModal()"></div>
            
            <!-- Modal content -->
            <div class="inline-block w-full max-w-lg mx-auto overflow-hidden text-left align-bottom transition-all transform bg-white rounded-t-2xl shadow-xl modal-content sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:rounded-2xl">
              <!-- Header del modal -->
              <div class="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 class="text-lg font-medium text-gray-900">Detalle del producto</h3>
                <button onclick="closeProductModal()" class="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <!-- Contenido del modal -->
              <div class="max-h-96 overflow-y-auto modal-scroll" id="modal-content">
                <!-- El contenido se generará dinámicamente -->
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/botui/0.2.1/botui.min.js"></script>
  <script src="js/principal.js"></script>
  <script src="js/inicio.js"></script>
  </body>
</html>