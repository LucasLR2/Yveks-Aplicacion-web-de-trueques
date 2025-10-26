<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'error' => 'No hay sesión activa']);
    exit;
}

require_once '../database.php';

$id_usuario = $_SESSION['id'];

try {
    $sql = "SELECT 
                s.id_solicitud,
                s.mensaje,
                s.fecha_creacion,
                s.id_producto,
                s.id_propuesta,
                u.id_usuario as id_remitente,
                u.nombre_comp as nombre_remitente,
                u.img_usuario as avatar_remitente,
                p.nombre as producto_nombre,
                (SELECT url_imagen FROM ImagenProducto WHERE id_producto = p.id_producto LIMIT 1) as producto_imagen,
                prop.titulo_oferta as oferta_titulo
            FROM ChatSolicitud s
            INNER JOIN Usuario u ON s.id_remitente = u.id_usuario
            LEFT JOIN Producto p ON s.id_producto = p.id_producto
            LEFT JOIN PropuestaIntercambio prop ON s.id_propuesta = prop.id_propuesta
            WHERE s.id_destinatario = ? 
            AND s.estado = 'pendiente'
            ORDER BY s.fecha_creacion DESC";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id_usuario);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $solicitudes = [];
    while ($row = $result->fetch_assoc()) {
        // Calcular tiempo transcurrido
        $fecha = new DateTime($row['fecha_creacion']);
        $ahora = new DateTime();
        $diferencia = $ahora->diff($fecha);
        
        if ($diferencia->days > 0) {
            $tiempo = $diferencia->days . 'd';
        } elseif ($diferencia->h > 0) {
            $tiempo = $diferencia->h . 'h';
        } elseif ($diferencia->i > 0) {
            $tiempo = $diferencia->i . 'm';
        } else {
            $tiempo = 'Ahora';
        }
        
        // Arreglar ruta del avatar
        if ($row['avatar_remitente']) {
            // Si ya tiene la ruta completa, solo agregar /
            if (strpos($row['avatar_remitente'], 'recursos/') === 0) {
                $avatar = '/' . $row['avatar_remitente'];
            } else {
                // Si es solo el nombre del archivo
                $avatar = '/recursos/imagenes/perfiles/' . $row['avatar_remitente'];
            }
        } else {
            $avatar = 'https://i.pravatar.cc/150?u=' . $row['id_remitente'];
        }
        
        // Arreglar ruta de imagen del producto
        $producto_imagen = $row['producto_imagen'] 
            ? '../' . $row['producto_imagen'] 
            : null;
        
        $solicitudes[] = [
            'id_solicitud' => $row['id_solicitud'],
            'id_remitente' => $row['id_remitente'],
            'nombre' => $row['nombre_remitente'],
            'avatar' => $avatar,
            'tiempo' => $tiempo,
            'producto' => $row['producto_nombre'],
            'producto_imagen' => $producto_imagen,
            'oferta_titulo' => $row['oferta_titulo']
        ];
    }
    
    echo json_encode([
        'success' => true,
        'solicitudes' => $solicitudes
    ]);
    
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>