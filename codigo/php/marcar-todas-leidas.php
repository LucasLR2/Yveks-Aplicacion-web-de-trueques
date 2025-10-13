<?php
session_start();
header('Content-Type: application/json');

// Verificar sesión
if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'error' => 'No hay sesión activa']);
    exit;
}

$id_usuario = $_SESSION['id'];

// Conexión a la base de datos
$host = 'localhost';
$dbname = 'dreva';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Actualizar todas las notificaciones del usuario
    $stmt = $pdo->prepare("
        UPDATE Notificacion 
        SET leida = 1 
        WHERE id_usuario = ? AND leida = 0
    ");
    $stmt->execute([$id_usuario]);
    
    echo json_encode(['success' => true]);
    
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Error de base de datos: ' . $e->getMessage()]);
}
?>