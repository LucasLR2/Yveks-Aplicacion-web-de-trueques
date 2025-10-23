<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'error' => 'No hay sesión activa']);
    exit;
}

require_once 'database.php';

$id_usuario = $_SESSION['id'];

// Leer el body como JSON
$input = json_decode(file_get_contents('php://input'), true);

// Verificar si es marcar todas
if (isset($input['marcar_todas']) && $input['marcar_todas'] === true) {
    try {
        $stmt = $conn->prepare("
            UPDATE Notificacion 
            SET leida = 1 
            WHERE id_usuario = ? AND leida = 0
        ");
        $stmt->bind_param('i', $id_usuario);
        $stmt->execute();
        
        $marcadas = $stmt->affected_rows;
        
        echo json_encode([
            'success' => true,
            'marcadas' => $marcadas
        ]);
        
        $stmt->close();
        $conn->close();
        exit;
        
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        exit;
    }
}

// Si no, marcar solo una notificación
$id_notificacion = isset($_POST['id_notificacion']) ? intval($_POST['id_notificacion']) : 0;

if ($id_notificacion <= 0) {
    echo json_encode(['success' => false, 'error' => 'Notificación inválida']);
    exit;
}

try {
    // Verificar que la notificación pertenece al usuario
    $stmt = $conn->prepare("
        UPDATE Notificacion 
        SET leida = 1 
        WHERE id_notificacion = ? AND id_usuario = ?
    ");
    $stmt->bind_param('ii', $id_notificacion, $id_usuario);
    $stmt->execute();
    
    echo json_encode(['success' => true]);
    
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>