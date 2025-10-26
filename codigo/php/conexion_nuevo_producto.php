<?php
session_start();
header('Content-Type: application/json');

// Verificar que el usuario esté autenticado
if (!isset($_SESSION['correo'])) {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
    exit();
}

// Verificar que sea una petición POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit();
}

try {
    // Incluir la conexión a la base de datos
    require_once 'database.php';
    
    // Obtener los datos del formulario
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Debug: verificar si los datos llegaron
    if ($data === null) {
        echo json_encode(['success' => false, 'message' => 'Error al decodificar JSON: ' . json_last_error_msg()]);
        exit();
    }
    
    // Validar datos requeridos
    if (empty($data['name']) || empty($data['condition']) || empty($data['category']) || empty($data['location'])) {
        echo json_encode(['success' => false, 'message' => 'Faltan campos obligatorios']);
        exit();
    }
    
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
    
    // Preparar los datos del producto
    $nombre = trim($data['name']);
    $estado = trim($data['condition']);
    $categoria = trim($data['category']);
    $descripcion = !empty($data['description']) ? trim($data['description']) : null;
    $preferencias = !empty($data['exchangePreferences']) ? trim($data['exchangePreferences']) : null;
    
    // Por ahora ponemos id_ubicacion como NULL, luego se puede mejorar
    // para buscar/crear la ubicación en la tabla ubicacion
    $id_ubicacion = null;
    
    // Insertar el producto en la base de datos
    $sql = "INSERT INTO Producto (nombre, estado, categoria, f_publicacion, descripcion, preferencias, id_ubicacion) 
            VALUES (?, ?, ?, NOW(), ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssi", 
        $nombre,
        $estado,
        $categoria,
        $descripcion,
        $preferencias,
        $id_ubicacion
    );
    
    if (!$stmt->execute()) {
        echo json_encode(['success' => false, 'message' => 'Error al insertar producto: ' . $stmt->error]);
        $stmt->close();
        exit();
    }
    
    $id_producto = $conn->insert_id;
    $stmt->close();
    
    // Insertar la relación Usuario-Producto en la tabla Publica
    $sqlPublica = "INSERT INTO Publica (id_usuario, id_producto) VALUES (?, ?)";
    $stmtPublica = $conn->prepare($sqlPublica);
    $stmtPublica->bind_param("ii", $id_usuario, $id_producto);
    $stmtPublica->execute();
    $stmtPublica->close();
    
    // Procesar imágenes si existen
    if (!empty($data['images']) && is_array($data['images'])) {
        $uploadDir = '../recursos/imagenes/productos/';
        
        // Crear el directorio si no existe
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        
        foreach ($data['images'] as $index => $imageData) {
            if (!empty($imageData['url'])) {
                // Extraer los datos base64
                $imageContent = $imageData['url'];
                
                // Verificar si es una imagen base64
                if (preg_match('/^data:image\/(\w+);base64,/', $imageContent, $type)) {
                    $imageContent = substr($imageContent, strpos($imageContent, ',') + 1);
                    $type = strtolower($type[1]); // jpg, png, gif
                    
                    // Decodificar base64
                    $imageContent = base64_decode($imageContent);
                    
                    if ($imageContent === false) {
                        continue; // Saltar si falla la decodificación
                    }
                    
                    // Generar nombre único para la imagen
                    $nombreArchivo = 'producto_' . $id_producto . '_' . ($index + 1) . '.' . $type;
                    $rutaArchivo = $uploadDir . $nombreArchivo;
                    
                    // Guardar la imagen
                    if (file_put_contents($rutaArchivo, $imageContent)) {
                        // Insertar la referencia en la base de datos (tabla ImagenProducto)
                        $rutaRelativa = 'recursos/imagenes/productos/' . $nombreArchivo;
                        $sqlImagen = "INSERT INTO ImagenProducto (url_imagen, id_producto) VALUES (?, ?)";
                        $stmtImagen = $conn->prepare($sqlImagen);
                        $stmtImagen->bind_param("si", $rutaRelativa, $id_producto);
                        $stmtImagen->execute();
                        $stmtImagen->close();
                    }
                }
            }
        }
    }
    
    echo json_encode([
        'success' => true, 
        'message' => 'Producto publicado exitosamente',
        'id_producto' => $id_producto
    ]);
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>