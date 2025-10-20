<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'error' => 'No hay sesión activa']);
    exit;
}

require_once '../database.php';

$id_usuario = $_SESSION['id'];
$busqueda = isset($_GET['busqueda']) ? trim($_GET['busqueda']) : '';

try {
    $sql = "SELECT 
                c.id_conversacion,
                c.fecha_inicio,
                c.id_producto,
                p.nombre as producto,
                -- Obtener datos del otro usuario
                IF(c.id_usuario1 = ?, 
                   (SELECT nombre_comp FROM Usuario WHERE id_usuario = c.id_usuario2),
                   (SELECT nombre_comp FROM Usuario WHERE id_usuario = c.id_usuario1)
                ) as nombre,
                -- Avatar del otro usuario
                CONCAT('https://i.pravatar.cc/150?u=', 
                   IF(c.id_usuario1 = ?, c.id_usuario2, c.id_usuario1)
                ) as avatar,
                -- Último mensaje
                (SELECT cm.contenido 
                 FROM ChatMensaje cm 
                 WHERE cm.id_conversacion = c.id_conversacion 
                 ORDER BY cm.enviado_en DESC 
                 LIMIT 1) as ultimo_mensaje,
                -- Hora del último mensaje
                (SELECT TIME_FORMAT(cm.enviado_en, '%H:%i') 
                 FROM ChatMensaje cm 
                 WHERE cm.id_conversacion = c.id_conversacion 
                 ORDER BY cm.enviado_en DESC 
                 LIMIT 1) as tiempo,
                -- Mensajes sin leer
                (SELECT COUNT(*) 
                 FROM ChatMensaje cm 
                 WHERE cm.id_conversacion = c.id_conversacion 
                 AND cm.id_emisor != ? 
                 AND cm.leido = 0) as mensajes_sin_leer,
                -- Si el último mensaje lo envié yo
                (SELECT IF(cm.id_emisor = ?, 1, 0)
                 FROM ChatMensaje cm 
                 WHERE cm.id_conversacion = c.id_conversacion 
                 ORDER BY cm.enviado_en DESC 
                 LIMIT 1) as yo_envie_ultimo
            FROM ChatConversacion c
            LEFT JOIN Producto p ON c.id_producto = p.id_producto
            WHERE c.id_usuario1 = ? OR c.id_usuario2 = ?";
    
    $params = "iiiiii";
    $values = [$id_usuario, $id_usuario, $id_usuario, $id_usuario, $id_usuario, $id_usuario];
    
    if (!empty($busqueda)) {
        $sql .= " AND (
                    (c.id_usuario1 = ? AND (SELECT nombre_comp FROM Usuario WHERE id_usuario = c.id_usuario2) LIKE ?) OR
                    (c.id_usuario2 = ? AND (SELECT nombre_comp FROM Usuario WHERE id_usuario = c.id_usuario1) LIKE ?)
                  )";
        $params .= "isis";
        $values[] = $id_usuario;
        $values[] = "%$busqueda%";
        $values[] = $id_usuario;
        $values[] = "%$busqueda%";
    }
    
    $sql .= " ORDER BY (SELECT cm.enviado_en 
                        FROM ChatMensaje cm 
                        WHERE cm.id_conversacion = c.id_conversacion 
                        ORDER BY cm.enviado_en DESC 
                        LIMIT 1) DESC";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param($params, ...$values);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $conversaciones = [];
    while ($row = $result->fetch_assoc()) {
        $conversaciones[] = [
            'id_conversacion' => $row['id_conversacion'],
            'nombre' => $row['nombre'],
            'avatar' => $row['avatar'],
            'ultimo_mensaje' => $row['ultimo_mensaje'],
            'tiempo' => $row['tiempo'] ?: '',
            'mensajes_sin_leer' => intval($row['mensajes_sin_leer']),
            'yo_envie_ultimo' => (bool)$row['yo_envie_ultimo'],
            'producto' => $row['producto']
        ];
    }
    
    echo json_encode([
        'success' => true,
        'conversaciones' => $conversaciones
    ]);
    
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>