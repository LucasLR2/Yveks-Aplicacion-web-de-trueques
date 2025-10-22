<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'message' => 'No hay sesión activa']);
    exit;
}

require_once 'database.php';

$id_usuario = $_SESSION['id'];

try {
    $stmt = $conn->prepare("
        UPDATE Notificacion 
        SET leida = 1 
        WHERE id_usuario = ? AND leida = 0
    ");
    $stmt->bind_param('i', $id_usuario);
    $stmt->execute();
    
    $marcadas = $stmt->affected_rows;
    
    echo json_encode([
        'success' => true,
        'marcadas' => $marcadas,
        'message' => "Se marcaron $marcadas notificaciones como leídas"
    ]);
    
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>