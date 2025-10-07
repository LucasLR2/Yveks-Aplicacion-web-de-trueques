<?php
// =============================
// marcar-notificacion-leida.php
// API para marcar notificaciones como leídas
// =============================

session_start();
header('Content-Type: application/json');
require 'php/database.php';

// Verificar si el usuario está logueado
if (!isset($_SESSION['id'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Usuario no autenticado'
    ]);
    exit;
}

$id_usuario = $_SESSION['id'];
$input = json_decode(file_get_contents('php://input'), true);

try {
    if (isset($input['notificacion_id'])) {
        // Marcar una notificación específica como leída
        $notificacion_id = $input['notificacion_id'];
        
        $sql = "UPDATE Notificacion 
                SET leida = TRUE 
                WHERE id_notificacion = ? AND id_usuario = ?";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ii', $notificacion_id, $id_usuario);
        
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Notificación marcada como leída'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Error al marcar notificación como leída'
            ]);
        }
        
        $stmt->close();
        
    } elseif (isset($input['marcar_todas'])) {
        // Marcar todas las notificaciones como leídas
        $sql = "UPDATE Notificacion 
                SET leida = TRUE 
                WHERE id_usuario = ? AND leida = FALSE";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $id_usuario);
        
        if ($stmt->execute()) {
            $affected_rows = $stmt->affected_rows;
            echo json_encode([
                'success' => true,
                'message' => "Se marcaron $affected_rows notificaciones como leídas"
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Error al marcar notificaciones como leídas'
            ]);
        }
        
        $stmt->close();
        
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Parámetros inválidos'
        ]);
    }
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}

$conn->close();
?>