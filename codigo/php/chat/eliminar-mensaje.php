<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'error' => 'No hay sesión activa']);
    exit;
}

require_once '../database.php';

$id_usuario = $_SESSION['id'];
$id_mensaje = isset($_POST['id_mensaje']) ? intval($_POST['id_mensaje']) : 0;
$tipo_eliminacion = isset($_POST['tipo']) ? $_POST['tipo'] : 'para_mi';

if ($id_mensaje <= 0) {
    echo json_encode(['success' => false, 'error' => 'Mensaje inválido']);
    exit;
}

try {
    // Verificar que el mensaje existe y obtener info
    $check = $conn->prepare("
        SELECT m.id_emisor, m.enviado_en, m.eliminado_para_usuario, m.eliminado_para_todos,
               c.id_usuario1, c.id_usuario2
        FROM ChatMensaje m
        JOIN ChatConversacion c ON m.id_conversacion = c.id_conversacion
        WHERE m.id_mensaje = ?
    ");
    $check->bind_param('i', $id_mensaje);
    $check->execute();
    $mensaje = $check->get_result()->fetch_assoc();
    
    if (!$mensaje) {
        echo json_encode(['success' => false, 'error' => 'Mensaje no encontrado']);
        exit;
    }
    
    // Verificar que el usuario participa en la conversación
    if ($mensaje['id_usuario1'] != $id_usuario && $mensaje['id_usuario2'] != $id_usuario) {
        echo json_encode(['success' => false, 'error' => 'No autorizado']);
        exit;
    }
    
    // Si ya está eliminado para todos, no hacer nada
    if ($mensaje['eliminado_para_todos']) {
        echo json_encode(['success' => true, 'tipo' => 'ya_eliminado']);
        exit;
    }
    
    if ($tipo_eliminacion === 'para_todos') {
        // Solo el emisor puede eliminar para todos
        if ($mensaje['id_emisor'] != $id_usuario) {
            echo json_encode(['success' => false, 'error' => 'Solo puedes eliminar para todos tus propios mensajes']);
            exit;
        }
        
        // Eliminar para todos
        $update = $conn->prepare("UPDATE ChatMensaje SET eliminado_para_todos = 1 WHERE id_mensaje = ?");
        $update->bind_param('i', $id_mensaje);
        $update->execute();
        
        echo json_encode(['success' => true, 'tipo' => 'para_todos']);
        
    } else {
        // Eliminar solo para mí
        
        // Obtener lista actual de usuarios que eliminaron
        $eliminados_actual = $mensaje['eliminado_para_usuario'];
        
        // Convertir a array
        $ids_eliminados = [];
        if (!empty($eliminados_actual)) {
            $ids_eliminados = explode(',', $eliminados_actual);
        }
        
        // Agregar el ID actual si no está
        if (!in_array($id_usuario, $ids_eliminados)) {
            $ids_eliminados[] = $id_usuario;
        }
        
        // Si ambos usuarios de la conversación lo eliminaron, marcarlo como eliminado para todos
        $id_otro_usuario = ($mensaje['id_usuario1'] == $id_usuario) ? $mensaje['id_usuario2'] : $mensaje['id_usuario1'];
        
        if (in_array($mensaje['id_usuario1'], $ids_eliminados) && 
            in_array($mensaje['id_usuario2'], $ids_eliminados)) {
            // Ambos usuarios lo eliminaron, marcar como eliminado para todos
            $update = $conn->prepare("UPDATE ChatMensaje SET eliminado_para_todos = 1 WHERE id_mensaje = ?");
            $update->bind_param('i', $id_mensaje);
            $update->execute();
            
            echo json_encode(['success' => true, 'tipo' => 'para_todos_automatico']);
        } else {
            // Solo actualizar la lista de usuarios que eliminaron
            $nueva_lista = implode(',', $ids_eliminados);
            $update = $conn->prepare("UPDATE ChatMensaje SET eliminado_para_usuario = ? WHERE id_mensaje = ?");
            $update->bind_param('si', $nueva_lista, $id_mensaje);
            $update->execute();
            
            echo json_encode(['success' => true, 'tipo' => 'para_mi']);
        }
    }
    
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>