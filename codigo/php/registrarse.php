<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Registrarse</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
  <link rel="stylesheet" href="../css/estilos-generales.css"/>
</head>
<body class="bg-[#719177]">

  <!-- LAYOUT MÓVIL Y TABLET (hasta lg) -->
  <div class="lg:hidden">
    <div class="bg-white min-h-screen relative">
      <div class="iniciosesion bg-white">
        <div class="flex-1 p-6 items-center grid place-items-center h-screen">
          <h1 class="text-2xl font-bold mb-4 text-center">Registrarse</h1>
          <p class="text-[#8C8C8C] mb-6 text-center">Completa tus datos o usa una cuenta social para registrarte fácilmente.</p>

          <!-- FORMULARIO MÓVIL -->
          <form id="form-registro-mobile" class="w-full max-w-sm form-registro-movil registro-form" novalidate>
            <div id="alerta-registro-mobile" class="hidden mb-4 text-sm rounded-lg px-4 py-3 border" role="alert"></div>
            <div class="mb-4">
              <label for="nombre-movil" class="block text-sm font-medium text-gray-700">Nombre</label>
              <input type="text" id="nombre-movil" name="nombre" class="mt-1 block w-full border border-[#8C8C8C] rounded-full p-2" placeholder="Juan Pérez">
            </div>

            <div class="mb-4">
              <label for="email-movil" class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email-movil" name="correo" class="mt-1 block w-full border border-[#8C8C8C] rounded-full p-2" placeholder="ejemplo@gmail.com">
            </div>

            <div class="mb-4 relative">
              <label for="password-movil" class="block text-sm font-medium text-gray-700">Contraseña</label>
              <input type="password" id="password-movil" name="contrasena" class="mt-1 block w-full border border-[#8C8C8C] rounded-full p-2 pr-10" placeholder="••••••••••••">
              <button type="button" id="togglePassword-movil" class="absolute right-3 top-[34px] text-gray-500 hover:text-gray-700">
                <i class="far fa-eye-slash"></i>
              </button>
            </div>

            <!-- Aceptar términos -->
            <div class="mb-4 flex items-center">
              <input id="terminos-movil" name="terminos" type="checkbox" class="h-4 w-4 text-green border-gray-300 rounded focus:ring-green">
              <label for="terminos-movil" class="ml-2 block text-sm text-gray-700">Acepto los <a href="#" class="text-green underline">términos y condiciones</a>.</label>
            </div>

            <button type="submit" class="w-full bg-green text-white rounded-full mt-2 p-[13px]">Registrarse</button>
          </form>

          <div class="flex items-center justify-center my-6">
            <hr class="w-24 border-t border-gray-300">
            <span class="px-3 text-sm text-gray-500">O regístrate con</span>
            <hr class="w-24 border-t border-gray-300">
          </div>

          <!-- Iconos -->
          <div class="flex justify-center space-x-6">
            <button class="w-[64px] h-[64px] rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition">
              <img src="../recursos/iconos/apple.svg" alt="Apple" class="w-6 h-6">
            </button>
            <button class="w-[64px] h-[64px] rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition">
              <img src="../recursos/iconos/google.svg" alt="Google" class="w-6 h-6">
            </button>
            <button class="w-[64px] h-[64px] rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition">
              <img src="../recursos/iconos/microsoft.svg" alt="Microsoft" class="w-6 h-6">
            </button>
          </div>

          <div class="mt-4 text-center">
            <p class="text-sm text-gray-600">¿Ya tienes una cuenta? <a href="/php/iniciar-sesion.php" class="text-green">Inicia sesión</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- LAYOUT DESKTOP -->
  <div class="hidden lg:block">
    <div>
      <main class="p-[16px] gap-[16px] flex w-full h-screen">
        <!-- Carrusel -->
        <div class="bg-white min-h-[95vh] rounded-[20px] lg:w-[60%] xl:w-[65%]">
          <div id="carrusel" class="relative w-full h-full overflow-hidden rounded-[20px]">
            <!-- Slides -->
              <div class="flex transition-transform duration-700 ease-in-out w-full h-full" id="diapositivas">
                <img src="../recursos/imagenes/log1.jpg" class="w-full h-full flex-shrink-0 object-cover" alt="Imagen de carrusel 1">
                <img src="../recursos/imagenes/log2.jpg" class="w-full h-full flex-shrink-0 object-cover" alt="Imagen de carrusel 2">
                <img src="../recursos/imagenes/log3.jpg" class="w-full h-full flex-shrink-0 object-cover" alt="Imagen de carrusel 3">
                <img src="../recursos/imagenes/log4.jpg" class="w-full h-full flex-shrink-0 object-cover" alt="Imagen de carrusel 4">
              </div>

              <!-- Texto superpuesto -->
              <div class="absolute inset-0 flex items-end justify-center pb-48 pointer-events-none">
                <div class="text-center text-white px-8">
                  <h2 id="texto-titulo" class="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 drop-shadow-lg"></h2>
                    <p id="texto-subtitulo" class="text-base md:text-lg lg:text-xl drop-shadow-md"></p>
                </div>
              </div>

              <!-- Indicadores -->
              <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                <button class="w-3 h-3 rounded-full bg-gray-400" onclick="irADiapositiva(0)" id="indicador-0"></button>
                <button class="w-3 h-3 rounded-full bg-gray-300" onclick="irADiapositiva(1)" id="indicador-1"></button>
                <button class="w-3 h-3 rounded-full bg-gray-300" onclick="irADiapositiva(2)" id="indicador-2"></button>
                <button class="w-3 h-3 rounded-full bg-gray-300" onclick="irADiapositiva(3)" id="indicador-3"></button>
              </div>
            </div>
          </div>

        <!-- Registro -->
        <div class="bg-white min-h-[95vh] rounded-[20px] lg:w-[40%] xl:w-[35%] xl:p-[50px]">
          <div class="flex-1 p-8">
            <h1 class="text-2xl font-bold mb-4 text-center">Crear cuenta</h1>
            <p class="text-[#8C8C8C] mb-6 text-center">Por favor completa los campos para registrarte.</p>

            <form id="form-registro-desktop" class="registro-form" novalidate>
              <div id="alerta-registro-desktop" class="hidden mb-4 text-sm rounded-lg px-4 py-3 border" role="alert"></div>
              <div class="mb-4">
                <label for="nombre-escritorio" class="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" id="nombre-escritorio" name="nombre" class="mt-1 block w-full border border-[#8C8C8C] rounded-full p-2" placeholder="Juan Pérez">
              </div>

              <div class="mb-4">
                <label for="email-escritorio" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email-escritorio" name="correo" class="mt-1 block w-full border border-[#8C8C8C] rounded-full p-2" placeholder="ejemplo@gmail.com">
              </div>

              <div class="mb-4 relative">
                <label for="password-escritorio" class="block text-sm font-medium text-gray-700">Contraseña</label>
                <input type="password" id="password-escritorio" name="contrasena" class="mt-1 block w-full border border-[#8C8C8C] rounded-full p-2 pr-10" placeholder="••••••••••••">
                <button type="button" id="togglePassword-escritorio" class="absolute right-3 top-[34px] text-gray-500 hover:text-gray-700">
                  <i class="far fa-eye-slash"></i>
                </button>
              </div>

              <!-- Checkbox términos -->
              <div class="mb-4 flex items-center">
                <input id="terminos-escritorio" name="terminos" type="checkbox" class="h-4 w-4 text-green border-gray-300 rounded focus:ring-green">
                <label for="terminos-escritorio" class="ml-2 block text-sm text-gray-700">Acepto los <a href="#" class="text-green underline">términos y condiciones</a>.</label>
              </div>

              <button type="submit" class="w-full bg-green text-white rounded-full mt-2 p-[13px]">Registrarse</button>
            </form>

            <div class="flex items-center justify-center my-6">
              <hr class="w-24 border-t border-gray-300">
              <span class="px-3 text-sm text-gray-500">O regístrate con</span>
              <hr class="w-24 border-t border-gray-300">
            </div>

            <div class="flex justify-center space-x-6">
              <button class="w-[64px] h-[64px] rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition">
                <img src="../recursos/iconos/apple.svg" alt="Apple" class="w-6 h-6">
              </button>
              <button class="w-[64px] h-[64px] rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition">
                <img src="../recursos/iconos/google.svg" alt="Google" class="w-6 h-6">
              </button>
              <button class="w-[64px] h-[64px] rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition">
                <img src="../recursos/iconos/microsoft.svg" alt="Microsoft" class="w-6 h-6">
              </button>
            </div>

            <div class="mt-4 text-center">
              <p class="text-sm text-gray-600">¿Ya tienes una cuenta? <a href="iniciar-sesion.php" class="text-green">Inicia sesión</a></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>

  <script src="../js/registrarse.js"></script>
</body>
</html>