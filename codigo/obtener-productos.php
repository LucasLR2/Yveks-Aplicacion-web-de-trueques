<?php
// =============================
// obtener-productos.php
// Obtener productos desde la base de datos
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
                p.categoria,
                p.descripcion,
                p.preferencias,
                p.f_publicacion,
                u.id_usuario as vendedor_id,
                u.nombre_comp as vendedor_nombre,
                u.img_usuario as vendedor_avatar,
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
            if ($diff->i == 0) {
                $publicadoHace = "Ahora";
            } else {
                $publicadoHace = $diff->i . " minuto" . ($diff->i > 1 ? "s" : "");
            }
            } else {
            $publicadoHace = $diff->h . " hora" . ($diff->h > 1 ? "s" : "");
            }
        } elseif ($diff->days == 1) {
            $publicadoHace = "1 día";
        } elseif ($diff->days < 7) {
            $publicadoHace = $diff->days . " día" . ($diff->days > 1 ? "s" : "");
        } elseif ($diff->days < 30) {
            $semanas = floor($diff->days / 7);
            $publicadoHace = $semanas . " semana" . ($semanas > 1 ? "s" : "");
        } else {
            $meses = floor($diff->days / 30);
            $publicadoHace = $meses . " mes" . ($meses > 1 ? "es" : "");
        }
        
        // Obtener calificación y reseñas del vendedor desde la tabla Valoracion
        $vendedor_id = $row['vendedor_id'];
        
        // Calcular calificación promedio y cantidad de reseñas del vendedor
        $sqlVendedor = "SELECT 
                          AVG(puntuacion) as calificacion_promedio, 
                          COUNT(*) as total_resenas 
                        FROM Valoracion 
                        WHERE id_usuario_receptor = ?";
        $stmtVendedor = $conn->prepare($sqlVendedor);
        $stmtVendedor->bind_param('i', $vendedor_id);
        $stmtVendedor->execute();
        $datosVendedor = $stmtVendedor->get_result()->fetch_assoc();
        
        // Contar ventas (total de productos publicados por el vendedor)
        $sqlVentas = "SELECT COUNT(*) as total_ventas 
                      FROM Publica 
                      WHERE id_usuario = ?";
        $stmtVentas = $conn->prepare($sqlVentas);
        $stmtVentas->bind_param('i', $vendedor_id);
        $stmtVentas->execute();
        $ventas = $stmtVentas->get_result()->fetch_assoc();
        
        // Convertir preferencias de string a array
        $preferenciasArray = !empty($row['preferencias']) ? explode(',', $row['preferencias']) : [];
        
        $producto = [
            'id' => (int)$row['id'],
            'nombre' => $row['nombre'],
            'estado' => $row['estado'],
            'calificacion' => round((float)$datosVendedor['calificacion_promedio'], 1) ?: 0,
            'resenas' => (int)$datosVendedor['total_resenas'] ?: 0,
            'imagenes' => [['imagen' => $row['url_imagen'] ?: 'recursos/imagenes/default.jpg']],
            'categoria' => $row['categoria'],
            'publicadoHace' => $publicadoHace,
            'vendedor' => [
                'nombre' => $row['vendedor_nombre'],
                'avatar' => $row['vendedor_avatar'] ?: 'recursos/avatars/default.jpg'
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
        $stmtVendedor->close();
        $stmtVentas->close();
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