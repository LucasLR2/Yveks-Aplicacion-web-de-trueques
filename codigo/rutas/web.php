<?php
// rutas/web.php

// Obtenemos la URL pedida
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Definimos las rutas
switch ($uri) {
    case '/':
        require_once __DIR__ . '/../app/controladores/InicioControlador.php';
        $controlador = new InicioControlador();
        $controlador->index();
        break;

    case '/iniciar-sesion':
        require_once __DIR__ . '/../app/controladores/UsuarioControlador.php';
        $controlador = new UsuarioControlador();
        $controlador->login();
        break;

    case '/cerrar-sesion':
        require_once __DIR__ . '/../app/controladores/UsuarioControlador.php';
        $controlador = new UsuarioControlador();
        $controlador->logout();
        break;

    case '/nuevo-producto':
        require_once __DIR__ . '/../app/controladores/ProductoControlador.php';
        $controlador = new ProductoControlador();
        $controlador->crear();
        break;

    default:
        http_response_code(404);
        echo "Página no encontrada (error 404)";
        break;
}
