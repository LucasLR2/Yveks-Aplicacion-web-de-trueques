<?php
session_start();
header('Content-Type: application/json');

// Verificar sesión
if (!isset($_SESSION['correo'])) {
    echo json_encode(['success' => false, 'message' => 'No hay sesión activa']);
    exit();
}

require_once 'database.php';

try {
    // Obtener ID del usuario actual
    $correo = $_SESSION['correo'];
    $stmt = $conn->prepare("SELECT id_usuario FROM Usuario WHERE correo = ?");
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $result = $stmt->get_result();
    $usuario = $result->fetch_assoc();
    
    if (!$usuario) {
        throw new Exception("Usuario no encontrado");
    }
    
    $id_usuario = $usuario['id_usuario'];
    
    // Validar datos recibidos
    if (!isset($_POST['id_producto']) || !isset($_POST['titulo']) || !isset($_POST['estado']) || !isset($_POST['descripcion'])) {
        throw new Exception("Datos incompletos");
    }
    
    $id_producto_solicitado = intval($_POST['id_producto']);
    $titulo = trim($_POST['titulo']);
    $estado = trim($_POST['estado']);
    $descripcion = trim($_POST['descripcion']);
    
    // Validar que el producto existe y obtener dueño
    $stmt = $conn->prepare("SELECT p.id_producto, u.id_usuario, u.nombre_comp 
                           FROM Producto p 
                           INNER JOIN Publica pub ON p.id_producto = pub.id_producto 
                           INNER JOIN Usuario u ON pub.id_usuario = u.id_usuario 
                           WHERE p.id_producto = ?");
    $stmt->bind_param("i", $id_producto_solicitado);
    $stmt->execute();
    $result = $stmt->get_result();
    $producto = $result->fetch_assoc();
    
    if (!$producto) {
        throw new Exception("Producto no encontrado");
    }
    
    $id_dueno_producto = $producto['id_usuario'];
    $nombre_dueno = $producto['nombre_comp'];
    
    // Validar que no sea su propio producto
    if ($id_dueno_producto == $id_usuario) {
        throw new Exception("No puedes hacer una oferta por tu propio producto");
    }
    
    // Procesar imágenes
    $imagenes = [];
    if (isset($_FILES['fotos']) && !empty($_FILES['fotos']['name'][0])) {
        $upload_dir = __DIR__ . '/../uploads/ofertas/';
        
        // Crear directorio si no existe
        if (!file_exists($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }
        
        foreach ($_FILES['fotos']['tmp_name'] as $key => $tmp_name) {
            if ($_FILES['fotos']['error'][$key] === UPLOAD_ERR_OK) {
                // Validar tipo de archivo
                $file_type = $_FILES['fotos']['type'][$key];
                $allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
                
                if (!in_array($file_type, $allowed_types)) {
                    throw new Exception("Tipo de archivo no permitido");
                }
                
                // Validar tamaño (máximo 5MB)
                if ($_FILES['fotos']['size'][$key] > 5242880) {
                    throw new Exception("El archivo es demasiado grande (máximo 5MB)");
                }
                
                // Generar nombre único
                $extension = pathinfo($_FILES['fotos']['name'][$key], PATHINFO_EXTENSION);
                $filename = uniqid('oferta_') . '_' . time() . '.' . $extension;
                $filepath = $upload_dir . $filename;
                
                // Mover archivo
                if (move_uploaded_file($tmp_name, $filepath)) {
                    $imagenes[] = 'codigo/uploads/ofertas/' . $filename;
                } else {
                    throw new Exception("Error al subir imagen");
                }
            }
        }
    }
    
    if (empty($imagenes)) {
        throw new Exception("Debes subir al menos una imagen");
    }
    
    // Convertir array de imágenes a JSON
    $imagenes_json = json_encode($imagenes);
    
    // Insertar propuesta de intercambio
    $stmt = $conn->prepare("INSERT INTO PropuestaIntercambio 
                           (id_prod_solicitado, id_usuario, titulo_oferta, descripcion_oferta, estado_producto_oferta, imagenes_oferta, estado, fecha) 
                           VALUES (?, ?, ?, ?, ?, ?, 'pendiente', NOW())");
    $stmt->bind_param("iissss", $id_producto_solicitado, $id_usuario, $titulo, $descripcion, $estado, $imagenes_json);
    
    if (!$stmt->execute()) {
        throw new Exception("Error al crear la oferta");
    }
    
    $id_propuesta = $conn->insert_id;
    
    // Obtener nombre del usuario que hace la oferta
    $stmt = $conn->prepare("SELECT nombre_comp FROM Usuario WHERE id_usuario = ?");
    $stmt->bind_param("i", $id_usuario);
    $stmt->execute();
    $result = $stmt->get_result();
    $usuario_oferta = $result->fetch_assoc();
    $nombre_oferente = $usuario_oferta['nombre_comp'];
    
    // Crear notificación para el dueño del producto
    $tipo = 'oferta';
    $titulo_notif = 'Nueva oferta recibida';
    $descripcion_notif = $nombre_oferente . ' ha hecho una oferta por tu producto';
    
    $stmt = $conn->prepare("INSERT INTO Notificacion 
                           (tipo, titulo, descripcion, fecha, leida, id_usuario, id_referencia) 
                           VALUES (?, ?, ?, NOW(), 0, ?, ?)");
    $stmt->bind_param("sssii", $tipo, $titulo_notif, $descripcion_notif, $id_dueno_producto, $id_propuesta);
    $stmt->execute();
    
    echo json_encode([
        'success' => true,
        'message' => 'Oferta enviada exitosamente',
        'id_propuesta' => $id_propuesta
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

$conn->close();
?>