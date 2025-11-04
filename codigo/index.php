<?php
session_start();
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Plataforma de trueques; descubre, publica e intercambia productos fácilmente.">
  <title>Dreva</title>
  <link rel="icon" href="recursos/iconos/icon.svg" type="image/svg+xml">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <link rel="stylesheet" href="css/estilos-generales.css">
  <link rel="stylesheet" href="css/inicio.css">
  <link rel="stylesheet" href="css/chatbot.css">
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <!-- Vue 2 -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
</head>

<body class="bg-white lg:bg-gray-50">
  <?php include __DIR__ . '/php/componentes/header.php';
        include __DIR__ . '/php/componentes/menu.php';
        include __DIR__ . '/php/categorias.php';
  ?>
  <!-- LAYOUT MÓVIL Y TABLET (hasta lg) -->
  <div class="lg:hidden">
    <!-- Container principal para móvil -->
    <div class="w-full bg-white min-h-screen relative">
      <!-- Categorías -->
      <div class="px-6 md:px-16 mb-6">
        <h3 class="text-lg text-gray-800 mb-4">Categorías</h3>
        <div class="relative">
          <div class="flex gap-x-4 overflow-x-auto scrollbar-hide" id=categorias-movil>
            <?= $categoriasMovil ?? '' ?>
          </div>
        </div>
      </div>
      <!-- Productos recomendados -->
      <div class="px-6 md:px-16 mb-20">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3" id="mobile-products">
          <!-- Los productos se generarán dinámicamente -->
        </div>
      </div>
    </div>
  </div>

  <!-- LAYOUT DESKTOP (lg y superior) -->
  <div class="hidden lg:block">

    <!-- Main Content Area -->
    <div class="desktop-main overflow-y-auto">
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
          <div class="desktop-grid grid gap-3" id="desktop-products">
            <!-- Productos dinámicos -->
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
  <script src="js/principal.js"></script>
  <script src="js/inicio.js"></script>
  <script src="js/categorias.js"></script>
  <script src="js/chatbot.js"></script>
  </body>
</html>