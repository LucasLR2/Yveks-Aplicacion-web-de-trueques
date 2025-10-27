<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'message' => 'No hay sesión activa']);
    exit;
}

require_once 'database.php';

$id_usuario_actual = $_SESSION['id'];
$id_propuesta = isset($_POST['id_propuesta']) ? intval($_POST['id_propuesta']) : 0;
$accion = isset($_POST['accion']) ? $_POST['accion'] : '';

if ($id_propuesta <= 0) {
    echo json_encode(['success' => false, 'message' => 'ID de propuesta inválido']);
    exit;
}

if (!in_array($accion, ['aceptar', 'rechazar', 'cancelar'])) {
    echo json_encode(['success' => false, 'message' => 'Acción inválida']);
    exit;
}

try {
    // Obtener información de la propuesta
    $stmt = $conn->prepare("
        SELECT 
            pi.id_propuesta,
            pi.id_prod_solicitado,
            pi.id_prod_ofrecido,
            pi.id_usuario as id_oferente,
            pi.titulo_oferta,
            pi.estado,
            p.id_producto,
            pub.id_usuario as id_dueno_producto,
            u_oferente.nombre_comp as nombre_oferente,
            u_dueno.nombre_comp as nombre_dueno
        FROM PropuestaIntercambio pi
        INNER JOIN Producto p ON pi.id_prod_solicitado = p.id_producto
        INNER JOIN Publica pub ON p.id_producto = pub.id_producto
        INNER JOIN Usuario u_oferente ON pi.id_usuario = u_oferente.id_usuario
        INNER JOIN Usuario u_dueno ON pub.id_usuario = u_dueno.id_usuario
        WHERE pi.id_propuesta = ?
    ");
    $stmt->bind_param('i', $id_propuesta);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'Oferta no encontrada']);
        exit;
    }
    
    $oferta = $result->fetch_assoc();
    
    // Verificar permisos según la acción
    if ($accion === 'aceptar' || $accion === 'rechazar') {
        if ($oferta['id_dueno_producto'] != $id_usuario_actual) {
            echo json_encode(['success' => false, 'message' => 'No tienes permiso para esta acción']);
            exit;
        }
    } elseif ($accion === 'cancelar') {
        if ($oferta['id_oferente'] != $id_usuario_actual) {
            echo json_encode(['success' => false, 'message' => 'No tienes permiso para cancelar esta oferta']);
            exit;
        }
    }
    
    if ($oferta['estado'] !== 'pendiente') {
        echo json_encode(['success' => false, 'message' => 'Esta oferta ya no está pendiente']);
        exit;
    }
    
    $conn->begin_transaction();
    
    try {
        $nuevo_estado = $accion === 'aceptar' ? 'aceptada' : ($accion === 'rechazar' ? 'rechazada' : 'cancelada');
        $update = $conn->prepare("UPDATE PropuestaIntercambio SET estado = ? WHERE id_propuesta = ?");
        $update->bind_param('si', $nuevo_estado, $id_propuesta);
        $update->execute();
        
        if ($accion === 'aceptar') {
            $id_oferente = $oferta['id_oferente'];
            $id_dueno = $oferta['id_dueno_producto'];
            
            $usuario_menor = min($id_oferente, $id_dueno);
            $usuario_mayor = max($id_oferente, $id_dueno);
            
            $checkConv = $conn->prepare("
                SELECT id_conversacion 
                FROM ChatConversacion 
                WHERE id_usuario1 = ? AND id_usuario2 = ?
            ");
            $checkConv->bind_param('ii', $usuario_menor, $usuario_mayor);
            $checkConv->execute();
            $resultConv = $checkConv->get_result();
            
            $id_conversacion = null;
            $conversacion_existia = false;

            if ($resultConv->num_rows > 0) {
                $conv = $resultConv->fetch_assoc();
                $id_conversacion = $conv['id_conversacion'];
                $conversacion_existia = true;
            } else {
                $crearConv = $conn->prepare("
                    INSERT INTO ChatConversacion (id_usuario1, id_usuario2, id_producto, fecha_inicio, ultimo_mensaje) 
                    VALUES (?, ?, ?, NOW(), NOW())
                ");
                $id_producto = $oferta['id_prod_solicitado'];
                $crearConv->bind_param('iii', $usuario_menor, $usuario_mayor, $id_producto);
                $crearConv->execute();
                $id_conversacion = $conn->insert_id;
            }
            
            // Mensaje diferente según si la conversación ya existía
            if ($conversacion_existia) {
                $mensaje_automatico = "Perfecto, me gusta la propuesta, así que la acepté. Ahora solo nos queda coordinar el intercambio.";
            } else {
                $mensaje_automatico = "¡Hola! Acepté tu oferta porque me pareció una muy buena propuesta. Cuando tengas un momento, podemos coordinar para realizar el intercambio.";
            }
            
            $insertMensaje = $conn->prepare("
                INSERT INTO ChatMensaje (id_conversacion, id_emisor, contenido, tipo_mensaje, enviado_en, leido) 
                VALUES (?, ?, ?, 'texto', NOW(), 0)
            ");
            $insertMensaje->bind_param('iis', $id_conversacion, $id_dueno, $mensaje_automatico);
            $insertMensaje->execute();
            
            $updateConv = $conn->prepare("
                UPDATE ChatConversacion 
                SET ultimo_mensaje = NOW(), 
                    ultimo_mensaje_contenido = ? 
                WHERE id_conversacion = ?
            ");
            $preview = substr($mensaje_automatico, 0, 100);
            $updateConv->bind_param('si', $preview, $id_conversacion);
            $updateConv->execute();
            
            $tipo_notif = 'oferta_aceptada';
            $titulo_notif = '¡Oferta aceptada!';
            $descripcion_notif = $oferta['nombre_dueno'] . ' aceptó tu oferta de intercambio';
            
            $insertNotif = $conn->prepare("
                INSERT INTO Notificacion (tipo, titulo, descripcion, fecha, leida, id_usuario, id_referencia, id_conversacion) 
                VALUES (?, ?, ?, NOW(), 0, ?, ?, ?)
            ");
            $insertNotif->bind_param('sssiii', $tipo_notif, $titulo_notif, $descripcion_notif, $id_oferente, $id_propuesta, $id_conversacion);
            $insertNotif->execute();
            
            $conn->commit();
            
            echo json_encode([
                'success' => true,
                'message' => 'Oferta aceptada correctamente',
                'id_conversacion' => $id_conversacion,
                'accion' => 'aceptar'
            ]);
            
        } elseif ($accion === 'rechazar') {
            $id_oferente = $oferta['id_oferente'];
            $id_dueno = $oferta['id_dueno_producto'];
            
            // Crear o usar conversación existente
            $usuario_menor = min($id_oferente, $id_dueno);
            $usuario_mayor = max($id_oferente, $id_dueno);
            
            $checkConv = $conn->prepare("
                SELECT id_conversacion 
                FROM ChatConversacion 
                WHERE id_usuario1 = ? AND id_usuario2 = ?
            ");
            $checkConv->bind_param('ii', $usuario_menor, $usuario_mayor);
            $checkConv->execute();
            $resultConv = $checkConv->get_result();
            
            $id_conversacion = null;
            $conversacion_existia = false;

            if ($resultConv->num_rows > 0) {
                $conv = $resultConv->fetch_assoc();
                $id_conversacion = $conv['id_conversacion'];
                $conversacion_existia = true;
            } else {
                $crearConv = $conn->prepare("
                    INSERT INTO ChatConversacion (id_usuario1, id_usuario2, id_producto, fecha_inicio, ultimo_mensaje) 
                    VALUES (?, ?, ?, NOW(), NOW())
                ");
                $id_producto = $oferta['id_prod_solicitado'];
                $crearConv->bind_param('iii', $usuario_menor, $usuario_mayor, $id_producto);
                $crearConv->execute();
                $id_conversacion = $conn->insert_id;
            }
            
            // Mensaje automático de rechazo
            if ($conversacion_existia) {
                $mensaje_automatico = "Gracias por tu oferta, pero en este momento no me parece la mejor opción para intercambiar. Te deseo suerte en futuros intercambios.";
            } else {
                $mensaje_automatico = "Hola, gracias por tu oferta de intercambio. Lamentablemente no me parece la mejor opción en este momento. Espero que encuentres lo que buscás. ¡Suerte!";
            }
            
            $insertMensaje = $conn->prepare("
                INSERT INTO ChatMensaje (id_conversacion, id_emisor, contenido, tipo_mensaje, enviado_en, leido) 
                VALUES (?, ?, ?, 'texto', NOW(), 0)
            ");
            $insertMensaje->bind_param('iis', $id_conversacion, $id_dueno, $mensaje_automatico);
            $insertMensaje->execute();
            
            $updateConv = $conn->prepare("
                UPDATE ChatConversacion 
                SET ultimo_mensaje = NOW(), 
                    ultimo_mensaje_contenido = ? 
                WHERE id_conversacion = ?
            ");
            $preview = substr($mensaje_automatico, 0, 100);
            $updateConv->bind_param('si', $preview, $id_conversacion);
            $updateConv->execute();
            
            $tipo_notif = 'oferta_rechazada';
            $titulo_notif = 'Oferta rechazada';
            $descripcion_notif = $oferta['nombre_dueno'] . ' rechazó tu oferta';
            
            $insertNotif = $conn->prepare("
                INSERT INTO Notificacion (tipo, titulo, descripcion, fecha, leida, id_usuario, id_referencia, id_conversacion) 
                VALUES (?, ?, ?, NOW(), 0, ?, ?, ?)
            ");
            $insertNotif->bind_param('sssiii', $tipo_notif, $titulo_notif, $descripcion_notif, $id_oferente, $id_propuesta, $id_conversacion);
            $insertNotif->execute();
            
            $conn->commit();
            
            echo json_encode([
                'success' => true,
                'message' => 'Oferta rechazada',
                'accion' => 'rechazar',
                'id_conversacion' => $id_conversacion
            ]);
            
        } elseif ($accion === 'cancelar') {
            $id_oferente = $oferta['id_oferente'];
            $id_dueno = $oferta['id_dueno_producto'];
            
            // Crear o usar conversación existente
            $usuario_menor = min($id_oferente, $id_dueno);
            $usuario_mayor = max($id_oferente, $id_dueno);
            
            $checkConv = $conn->prepare("
                SELECT id_conversacion 
                FROM ChatConversacion 
                WHERE id_usuario1 = ? AND id_usuario2 = ?
            ");
            $checkConv->bind_param('ii', $usuario_menor, $usuario_mayor);
            $checkConv->execute();
            $resultConv = $checkConv->get_result();
            
            $id_conversacion = null;
            $conversacion_existia = false;

            if ($resultConv->num_rows > 0) {
                $conv = $resultConv->fetch_assoc();
                $id_conversacion = $conv['id_conversacion'];
                $conversacion_existia = true;
            } else {
                $crearConv = $conn->prepare("
                    INSERT INTO ChatConversacion (id_usuario1, id_usuario2, id_producto, fecha_inicio, ultimo_mensaje) 
                    VALUES (?, ?, ?, NOW(), NOW())
                ");
                $id_producto = $oferta['id_prod_solicitado'];
                $crearConv->bind_param('iii', $usuario_menor, $usuario_mayor, $id_producto);
                $crearConv->execute();
                $id_conversacion = $conn->insert_id;
            }
            
            // Mensaje automático de cancelación
            if ($conversacion_existia) {
                $mensaje_automatico = "Hola, decidí cancelar mi oferta de intercambio. Gracias por tu tiempo.";
            } else {
                $mensaje_automatico = "Hola, te escribo para informarte que cancelé mi oferta de intercambio. Disculpá las molestias.";
            }
            
            $insertMensaje = $conn->prepare("
                INSERT INTO ChatMensaje (id_conversacion, id_emisor, contenido, tipo_mensaje, enviado_en, leido) 
                VALUES (?, ?, ?, 'texto', NOW(), 0)
            ");
            $insertMensaje->bind_param('iis', $id_conversacion, $id_oferente, $mensaje_automatico);
            $insertMensaje->execute();
            
            $updateConv = $conn->prepare("
                UPDATE ChatConversacion 
                SET ultimo_mensaje = NOW(), 
                    ultimo_mensaje_contenido = ? 
                WHERE id_conversacion = ?
            ");
            $preview = substr($mensaje_automatico, 0, 100);
            $updateConv->bind_param('si', $preview, $id_conversacion);
            $updateConv->execute();
            
            $tipo_notif = 'oferta_cancelada';
            $titulo_notif = 'Oferta cancelada';
            $descripcion_notif = $oferta['nombre_oferente'] . ' canceló su oferta';
            
            $insertNotif = $conn->prepare("
                INSERT INTO Notificacion (tipo, titulo, descripcion, fecha, leida, id_usuario, id_referencia, id_conversacion) 
                VALUES (?, ?, ?, NOW(), 0, ?, ?, ?)
            ");
            $insertNotif->bind_param('sssiii', $tipo_notif, $titulo_notif, $descripcion_notif, $id_dueno, $id_propuesta, $id_conversacion);
            $insertNotif->execute();
            
            $conn->commit();
            
            echo json_encode([
                'success' => true,
                'message' => 'Oferta cancelada',
                'accion' => 'cancelar',
                'id_conversacion' => $id_conversacion
            ]);
        }
        
    } catch (Exception $e) {
        $conn->rollback();
        throw $e;
    }
    
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>