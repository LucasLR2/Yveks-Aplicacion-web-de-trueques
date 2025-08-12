<?php
$host = "localhost";
$db_name = "intercambio";
$username = "root";
$password = ""; // Cambia según tu configuración
    
try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $exception){
    die("Error de conexión: " . $exception->getMessage());
}
?>
