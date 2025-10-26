<?php
    session_start();               // Inicia sesión para manejar datos del usuario
    if (!isset($_SESSION['correo'])) {
        // Redirigir al usuario a la página de inicio de sesión si no está autenticado
        header('Location: index.php');
        exit();
    }
?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Publicación - Marketplace</title>
  <link rel="stylesheet" href="css/nuevo_producto.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/estilos-generales.css">
  <link rel="stylesheet" href="css/inicio.css">
</head>

<body class="bg-white lg:bg-gray-50">

     <?php 
        include __DIR__ . '/php/componentes/header.php';
        include __DIR__ . '/php/componentes/menu.php';
      ?>

  <!-- LAYOUT MÓVIL Y TABLET (hasta lg) -->
  <div class="lg:hidden">
    <!-- Container principal para móvil -->
    <div class="w-full bg-white min-h-screen relative">

      <!-- Encabezado de nueva publicación -->
      <div class="px-6 md:px-16 pt-1 pb-3">
        <div class="flex items-center space-x-4">
          <button type="button" class="p-2 -ml-2" onclick="window.location.href='index.php'">
            <svg class="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 class="text-lg text-gray-800 font-medium">Nueva publicación</h1>
        </div>
      </div>

      <!-- Formulario móvil -->
      <div class="px-6 md:px-16 mb-20">
        <form id="productForm" onsubmit="submitForm(event)" novalidate>
          <!-- Imagen -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-3">
              <h2 class="text-base font-medium text-gray-800">Fotos</h2>
              <span class="photoCounter text-xs text-gray-500">0/10</span>
            </div>
            <p class="text-sm text-gray-600 mb-3">Puedes agregar un máximo de 10 fotos</p>
            <div class="grid grid-cols-3 gap-3 imagePreview"></div>
            <input type="file" class="imageInput hidden" multiple accept="image/*" onchange="handleImageUpload(event)">
          </div>

          <!-- Información del producto -->
          <div class="mb-6">
            <h2 class="text-base font-medium text-gray-800 mb-3">Información del producto</h2>
            <div class="text-sm text-gray-600 mb-3">*Obligatorio</div>
            <div class="space-y-4">
              <input type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 focus:border-transparent"
                placeholder="Nombre del producto" id="productName" required>
              <select id="condition"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 focus:border-transparent text-gray-700"
                required>
                <option value="" disabled selected>Estado del producto</option>
                <option value="nuevo">Nuevo</option>
                <option value="usado">Usado</option>
                <option value="reacondicionado">Reacondicionado</option>
              </select>
              <select id="category"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 focus:border-transparent text-gray-700"
                required>
                <option value="" disabled selected>Seleccionar categoría</option>
                <option value="tecnología">Tecnología</option>
                <option value="hogar">Hogar</option>
                <option value="ropa">Ropa</option>
                <option value="accesorios">Accesorios</option>
                <option value="deportes">Deportes</option>
                <option value="entretenimiento">Entretenimiento</option>
                <option value="mascotas">Mascotas</option>
                <option value="herramientas">Herramientas</option>
                <option value="servicios">Servicios</option>
              </select>
            </div>
          </div>

          <!-- Descripción -->
          <div class="mb-6">
            <h2 class="text-base font-medium text-gray-800 mb-3">Descripción</h2>
            <p class="text-sm text-gray-600 mb-3">Incluye estado, uso, accesorios y cualquier detalle importante.</p>
            <textarea
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 focus:border-transparent resize-none"
              placeholder="Describe tu producto en detalle..." id="description" rows="4"></textarea>
          </div>

          <!-- Preferencias de intercambio -->
          <div class="mb-6">
            <h2 class="text-base font-medium text-gray-800 mb-3">Preferencias de intercambio</h2>
            <p class="text-sm text-gray-600 mb-3">¿Qué te gustaría recibir a cambio?</p>
            <textarea
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 focus:border-transparent resize-none"
              placeholder="Describe qué productos te interesan recibir a cambio..." id="exchangePreferences"
              rows="4"></textarea>
          </div>

          <!-- Ubicación -->
          <div class="mb-8">
            <select id="location"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 focus:border-transparent text-gray-700"
              required>
              <option value="" disabled selected>Selecciona ubicación</option>
              <option value="montevideo">Montevideo</option>
              <option value="canelones">Canelones</option>
              <option value="maldonado">Maldonado</option>
              <option value="colonia">Colonia</option>
              <option value="san josé">San José</option>
              <option value="soriano">Soriano</option>
              <option value="paysandú">Paysandú</option>
              <option value="durazno">Durazno</option>
              <option value="cerro largo">Cerro Largo</option>
              <option value="tacuarembó">Tacuarembó</option>
              <option value="salto">Salto</option>
              <option value="artígas">Artígas</option>
              <option value="rivera">Rivera</option>
              <option value="rocha">Rocha</option>
              <option value="flores">Flores</option>
              <option value="lavalleja">Lavalleja</option>
              <option value="treinta y tres">Treinta y Tres</option>
              <option value="florida">Florida</option>
              <option value="río negro">Río Negro</option>
            </select>
          </div>

          <!-- Botones -->
          <div class="space-y-3">
            <button type="submit" class="w-full bg-green text-white py-3 rounded-lg font-medium">
              Guardar publicación
            </button>
            <button type="button" class="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium"
              onclick="window.location.href='index.php'">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- LAYOUT DESKTOP (lg y superior) -->
  <div class="hidden lg:block">
    <!-- Main Content Area -->
    <div class="desktop-main overflow-y-auto">
      <!-- Content -->
      <main class="p-20">
        <!-- Encabezado -->
        <div class="mb-8">
          <div class="flex items-center space-x-4 mb-6">
            <button type="button" class="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
              onclick="window.location.href='index.php'">
              <svg class="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 class="text-3xl text-gray-800">Nueva publicación</h1>
          </div>
        </div>

        <!-- Formulario desktop -->
        <div class="max-w-6xl mx-auto">
          <form id="productForm" onsubmit="submitForm(event)" novalidate>
            <!-- Sección de imágenes -->
            <div class="mb-12">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl text-gray-800 font-medium">Fotos</h2>
                <span class="photoCounter text-sm text-gray-500">0/10</span>
              </div>
              <p class="text-gray-600 mb-6">Puedes agregar un máximo de 10 fotos</p>
              <div class="grid grid-cols-5 gap-4 imagePreview"></div>
              <input type="file" class="imageInput hidden" multiple accept="image/*"
                onchange="handleImageUpload(event)">
            </div>

            <!-- Grid del formulario -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <!-- Columna izquierda -->
              <div class="space-y-8">
                <!-- Información del producto -->
                <div>
                  <h2 class="text-xl text-gray-800 font-medium mb-2">Información del producto</h2>
                  <div class="text-sm text-gray-600 mb-6">*Obligatorio</div>
                  <div class="space-y-4">
                    <input type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 focus:border-transparent"
                      placeholder="Nombre del producto" id="productName" required>
                    <select id="condition"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 focus:border-transparent text-gray-700"
                      required>
                      <option value="" disabled selected>Estado del producto</option>
                      <option value="nuevo">Nuevo</option>
                      <option value="usado">Usado</option>
                      <option value="reacondicionado">Reacondicionado</option>
                    </select>
                    <select id="category"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 focus:border-transparent text-gray-700"
                      required>
                      <option value="" disabled selected>Seleccionar categoría</option>
                      <option value="tecnología">Tecnología</option>
                      <option value="hogar">Hogar</option>
                      <option value="ropa">Ropa</option>
                      <option value="accesorios">Accesorios</option>
                      <option value="deportes">Deportes</option>
                      <option value="entretenimiento">Entretenimiento</option>
                      <option value="mascotas">Mascotas</option>
                      <option value="herramientas">Herramientas</option>
                      <option value="servicios">Servicios</option>
                    </select>
                  </div>
                </div>

                <!-- Preferencias de intercambio -->
                <div>
                  <h2 class="text-xl text-gray-800 font-medium mb-2">Preferencias de intercambio</h2>
                  <p class="text-gray-600 mb-4">¿Qué te gustaría recibir a cambio?</p>
                  <textarea
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 focus:border-transparent resize-none"
                    placeholder="Describe qué productos te interesan recibir a cambio..." id="exchangePreferences"
                    rows="4"></textarea>
                </div>
              </div>

              <!-- Columna derecha -->
              <div class="space-y-8">
                <!-- Descripción -->
                <div>
                  <h2 class="text-xl text-gray-800 font-medium mb-2">Descripción</h2>
                  <p class="text-gray-600 mb-4">Incluye estado, uso, accesorios y cualquier detalle importante.</p>
                  <textarea
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 focus:border-transparent resize-none"
                    placeholder="Describe tu producto en detalle..." id="description" rows="6"
                    style="min-height: 150px;"></textarea>
                </div>

                <!-- Ubicación -->
                <div>
                  <select id="location"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 focus:border-transparent text-gray-700"
                    required>
                    <option value="" disabled selected>Selecciona ubicación</option>
                    <option value="montevideo">Montevideo</option>
                    <option value="canelones">Canelones</option>
                    <option value="maldonado">Maldonado</option>
                    <option value="colonia">Colonia</option>
                    <option value="san josé">San José</option>
                    <option value="soriano">Soriano</option>
                    <option value="paysandú">Paysandú</option>
                    <option value="durazno">Durazno</option>
                    <option value="cerro largo">Cerro Largo</option>
                    <option value="tacuarembó">Tacuarembó</option>
                    <option value="salto">Salto</option>
                    <option value="artígas">Artígas</option>
                    <option value="rivera">Rivera</option>
                    <option value="rocha">Rocha</option>
                    <option value="flores">Flores</option>
                    <option value="lavalleja">Lavalleja</option>
                    <option value="treinta y tres">Treinta y Tres</option>
                    <option value="florida">Florida</option>
                    <option value="río negro">Río Negro</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Botones -->
            <div class="flex flex-col sm:flex-row gap-4 justify-end mt-12">
              <button type="button"
                class="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                onclick="window.location.href='index.php'">
                Cancelar
              </button>
              <button type="submit"
                class="px-8 py-3 bg-green text-white rounded-lg font-medium hover:bg-green-600 transition-colors">
                Guardar publicación
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  </div>

  <script src="js/nuevo_producto.js"></script>
  <script src="js/principal.js"></script>
</body>

</html>