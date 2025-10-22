<?php
session_start();
header('Content-Type: application/json');

// Verificar sesión
if (!isset($_SESSION['id'])) {
    echo json_encode(['error' => 'No hay sesión activa']);
    exit;
}

$id_usuario = $_SESSION['id'];

require_once 'database.php'; 

try {
    // Obtener notificaciones del usuario
    $stmt = $conn->prepare("
        SELECT id_notificacion, tipo, titulo, descripcion, fecha, leida, id_referencia 
        FROM Notificacion 
        WHERE id_usuario = ? 
        ORDER BY fecha DESC, id_notificacion DESC
    ");
    $stmt->bind_param('i', $id_usuario);
    $stmt->execute();
    $result = $stmt->get_result();
    
    // Función para calcular tiempo transcurrido
    function calcularTiempo($fecha) {
        $ahora = new DateTime();
        $fechaNotif = new DateTime($fecha);
        $diff = $ahora->diff($fechaNotif);
        
        if ($diff->y > 0) return $diff->y . 'a';
        if ($diff->m > 0) return $diff->m . 'mes';
        if ($diff->d > 6) return intval($diff->d / 7) . 'sem';
        if ($diff->d > 0) return $diff->d . 'd';
        if ($diff->h > 0) return $diff->h . 'h';
        if ($diff->i > 0) return $diff->i . 'min';
        return 'ahora';
    }
    
    // Mapeo de tipos a iconos
    $iconos = [
        'solicitud_chat' => 'recursos/iconos/solido/comunicacion/comentario.svg',
        'oferta' => 'recursos/iconos/contorno/general/etiqueta.svg',
        'mensaje' => 'recursos/iconos/solido/comunicacion/comentario.svg',
        'oferta_cancelada' => 'recursos/iconos/solido/interfaz/cerrar.svg',
        'oferta_aceptada' => 'recursos/iconos/solido/estado/verificado.svg',
        'resena' => 'recursos/iconos/solido/estado/estrella.svg'
    ];
    
    // Formatear notificaciones
    $notificacionesFormateadas = [];
    while ($row = $result->fetch_assoc()) {
        $notificacionesFormateadas[] = [
            'id' => (int)$row['id_notificacion'],
            'tipo' => $row['tipo'],
            'titulo' => $row['titulo'],
            'descripcion' => $row['descripcion'],
            'tiempo' => calcularTiempo($row['fecha']),
            'icono' => $iconos[$row['tipo']] ?? 'recursos/iconos/solido/estado/notificacion.svg',
            'leida' => (bool)$row['leida'],
            'id_referencia' => $row['id_referencia'] ? (int)$row['id_referencia'] : null
        ];
    }
    
    echo json_encode(['notificaciones' => $notificacionesFormateadas]);
    
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(['error' => 'Error de base de datos: ' . $e->getMessage()]);
}
?>