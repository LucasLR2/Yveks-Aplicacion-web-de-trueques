<?php
session_start();
header('Content-Type: application/json');

// Verificar sesión
if (!isset($_SESSION['id'])) {
    echo json_encode(['error' => 'No hay sesión activa']);
    exit;
}

$id_usuario = $_SESSION['id'];

// Conexión a la base de datos
$host = 'localhost';
$dbname = 'dreva';
$username = 'root'; // Ajustar según tu configuración
$password = '';     // Ajustar según tu configuración

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Obtener notificaciones del usuario
    $stmt = $pdo->prepare("
        SELECT id_notificacion, tipo, titulo, descripcion, fecha, leida 
        FROM Notificacion 
        WHERE id_usuario = ? 
        ORDER BY fecha DESC, id_notificacion DESC
    ");
    $stmt->execute([$id_usuario]);
    $notificaciones = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
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
        return $diff->s . 's';
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
    foreach ($notificaciones as $notif) {
        $notificacionesFormateadas[] = [
            'id' => $notif['id_notificacion'],
            'tipo' => $notif['tipo'],
            'titulo' => $notif['titulo'],
            'descripcion' => $notif['descripcion'],
            'tiempo' => calcularTiempo($notif['fecha']),
            'icono' => $iconos[$notif['tipo']] ?? 'recursos/iconos/solido/estado/notificacion.svg',
            'leida' => (bool)$notif['leida']
        ];
    }
    
    echo json_encode(['notificaciones' => $notificacionesFormateadas]);
    
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error de base de datos: ' . $e->getMessage()]);
}
?>