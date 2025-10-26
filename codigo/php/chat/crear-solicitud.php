<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'error' => 'No hay sesión activa']);
    exit;
}

require_once '../database.php';

$id_remitente = $_SESSION['id'];
$id_destinatario = isset($_POST['id_destinatario']) ? intval($_POST['id_destinatario']) : 0;
$id_producto = isset($_POST['id_producto']) ? intval($_POST['id_producto']) : 0;
$id_propuesta = isset($_POST['id_propuesta']) ? intval($_POST['id_propuesta']) : null;
$mensaje = isset($_POST['mensaje']) ? trim($_POST['mensaje']) : '';

if ($id_destinatario <= 0) {
    echo json_encode(['success' => false, 'error' => 'Destinatario inválido']);
    exit;
}

if ($id_remitente === $id_destinatario) {
    echo json_encode(['success' => false, 'error' => 'No puedes enviarte una solicitud a ti mismo']);
    exit;
}

if (empty($mensaje)) {
    echo json_encode(['success' => false, 'error' => 'El mensaje no puede estar vacío']);
    exit;
}

try {
    // Verificar si ya existe una solicitud pendiente
    $check = $conn->prepare("
        SELECT id_solicitud 
        FROM ChatSolicitud 
        WHERE id_remitente = ? 
        AND id_destinatario = ? 
        AND estado = 'pendiente'
    ");
    $check->bind_param('ii', $id_remitente, $id_destinatario);
    $check->execute();
    $result = $check->get_result();
    
    if ($result->num_rows > 0) {
        echo json_encode(['success' => false, 'error' => 'Ya existe una solicitud pendiente']);
        exit;
    }
    
    // Verificar si ya existe una conversación activa
    $usuario_menor = min($id_remitente, $id_destinatario);
    $usuario_mayor = max($id_remitente, $id_destinatario);
    
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
        echo json_encode([
            'success' => true,
            'existe_conversacion' => true,
            'id_conversacion' => $conv['id_conversacion']
        ]);
        exit;
    }
    
    // Crear solicitud
    if ($id_producto) {
        $stmt = $conn->prepare("
            INSERT INTO ChatSolicitud (id_remitente, id_destinatario, id_producto, id_propuesta, mensaje) 
            VALUES (?, ?, ?, ?, ?)
        ");
        $stmt->bind_param('iiiis', $id_remitente, $id_destinatario, $id_producto, $id_propuesta, $mensaje);
    } else {
        $stmt = $conn->prepare("
            INSERT INTO ChatSolicitud (id_remitente, id_destinatario, id_propuesta, mensaje) 
            VALUES (?, ?, ?, ?)
        ");
        $stmt->bind_param('iiis', $id_remitente, $id_destinatario, $id_propuesta, $mensaje);
    }
    
    if ($stmt->execute()) {
        // Crear notificación
        $titulo = 'Nueva solicitud de chat';
        $descripcion = 'Tienes una nueva solicitud de mensaje';
        $tipo = 'solicitud_chat';
        $id_referencia = $conn->insert_id;
        
        $notif = $conn->prepare("
            INSERT INTO Notificacion (tipo, titulo, descripcion, id_usuario, id_referencia) 
            VALUES (?, ?, ?, ?, ?)
        ");
        $notif->bind_param('sssii', $tipo, $titulo, $descripcion, $id_destinatario, $id_referencia);
        $notif->execute();
        
        echo json_encode([
            'success' => true,
            'id_solicitud' => $conn->insert_id,
            'mensaje' => 'Solicitud enviada correctamente'
        ]);
    } else {
        throw new Exception('Error al crear solicitud');
    }
    
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>