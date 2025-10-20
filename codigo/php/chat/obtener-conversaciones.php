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
                (SELECT u.nombre_comp 
                 FROM Participa pa2 
                 JOIN Usuario u ON pa2.id_usuario = u.id_usuario 
                 WHERE pa2.id_conversacion = c.id_conversacion 
                 AND pa2.id_usuario != ? 
                 LIMIT 1) as nombre,
                -- Avatar del otro usuario
                CONCAT('https://i.pravatar.cc/150?u=', 
                    (SELECT pa2.id_usuario 
                     FROM Participa pa2 
                     WHERE pa2.id_conversacion = c.id_conversacion 
                     AND pa2.id_usuario != ? 
                     LIMIT 1)) as avatar,
                -- Último mensaje
                (SELECT m.contenido 
                 FROM Mensaje m 
                 WHERE m.id_conversacion = c.id_conversacion 
                 ORDER BY m.f_envio DESC 
                 LIMIT 1) as ultimo_mensaje,
                -- Hora del último mensaje
                (SELECT TIME_FORMAT(m.f_envio, '%H:%i') 
                 FROM Mensaje m 
                 WHERE m.id_conversacion = c.id_conversacion 
                 ORDER BY m.f_envio DESC 
                 LIMIT 1) as tiempo,
                -- Mensajes sin leer
                (SELECT COUNT(*) 
                 FROM Mensaje m 
                 WHERE m.id_conversacion = c.id_conversacion 
                 AND m.id_receptor = ? 
                 AND m.id_mensaje > COALESCE(pa.ultimo_mensaje_leido, 0)) as mensajes_sin_leer,
                -- Si el último mensaje lo envié yo
                (SELECT IF(m.id_emisor = ?, 1, 0)
                 FROM Mensaje m 
                 WHERE m.id_conversacion = c.id_conversacion 
                 ORDER BY m.f_envio DESC 
                 LIMIT 1) as yo_envie_ultimo
            FROM Conversacion c
            JOIN Participa pa ON c.id_conversacion = pa.id_conversacion
            LEFT JOIN Producto p ON c.id_producto = p.id_producto
            WHERE pa.id_usuario = ?";
    
    $params = "iiiii";
    $values = [$id_usuario, $id_usuario, $id_usuario, $id_usuario, $id_usuario];
    
    if (!empty($busqueda)) {
        $sql .= " AND (SELECT u.nombre_comp 
                       FROM Participa pa2 
                       JOIN Usuario u ON pa2.id_usuario = u.id_usuario 
                       WHERE pa2.id_conversacion = c.id_conversacion 
                       AND pa2.id_usuario != ? 
                       LIMIT 1) LIKE ?";
        $params .= "is";
        $values[] = $id_usuario;
        $values[] = "%$busqueda%";
    }
    
    $sql .= " ORDER BY (SELECT m.f_envio 
                        FROM Mensaje m 
                        WHERE m.id_conversacion = c.id_conversacion 
                        ORDER BY m.f_envio DESC 
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