<?php
// publico/index.php

// Activamos errores en desarrollo
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Cargamos la configuración base
require_once __DIR__ . '/../configuracion/base_datos.php';

// Iniciamos sesión globalmente
session_start();

// Cargamos el enrutador
require_once __DIR__ . '/../rutas/web.php';
