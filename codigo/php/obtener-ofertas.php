<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['correo'])) {
    echo json_encode(['success' => false, 'message' => 'No hay sesión activa']);
    exit();
}

require_once 'database.php';

try {
    // Obtener ID del usuario actual
    $correo = $_SESSION['correo'];
    $stmt = $conn->prepare("SELECT id_usuario, nombre_comp, img_usuario FROM Usuario WHERE correo = ?");
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $result = $stmt->get_result();
    $usuario_actual = $result->fetch_assoc();
    
    if (!$usuario_actual) {
        throw new Exception("Usuario no encontrado");
    }
    
    $id_usuario_actual = $usuario_actual['id_usuario'];
    
    // Determinar qué tipo de ofertas obtener
    $tipo = isset($_GET['tipo']) ? $_GET['tipo'] : 'recibidas';
    
    $ofertas = [];
    
    if ($tipo === 'recibidas') {
        // OFERTAS RECIBIDAS: Ofertas que otros hicieron por MIS productos
        $query = "SELECT 
                    pi.id_propuesta,
                    pi.titulo_oferta,
                    pi.descripcion_oferta,
                    pi.estado_producto_oferta,
                    pi.imagenes_oferta,
                    pi.estado,
                    pi.fecha,
                    p.id_producto,
                    p.nombre as producto_solicitado,
                    u.id_usuario as id_oferente,
                    u.nombre_comp as nombre_oferente,
                    u.img_usuario as avatar_oferente,
                    (SELECT url_imagen FROM ImagenProducto WHERE id_producto = p.id_producto LIMIT 1) as imagen_producto,
                    (SELECT COALESCE(ROUND(AVG(v2.puntuacion), 1), 0) 
                     FROM Valoracion v2 
                     WHERE v2.id_usuario_receptor = u.id_usuario) as rating,
                    (SELECT COUNT(v2.id_valoracion) 
                     FROM Valoracion v2 
                     WHERE v2.id_usuario_receptor = u.id_usuario) as reviews
                  FROM PropuestaIntercambio pi
                  INNER JOIN Producto p ON pi.id_prod_solicitado = p.id_producto
                  INNER JOIN Publica pub ON p.id_producto = pub.id_producto
                  INNER JOIN Usuario u ON pi.id_usuario = u.id_usuario
                  WHERE pub.id_usuario = ? AND pi.id_usuario != ?
                  ORDER BY pi.fecha DESC";
        
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ii", $id_usuario_actual, $id_usuario_actual);
        
    } else {
        // OFERTAS HECHAS: Ofertas que YO hice por productos de otros
        $query = "SELECT 
                    pi.id_propuesta,
                    pi.titulo_oferta,
                    pi.descripcion_oferta,
                    pi.estado_producto_oferta,
                    pi.imagenes_oferta,
                    pi.estado,
                    pi.fecha,
                    p.id_producto,
                    p.nombre as producto_solicitado,
                    u.id_usuario as id_dueno,
                    u.nombre_comp as nombre_dueno,
                    u.img_usuario as avatar_dueno,
                    (SELECT url_imagen FROM ImagenProducto WHERE id_producto = p.id_producto LIMIT 1) as imagen_producto,
                    (SELECT COALESCE(ROUND(AVG(v2.puntuacion), 1), 0) 
                     FROM Valoracion v2 
                     WHERE v2.id_usuario_receptor = u.id_usuario) as rating,
                    (SELECT COUNT(v2.id_valoracion) 
                     FROM Valoracion v2 
                     WHERE v2.id_usuario_receptor = u.id_usuario) as reviews
                  FROM PropuestaIntercambio pi
                  INNER JOIN Producto p ON pi.id_prod_solicitado = p.id_producto
                  INNER JOIN Publica pub ON p.id_producto = pub.id_producto
                  INNER JOIN Usuario u ON pub.id_usuario = u.id_usuario
                  WHERE pi.id_usuario = ?
                  ORDER BY pi.fecha DESC";
        
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $id_usuario_actual);
    }
    
    $stmt->execute();
    $result = $stmt->get_result();
    
    while ($row = $result->fetch_assoc()) {
        // Decodificar JSON de imágenes
        $imagenes = json_decode($row['imagenes_oferta'], true);
        
        // Calcular tiempo transcurrido
        $fecha = new DateTime($row['fecha']);
        $ahora = new DateTime();
        $diferencia = $ahora->diff($fecha);
        
        if ($diferencia->days > 0) {
            $tiempo = $diferencia->days . ' día' . ($diferencia->days > 1 ? 's' : '');
        } elseif ($diferencia->h > 0) {
            $tiempo = $diferencia->h . ' hora' . ($diferencia->h > 1 ? 's' : '');
        } elseif ($diferencia->i > 0) {
            $tiempo = $diferencia->i . ' minuto' . ($diferencia->i > 1 ? 's' : '');
        } else {
            $tiempo = 'Justo ahora';
        }
        
        $oferta = [
            'id_propuesta' => $row['id_propuesta'],
            'titulo' => $row['titulo_oferta'],
            'descripcion' => $row['descripcion_oferta'],
            'estado_producto' => $row['estado_producto_oferta'],
            'imagenes' => $imagenes,
            'estado' => $row['estado'],
            'fecha' => $row['fecha'],
            'tiempo' => $tiempo,
            'producto_solicitado' => $row['producto_solicitado'],
            'imagen_producto' => $row['imagen_producto'],
            'rating' => $row['rating'] > 0 ? $row['rating'] : null,
            'reviews' => $row['reviews'],
            'id_prod_solicitado' => $row['id_producto']  // AGREGAR ESTA LÍNEA
        ];
        
        if ($tipo === 'recibidas') {
            $oferta['oferente'] = [
                'id' => $row['id_oferente'],
                'nombre' => $row['nombre_oferente'],
                'avatar' => $row['avatar_oferente'] ?: 'recursos/iconos/avatar.svg'
            ];
        } else {
            $oferta['dueno'] = [
                'id' => $row['id_dueno'],
                'nombre' => $row['nombre_dueno'],
                'avatar' => $row['avatar_dueno'] ?: 'recursos/iconos/avatar.svg'
            ];
        }
        
        $ofertas[] = $oferta;
    }
    
    echo json_encode([
        'success' => true,
        'ofertas' => $ofertas,
        'tipo' => $tipo
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

$conn->close();
?>