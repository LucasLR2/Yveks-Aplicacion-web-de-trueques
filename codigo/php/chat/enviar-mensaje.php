<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'error' => 'No hay sesión activa']);
    exit;
}

require_once '../database.php';
$conn->set_charset("utf8mb4");

$id_usuario = $_SESSION['id'];
$id_conversacion = isset($_POST['id_conversacion']) ? intval($_POST['id_conversacion']) : 0;
$tipo_mensaje = isset($_POST['tipo_mensaje']) ? $_POST['tipo_mensaje'] : 'texto';
$responde_a = isset($_POST['responde_a']) ? intval($_POST['responde_a']) : null;

if ($id_conversacion <= 0) {
    echo json_encode(['success' => false, 'error' => 'Conversación inválida']);
    exit;
}

try {
    // Verificar acceso a la conversación
    $check = $conn->prepare("
        SELECT id_usuario1, id_usuario2 
        FROM ChatConversacion 
        WHERE id_conversacion = ? 
        AND (id_usuario1 = ? OR id_usuario2 = ?)
    ");
    $check->bind_param('iii', $id_conversacion, $id_usuario, $id_usuario);
    $check->execute();
    $conv = $check->get_result()->fetch_assoc();
    
    if (!$conv) {
        echo json_encode(['success' => false, 'error' => 'No tienes acceso a esta conversación']);
        exit;
    }
    
    $contenido = '';
    $contenido_preview = '';
    $imagenes_json = null;
    
    // Procesar según tipo de mensaje
    if ($tipo_mensaje === 'imagen' || $tipo_mensaje === 'imagen_texto') {
        // Validar archivos
        if (!isset($_FILES['imagenes']) || count($_FILES['imagenes']['name']) === 0) {
            echo json_encode(['success' => false, 'error' => 'No se recibieron imágenes']);
            exit;
        }
        
        $imagenes_rutas = [];
        $extensionesPermitidas = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        
        // Crear directorio si no existe
        $directorioDestino = '../../recursos/imagenes/chat/';
        if (!file_exists($directorioDestino)) {
            mkdir($directorioDestino, 0755, true);
        }
        
        // Procesar cada imagen
        $totalImagenes = count($_FILES['imagenes']['name']);
        for ($i = 0; $i < $totalImagenes; $i++) {
            if ($_FILES['imagenes']['error'][$i] !== UPLOAD_ERR_OK) {
                continue;
            }
            
            $extension = strtolower(pathinfo($_FILES['imagenes']['name'][$i], PATHINFO_EXTENSION));
            
            if (!in_array($extension, $extensionesPermitidas)) {
                echo json_encode(['success' => false, 'error' => 'Formato de imagen no permitido']);
                exit;
            }
            
            if ($_FILES['imagenes']['size'][$i] > 5 * 1024 * 1024) {
                echo json_encode(['success' => false, 'error' => 'Imagen muy grande (máx 5MB)']);
                exit;
            }
            
            // Generar nombre único
            $nombreArchivo = 'chat_' . $id_conversacion . '_' . time() . '_' . uniqid() . '_' . $i . '.' . $extension;
            $rutaCompleta = $directorioDestino . $nombreArchivo;
            
            // Mover archivo
            if (move_uploaded_file($_FILES['imagenes']['tmp_name'][$i], $rutaCompleta)) {
                $imagenes_rutas[] = 'recursos/imagenes/chat/' . $nombreArchivo;
            }
        }
        
        if (count($imagenes_rutas) === 0) {
            echo json_encode(['success' => false, 'error' => 'Error al guardar las imágenes']);
            exit;
        }
        
        $imagenes_json = json_encode($imagenes_rutas);
        $contenido_preview = count($imagenes_rutas) > 1 ? 
            '📷 ' . count($imagenes_rutas) . ' fotos' : '📷 Foto';
        
        // Si hay texto además de imágenes
        if ($tipo_mensaje === 'imagen_texto' && isset($_POST['contenido'])) {
            $contenido = trim($_POST['contenido']);
            $contenido_preview .= ': ' . substr($contenido, 0, 50);
        }
        
    } else {
        // Mensaje de texto
        $contenido = isset($_POST['contenido']) ? trim($_POST['contenido']) : '';
        
        if (empty($contenido)) {
            echo json_encode(['success' => false, 'error' => 'El mensaje no puede estar vacío']);
            exit;
        }
        
        $contenido_preview = $contenido;
    }
    
    // Si es una respuesta, obtener datos del mensaje original
    $responde_a_contenido = null;
    $responde_a_nombre = null;

    if ($responde_a) {
        $stmt_original = $conn->prepare("
            SELECT cm.contenido, u.nombre_comp 
            FROM ChatMensaje cm 
            JOIN Usuario u ON cm.id_emisor = u.id_usuario 
            WHERE cm.id_mensaje = ?
        ");
        $stmt_original->bind_param('i', $responde_a);
        $stmt_original->execute();
        $resultado = $stmt_original->get_result();
        $mensaje_original = $resultado->fetch_assoc();
        
        if ($mensaje_original) {
            $responde_a_contenido = $mensaje_original['contenido'];
            $responde_a_nombre = $mensaje_original['nombre_comp'];
        }
    }
    
    $insert = $conn->prepare("
        INSERT INTO ChatMensaje (id_conversacion, id_emisor, contenido, imagenes, tipo_mensaje, responde_a, responde_a_contenido, responde_a_nombre) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $insert->bind_param('iisssiss', $id_conversacion, $id_usuario, $contenido, $imagenes_json, $tipo_mensaje, $responde_a, $responde_a_contenido, $responde_a_nombre);
    
    if (!$insert->execute()) {
        throw new Exception('Error al enviar mensaje');
    }
    
    $id_mensaje = $conn->insert_id;
    
    // Actualizar última mensaje de la conversación
    $update = $conn->prepare("
        UPDATE ChatConversacion 
        SET ultimo_mensaje = NOW(), 
            ultimo_mensaje_contenido = ? 
        WHERE id_conversacion = ?
    ");
    $update->bind_param('si', $contenido_preview, $id_conversacion);
    $update->execute();
    
    // Determinar el receptor para crear notificación
    $id_receptor = ($conv['id_usuario1'] == $id_usuario) ? $conv['id_usuario2'] : $conv['id_usuario1'];
    
    // Crear notificación
    $notif = $conn->prepare("
        INSERT INTO Notificacion (tipo, titulo, descripcion, fecha, leida, id_usuario)
        VALUES ('mensaje', 'Nuevo mensaje', ?, NOW(), 0, ?)
    ");
    $notif_desc = substr($contenido_preview, 0, 100);
    $notif->bind_param('si', $notif_desc, $id_receptor);
    $notif->execute();
    
    echo json_encode([
        'success' => true,
        'id_mensaje' => $id_mensaje,
        'enviado_en' => date('Y-m-d H:i:s')
    ]);
    
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>