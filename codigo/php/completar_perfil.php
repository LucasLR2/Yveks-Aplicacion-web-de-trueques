<?php
session_start();
// Verificar que el usuario esté autenticado
if (!isset($_SESSION['correo'])) {
    header('Location: registrarse.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Completar Perfil</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="../css/estilos-generales.css">
</head>
<body class="bg-[#719177]">
    <!-- LAYOUT MÓVIL Y TABLET (hasta lg) -->
    <div class="lg:hidden bg-white">
        <!-- Container principal para móvil -->
        <div class="bg-white min-h-screen flex items-center justify-center">
            <!-- Formulario de inicio de sesión -->
            <div class="bg-white w-full">
                <div class="flex-1 p-6">
                    <h1 class="text-2xl font-bold mb-4 text-center">Completa tu perfil</h1>
                    <p class="text-[#8C8C8C] mb-6 text-center">No te preocupes, solo tú podrás ver tu información personal</p>

                    <!-- Avatar -->
                    <div class="flex justify-center mb-8">
                        <div class="relative">
                            <div id="avatar-preview-mobile" class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <input type="file" id="avatar-input-mobile" accept="image/*" class="hidden">
                            <button type="button" onclick="document.getElementById('avatar-input-mobile').click()" class="absolute bottom-0 right-0 w-8 h-8 bg-green rounded-full flex items-center justify-center border-2 border-white">
                                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Formulario completar perfil -->
                    <form id="form-completar-perfil-mobile" class="w-full pl-[32px] pr-[32px]" novalidate>
                        <div id="alerta-completar-perfil-mobile" class="hidden mb-4 text-sm rounded-lg px-4 py-3 border" role="alert"></div>
                        
                        <input type="hidden" id="avatar-data-mobile" name="avatar_imagen" value="">
                        
                        <div class="mb-6">
                            <label for="fecha-nacimiento-movil" class="block text-sm font-medium text-gray-700 mb-2">Fecha de nacimiento</label>
                            <input type="date" id="fecha-nacimiento-movil" name="fecha_nacimiento" class="mt-1 block w-full border border-[#8C8C8C] rounded-full p-3 px-4 cursor-pointer" required>
                        </div>
                        
                        <div class="mb-6">
                            <label for="ubicacion-movil" class="block text-sm font-medium text-gray-700 mb-2">Departamento</label>
                            <select id="ubicacion-movil" name="ubicacion" class="mt-1 block w-full border border-[#8C8C8C] rounded-full p-3 px-4 bg-white cursor-pointer" required>
                                <option value="">Selecciona tu departamento</option>
                                <option value="Artigas">Artigas</option>
                                <option value="Canelones">Canelones</option>
                                <option value="Cerro Largo">Cerro Largo</option>
                                <option value="Colonia">Colonia</option>
                                <option value="Durazno">Durazno</option>
                                <option value="Flores">Flores</option>
                                <option value="Florida">Florida</option>
                                <option value="Lavalleja">Lavalleja</option>
                                <option value="Maldonado">Maldonado</option>
                                <option value="Montevideo">Montevideo</option>
                                <option value="Paysandú">Paysandú</option>
                                <option value="Río Negro">Río Negro</option>
                                <option value="Rivera">Rivera</option>
                                <option value="Rocha">Rocha</option>
                                <option value="Salto">Salto</option>
                                <option value="San José">San José</option>
                                <option value="Soriano">Soriano</option>
                                <option value="Tacuarembó">Tacuarembó</option>
                                <option value="Treinta y Tres">Treinta y Tres</option>
                            </select>
                        </div>

                        <button type="submit" class="w-full bg-green text-white rounded-full mt-4 p-[13px] font-medium">Completar perfil</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- LAYOUT DESKTOP (lg y superior) -->
    <div class="hidden lg:block">
        <!-- Main Content Area -->
        <div>
            <!-- Content -->
            <main class="p-[16px] gap-[16px] flex w-full h-screen">
                <!-- Carrusel de imágenes -->
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

                <!-- Formulario completar perfil -->
                <div class="bg-white min-h-[95vh] rounded-[20px] lg:w-[40%] xl:w-[35%] xl:p-[50px] flex items-center h-full">
                    <div class="flex-1 p-8">
                        <h1 class="text-2xl font-bold mb-4 text-center">Completa tu perfil</h1>
                        <p class="text-[#8C8C8C] mb-6 text-center">No te preocupes, solo tú podrás ver tu información personal</p>

                        <!-- Avatar -->
                        <div class="flex justify-center mb-8">
                            <div class="relative">
                                <div id="avatar-preview-desktop" class="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                    <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <input type="file" id="avatar-input-desktop" accept="image/*" class="hidden">
                                <button type="button" onclick="document.getElementById('avatar-input-desktop').click()" class="absolute bottom-1 right-1 w-10 h-10 bg-green rounded-full flex items-center justify-center border-2 border-white">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Formulario -->
                        <form id="form-completar-perfil-desktop" novalidate>
                            <div id="alerta-completar-perfil-desktop" class="hidden mb-4 text-sm rounded-lg px-4 py-3 border" role="alert"></div>
                            
                            <input type="hidden" id="avatar-data-desktop" name="avatar_imagen" value="">
                            
                            <div class="mb-6">
                                <label for="fecha-nacimiento-escritorio" class="block text-sm font-medium text-gray-700 mb-2">Fecha de nacimiento</label>
                                <input type="date" id="fecha-nacimiento-escritorio" name="fecha_nacimiento" class="mt-1 block w-full border border-[#8C8C8C] rounded-full p-3 px-4 cursor-pointer" required>
                            </div>
                            
                            <div class="mb-6">
                                <label for="ubicacion-escritorio" class="block text-sm font-medium text-gray-700 mb-2">Departamento</label>
                                <select id="ubicacion-escritorio" name="ubicacion" class="mt-1 block w-full border border-[#8C8C8C] rounded-full p-3 px-4 bg-white cursor-pointer" required>
                                    <option value="">Selecciona tu departamento</option>
                                    <option value="Artigas">Artigas</option>
                                    <option value="Canelones">Canelones</option>
                                    <option value="Cerro Largo">Cerro Largo</option>
                                    <option value="Colonia">Colonia</option>
                                    <option value="Durazno">Durazno</option>
                                    <option value="Flores">Flores</option>
                                    <option value="Florida">Florida</option>
                                    <option value="Lavalleja">Lavalleja</option>
                                    <option value="Maldonado">Maldonado</option>
                                    <option value="Montevideo">Montevideo</option>
                                    <option value="Paysandú">Paysandú</option>
                                    <option value="Río Negro">Río Negro</option>
                                    <option value="Rivera">Rivera</option>
                                    <option value="Rocha">Rocha</option>
                                    <option value="Salto">Salto</option>
                                    <option value="San José">San José</option>
                                    <option value="Soriano">Soriano</option>
                                    <option value="Tacuarembó">Tacuarembó</option>
                                    <option value="Treinta y Tres">Treinta y Tres</option>
                                </select>
                            </div>

                            <button type="submit" class="w-full bg-green text-white rounded-full mt-4 p-[13px] font-medium">Completar perfil</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <script src="../js/completar_perfil.js"></script>
</body>
</html>
