<?php
session_start();

// Verificar sesión
if (!isset($_SESSION['id'])) {
    header('Location: ../index.php');
    exit;
}

$baseURL = '/';
$rutaActual = 'mensajes';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mensajes - Dreva</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="<?= $baseURL ?>css/estilos-generales.css">
    <link rel="stylesheet" href="<?= $baseURL ?>css/mensajes.css">
    <style>
        /* Ocultar sidebar en mensajes desktop */
        @media (min-width: 1024px) {
            .desktop-sidebar {
                display: none !important;
            }
        }
    </style>
</head>
<body class="bg-white lg:bg-gray-50">
    <?php 
    include __DIR__ . '/componentes/header.php';
    ?>

    <!-- LAYOUT MÓVIL -->
    <div class="lg:hidden">
        <div class="h-screen flex flex-col bg-white">
            <!-- Tabs -->
            <div class="px-4 pt-4 pb-0">
                <div class="tabs-container relative flex gap-0 w-fit">
                    <div class="tab-slider"></div>
                    <button class="tab-btn tab-btn-left py-1.5 px-6 text-sm font-medium active" data-tab="chats">
                        Todos
                    </button>
                    <button class="tab-btn tab-btn-right py-1.5 px-6 text-sm font-medium" data-tab="grupos">
                        Solicitudes
                    </button>
                </div>
            </div>

            <!-- Lista de conversaciones -->
            <div id="conversaciones-lista" class="flex-1 overflow-y-auto bg-white">
                <!-- Se llena dinámicamente -->
            </div>
        </div>

        <!-- Vista de chat (oculta por defecto) -->
        <div id="chat-view" class="hidden fixed inset-0 bg-white z-50">
            <div class="h-full flex flex-col">
                <!-- Header del chat -->
                <div class="chat-header border-b border-gray-200">
                    <button id="btn-volver" class="w-8 h-8 flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <img id="chat-avatar" src="" alt="Avatar" class="w-10 h-10 rounded-full">
                    <div class="flex-1">
                        <div id="chat-nombre" class="text-white"></div>
                        <div id="chat-producto" class="text-xs text-gray-200"></div>
                    </div>
                </div>

                <!-- Mensajes -->
                <div id="chat-mensajes" class="chat-messages flex-1">
                    <!-- Se llenan dinámicamente -->
                </div>

                <!-- Preview de imágenes -->
                <div id="images-preview" class="images-preview-container" style="display: none;"></div>

                <!-- Input de mensaje -->
                <div class="chat-input-container">
                    <button id="btn-adjuntar" class="btn-attach">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                    </button>
                    <button id="btn-emoji" class="btn-emoji">
                        <img src="/recursos/iconos/solido/interfaz/emoji.svg" alt="emoji">
                    </button>
                    <div id="emoji-picker" class="emoji-picker"></div>
                    <input type="file" id="input-imagen" accept="image/*" multiple class="hidden">
                    <input type="text" id="input-mensaje" class="chat-input" placeholder="Escribe un mensaje...">
                    <button id="btn-enviar" class="btn-send" disabled>
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- LAYOUT DESKTOP -->
    <div class="hidden lg:block">
        <div class="mensajes-layout flex bg-white">
            <!-- Panel izquierdo: Lista de conversaciones -->
            <div class="conversaciones-panel flex flex-col bg-white">
                <!-- Header con título -->
                <div class="px-4 pt-6 pb-4">
                    <h2 class="text-2xl font-normal text-gray-800">Chats</h2>
                </div>

                <!-- Tabs -->
                <div class="px-4 mb-4">
                    <div class="tabs-container relative flex gap-0">
                        <div class="tab-slider"></div>
                        <button class="tab-btn tab-btn-left flex-1 py-2.5 text-sm font-medium active" data-tab="chats">
                            Todos
                        </button>
                        <button class="tab-btn tab-btn-right flex-1 py-2.5 text-sm font-medium" data-tab="grupos">
                            Solicitudes
                        </button>
                    </div>
                </div>

                <!-- Lista -->
                <div id="conversaciones-lista-desktop" class="flex-1 overflow-y-auto">
                    <!-- Se llena dinámicamente -->
                </div>
            </div>

            <!-- Panel derecho: Chat -->
            <div class="flex-1 flex flex-col">
                <div id="chat-desktop-empty" class="empty-state">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    <p class="text-lg font-medium">Selecciona una conversación</p>
                    <p class="text-sm">Elige un chat para comenzar a mensajear</p>
                </div>

                <div id="chat-desktop-view" class="hidden h-full flex flex-col">
                    <!-- Header -->
                    <div class="chat-header">
                        <img id="chat-avatar-desktop" src="" alt="Avatar" class="w-10 h-10 rounded-full">
                        <div class="flex-1">
                            <div id="chat-nombre-desktop" class=" text-white"></div>
                            <div id="chat-producto-desktop" class="text-xs text-gray-300"></div>
                        </div>
                    </div>

                    <!-- Mensajes -->
                    <div id="chat-mensajes-desktop" class="chat-messages flex-1">
                        <!-- Se llenan dinámicamente -->
                    </div>

                    <!-- Preview de imágenes -->
                    <div id="images-preview-desktop" class="images-preview-container" style="display: none;"></div>

                    <!-- Input -->
                    <div class="chat-input-container">
                        <button id="btn-adjuntar-desktop" class="btn-attach">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                        </button>
                        <button id="btn-emoji-desktop" class="btn-emoji">
                            <img src="/recursos/iconos/solido/interfaz/emoji.svg" alt="emoji">
                        </button>
                        <div id="emoji-picker-desktop" class="emoji-picker"></div>
                        <input type="file" id="input-imagen-desktop" accept="image/*" class="hidden">
                        <input type="text" id="input-mensaje-desktop" class="chat-input" placeholder="Escribe un mensaje...">
                        <button id="btn-enviar-desktop" class="btn-send rotate-90" disabled>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Lightbox para ver imágenes -->
    <div id="image-lightbox" class="image-lightbox" style="display: none;">
        <button id="lightbox-close" class="lightbox-close">×</button>
        <button id="lightbox-prev" class="lightbox-nav prev">‹</button>
        <div class="lightbox-content">
            <img id="lightbox-image" class="lightbox-image" src="" alt="">
        </div>
        <button id="lightbox-next" class="lightbox-nav next">›</button>
        <div id="lightbox-counter" class="lightbox-counter"></div>
    </div>

    <?php 
    include __DIR__ . '/componentes/menu.php';
    ?>

    <script>
        const baseURL = '<?= $baseURL ?>';
    </script>
    <script src="<?= $baseURL ?>js/mensajes.js"></script>
</body>
</html>