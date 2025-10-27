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
        m.eliminado_para_todos,
        m.eliminado_para_usuario,
        m.id_emisor,
        IFNULL(m.editado, 0) as editado,
        m.editado_en,
        m.responde_a,
        m.responde_a_contenido,
        m.responde_a_nombre,
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
    // Verificar si está eliminado
    $eliminado = $row['eliminado_para_todos'] || $row['eliminado_para_usuario'] == $id_usuario;
    
    $mensajes[] = [
        'id' => $row['id'],
        'contenido' => $row['contenido'],
        'imagenes' => $row['imagenes'] ? json_decode($row['imagenes'], true) : null,
        'tipo_mensaje' => $row['tipo_mensaje'],
        'enviado_en' => $row['enviado_en'],
        'es_mio' => (bool)$row['es_mio'],
        'eliminado' => $eliminado,
        'eliminado_para_todos' => (bool)$row['eliminado_para_todos'],
        'id_emisor' => $row['id_emisor'],
        'editado' => (bool)$row['editado'],
        'responde_a' => $row['responde_a'],
        'responde_a_contenido' => $row['responde_a_contenido'],
        'responde_a_nombre' => $row['responde_a_nombre']
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