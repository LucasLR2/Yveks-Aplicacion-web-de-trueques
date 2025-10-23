<?php
session_start();
header('Content-Type: application/json');

// Verificar autenticación
if (!isset($_SESSION['correo'])) {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
    exit();
}

try {
    require_once 'database.php';
    
    // Obtener el ID del usuario desde la sesión
    $correo = $_SESSION['correo'];
    $stmt = $conn->prepare("SELECT id_usuario, nombre_comp, img_usuario, ubicacion FROM Usuario WHERE correo = ?");
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $result = $stmt->get_result();
    $usuario = $result->fetch_assoc();
    $stmt->close();
    
    if (!$usuario) {
        echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
        exit();
    }
    
    $id_usuario = $usuario['id_usuario'];
    
    // Obtener productos del usuario
    $sqlProductos = "
        SELECT 
            p.id_producto,
            p.nombre,
            p.estado,
            p.categoria,
            p.descripcion,
            p.preferencias,
            p.f_publicacion,
            (SELECT url_imagen FROM ImagenProducto WHERE id_producto = p.id_producto LIMIT 1) as imagen,
            u.nombre as ubicacion_nombre,
            u.lat,
            u.lng
        FROM Producto p
        INNER JOIN Publica pub ON p.id_producto = pub.id_producto
        LEFT JOIN ubicacion u ON p.id_ubicacion = u.id
        WHERE pub.id_usuario = ?
        ORDER BY p.f_publicacion DESC
    ";
    
    $stmt = $conn->prepare($sqlProductos);
    $stmt->bind_param("i", $id_usuario);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $productos = [];
    while ($row = $result->fetch_assoc()) {
        // Calcular tiempo transcurrido
        $fechaPublicacion = new DateTime($row['f_publicacion']);
        $ahora = new DateTime();
        $diferencia = $ahora->diff($fechaPublicacion);
        
        if ($diferencia->days == 0) {
            if ($diferencia->h == 0) {
                $publicadoHace = $diferencia->i . ' minuto' . ($diferencia->i != 1 ? 's' : '');
            } else {
                $publicadoHace = $diferencia->h . ' hora' . ($diferencia->h != 1 ? 's' : '');
            }
        } else if ($diferencia->days == 1) {
            $publicadoHace = '1 día';
        } else {
            $publicadoHace = $diferencia->days . ' días';
        }
        
        // Ajustar ruta de imagen
        $imagen = $row['imagen'] ? '../' . $row['imagen'] : '../recursos/imagenes/default.jpg';
        
        $productos[] = [
            'id' => $row['id_producto'],
            'nombre' => $row['nombre'],
            'estado' => $row['estado'],
            'categoria' => $row['categoria'],
            'descripcion' => $row['descripcion'],
            'preferenciasIntercambio' => $row['preferencias'] ? explode(',', $row['preferencias']) : [],
            'imagen' => $imagen,
            'publicadoHace' => $publicadoHace,
            'ubicacion' => $row['ubicacion_nombre'] ?: 'Montevideo',
            'coordenadas' => [$row['lat'] ?: -34.9011, $row['lng'] ?: -56.1645]
        ];
    }
    $stmt->close();
    
    // Obtener reseñas del usuario (como receptor)
    $sqlResenas = "
        SELECT 
            v.puntuacion,
            v.comentario,
            v.fecha,
            u.nombre_comp as usuario_nombre,
            u.img_usuario
        FROM Valoracion v
        INNER JOIN Usuario u ON v.id_usuario_emisor = u.id_usuario
        WHERE v.id_usuario_receptor = ?
        ORDER BY v.fecha DESC
        LIMIT 20
    ";
    
    $stmt = $conn->prepare($sqlResenas);
    $stmt->bind_param("i", $id_usuario);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $resenas = [];
    while ($row = $result->fetch_assoc()) {
        // Formatear fecha
        $fecha = new DateTime($row['fecha']);
        $fechaFormateada = $fecha->format('d \d\e F \d\e Y');
        
        // Traducir mes al español
        $meses = [
            'January' => 'enero', 'February' => 'febrero', 'March' => 'marzo',
            'April' => 'abril', 'May' => 'mayo', 'June' => 'junio',
            'July' => 'julio', 'August' => 'agosto', 'September' => 'septiembre',
            'October' => 'octubre', 'November' => 'noviembre', 'December' => 'diciembre'
        ];
        foreach ($meses as $en => $es) {
            $fechaFormateada = str_replace($en, $es, $fechaFormateada);
        }
        
        // Avatar del usuario (usar imagen si existe, sino generar iniciales)
        $avatar = $row['img_usuario'] ? '../' . $row['img_usuario'] : '../recursos/iconos/avatar.svg';
        
        $resenas[] = [
            'usuario' => $row['usuario_nombre'],
            'avatar' => $avatar,
            'fecha' => $fechaFormateada,
            'calificacion' => (int)$row['puntuacion'],
            'comentario' => $row['comentario'] ?: 'Sin comentario'
        ];
    }
    $stmt->close();
    
    // Calcular calificación promedio
    $stmtPromedio = $conn->prepare("SELECT AVG(puntuacion) as promedio, COUNT(*) as total FROM Valoracion WHERE id_usuario_receptor = ?");
    $stmtPromedio->bind_param("i", $id_usuario);
    $stmtPromedio->execute();
    $resultPromedio = $stmtPromedio->get_result();
    $promedioData = $resultPromedio->fetch_assoc();
    $stmtPromedio->close();
    
    echo json_encode([
        'success' => true,
        'usuario' => [
            'nombre' => $usuario['nombre_comp'],
            'avatar' => $usuario['img_usuario'] ? '../' . $usuario['img_usuario'] : '../recursos/iconos/avatar.svg',
            'ubicacion' => $usuario['ubicacion'] ?: 'Montevideo, Uruguay',
            'reputacion' => round($promedioData['promedio'] ?: 0, 1),
            'totalResenas' => $promedioData['total']
        ],
        'productos' => $productos,
        'resenas' => $resenas
    ]);
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>
