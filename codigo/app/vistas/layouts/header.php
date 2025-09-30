<?php
// app/vistas/layouts/header.php
// Variables esperadas: $usuario (array|null), $isLoggedIn (bool)

// Valores por defecto
$foto = $usuario['foto'] ?? '/publico/imagenes/default-user.jpg';
$nombre = $usuario['nombre'] ?? '';
$email = $usuario['email'] ?? '';
?>

<header class="bg-white border-b border-gray-200 px-20 py-4 sticky top-0 z-40">
  <div class="flex items-center justify-between">
    
    <!-- Barra de búsqueda -->
    <div class="flex-1 max-w-2xl">
      <div class="relative">
        <img src="/publico/imagenes/iconos/buscar.svg" alt="Buscar"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 svg-green">
        <input type="text" placeholder="Buscar productos, marcas, categorías..." id="desktop-search"
          class="w-full pl-12 pr-4 py-3 rounded-full text-sm border border-gray-600 focus:outline-none text-gray-600 placeholder-gray-600">
      </div>
    </div>

    <!-- Botón Nueva publicación -->
    <div class="mx-8">
      <a href="/nuevo-producto"
        class="bg-green text-white px-4 h-8 rounded-full smooth-transition flex items-center text-sm">
        <img src="/publico/imagenes/iconos/mas.svg" alt="Publicar" class="w-3 h-3 svg-white mr-2">
        Nueva publicación
      </a>
    </div>

    <!-- Acciones del header -->
    <div class="flex items-center space-x-4">

      <?php if ($isLoggedIn): ?>
        <!-- Botones de interacción -->
        <a href="/comentarios" class="w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center smooth-transition">
          <img src="/publico/imagenes/iconos/comentario.svg" alt="Comentarios" class="w-5 h-5 svg-gray-800">
        </a>
        <a href="/notificaciones" class="w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center smooth-transition">
          <img src="/publico/imagenes/iconos/notificacion.svg" alt="Notificaciones" class="w-5 h-5 svg-gray-800">
        </a>
        
        <!-- Menú usuario -->
        <div class="relative inline-block text-left">
          <button class="w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center smooth-transition"
            id="menu-button" onclick="showDropdown()" aria-expanded="false" aria-haspopup="true">
            <img src="/publico/imagenes/iconos/usuario.svg" alt="Usuario" class="w-5 h-5 svg-gray-800">
          </button>

          <div id="menu"
            class="hidden absolute right-4 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden p-6 pr-6">
            
            <div class="flex items-center gap-x-4 mb-4 dropDownProfileConteiner">
              <img class="rounded-full w-12 h-12" src="<?= htmlspecialchars($foto) ?>" alt="Foto de perfil">
              <div>
                <div class="font-medium text-base text-gray-800"><?= htmlspecialchars($nombre) ?></div>
                <p class="text-xs text-green"><?= htmlspecialchars($email) ?></p>
              </div>
            </div>

            <div class="py-1">
              <a href="/configuracion" class="block px-4 py-2 text-sm text-gray-600 flex items-center">
                <img src="/publico/imagenes/iconos/configuracion.svg" alt="Configuración" class="w-4 h-4 svg-gray-800 mr-2">
                Configuración
              </a>
            </div>

            <div class="py-1 pt-3">
              <a href="/cerrar-sesion" class="block px-4 py-2 text-sm text-gray-600 flex items-center">
                <img src="/publico/imagenes/iconos/cerrar_sesion.svg" alt="Cerrar sesión" class="w-4 h-4 svg-red-400 mr-2">
                Cerrar sesión
              </a>
            </div>
          </div>
        </div>

      <?php else: ?>
        <!-- Si no hay sesión -->
        <a href="/iniciar-sesion" class="text-sm text-gray-600 px-4">Iniciar sesión</a>
        <a href="/registro" class="bg-green text-white px-4 h-8 rounded-full smooth-transition flex items-center text-sm">
          Registrarse
        </a>
      <?php endif; ?>

    </div>
  </div>
</header>
