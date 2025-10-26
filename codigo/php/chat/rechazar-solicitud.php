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
    // Primero obtener el id del remitente
    $getSolicitud = $conn->prepare("
        SELECT id_remitente 
        FROM ChatSolicitud 
        WHERE id_solicitud = ? AND id_destinatario = ? AND estado = 'pendiente'
    ");
    $getSolicitud->bind_param('ii', $id_solicitud, $id_usuario);
    $getSolicitud->execute();
    $result = $getSolicitud->get_result();
    
    if ($result->num_rows === 0) {
        echo json_encode(['success' => false, 'error' => 'Solicitud no encontrada']);
        exit;
    }
    
    $solicitud = $result->fetch_assoc();
    $id_remitente = $solicitud['id_remitente'];
    
    // Actualizar solicitud
    $stmt = $conn->prepare("
        UPDATE ChatSolicitud 
        SET estado = 'rechazada', fecha_respuesta = NOW() 
        WHERE id_solicitud = ? AND id_destinatario = ? AND estado = 'pendiente'
    ");
    $stmt->bind_param('ii', $id_solicitud, $id_usuario);
    
    if ($stmt->execute() && $stmt->affected_rows > 0) {
        // Obtener el nombre del destinatario (quien rechazó)
        $getNombre = $conn->prepare("
            SELECT nombre_comp 
            FROM Usuario 
            WHERE id_usuario = ?
        ");
        $getNombre->bind_param('i', $id_usuario);
        $getNombre->execute();
        $resultNombre = $getNombre->get_result();
        $nombreDestinatario = $resultNombre->fetch_assoc()['nombre_comp'];

        // Crear notificación para el remitente
        $titulo = 'Solicitud rechazada';
        $descripcion = 'Tu solicitud de mensaje con ' . $nombreDestinatario . ' fue rechazada';
        $tipo = 'solicitud_rechazada';

        $notif = $conn->prepare("
            INSERT INTO Notificacion (tipo, titulo, descripcion, id_usuario, id_referencia) 
            VALUES (?, ?, ?, ?, ?)
        ");
        $notif->bind_param('sssii', $tipo, $titulo, $descripcion, $id_remitente, $id_solicitud);
        $notif->execute();
        
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