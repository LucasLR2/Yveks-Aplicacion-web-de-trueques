<?php
$host = "db"; // Nombre del servicio MySQL en docker-compose
$db_name = "dreva";
$username = "root";
$password = "root"; // Contraseña configurada en docker-compose

$conn = new mysqli($host, $username, $password, $db_name);
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
$conn->set_charset("utf8");
?>
