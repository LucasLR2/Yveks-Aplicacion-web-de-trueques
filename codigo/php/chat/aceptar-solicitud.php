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
    // Obtener datos de la solicitud
    $stmt = $conn->prepare("
        SELECT id_remitente, id_destinatario, id_producto 
        FROM ChatSolicitud 
        WHERE id_solicitud = ? AND id_destinatario = ? AND estado = 'pendiente'
    ");
    $stmt->bind_param('ii', $id_solicitud, $id_usuario);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        echo json_encode(['success' => false, 'error' => 'Solicitud no encontrada']);
        exit;
    }
    
    $solicitud = $result->fetch_assoc();
    $id_remitente = $solicitud['id_remitente'];
    $id_producto = $solicitud['id_producto'];
    
    // Crear conversación
    $usuario_menor = min($id_remitente, $id_usuario);
    $usuario_mayor = max($id_remitente, $id_usuario);
    
    // Verificar si ya existe conversación
    $checkConv = $conn->prepare("
        SELECT id_conversacion 
        FROM ChatConversacion 
        WHERE id_usuario1 = ? AND id_usuario2 = ?
    ");
    $checkConv->bind_param('ii', $usuario_menor, $usuario_mayor);
    $checkConv->execute();
    $resultConv = $checkConv->get_result();
    
    if ($resultConv->num_rows > 0) {
        $conv = $resultConv->fetch_assoc();
        $id_conversacion = $conv['id_conversacion'];
    } else {
        // Crear nueva conversación
        $insertConv = $conn->prepare("
            INSERT INTO ChatConversacion (id_usuario1, id_usuario2, id_producto) 
            VALUES (?, ?, ?)
        ");
        $insertConv->bind_param('iii', $usuario_menor, $usuario_mayor, $id_producto);
        $insertConv->execute();
        $id_conversacion = $conn->insert_id;
    }
    
    // Actualizar solicitud
    $update = $conn->prepare("
        UPDATE ChatSolicitud 
        SET estado = 'aceptada', fecha_respuesta = NOW() 
        WHERE id_solicitud = ?
    ");
    $update->bind_param('i', $id_solicitud);
    $update->execute();
    
    echo json_encode([
        'success' => true,
        'id_conversacion' => $id_conversacion,
        'mensaje' => 'Solicitud aceptada'
    ]);
    
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>