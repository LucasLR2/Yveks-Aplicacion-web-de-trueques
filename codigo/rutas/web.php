<?php
// rutas/web.php

// Obtener la ruta solicitada
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Ajustar según la carpeta donde está el proyecto
// Cambiar '/proyecto-trueques/publico' por tu ruta real si es diferente
$base = '/Yveks-Aplicacion-web-de-trueques/codigo/publico/';
$uri = str_replace($base, '', $uri);

// Normalizar: si queda vacío, asignar '/'
if ($uri === '') {
    $uri = '/';
}

// Definir rutas
switch ($uri) {
    case '/':
    case '/inicio':
        require __DIR__ . '/../app/controladores/InicioControlador.php';
        $controlador = new InicioControlador();
        $controlador->index();
        break;

    case '/login':
        // A futuro: cargar UsuarioControlador->login()
        echo "Pantalla de login";
        break;

    default:
        http_response_code(404);
        echo "Página no encontrada";
        break;
}
