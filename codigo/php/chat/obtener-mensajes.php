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

if ($id_conversacion <= 0) {
    echo json_encode(['success' => false, 'error' => 'Conversación inválida']);
    exit;
}

try {
    // Verificar que el usuario participa en la conversación
    $stmt = $conn->prepare("
        SELECT COUNT(*) as count 
        FROM ChatConversacion 
        WHERE id_conversacion = ? 
        AND (id_usuario1 = ? OR id_usuario2 = ?)
    ");
    $stmt->bind_param('iii', $id_conversacion, $id_usuario, $id_usuario);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    
    if ($result['count'] == 0) {
        echo json_encode(['success' => false, 'error' => 'No autorizado']);
        exit;
    }
    
    // Obtener mensajes
    $sql = "SELECT 
                m.id_mensaje as id,
                m.contenido,
                m.imagenes,
                m.tipo_mensaje,
                m.enviado_en,
                IF(m.id_emisor = ?, 1, 0) as es_mio
            FROM ChatMensaje m
            WHERE m.id_conversacion = ?
            ORDER BY m.enviado_en ASC";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $id_usuario, $id_conversacion);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $mensajes = [];
    while ($row = $result->fetch_assoc()) {
        $mensajes[] = [
            'id' => $row['id'],
            'contenido' => $row['contenido'],
            'imagenes' => $row['imagenes'] ? json_decode($row['imagenes'], true) : null,
            'tipo_mensaje' => $row['tipo_mensaje'],
            'enviado_en' => $row['enviado_en'],
            'es_mio' => (bool)$row['es_mio']
        ];
    }
    
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