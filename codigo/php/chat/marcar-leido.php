<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'error' => 'No hay sesión activa']);
    exit;
}

require_once '../database.php';

$id_usuario = $_SESSION['id'];
$id_conversacion = isset($_POST['id_conversacion']) ? intval($_POST['id_conversacion']) : 0;

if ($id_conversacion <= 0) {
    echo json_encode(['success' => false, 'error' => 'Conversación inválida']);
    exit;
}

try {
    // Marcar como leídos todos los mensajes de la conversación que no son míos
    $stmt = $conn->prepare("
        UPDATE ChatMensaje 
        SET leido = 1, leido_en = NOW() 
        WHERE id_conversacion = ? 
        AND id_emisor != ? 
        AND leido = 0
    ");
    $stmt->bind_param('ii', $id_conversacion, $id_usuario);
    $stmt->execute();
    
    echo json_encode([
        'success' => true,
        'mensajes_marcados' => $stmt->affected_rows
    ]);
    
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>