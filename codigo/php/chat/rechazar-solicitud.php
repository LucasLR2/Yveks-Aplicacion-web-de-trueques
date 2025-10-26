<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'error' => 'No hay sesión activa']);
    exit;
}

require_once '../database.php';

$id_usuario = $_SESSION['id'];
$id_solicitud = isset($_POST['id_solicitud']) ? intval($_POST['id_solicitud']) : 0;

if ($id_solicitud <= 0) {
    echo json_encode(['success' => false, 'error' => 'Solicitud inválida']);
    exit;
}

try {
    $stmt = $conn->prepare("
        UPDATE ChatSolicitud 
        SET estado = 'rechazada', fecha_respuesta = NOW() 
        WHERE id_solicitud = ? AND id_destinatario = ? AND estado = 'pendiente'
    ");
    $stmt->bind_param('ii', $id_solicitud, $id_usuario);
    
    if ($stmt->execute() && $stmt->affected_rows > 0) {
        echo json_encode([
            'success' => true,
            'mensaje' => 'Solicitud rechazada'
        ]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Solicitud no encontrada']);
    }
    
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>