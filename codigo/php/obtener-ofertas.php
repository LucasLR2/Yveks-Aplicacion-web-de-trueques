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
    $stmt = $conn->prepare("SELECT id_usuario FROM Usuario WHERE correo = ?");
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
    
    // Obtener ofertas RECIBIDAS (donde el usuario es dueño del producto solicitado)
    $sqlRecibidas = "
        SELECT 
            pi.id_propuesta,
            pi.estado,
            pi.fecha,
            p_solicitado.id_producto as id_producto_solicitado,
            p_solicitado.nombre as nombre_solicitado,
            p_solicitado.estado as condicion_solicitado,
            p_ofrecido.id_producto as id_producto_ofrecido,
            p_ofrecido.nombre as nombre_ofrecido,
            p_ofrecido.estado as condicion_ofrecido,
            u_oferente.id_usuario as id_oferente,
            u_oferente.nombre_comp as nombre_oferente,
            (SELECT url_imagen FROM ImagenProducto WHERE id_producto = p_solicitado.id_producto LIMIT 1) as imagen_solicitado,
            (SELECT url_imagen FROM ImagenProducto WHERE id_producto = p_ofrecido.id_producto LIMIT 1) as imagen_ofrecido
        FROM PropuestaIntercambio pi
        INNER JOIN Producto p_solicitado ON pi.id_prod_solicitado = p_solicitado.id_producto
        INNER JOIN Producto p_ofrecido ON pi.id_prod_ofrecido = p_ofrecido.id_producto
        INNER JOIN Publica pub_solicitado ON p_solicitado.id_producto = pub_solicitado.id_producto
        INNER JOIN Publica pub_ofrecido ON p_ofrecido.id_producto = pub_ofrecido.id_producto
        INNER JOIN Usuario u_oferente ON pub_ofrecido.id_usuario = u_oferente.id_usuario
        WHERE pub_solicitado.id_usuario = ?
        AND pi.id_usuario = u_oferente.id_usuario
        ORDER BY pi.fecha DESC
    ";
    
    $stmt = $conn->prepare($sqlRecibidas);
    $stmt->bind_param("i", $id_usuario);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $recibidas = [];
    while ($row = $result->fetch_assoc()) {
        // Ajustar ruta de imagen (agregar ../ porque estamos en php/)
        $imagenSolicitado = $row['imagen_solicitado'] ? '../' . $row['imagen_solicitado'] : '../recursos/imagenes/default.jpg';
        $imagenOfrecido = $row['imagen_ofrecido'] ? '../' . $row['imagen_ofrecido'] : '../recursos/imagenes/default.jpg';
        
        $recibidas[] = [
            'id' => $row['id_propuesta'],
            'productId' => $row['id_producto_solicitado'],
            'product' => $row['nombre_solicitado'],
            'condition' => $row['condicion_solicitado'],
            'productImage' => $imagenSolicitado,
            'offeredProductId' => $row['id_producto_ofrecido'],
            'offeredProduct' => $row['nombre_ofrecido'],
            'offeredProductImage' => $imagenOfrecido,
            'buyerId' => $row['id_oferente'],
            'buyer' => $row['nombre_oferente'],
            'buyerAvatar' => strtoupper(substr($row['nombre_oferente'], 0, 2)),
            'status' => $row['estado'],
            'date' => $row['fecha']
        ];
    }
    $stmt->close();
    
    // Obtener ofertas HECHAS (donde el usuario es quien hace la oferta)
    $sqlHechas = "
        SELECT 
            pi.id_propuesta,
            pi.estado,
            pi.fecha,
            p_solicitado.id_producto as id_producto_solicitado,
            p_solicitado.nombre as nombre_solicitado,
            p_solicitado.estado as condicion_solicitado,
            p_ofrecido.id_producto as id_producto_ofrecido,
            p_ofrecido.nombre as nombre_ofrecido,
            p_ofrecido.estado as condicion_ofrecido,
            u_dueno.id_usuario as id_dueno,
            u_dueno.nombre_comp as nombre_dueno,
            (SELECT url_imagen FROM ImagenProducto WHERE id_producto = p_solicitado.id_producto LIMIT 1) as imagen_solicitado,
            (SELECT url_imagen FROM ImagenProducto WHERE id_producto = p_ofrecido.id_producto LIMIT 1) as imagen_ofrecido
        FROM PropuestaIntercambio pi
        INNER JOIN Producto p_solicitado ON pi.id_prod_solicitado = p_solicitado.id_producto
        INNER JOIN Producto p_ofrecido ON pi.id_prod_ofrecido = p_ofrecido.id_producto
        INNER JOIN Publica pub_solicitado ON p_solicitado.id_producto = pub_solicitado.id_producto
        INNER JOIN Publica pub_ofrecido ON p_ofrecido.id_producto = pub_ofrecido.id_producto
        INNER JOIN Usuario u_dueno ON pub_solicitado.id_usuario = u_dueno.id_usuario
        WHERE pub_ofrecido.id_usuario = ?
        AND pi.id_usuario = ?
        ORDER BY pi.fecha DESC
    ";
    
    $stmt = $conn->prepare($sqlHechas);
    $stmt->bind_param("ii", $id_usuario, $id_usuario);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $hechas = [];
    while ($row = $result->fetch_assoc()) {
        // Ajustar ruta de imagen (agregar ../ porque estamos en php/)
        $imagenSolicitado = $row['imagen_solicitado'] ? '../' . $row['imagen_solicitado'] : '../recursos/imagenes/default.jpg';
        $imagenOfrecido = $row['imagen_ofrecido'] ? '../' . $row['imagen_ofrecido'] : '../recursos/imagenes/default.jpg';
        
        $hechas[] = [
            'id' => $row['id_propuesta'],
            'productId' => $row['id_producto_solicitado'],
            'product' => $row['nombre_solicitado'],
            'condition' => $row['condicion_solicitado'],
            'productImage' => $imagenSolicitado,
            'offeredProductId' => $row['id_producto_ofrecido'],
            'offeredProduct' => $row['nombre_ofrecido'],
            'offeredProductImage' => $imagenOfrecido,
            'sellerId' => $row['id_dueno'],
            'seller' => $row['nombre_dueno'],
            'sellerAvatar' => strtoupper(substr($row['nombre_dueno'], 0, 2)),
            'status' => $row['estado'],
            'date' => $row['fecha']
        ];
    }
    $stmt->close();
    
    echo json_encode([
        'success' => true,
        'received' => $recibidas,
        'made' => $hechas
    ]);
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>
