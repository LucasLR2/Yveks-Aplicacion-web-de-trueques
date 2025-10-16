<?php
$host = '127.0.0.1';
$db_name = 'dreva';
$username = 'root';
$password = 'root';
$port = 8889;

$conn = new mysqli($host, $username, $password, $db_name, $port);
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
$conn->set_charset("utf8");
?>
