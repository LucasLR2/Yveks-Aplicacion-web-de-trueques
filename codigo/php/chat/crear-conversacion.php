<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'error' => 'No hay sesión activa']);
    exit;
}

require_once '../database.php';

$id_usuario_actual = $_SESSION['id'];
$id_otro_usuario = isset($_POST['id_otro_usuario']) ? intval($_POST['id_otro_usuario']) : 0;
$id_producto = isset($_POST['id_producto']) ? intval($_POST['id_producto']) : null;

if ($id_otro_usuario <= 0) {
    echo json_encode(['success' => false, 'error' => 'Usuario destinatario inválido']);
    exit;
}

if ($id_usuario_actual === $id_otro_usuario) {
    echo json_encode(['success' => false, 'error' => 'No puedes chatear contigo mismo']);
    exit;
}

try {
    // Ordenar IDs para mantener consistencia
    $usuario_menor = min($id_usuario_actual, $id_otro_usuario);
    $usuario_mayor = max($id_usuario_actual, $id_otro_usuario);
    
    // Verificar si ya existe conversación
    $stmt = $conn->prepare("
        SELECT id_conversacion, id_producto 
        FROM ChatConversacion 
        WHERE id_usuario1 = ? AND id_usuario2 = ?
    ");
    $stmt->bind_param('ii', $usuario_menor, $usuario_mayor);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        // Conversación existe
        $conversacion = $result->fetch_assoc();
        
        // Si se especificó un producto y la conversación no tiene producto, actualizar
        if ($id_producto && !$conversacion['id_producto']) {
            $update = $conn->prepare("UPDATE ChatConversacion SET id_producto = ? WHERE id_conversacion = ?");
            $update->bind_param('ii', $id_producto, $conversacion['id_conversacion']);
            $update->execute();
        }
        
        echo json_encode([
            'success' => true,
            'id_conversacion' => $conversacion['id_conversacion'],
            'nueva' => false
        ]);
    } else {
        // Crear nueva conversación
        $insert = $conn->prepare("
            INSERT INTO ChatConversacion (id_usuario1, id_usuario2, id_producto) 
            VALUES (?, ?, ?)
        ");
        $insert->bind_param('iii', $usuario_menor, $usuario_mayor, $id_producto);
        
        if ($insert->execute()) {
            echo json_encode([
                'success' => true,
                'id_conversacion' => $conn->insert_id,
                'nueva' => true
            ]);
        } else {
            throw new Exception('Error al crear conversación');
        }
    }
    
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>