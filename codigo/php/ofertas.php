<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tienda Móvil</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="../css/estilos-generales.css">
    <link rel="stylesheet" href="../css/inicio.css">
    <link rel="stylesheet" href="../css/ofertas.css">
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/botui/0.2.1/botui.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/botui/0.2.1/botui-theme-default.css" rel="stylesheet">
</head>

<body class="bg-gray-50">
    <?php 
        include __DIR__ . '/componentes/header.php';
        include __DIR__ . '/componentes/menu.php';
    ?>
    <!-- LAYOUT MÓVIL Y TABLET (hasta lg) -->
    <div class="lg:hidden">
        <!-- Container principal para móvil -->
        <div class="w-full bg-white min-h-screen relative">

            <!-- Título y switch de ofertas -->
            <div class="px-6 md:px-16 mb-6">
                <h1 class="text-2xl text-black mb-4">Ofertas</h1>
                <!-- Switch de ofertas móvil -->
                <div class="switch-button flex mb-4">
                    <div class="switch-option active" onclick="switchOfferType('received', this)">
                        Recibidas
                    </div>
                    <div class="switch-option" onclick="switchOfferType('made', this)">
                        Hechas
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- LAYOUT DESKTOP (lg y superior) -->
    <div class="hidden lg:block">
        <!-- Contenido principal -->
        <div class="desktop-main custom-scrollbar overflow-y-auto">
            <!-- Contenido principal -->
            <main class="p-20">
                <div>
                    <h1 class="text-2xl text-black mb-4">Ofertas</h1>
                    <!-- Switch de ofertas desktop -->
                    <div class="switch-button flex mb-6">
                        <div class="switch-option active" onclick="switchOfferType('received', this)">
                            Recibidas
                        </div>
                        <div class="switch-option" onclick="switchOfferType('made', this)">
                            Hechas
                        </div>
                    </div>
                </div>
                <!-- Lista de ofertas desktop -->
                <div class="grid grid-cols-1 xl:grid-cols-2 gap-8" id="desktop-offers">
                    <!-- Las ofertas se generarán dinámicamente -->
                </div>
        </div>
        <!-- contenedor chatbot -->
        <div id="chatbot-container"
            class="hidden fixed w-80 h-96 bg-white rounded-lg shadow-xl border p-4 overflow-y-auto z-50 bottom-[5.75rem] right-0 -translate-x-[10px]">
            <div id="botui-app">
                <bot-ui></bot-ui>
            </div>
        </div>
        </main>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/botui/0.2.1/botui.min.js"></script>
    <script src="../js/ofertas.js"></script>
    <script src="../js/principal.js"></script>
    <script src="../js/inicio.js"></script>
</body>

</html>