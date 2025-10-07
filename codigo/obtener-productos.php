<?php
// =============================
// obtener-productos.php
// API para obtener productos desde la base de datos
// Reemplaza los datos estáticos del JavaScript
// =============================

header('Content-Type: application/json');
require 'php/database.php';

try {
    // Consulta para obtener productos con información del vendedor y ubicación
    $sql = "SELECT 
                p.id_producto as id,
                p.nombre,
                p.estado,
                p.calificacion,
                p.resenas,
                p.categoria,
                p.descripcion,
                p.preferencias,
                p.f_publicacion,
                u.nombre_comp as vendedor_nombre,
                ub.nombre as ubicacion_nombre,
                ub.lat as coordenadas_lat,
                ub.lng as coordenadas_lng,
                ip.url_imagen
            FROM Producto p
            INNER JOIN Publica pu ON p.id_producto = pu.id_producto
            INNER JOIN Usuario u ON pu.id_usuario = u.id_usuario
            LEFT JOIN ubicacion ub ON p.id_ubicacion = ub.id
            LEFT JOIN ImagenProducto ip ON p.id_producto = ip.id_producto
            ORDER BY p.f_publicacion DESC";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $productos = [];
    
    while ($row = $result->fetch_assoc()) {
        // Calcular "publicado hace" basado en la fecha de publicación
        $fechaPublicacion = new DateTime($row['f_publicacion']);
        $ahora = new DateTime();
        $diff = $ahora->diff($fechaPublicacion);
        
        if ($diff->days == 0) {
            if ($diff->h == 0) {
                $publicadoHace = $diff->i . " minutos";
            } else {
                $publicadoHace = $diff->h . " horas";
            }
        } elseif ($diff->days == 1) {
            $publicadoHace = "1 día";
        } elseif ($diff->days < 7) {
            $publicadoHace = $diff->days . " días";
        } elseif ($diff->days < 30) {
            $semanas = floor($diff->days / 7);
            $publicadoHace = $semanas . " semana" . ($semanas > 1 ? "s" : "");
        } else {
            $meses = floor($diff->days / 30);
            $publicadoHace = $meses . " mes" . ($meses > 1 ? "es" : "");
        }
        
        // Calcular reputación del vendedor (promedio de valoraciones recibidas)
        $sqlReputacion = "SELECT AVG(puntuacion) as reputacion, COUNT(*) as total_ventas 
                         FROM Valoracion 
                         WHERE id_usuario_receptor = (SELECT id_usuario FROM Publica WHERE id_producto = ?)";
        $stmtRep = $conn->prepare($sqlReputacion);
        $stmtRep->bind_param('i', $row['id']);
        $stmtRep->execute();
        $reputacion = $stmtRep->get_result()->fetch_assoc();
        
        // Convertir preferencias de string a array
        $preferenciasArray = !empty($row['preferencias']) ? explode(',', $row['preferencias']) : [];
        
        $producto = [
            'id' => (int)$row['id'],
            'nombre' => $row['nombre'],
            'estado' => $row['estado'],
            'calificacion' => (float)$row['calificacion'],
            'resenas' => (int)$row['resenas'],
            'imagenes' => [['imagen' => $row['url_imagen'] ?: 'recursos/imagenes/default.jpg']],
            'categoria' => $row['categoria'],
            'publicadoHace' => $publicadoHace,
            'vendedor' => [
                'nombre' => $row['vendedor_nombre'],
                'reputacion' => round((float)$reputacion['reputacion'], 1) ?: 0,
                'ventas' => (int)$reputacion['total_ventas'] ?: 0,
                'avatar' => 'recursos/avatars/default.jpg' // Placeholder por ahora
            ],
            'ubicacion' => $row['ubicacion_nombre'] ?: 'Montevideo',
            'coordenadas' => [
                (float)$row['coordenadas_lat'] ?: -34.9011,
                (float)$row['coordenadas_lng'] ?: -56.1645
            ],
            'descripcion' => $row['descripcion'],
            'preferenciasIntercambio' => $preferenciasArray
        ];
        
        $productos[] = $producto;
        $stmtRep->close();
    }
    
    echo json_encode([
        'success' => true,
        'productos' => $productos,
        'total' => count($productos)
    ]);
    
    $stmt->close();
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al obtener productos: ' . $e->getMessage()
    ]);
}

$conn->close();
?>