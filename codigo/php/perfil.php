<?php

session_start();
if (!isset($_SESSION['correo'])) {
    header('Location: ../index.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tienda Móvil - Perfil</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="../css/estilos-generales.css">
  <link rel="stylesheet" href="../css/perfil.css">
  <link rel="stylesheet" href="../css/inicio.css">
  <link rel="stylesheet" href="../css/chatbot.css">
</head>

<body class="bg-white lg:bg-gray-50">
  <?php 
    include __DIR__ . '/componentes/header.php';
    include __DIR__ . '/componentes/menu.php';
  ?>
  <!-- LAYOUT MÓVIL Y TABLET (hasta lg) -->
  <div class="lg:hidden">
    <!-- Container principal para móvil -->
    <div class="w-full bg-white min-h-screen relative">

      <!-- Mobile Profile Content -->
      <div class="px-6 md:px-16 mb-20">
        <!-- Profile Header Mobile -->
        <div class="mb-6">
          <!-- Profile Info -->
          <div class="flex items-center mb-6">
            <div class="relative">
              <img id="mobile-profile-avatar" alt="Perfil" class="w-20 h-20 rounded-full object-cover">
              <div class="absolute bottom-1 -right-2 w-7 h-7 bg-green rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <img src="../recursos/iconos/contorno/interfaz/editar2.svg" alt="Editar" class="w-4 h-4 svg-white">
              </div>
            </div>
            
            <div class="flex flex-col justify-center ml-4">
              <h1 id="mobile-profile-name" class="text-lg font-medium text-gray-800 mb-1"></h1>
              <div class="flex items-center text-gray-600">
                <img src="../recursos/iconos/solido/navegacion/ubicacion.svg" alt="Ubicación" class="w-4 h-4 svg-gray-600 mr-1">
                <span id="mobile-profile-location" class="text-sm"></span>
              </div>
            </div>
          </div>

          <!-- Mobile Profile Tabs -->
          <div class="flex">
            <button id="mobile-tab-productos" class="mobile-tab flex items-center space-x-2 px-4 py-3 tab-active smooth-transition" 
                    onclick="switchMobileTab('productos', this)">
              <img id="mobile-icon-productos" src="../recursos/iconos/solido/estado/cuadricula.svg" alt="Productos" class="w-5 h-5">
              <span class="font-medium text-gray-800">Productos</span>
            </button>
            <button id="mobile-tab-resenas" class="mobile-tab flex items-center space-x-2 px-4 py-3 tab-inactive smooth-transition" 
                    onclick="switchMobileTab('resenas', this)">
              <img id="mobile-icon-resenas" src="../recursos/iconos/contorno/estado/estrella.svg" alt="Reseñas" class="w-5 h-5">
              <span class="text-gray-800">Reseñas</span>
            </button>
          </div>
        </div>

        <!-- Mobile Content -->
        <div id="mobile-productos" class="mobile-content content-show">
          <div class="grid grid-cols-2 gap-3" id="mobile-profile-products">
            <!-- Los productos se generarán dinámicamente -->
          </div>
        </div>

        <div id="mobile-resenas" class="mobile-content content-fade hidden">
          <div class="space-y-4" id="mobile-profile-reviews">
            <!-- Las reseñas se generarán dinámicamente -->
          </div>
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
        <!-- Profile Header -->
        <div class="flex items-start space-x-8 mb-8">
          <!-- Profile Image -->
          <div class="relative">
            <img id="desktop-profile-avatar" src="" alt="Perfil" class="w-32 h-32 rounded-full object-cover">
            <div class="absolute bottom-1 right-1 w-10 h-10 bg-green rounded-full flex items-center justify-center border-2 border-white shadow-lg">
              <img src="../recursos/iconos/contorno/interfaz/editar2.svg" alt="Editar" class="w-6 h-6 svg-white">
            </div>
          </div>
          
          <!-- Profile Info -->
          <div class="flex-1">
            <h1 id="desktop-profile-name" class="text-3xl font-medium text-gray-800 mb-2"></h1>
            <div class="flex items-center text-gray-600 mb-6">
              <img src="../recursos/iconos/solido/navegacion/ubicacion.svg" alt="Ubicación" class="w-5 h-5 svg-gray-600 mr-2">
              <span id="desktop-profile-location"></span>
            </div>
            
            <!-- Profile Tabs -->
            <div class="flex">
              <button id="desktop-tab-productos" class="desktop-tab flex items-center space-x-2 px-6 py-3 tab-active smooth-transition" 
                      onclick="switchDesktopTab('productos', this)">
                <img id="desktop-icon-productos" src="../recursos/iconos/solido/estado/cuadricula.svg" alt="Productos" class="w-5 h-5">
                <span class="font-medium text-gray-800">Productos</span>
              </button>
              <button id="desktop-tab-resenas" class="desktop-tab flex items-center space-x-2 px-6 py-3 tab-inactive smooth-transition" 
                      onclick="switchDesktopTab('resenas', this)">
                <img id="desktop-icon-resenas" src="../recursos/iconos/contorno/estado/estrella.svg" alt="Reseñas" class="w-5 h-5">
                <span class="text-gray-800">Reseñas</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Desktop Content -->
        <div id="desktop-productos" class="desktop-content content-show">
          <div class="grid grid-cols-3 gap-6" id="profile-products">
            <!-- Los productos se generarán dinámicamente -->
          </div>
        </div>

        <div id="desktop-resenas" class="desktop-content content-fade hidden mt-8">
          <div class="grid grid-cols-2 gap-6" id="profile-reviews">
            <!-- Las reseñas se generarán dinámicamente -->
          </div>
        </div>
      </main>
    </div>
  </div>

  <script src="../js/principal.js"></script>
  <script src="../js/perfil.js"></script>
  <script src="../js/chatbot.js"></script>
</body>

</html>