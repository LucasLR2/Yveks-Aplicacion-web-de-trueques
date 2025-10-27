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
    <title>Dreva - Datos Personales</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="../css/estilos-generales.css">
    <link rel="stylesheet" href="../css/perfil.css">
</head>
<body class="bg-white lg:bg-gray-50">
    <?php 
        include __DIR__ . '/componentes/header.php';
        include __DIR__ . '/componentes/menu.php';
    ?>

    <!-- LAYOUT MÓVIL -->
    <div class="lg:hidden">
        <div class="w-full bg-white min-h-screen pb-20">
            <div class="px-6 md:px-16 py-6">
                <!-- Header con botón volver -->
                <div class="flex items-center mb-6">
                    <button onclick="window.history.back()" class="w-8 h-8 flex items-center justify-center mr-3">
                        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <h1 class="text-2xl font-medium text-gray-600">Datos Personales</h1>
                </div>

                <!-- Avatar Section -->
                <div class="flex justify-center mb-6">
                    <div class="relative">
                        <img id="mobile-avatar-preview" src="../recursos/iconos/avatar.svg" alt="Avatar" class="w-32 h-32 rounded-full object-cover shadow-lg">
                        <label for="mobile-avatar-input" class="absolute bottom-0 right-0 w-10 h-10 bg-green rounded-full flex items-center justify-center border-4 border-white shadow-lg cursor-pointer hover:opacity-90 transition-all">
                            <img src="../recursos/iconos/contorno/dispositivos/camara.svg" alt="Editar" class="w-5 h-5 svg-white">
                        </label>
                        <input type="file" id="mobile-avatar-input" accept="image/*" class="hidden">
                    </div>
                </div>

                <!-- Form -->
                <form id="mobile-datos-form" class="space-y-5">
                    <!-- Nombre Completo -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                        <div class="relative">
                            <input type="text" id="mobile-nombre" name="nombre" placeholder="Ingresa tu nombre completo" readonly
                                class="w-full px-4 py-3.5 pr-12 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed transition-all">
                            <button type="button" onclick="toggleEditarNombre('mobile')" class="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200 rounded-lg transition-colors">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Correo -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                        <input type="email" id="mobile-correo" name="correo" placeholder="tu@email.com"
                            class="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green focus:border-green text-gray-800 transition-all">
                    </div>

                    <!-- Fecha de Nacimiento -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento</label>
                        <input type="date" id="mobile-fecha-nacimiento" name="fecha_nacimiento"
                               class="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green focus:border-green text-gray-800 transition-all">
                    </div>

                    <!-- Ubicación -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
                        <select id="mobile-ubicacion" name="ubicacion"
                                class="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green focus:border-green text-gray-800 transition-all">
                            <option value="">Selecciona tu ubicación</option>
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

                    <!-- Botones -->
                    <div class="flex gap-3 pt-4">
                        <button type="button" onclick="cancelarCambios()" class="flex-1 bg-white text-green border-2 border-green py-4 rounded-full hover:bg-gray-50 transition-all">
                            Cancelar
                        </button>
                        <button type="submit" class="flex-1 bg-green text-white py-4 rounded-full hover:opacity-90 transition-all">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- LAYOUT DESKTOP -->
    <div class="hidden lg:block">
        <div class="desktop-main">
            <main class="min-h-screen px-20 py-10">
                <!-- Header -->
                <div class="mb-10">
                    <div class="flex items-center mb-2">
                        <button onclick="window.history.back()" class="w-10 h-10 flex items-center justify-center mr-3 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-sm">
                            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        <h1 class="text-4xl font-normal text-gray-700">Datos Personales</h1>
                    </div>
                    <p class="text-gray-500 text-lg ml-13">Administra tu información personal</p>
                </div>

                <!-- Formulario -->
                <form id="desktop-datos-form" class="max-w-6xl">
                    <!-- Sección Avatar y Nombre -->
                    <div class="flex items-start gap-8 mb-10">
                        <!-- Avatar -->
                        <div class="relative flex-shrink-0">
                            <img id="desktop-avatar-preview" src="../recursos/iconos/avatar.svg" alt="Avatar" class="w-40 h-40 rounded-full object-cover shadow-lg">
                            <label for="desktop-avatar-input" class="absolute bottom-2 right-2 w-12 h-12 bg-green rounded-full flex items-center justify-center border-4 border-white shadow-lg cursor-pointer hover:opacity-90 transition-all">
                                <img src="../recursos/iconos/contorno/dispositivos/camara.svg" alt="Editar" class="w-6 h-6 svg-white">
                            </label>
                            <input type="file" id="desktop-avatar-input" accept="image/*" class="hidden">
                        </div>

                        <!-- Nombre Completo al lado del avatar -->
                        <div class="flex-1 pt-4">
                            <label class="block text-sm font-semibold text-gray-700 mb-3">Nombre Completo</label>
                            <div class="relative">
                                <input type="text" id="desktop-nombre" name="nombre" placeholder="Ingresa tu nombre completo" readonly
                                    class="w-full px-5 py-4 pr-14 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed text-lg transition-all">
                                <button type="button" onclick="toggleEditarNombre('desktop')" class="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200 rounded-lg transition-colors">
                                    <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Grid de campos editables -->
                    <div class="grid grid-cols-3 gap-8 mb-10">
                        <!-- Correo -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-3">Correo Electrónico</label>
                            <input type="email" id="desktop-correo" name="correo" placeholder="tu@email.com"
                                class="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green focus:border-green text-gray-900 text-base transition-all hover:border-gray-300">
                        </div>

                        <!-- Fecha de Nacimiento -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-3">Fecha de Nacimiento</label>
                            <input type="date" id="desktop-fecha-nacimiento" name="fecha_nacimiento"
                                   class="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green focus:border-green text-gray-900 text-base transition-all hover:border-gray-300">
                        </div>

                        <!-- Ubicación (Select) -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-3">Ubicación</label>
                            <select id="desktop-ubicacion" name="ubicacion"
                                    class="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green focus:border-green text-gray-900 text-base transition-all hover:border-gray-300 appearance-none bg-white" style="background-image: url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e'); background-repeat: no-repeat; background-position: right 1rem center; background-size: 1.5em 1.5em; padding-right: 3rem;">
                                <option value="">Selecciona tu ubicación</option>
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
                    </div>

                    <!-- Botones -->
                    <div class="flex gap-4 justify-end">
                        <button type="button" onclick="cancelarCambios()" class="w-52 bg-white text-green border-2 border-green py-4 rounded-full hover:bg-gray-50 transition-all">
                            Cancelar
                        </button>
                        <button type="submit" class="w-52 bg-green text-white py-4 rounded-full hover:opacity-90 transition-all">
                            Guardar
                        </button>
                    </div>
                </form>
            </main>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../js/principal.js"></script>
    <script src="../js/datos-personales.js"></script>
</body>
</html>