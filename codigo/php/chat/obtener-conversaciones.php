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
    $sql = "
        SELECT 
            c.id_conversacion,
            c.ultimo_mensaje,
            c.ultimo_mensaje_contenido,
            c.id_producto,
            
            -- Datos del otro usuario
            IF(c.id_usuario1 = ?, c.id_usuario2, c.id_usuario1) as id_otro_usuario,
            u.nombre_comp as nombre_otro_usuario,
            u.img_usuario as avatar_otro_usuario,
            
            -- Producto relacionado (si existe)
            p.nombre as nombre_producto,
            
            -- Contar mensajes sin leer
            (SELECT COUNT(*) 
             FROM ChatMensaje cm 
             WHERE cm.id_conversacion = c.id_conversacion 
             AND cm.id_emisor != ? 
             AND cm.leido = 0
             AND cm.eliminado = 0
            ) as mensajes_sin_leer,
            
            -- Último mensaje fue enviado por mí
            (SELECT id_emisor = ? 
             FROM ChatMensaje cm2 
             WHERE cm2.id_conversacion = c.id_conversacion 
             ORDER BY cm2.enviado_en DESC 
             LIMIT 1
            ) as yo_envie_ultimo
            
        FROM ChatConversacion c
        
        -- Join con el otro usuario
        LEFT JOIN Usuario u ON u.id_usuario = IF(c.id_usuario1 = ?, c.id_usuario2, c.id_usuario1)
        
        -- Join con producto (opcional)
        LEFT JOIN Producto p ON p.id_producto = c.id_producto
        
        WHERE (c.id_usuario1 = ? OR c.id_usuario2 = ?)
    ";
    
    // Si hay búsqueda, agregar filtro
    if (!empty($busqueda)) {
        $sql .= " AND u.nombre_comp LIKE ?";
    }
    
    $sql .= " ORDER BY c.ultimo_mensaje DESC";
    
    $stmt = $conn->prepare($sql);
    
    if (!empty($busqueda)) {
        $busqueda_param = "%{$busqueda}%";
        $stmt->bind_param('iiiiiiis', 
            $id_usuario, $id_usuario, $id_usuario, 
            $id_usuario, $id_usuario, $id_usuario,
            $id_usuario, $busqueda_param
        );
    } else {
        $stmt->bind_param('iiiiiii', 
            $id_usuario, $id_usuario, $id_usuario, 
            $id_usuario, $id_usuario, $id_usuario,
            $id_usuario
        );
    }
    
    $stmt->execute();
    $result = $stmt->get_result();
    
    $conversaciones = [];
    while ($row = $result->fetch_assoc()) {
        // Formatear tiempo relativo
        $tiempo = '';
        if ($row['ultimo_mensaje']) {
            $fecha = new DateTime($row['ultimo_mensaje']);
            $ahora = new DateTime();
            $diff = $ahora->diff($fecha);
            
            if ($diff->y > 0) {
                $tiempo = $fecha->format('d/m/Y');
            } elseif ($diff->m > 0) {
                $tiempo = $diff->m . ' mes' . ($diff->m > 1 ? 'es' : '');
            } elseif ($diff->d > 6) {
                $tiempo = intval($diff->d / 7) . ' sem';
            } elseif ($diff->d > 0) {
                $tiempo = $diff->d . 'd';
            } elseif ($diff->h > 0) {
                $tiempo = $diff->h . 'h';
            } elseif ($diff->i > 0) {
                $tiempo = $diff->i . 'min';
            } else {
                $tiempo = 'Ahora';
            }
        }
        
        $conversaciones[] = [
            'id_conversacion' => $row['id_conversacion'],
            'id_otro_usuario' => $row['id_otro_usuario'],
            'nombre' => $row['nombre_otro_usuario'],
            'avatar' => $row['avatar_otro_usuario'] ?: 'recursos/imagenes/default-avatar.jpg',
            'ultimo_mensaje' => $row['ultimo_mensaje_contenido'],
            'tiempo' => $tiempo,
            'mensajes_sin_leer' => intval($row['mensajes_sin_leer']),
            'yo_envie_ultimo' => (bool)$row['yo_envie_ultimo'],
            'producto' => $row['nombre_producto']
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