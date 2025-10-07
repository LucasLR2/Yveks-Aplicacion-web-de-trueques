<?php
// =============================
// obtener-notificaciones.php
// API para obtener notificaciones desde la base de datos
// Reemplaza los datos estáticos del JavaScript
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

try {
    // Consulta para obtener notificaciones del usuario logueado
    $sql = "SELECT 
                id_notificacion as id,
                tipo,
                titulo,
                descripcion,
                fecha,
                leida
            FROM Notificacion 
            WHERE id_usuario = ?
            ORDER BY fecha DESC, id_notificacion DESC";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id_usuario);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $notificaciones = [];
    
    while ($row = $result->fetch_assoc()) {
        // Calcular tiempo transcurrido
        $fechaNotificacion = new DateTime($row['fecha']);
        $ahora = new DateTime();
        $diff = $ahora->diff($fechaNotificacion);
        
        if ($diff->days == 0) {
            if ($diff->h == 0) {
                if ($diff->i == 0) {
                    $tiempo = $diff->s . "s";
                } else {
                    $tiempo = $diff->i . "min";
                }
            } else {
                $tiempo = $diff->h . "h";
            }
        } elseif ($diff->days < 7) {
            $tiempo = $diff->days . "d";
        } elseif ($diff->days < 30) {
            $semanas = floor($diff->days / 7);
            $tiempo = $semanas . "sem";
        } else {
            $meses = floor($diff->days / 30);
            $tiempo = $meses . "mes";
        }
        
        // Determinar icono según el tipo
        $iconos = [
            'solicitud_chat' => 'recursos/iconos/solido/comunicacion/comentario.svg',
            'oferta' => 'recursos/iconos/contorno/general/etiqueta.svg',
            'mensaje' => 'recursos/iconos/solido/comunicacion/comentario.svg',
            'oferta_cancelada' => 'recursos/iconos/solido/interfaz/cerrar.svg',
            'oferta_aceptada' => 'recursos/iconos/solido/estado/verificado.svg',
            'resena' => 'recursos/iconos/solido/estado/estrella.svg'
        ];
        
        // Extraer usuario de la descripción (simplificado)
        $usuario = '';
        if (preg_match('/de (.+?)$/', $row['descripcion'], $matches)) {
            $usuario = $matches[1];
        }
        
        $notificacion = [
            'id' => (int)$row['id'],
            'tipo' => $row['tipo'],
            'titulo' => $row['titulo'],
            'descripcion' => $row['descripcion'],
            'tiempo' => $tiempo,
            'icono' => $iconos[$row['tipo']] ?? 'recursos/iconos/solido/estado/informacion_circulo.svg',
            'leida' => (bool)$row['leida'],
            'usuario' => $usuario
        ];
        
        $notificaciones[] = $notificacion;
    }
    
    echo json_encode([
        'success' => true,
        'notificaciones' => $notificaciones,
        'total' => count($notificaciones),
        'no_leidas' => count(array_filter($notificaciones, function($n) { return !$n['leida']; }))
    ]);
    
    $stmt->close();
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al obtener notificaciones: ' . $e->getMessage()
    ]);
}

$conn->close();
?>