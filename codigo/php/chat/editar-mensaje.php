<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'error' => 'No autenticado']);
    exit;
}

require_once '../database.php';

$id_mensaje = $_POST['id_mensaje'] ?? null;
$contenido = trim($_POST['contenido'] ?? '');
$id_usuario = $_SESSION['id'];

if (!$id_mensaje || !$contenido) {
    echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
    exit;
}

try {
    // Verificar que el mensaje es del usuario y que tiene menos de 15 minutos
    $stmt = $conn->prepare("
        SELECT enviado_en, TIMESTAMPDIFF(MINUTE, enviado_en, NOW()) as minutos_pasados
        FROM ChatMensaje
        WHERE id_mensaje = ? AND id_emisor = ? AND eliminado_para_todos = 0
    ");
    $stmt->bind_param('ii', $id_mensaje, $id_usuario);
    $stmt->execute();
    $result = $stmt->get_result();
    $mensaje = $result->fetch_assoc();
    
    if (!$mensaje) {
        echo json_encode(['success' => false, 'error' => 'Mensaje no encontrado']);
        exit;
    }
    
    if ($mensaje['minutos_pasados'] > 15) {
        echo json_encode(['success' => false, 'error' => 'No puedes editar después de 15 minutos']);
        exit;
    }
    
    // Verificar si existe la columna editado
    $checkColumn = $conn->query("SHOW COLUMNS FROM ChatMensaje LIKE 'editado'");
    $tieneEditado = $checkColumn->num_rows > 0;

    // Actualizar mensaje
    if ($tieneEditado) {
        $stmt = $conn->prepare("
            UPDATE ChatMensaje 
            SET contenido = ?, editado = 1, editado_en = NOW()
            WHERE id_mensaje = ?
        ");
        $stmt->bind_param('si', $contenido, $id_mensaje);
    } else {
        $stmt = $conn->prepare("
            UPDATE ChatMensaje 
            SET contenido = ?
            WHERE id_mensaje = ?
        ");
        $stmt->bind_param('si', $contenido, $id_mensaje);
    }
    
    $stmt->execute();
    
    echo json_encode(['success' => true]);
    
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}