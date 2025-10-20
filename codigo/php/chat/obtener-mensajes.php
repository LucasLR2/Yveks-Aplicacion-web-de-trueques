<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'error' => 'No hay sesión activa']);
    exit;
}

require_once '../database.php';

$id_usuario = $_SESSION['id'];
$id_conversacion = isset($_GET['id_conversacion']) ? intval($_GET['id_conversacion']) : 0;
$limite = isset($_GET['limite']) ? intval($_GET['limite']) : 50;
$antes_de = isset($_GET['antes_de']) ? intval($_GET['antes_de']) : null;

if ($id_conversacion <= 0) {
    echo json_encode(['success' => false, 'error' => 'Conversación inválida']);
    exit;
}

try {
    // Verificar que el usuario pertenece a esta conversación
    $check = $conn->prepare("
        SELECT 1 FROM ChatConversacion 
        WHERE id_conversacion = ? 
        AND (id_usuario1 = ? OR id_usuario2 = ?)
    ");
    $check->bind_param('iii', $id_conversacion, $id_usuario, $id_usuario);
    $check->execute();
    
    if ($check->get_result()->num_rows === 0) {
        echo json_encode(['success' => false, 'error' => 'No tienes acceso a esta conversación']);
        exit;
    }
    
    // Obtener mensajes
    $sql = "
        SELECT 
            cm.id_mensaje,
            cm.id_emisor,
            cm.contenido,
            cm.tipo_mensaje,
            cm.url_archivo,
            cm.enviado_en,
            cm.leido,
            cm.editado,
            cm.eliminado,
            u.nombre_comp as nombre_emisor,
            u.img_usuario as avatar_emisor
        FROM ChatMensaje cm
        JOIN Usuario u ON u.id_usuario = cm.id_emisor
        WHERE cm.id_conversacion = ?
        AND cm.eliminado = 0
    ";
    
    if ($antes_de) {
        $sql .= " AND cm.id_mensaje < ?";
    }
    
    $sql .= " ORDER BY cm.enviado_en DESC LIMIT ?";
    
    $stmt = $conn->prepare($sql);
    
    if ($antes_de) {
        $stmt->bind_param('iii', $id_conversacion, $antes_de, $limite);
    } else {
        $stmt->bind_param('ii', $id_conversacion, $limite);
    }
    
    $stmt->execute();
    $result = $stmt->get_result();
    
    $mensajes = [];
    while ($row = $result->fetch_assoc()) {
        $mensajes[] = [
            'id_mensaje' => $row['id_mensaje'],
            'id_emisor' => $row['id_emisor'],
            'contenido' => $row['contenido'],
            'tipo' => $row['tipo_mensaje'],
            'url_archivo' => $row['url_archivo'],
            'enviado_en' => $row['enviado_en'],
            'leido' => (bool)$row['leido'],
            'editado' => (bool)$row['editado'],
            'nombre_emisor' => $row['nombre_emisor'],
            'avatar_emisor' => $row['avatar_emisor'] ?: 'recursos/imagenes/default-avatar.jpg',
            'es_mio' => $row['id_emisor'] == $id_usuario
        ];
    }
    
    // Invertir para que estén en orden cronológico
    $mensajes = array_reverse($mensajes);
    
    echo json_encode([
        'success' => true,
        'mensajes' => $mensajes
    ]);
    
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>