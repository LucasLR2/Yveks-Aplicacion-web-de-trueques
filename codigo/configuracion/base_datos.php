<?php

try {
    $conexion = new PDO("mysql:host=localhost;dbname=dreva", "root", "");
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo "Conexión OK"; // opcional
} catch (PDOException $e) {
    die("Error en la conexión: " . $e->getMessage());
}
