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
$contenido = isset($_POST['contenido']) ? trim($_POST['contenido']) : '';

if ($id_conversacion <= 0) {
    echo json_encode(['success' => false, 'error' => 'Conversación inválida']);
    exit;
}

if (empty($contenido)) {
    echo json_encode(['success' => false, 'error' => 'El mensaje no puede estar vacío']);
    exit;
}

try {
    // Verificar acceso a la conversación
    $check = $conn->prepare("
        SELECT id_usuario1, id_usuario2 
        FROM ChatConversacion 
        WHERE id_conversacion = ? 
        AND (id_usuario1 = ? OR id_usuario2 = ?)
    ");
    $check->bind_param('iii', $id_conversacion, $id_usuario, $id_usuario);
    $check->execute();
    $conv = $check->get_result()->fetch_assoc();
    
    if (!$conv) {
        echo json_encode(['success' => false, 'error' => 'No tienes acceso a esta conversación']);
        exit;
    }
    
    // Insertar mensaje
    $insert = $conn->prepare("
        INSERT INTO ChatMensaje (id_conversacion, id_emisor, contenido, tipo_mensaje) 
        VALUES (?, ?, ?, 'texto')
    ");
    $insert->bind_param('iis', $id_conversacion, $id_usuario, $contenido);
    
    if (!$insert->execute()) {
        throw new Exception('Error al enviar mensaje');
    }
    
    $id_mensaje = $conn->insert_id;
    
    // Actualizar última mensaje de la conversación
    $update = $conn->prepare("
        UPDATE ChatConversacion 
        SET ultimo_mensaje = NOW(), 
            ultimo_mensaje_contenido = ? 
        WHERE id_conversacion = ?
    ");
    $update->bind_param('si', $contenido, $id_conversacion);
    $update->execute();
    
    // Determinar el receptor para crear notificación
    $id_receptor = ($conv['id_usuario1'] == $id_usuario) ? $conv['id_usuario2'] : $conv['id_usuario1'];
    
    // Crear notificación
    $notif = $conn->prepare("
        INSERT INTO Notificacion (tipo, titulo, descripcion, fecha, leida, id_usuario)
        VALUES ('mensaje', 'Nuevo mensaje', ?, NOW(), 0, ?)
    ");
    $notif_desc = substr($contenido, 0, 100);
    $notif->bind_param('si', $notif_desc, $id_receptor);
    $notif->execute();
    
    echo json_encode([
        'success' => true,
        'id_mensaje' => $id_mensaje,
        'enviado_en' => date('Y-m-d H:i:s')
    ]);
    
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>