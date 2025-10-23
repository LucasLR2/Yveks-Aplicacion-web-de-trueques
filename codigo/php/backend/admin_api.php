<?php
// admin_api.php (backend)
// Endpoints: GET action=list&resource=users|productos|incidencias|mensajes|notificaciones
//            POST action=delete&resource=...&id=...
header('Content-Type: application/json');
require_once __DIR__ . '/../database.php';

session_start();
// Simple session check - return 401 if not logged
if (!isset($_SESSION['nombre'])) {
    http_response_code(401);
    echo json_encode(['ok' => false, 'error' => 'No autorizado']);
    exit;
}

// RBAC - Role-based access control
$sessionRole = isset($_SESSION['rol']) ? $_SESSION['rol'] : '';

function is_staff($r){ return strtolower($r) === strtolower('Staff'); }

function has_permission($role, $resource, $action){
    if (is_staff($role)) return true; // Staff can do all
    $roleL = strtolower($role);
    $res = strtolower($resource);
    $act = strtolower($action);
    // Options metadata is safe to allow for all admin roles
    if ($res === 'options') {
        return in_array($roleL, [
            strtolower('Moderador de Reportes'),
            strtolower('Supervisor de Trueques'),
            strtolower('Gestor de Denuncias'),
            strtolower('Gestor de Denuncias / Seguridad'),
            strtolower('Gestor de Denuncias/Seguridad'),
            strtolower('Asistente Administrativo')
        ]);
    }
    // Read-only assistant
    if ($roleL === strtolower('Asistente Administrativo')) {
        return $act === 'list';
    }
    // Moderador de Reportes: incidencias list/update
    if ($roleL === strtolower('Moderador de Reportes')) {
        if ($res === 'incidencias') return in_array($act, ['list','update']);
        return $act === 'list' ? in_array($res, ['incidencias']) : false;
    }
    // Supervisor de Trueques: propuestas list/update, conversaciones list, chat_mensajes list/create
    if ($roleL === strtolower('Supervisor de Trueques')) {
        if ($res === 'propuestas') return in_array($act, ['list','update']);
        if ($res === 'conversaciones') return $act === 'list';
        if ($res === 'chat_mensajes') return in_array($act, ['list','create']);
        return false;
    }
    // Gestor de Denuncias: incidencias list/update
    if ($roleL === strtolower('Gestor de Denuncias') || $roleL === strtolower('Gestor de Denuncias / Seguridad') || $roleL === strtolower('Gestor de Denuncias/Seguridad')) {
        if ($res === 'incidencias') return in_array($act, ['list','update']);
        return false;
    }
    return false;
}

function ensure_permission_or_403($role, $resource, $action){
    if (!has_permission($role, $resource, $action)) {
        http_response_code(403);
        echo json_encode(['ok'=>false,'error'=>'Permisos insuficientes']);
        exit;
    }
}

$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : 'list';
$resource = isset($_REQUEST['resource']) ? $_REQUEST['resource'] : 'users';
$page = isset($_REQUEST['page']) ? max(1, intval($_REQUEST['page'])) : 1;
$q = isset($_REQUEST['q']) ? trim($_REQUEST['q']) : '';
$limit = 50;
$offset = ($page - 1) * $limit;

function json_error($msg, $code = 400) {
    http_response_code($code);
    echo json_encode(['ok' => false, 'error' => $msg]);
    exit;
}

function ensure_exists($conn, $table, $col, $id) {
    if ($id === null) return false;
    $stmt = $conn->prepare("SELECT 1 FROM $table WHERE $col = ? LIMIT 1");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $stmt->store_result();
    $exists = $stmt->num_rows > 0;
    $stmt->close();
    return $exists;
}

if ($action === 'list') {
    ensure_permission_or_403($sessionRole, $resource, 'list');
    switch ($resource) {
        case 'users':
            // Get total count
            $countSql = "SELECT COUNT(*) as total FROM Usuario";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $countSql .= " WHERE nombre_comp LIKE '%$q_esc%' OR correo LIKE '%$q_esc%' OR rol LIKE '%$q_esc%'";
            }
            $countRes = $conn->query($countSql);
            $total = $countRes->fetch_assoc()['total'];
            
            $sql = "SELECT id_usuario AS id, nombre_comp AS nombre, correo AS email, contrasena AS password, f_nacimiento AS birthDate, ubicacion, rol, img_usuario FROM Usuario";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $sql .= " WHERE nombre_comp LIKE '%$q_esc%' OR correo LIKE '%$q_esc%' OR rol LIKE '%$q_esc%'";
            }
            $sql .= " ORDER BY id_usuario DESC LIMIT $limit OFFSET $offset";
            $res = $conn->query($sql);
            if (!$res) json_error('Error al consultar usuarios: ' . $conn->error, 500);
            $rows = [];
            while ($r = $res->fetch_assoc()) {
                $r['avatar'] = strtoupper(substr($r['nombre'],0,1)) . (strpos($r['nombre'],' ')!==false ? strtoupper(substr($r['nombre'], strpos($r['nombre'],' ')+1,1)) : '');
                $r['birthDate'] = $r['birthDate'] ? date('d/m/Y', strtotime($r['birthDate'])) : null;
                $r['password'] = '••••••••••';
                $rows[] = $r;
            }
            echo json_encode(['ok' => true, 'data' => $rows, 'total' => $total, 'page' => $page, 'totalPages' => ceil($total / $limit)]);
            break;

        case 'productos':
            $countSql = "SELECT COUNT(*) as total FROM Producto";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $countSql .= " WHERE nombre LIKE '%$q_esc%' OR estado LIKE '%$q_esc%' OR categoria LIKE '%$q_esc%' OR descripcion LIKE '%$q_esc%'";
            }
            $countRes = $conn->query($countSql);
            $total = $countRes->fetch_assoc()['total'];
            
            $sql = "SELECT id_producto AS id, nombre, estado, categoria, f_publicacion, descripcion FROM Producto";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $sql .= " WHERE nombre LIKE '%$q_esc%' OR estado LIKE '%$q_esc%' OR categoria LIKE '%$q_esc%' OR descripcion LIKE '%$q_esc%'";
            }
            $sql .= " ORDER BY id_producto DESC LIMIT $limit OFFSET $offset";
            $res = $conn->query($sql);
            if (!$res) json_error('Error al consultar productos: ' . $conn->error, 500);
            $rows = [];
            while ($r = $res->fetch_assoc()) $rows[] = $r;
            echo json_encode(['ok' => true, 'data' => $rows, 'total' => $total, 'page' => $page, 'totalPages' => ceil($total / $limit)]);
            break;

        case 'incidencias':
            $countSql = "SELECT COUNT(*) as total FROM Incidencia";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $countSql .= " WHERE estado LIKE '%$q_esc%' OR descripcion LIKE '%$q_esc%'";
            }
            $countRes = $conn->query($countSql);
            $total = $countRes->fetch_assoc()['total'];
            
            $sql = "SELECT id_incidencia AS id, fecha, estado, descripcion, id_usuario_repor AS id_usuario FROM Incidencia";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $sql .= " WHERE estado LIKE '%$q_esc%' OR descripcion LIKE '%$q_esc%'";
            }
            $sql .= " ORDER BY id_incidencia DESC LIMIT $limit OFFSET $offset";
            $res = $conn->query($sql);
            if (!$res) json_error('Error al consultar incidencias: ' . $conn->error, 500);
            $rows = [];
            while ($r = $res->fetch_assoc()) $rows[] = $r;
            echo json_encode(['ok' => true, 'data' => $rows, 'total' => $total, 'page' => $page, 'totalPages' => ceil($total / $limit)]);
            break;

        case 'mensajes':
            $countSql = "SELECT COUNT(*) as total FROM Mensaje";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $countSql .= " WHERE contenido LIKE '%$q_esc%'";
            }
            $countRes = $conn->query($countSql);
            $total = $countRes->fetch_assoc()['total'];
            
            $sql = "SELECT id_mensaje AS id, contenido, f_envio AS fecha, id_emisor, id_receptor FROM Mensaje";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $sql .= " WHERE contenido LIKE '%$q_esc%'";
            }
            $sql .= " ORDER BY f_envio DESC LIMIT $limit OFFSET $offset";
            $res = $conn->query($sql);
            if (!$res) json_error('Error al consultar mensajes: ' . $conn->error, 500);
            $rows = [];
            while ($r = $res->fetch_assoc()) $rows[] = $r;
            echo json_encode(['ok' => true, 'data' => $rows, 'total' => $total, 'page' => $page, 'totalPages' => ceil($total / $limit)]);
            break;

        case 'notificaciones':
            $countSql = "SELECT COUNT(*) as total FROM Notificacion";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $countSql .= " WHERE tipo LIKE '%$q_esc%' OR titulo LIKE '%$q_esc%' OR descripcion LIKE '%$q_esc%'";
            }
            $countRes = $conn->query($countSql);
            $total = $countRes->fetch_assoc()['total'];
            
            $sql = "SELECT id_notificacion AS id, tipo, titulo, descripcion, fecha, leida, id_usuario FROM Notificacion";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $sql .= " WHERE tipo LIKE '%$q_esc%' OR titulo LIKE '%$q_esc%' OR descripcion LIKE '%$q_esc%'";
            }
            $sql .= " ORDER BY id_notificacion DESC LIMIT $limit OFFSET $offset";
            $res = $conn->query($sql);
            if (!$res) json_error('Error al consultar notificaciones: ' . $conn->error, 500);
            $rows = [];
            while ($r = $res->fetch_assoc()) $rows[] = $r;
            echo json_encode(['ok' => true, 'data' => $rows, 'total' => $total, 'page' => $page, 'totalPages' => ceil($total / $limit)]);
            break;

        case 'valoraciones':
            $countSql = "SELECT COUNT(*) as total FROM Valoracion";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                // We search by comentario or by user names via join
                $countSql = "SELECT COUNT(*) as total FROM Valoracion v 
                             LEFT JOIN Usuario u1 ON v.id_usuario_emisor = u1.id_usuario 
                             LEFT JOIN Usuario u2 ON v.id_usuario_receptor = u2.id_usuario 
                             WHERE v.comentario LIKE '%$q_esc%' OR u1.nombre_comp LIKE '%$q_esc%' OR u2.nombre_comp LIKE '%$q_esc%'";
            }
            $countRes = $conn->query($countSql);
            $total = $countRes->fetch_assoc()['total'];
            
            $sql = "SELECT v.id_valoracion AS id, v.puntuacion, v.comentario, v.fecha, v.id_usuario_emisor, v.id_usuario_receptor, 
                    u1.nombre_comp AS emisor_nombre, u2.nombre_comp AS receptor_nombre 
                    FROM Valoracion v 
                    LEFT JOIN Usuario u1 ON v.id_usuario_emisor = u1.id_usuario 
                    LEFT JOIN Usuario u2 ON v.id_usuario_receptor = u2.id_usuario";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $sql .= " WHERE v.comentario LIKE '%$q_esc%' OR u1.nombre_comp LIKE '%$q_esc%' OR u2.nombre_comp LIKE '%$q_esc%'";
            }
            $sql .= " ORDER BY v.id_valoracion DESC LIMIT $limit OFFSET $offset";
            $res = $conn->query($sql);
            if (!$res) json_error('Error al consultar valoraciones: ' . $conn->error, 500);
            $rows = [];
            while ($r = $res->fetch_assoc()) $rows[] = $r;
            echo json_encode(['ok' => true, 'data' => $rows, 'total' => $total, 'page' => $page, 'totalPages' => ceil($total / $limit)]);
            break;

        case 'imagenes_producto':
            $countSql = "SELECT COUNT(*) as total FROM ImagenProducto";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $countSql = "SELECT COUNT(*) as total FROM ImagenProducto i LEFT JOIN Producto p ON i.id_producto=p.id_producto WHERE i.url_imagen LIKE '%$q_esc%' OR p.nombre LIKE '%$q_esc%'";
            }
            $countRes = $conn->query($countSql);
            $total = $countRes->fetch_assoc()['total'];
            
            $sql = "SELECT i.id_imagen AS id, i.url_imagen, i.id_producto, p.nombre AS producto_nombre 
                    FROM ImagenProducto i 
                    LEFT JOIN Producto p ON i.id_producto = p.id_producto";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $sql .= " WHERE i.url_imagen LIKE '%$q_esc%' OR p.nombre LIKE '%$q_esc%'";
            }
            $sql .= " ORDER BY i.id_imagen DESC LIMIT $limit OFFSET $offset";
            $res = $conn->query($sql);
            if (!$res) json_error('Error al consultar imágenes: ' . $conn->error, 500);
            $rows = [];
            while ($r = $res->fetch_assoc()) $rows[] = $r;
            echo json_encode(['ok' => true, 'data' => $rows, 'total' => $total, 'page' => $page, 'totalPages' => ceil($total / $limit)]);
            break;

        case 'categorias':
            $countSql = "SELECT COUNT(*) as total FROM categoria";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $countSql .= " WHERE nombre LIKE '%$q_esc%' OR slug LIKE '%$q_esc%' OR descripcion LIKE '%$q_esc%'";
            }
            $countRes = $conn->query($countSql);
            $total = $countRes->fetch_assoc()['total'];
            
            $sql = "SELECT id_categoria AS id, nombre, slug, url_imagen, descripcion FROM categoria";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $sql .= " WHERE nombre LIKE '%$q_esc%' OR slug LIKE '%$q_esc%' OR descripcion LIKE '%$q_esc%'";
            }
            $sql .= " ORDER BY nombre ASC LIMIT $limit OFFSET $offset";
            $res = $conn->query($sql);
            if (!$res) json_error('Error al consultar categorías: ' . $conn->error, 500);
            $rows = [];
            while ($r = $res->fetch_assoc()) $rows[] = $r;
            echo json_encode(['ok' => true, 'data' => $rows, 'total' => $total, 'page' => $page, 'totalPages' => ceil($total / $limit)]);
            break;

        case 'conversaciones':
            $countSql = "SELECT COUNT(*) as total FROM ChatConversacion";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $countSql = "SELECT COUNT(*) as total FROM ChatConversacion c 
                             LEFT JOIN Usuario u1 ON c.id_usuario1 = u1.id_usuario 
                             LEFT JOIN Usuario u2 ON c.id_usuario2 = u2.id_usuario 
                             LEFT JOIN Producto p ON c.id_producto = p.id_producto 
                             WHERE u1.nombre_comp LIKE '%$q_esc%' OR u2.nombre_comp LIKE '%$q_esc%' OR p.nombre LIKE '%$q_esc%' OR c.ultimo_mensaje_contenido LIKE '%$q_esc%'";
            }
            $countRes = $conn->query($countSql);
            $total = $countRes->fetch_assoc()['total'];
            
            $sql = "SELECT c.id_conversacion AS id, c.id_usuario1, c.id_usuario2, c.id_producto, c.fecha_inicio, c.ultimo_mensaje, c.ultimo_mensaje_contenido,
                    u1.nombre_comp AS usuario1_nombre, u2.nombre_comp AS usuario2_nombre, p.nombre AS producto_nombre
                    FROM ChatConversacion c
                    LEFT JOIN Usuario u1 ON c.id_usuario1 = u1.id_usuario
                    LEFT JOIN Usuario u2 ON c.id_usuario2 = u2.id_usuario
                    LEFT JOIN Producto p ON c.id_producto = p.id_producto";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $sql .= " WHERE u1.nombre_comp LIKE '%$q_esc%' OR u2.nombre_comp LIKE '%$q_esc%' OR p.nombre LIKE '%$q_esc%' OR c.ultimo_mensaje_contenido LIKE '%$q_esc%'";
            }
            $sql .= " ORDER BY c.ultimo_mensaje DESC LIMIT $limit OFFSET $offset";
            $res = $conn->query($sql);
            if (!$res) json_error('Error al consultar conversaciones: ' . $conn->error, 500);
            $rows = [];
            while ($r = $res->fetch_assoc()) $rows[] = $r;
            echo json_encode(['ok' => true, 'data' => $rows, 'total' => $total, 'page' => $page, 'totalPages' => ceil($total / $limit)]);
            break;

        case 'chat_mensajes':
            $countSql = "SELECT COUNT(*) as total FROM ChatMensaje";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $countSql = "SELECT COUNT(*) as total FROM ChatMensaje m LEFT JOIN Usuario u ON m.id_emisor=u.id_usuario WHERE m.contenido LIKE '%$q_esc%' OR u.nombre_comp LIKE '%$q_esc%'";
            }
            $countRes = $conn->query($countSql);
            $total = $countRes->fetch_assoc()['total'];
            
            $sql = "SELECT m.id_mensaje AS id, m.id_conversacion, m.id_emisor, m.contenido, m.tipo_mensaje, m.enviado_en, m.leido, m.leido_en,
                    u.nombre_comp AS emisor_nombre
                    FROM ChatMensaje m
                    LEFT JOIN Usuario u ON m.id_emisor = u.id_usuario";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $sql .= " WHERE m.contenido LIKE '%$q_esc%' OR u.nombre_comp LIKE '%$q_esc%'";
            }
            $sql .= " ORDER BY m.enviado_en DESC LIMIT $limit OFFSET $offset";
            $res = $conn->query($sql);
            if (!$res) json_error('Error al consultar mensajes chat: ' . $conn->error, 500);
            $rows = [];
            while ($r = $res->fetch_assoc()) $rows[] = $r;
            echo json_encode(['ok' => true, 'data' => $rows, 'total' => $total, 'page' => $page, 'totalPages' => ceil($total / $limit)]);
            break;

        case 'propuestas':
            $countSql = "SELECT COUNT(*) as total FROM PropuestaIntercambio";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $countSql = "SELECT COUNT(*) as total FROM PropuestaIntercambio p LEFT JOIN Producto ps ON p.id_prod_solicitado = ps.id_producto LEFT JOIN Producto po ON p.id_prod_ofrecido = po.id_producto LEFT JOIN Usuario u ON p.id_usuario = u.id_usuario WHERE ps.nombre LIKE '%$q_esc%' OR po.nombre LIKE '%$q_esc%' OR u.nombre_comp LIKE '%$q_esc%' OR p.estado LIKE '%$q_esc%'";
            }
            $countRes = $conn->query($countSql);
            $total = $countRes->fetch_assoc()['total'];
            
            $sql = "SELECT p.id_propuesta AS id, p.id_prod_solicitado, p.id_prod_ofrecido, p.estado, p.fecha, p.id_usuario,
                    ps.nombre AS producto_solicitado, po.nombre AS producto_ofrecido, u.nombre_comp AS usuario_nombre
                    FROM PropuestaIntercambio p
                    LEFT JOIN Producto ps ON p.id_prod_solicitado = ps.id_producto
                    LEFT JOIN Producto po ON p.id_prod_ofrecido = po.id_producto
                    LEFT JOIN Usuario u ON p.id_usuario = u.id_usuario";
            if ($q !== '') {
                $q_esc = $conn->real_escape_string($q);
                $sql .= " WHERE ps.nombre LIKE '%$q_esc%' OR po.nombre LIKE '%$q_esc%' OR u.nombre_comp LIKE '%$q_esc%' OR p.estado LIKE '%$q_esc%'";
            }
            $sql .= " ORDER BY p.id_propuesta DESC LIMIT $limit OFFSET $offset";
            $res = $conn->query($sql);
            if (!$res) json_error('Error al consultar propuestas: ' . $conn->error, 500);
            $rows = [];
            while ($r = $res->fetch_assoc()) $rows[] = $r;
            echo json_encode(['ok' => true, 'data' => $rows, 'total' => $total, 'page' => $page, 'totalPages' => ceil($total / $limit)]);
            break;

        default:
            json_error('Recurso no soportado: ' . $resource, 400);
    }

} elseif ($action === 'delete') {
    ensure_permission_or_403($sessionRole, $resource, 'delete');
    $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;
    if (!$id) json_error('ID inválido', 400);
    switch ($resource) {
        case 'users':
            $stmt = $conn->prepare('DELETE FROM Usuario WHERE id_usuario = ?');
            $stmt->bind_param('i', $id);
            if ($stmt->execute()) echo json_encode(['ok' => true]); else json_error('Error al eliminar: '.$stmt->error,500);
            break;
        case 'productos':
            $stmt = $conn->prepare('DELETE FROM Producto WHERE id_producto = ?');
            $stmt->bind_param('i', $id);
            if ($stmt->execute()) echo json_encode(['ok' => true]); else json_error('Error al eliminar: '.$stmt->error,500);
            break;
        case 'valoraciones':
            $stmt = $conn->prepare('DELETE FROM Valoracion WHERE id_valoracion = ?');
            $stmt->bind_param('i', $id);
            if ($stmt->execute()) echo json_encode(['ok' => true]); else json_error('Error al eliminar: '.$stmt->error,500);
            break;
        case 'imagenes_producto':
            $stmt = $conn->prepare('DELETE FROM ImagenProducto WHERE id_imagen = ?');
            $stmt->bind_param('i', $id);
            if ($stmt->execute()) echo json_encode(['ok' => true]); else json_error('Error al eliminar: '.$stmt->error,500);
            break;
        case 'categorias':
            $stmt = $conn->prepare('DELETE FROM categoria WHERE id_categoria = ?');
            $stmt->bind_param('i', $id);
            if ($stmt->execute()) echo json_encode(['ok' => true]); else json_error('Error al eliminar: '.$stmt->error,500);
            break;
        case 'conversaciones':
            $stmt = $conn->prepare('DELETE FROM ChatConversacion WHERE id_conversacion = ?');
            $stmt->bind_param('i', $id);
            if ($stmt->execute()) echo json_encode(['ok' => true]); else json_error('Error al eliminar: '.$stmt->error,500);
            break;
        case 'chat_mensajes':
            $stmt = $conn->prepare('DELETE FROM ChatMensaje WHERE id_mensaje = ?');
            $stmt->bind_param('i', $id);
            if ($stmt->execute()) echo json_encode(['ok' => true]); else json_error('Error al eliminar: '.$stmt->error,500);
            break;
        case 'propuestas':
            $stmt = $conn->prepare('DELETE FROM PropuestaIntercambio WHERE id_propuesta = ?');
            $stmt->bind_param('i', $id);
            if ($stmt->execute()) echo json_encode(['ok' => true]); else json_error('Error al eliminar: '.$stmt->error,500);
            break;
        case 'incidencias':
            $stmt = $conn->prepare('DELETE FROM Incidencia WHERE id_incidencia = ?');
            $stmt->bind_param('i', $id);
            if ($stmt->execute()) echo json_encode(['ok' => true]); else json_error('Error al eliminar: '.$stmt->error,500);
            break;
        case 'notificaciones':
            $stmt = $conn->prepare('DELETE FROM Notificacion WHERE id_notificacion = ?');
            $stmt->bind_param('i', $id);
            if ($stmt->execute()) echo json_encode(['ok' => true]); else json_error('Error al eliminar: '.$stmt->error,500);
            break;
        default:
            json_error('Recurso no soportado para delete: ' . $resource, 400);
    }

} elseif ($action === 'create' || $action === 'update') {
    ensure_permission_or_403($sessionRole, $resource, $action);
    // Create / Update handlers
    if ($resource === 'users') {
        // Only Staff puede crear/actualizar usuarios y asignar roles de administrador
        if (!is_staff($sessionRole)) {
            json_error('Solo Staff puede gestionar usuarios', 403);
        }
        $nombre = isset($_REQUEST['nombre']) ? trim($_REQUEST['nombre']) : '';
        $correo = isset($_REQUEST['correo']) ? trim($_REQUEST['correo']) : '';
        $contrasena = isset($_REQUEST['contrasena']) ? trim($_REQUEST['contrasena']) : null;
        $rol = isset($_REQUEST['rol']) ? trim($_REQUEST['rol']) : '';
        $ubicacion = isset($_REQUEST['ubicacion']) ? trim($_REQUEST['ubicacion']) : '';
        $f_nacimiento = isset($_REQUEST['f_nacimiento']) ? trim($_REQUEST['f_nacimiento']) : null;

        if ($action === 'create') {
            if (!$nombre || !$correo || !$contrasena) json_error('Campos requeridos faltantes', 400);
            $hash = password_hash($contrasena, PASSWORD_DEFAULT);
            $stmt = $conn->prepare('INSERT INTO Usuario (nombre_comp, correo, contrasena, rol, ubicacion, f_nacimiento) VALUES (?, ?, ?, ?, ?, ?)');
            $stmt->bind_param('ssssss', $nombre, $correo, $hash, $rol, $ubicacion, $f_nacimiento);
            if ($stmt->execute()) echo json_encode(['ok' => true, 'id' => $stmt->insert_id]); else json_error('Error al crear usuario: '.$stmt->error,500);
        } else {
            $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;
            if (!$id) json_error('ID inválido',400);
            if ($contrasena === null || $contrasena === '') {
                $stmt = $conn->prepare('UPDATE Usuario SET nombre_comp=?, correo=?, rol=?, ubicacion=?, f_nacimiento=? WHERE id_usuario=?');
                $stmt->bind_param('sssssi', $nombre, $correo, $rol, $ubicacion, $f_nacimiento, $id);
            } else {
                $hash = password_hash($contrasena, PASSWORD_DEFAULT);
                $stmt = $conn->prepare('UPDATE Usuario SET nombre_comp=?, correo=?, contrasena=?, rol=?, ubicacion=?, f_nacimiento=? WHERE id_usuario=?');
                $stmt->bind_param('ssssssi', $nombre, $correo, $hash, $rol, $ubicacion, $f_nacimiento, $id);
            }
            if ($stmt->execute()) echo json_encode(['ok' => true]); else json_error('Error al actualizar usuario: '.$stmt->error,500);
        }

    } elseif ($resource === 'productos') {
        $nombre = isset($_REQUEST['nombre']) ? trim($_REQUEST['nombre']) : '';
        $estado = isset($_REQUEST['estado']) ? trim($_REQUEST['estado']) : '';
        $categoria = isset($_REQUEST['categoria']) ? trim($_REQUEST['categoria']) : '';
        $descripcion = isset($_REQUEST['descripcion']) ? trim($_REQUEST['descripcion']) : '';
        $id_ubicacion = isset($_REQUEST['id_ubicacion']) && $_REQUEST['id_ubicacion'] !== '' ? intval($_REQUEST['id_ubicacion']) : null;

        if ($action === 'create') {
            if (!$nombre) json_error('Nombre requerido',400);
            $stmt = $conn->prepare('INSERT INTO Producto (nombre, estado, categoria, f_publicacion, descripcion, id_ubicacion) VALUES (?, ?, ?, NOW(), ?, ?)');
            $stmt->bind_param('ssssi', $nombre, $estado, $categoria, $descripcion, $id_ubicacion);
            if ($stmt->execute()) echo json_encode(['ok' => true, 'id' => $stmt->insert_id]); else json_error('Error al crear producto: '.$stmt->error,500);
        } else {
            $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;
            if (!$id) json_error('ID inválido',400);
            $stmt = $conn->prepare('UPDATE Producto SET nombre=?, estado=?, categoria=?, descripcion=?, id_ubicacion=? WHERE id_producto=?');
            $stmt->bind_param('ssssii', $nombre, $estado, $categoria, $descripcion, $id_ubicacion, $id);
            if ($stmt->execute()) echo json_encode(['ok' => true]); else json_error('Error al actualizar producto: '.$stmt->error,500);
        }

    } elseif ($resource === 'valoraciones') {
        $puntuacion = isset($_REQUEST['puntuacion']) ? intval($_REQUEST['puntuacion']) : 0;
        $comentario = isset($_REQUEST['comentario']) ? trim($_REQUEST['comentario']) : '';
        $fecha = isset($_REQUEST['fecha']) ? trim($_REQUEST['fecha']) : date('Y-m-d');
        $id_usuario_emisor = isset($_REQUEST['id_usuario_emisor']) ? intval($_REQUEST['id_usuario_emisor']) : 0;
        $id_usuario_receptor = isset($_REQUEST['id_usuario_receptor']) ? intval($_REQUEST['id_usuario_receptor']) : 0;

        if ($id_usuario_emisor && !ensure_exists($conn, 'Usuario', 'id_usuario', $id_usuario_emisor)) json_error('Usuario emisor no existe', 400);
        if ($id_usuario_receptor && !ensure_exists($conn, 'Usuario', 'id_usuario', $id_usuario_receptor)) json_error('Usuario receptor no existe', 400);

        if ($action === 'create') {
            if (!$id_usuario_emisor || !$id_usuario_receptor) json_error('Usuarios requeridos', 400);
            $stmt = $conn->prepare('INSERT INTO Valoracion (puntuacion, comentario, fecha, id_usuario_emisor, id_usuario_receptor) VALUES (?, ?, ?, ?, ?)');
            $stmt->bind_param('issii', $puntuacion, $comentario, $fecha, $id_usuario_emisor, $id_usuario_receptor);
            if ($stmt->execute()) echo json_encode(['ok' => true, 'id' => $stmt->insert_id]); else json_error('Error al crear valoración: '.$stmt->error,500);
        } else {
            $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;
            if (!$id) json_error('ID inválido',400);
            $stmt = $conn->prepare('UPDATE Valoracion SET puntuacion=?, comentario=?, fecha=?, id_usuario_emisor=?, id_usuario_receptor=? WHERE id_valoracion=?');
            $stmt->bind_param('issiii', $puntuacion, $comentario, $fecha, $id_usuario_emisor, $id_usuario_receptor, $id);
            if ($stmt->execute()) echo json_encode(['ok' => true]); else json_error('Error al actualizar valoración: '.$stmt->error,500);
        }

    } elseif ($resource === 'categorias') {
        $nombre = isset($_REQUEST['nombre']) ? trim($_REQUEST['nombre']) : '';
        $slug = isset($_REQUEST['slug']) ? trim($_REQUEST['slug']) : '';
        $url_imagen = isset($_REQUEST['url_imagen']) ? trim($_REQUEST['url_imagen']) : '';
        $descripcion = isset($_REQUEST['descripcion']) ? trim($_REQUEST['descripcion']) : '';

        if ($action === 'create') {
            if (!$nombre || !$slug) json_error('Nombre y slug requeridos', 400);
            $stmt = $conn->prepare('INSERT INTO categoria (nombre, slug, url_imagen, descripcion) VALUES (?, ?, ?, ?)');
            $stmt->bind_param('ssss', $nombre, $slug, $url_imagen, $descripcion);
            if ($stmt->execute()) echo json_encode(['ok' => true, 'id' => $stmt->insert_id]); else json_error('Error al crear categoría: '.$stmt->error,500);
        } else {
            $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;
            if (!$id) json_error('ID inválido',400);
            $stmt = $conn->prepare('UPDATE categoria SET nombre=?, slug=?, url_imagen=?, descripcion=? WHERE id_categoria=?');
            $stmt->bind_param('ssssi', $nombre, $slug, $url_imagen, $descripcion, $id);
            if ($stmt->execute()) echo json_encode(['ok' => true]); else json_error('Error al actualizar categoría: '.$stmt->error,500);
        }

    } elseif ($resource === 'notificaciones') {
        $tipo = isset($_REQUEST['tipo']) ? trim($_REQUEST['tipo']) : '';
        $titulo = isset($_REQUEST['titulo']) ? trim($_REQUEST['titulo']) : '';
        $descripcion = isset($_REQUEST['descripcion']) ? trim($_REQUEST['descripcion']) : '';
        $fecha = isset($_REQUEST['fecha']) ? trim($_REQUEST['fecha']) : date('Y-m-d');
        $leida = isset($_REQUEST['leida']) ? intval($_REQUEST['leida']) : 0;
        $id_usuario = isset($_REQUEST['id_usuario']) ? intval($_REQUEST['id_usuario']) : 0;

        if ($id_usuario && !ensure_exists($conn, 'Usuario', 'id_usuario', $id_usuario)) json_error('Usuario no existe', 400);

        if ($action === 'create') {
            if (!$titulo || !$id_usuario) json_error('Título y usuario requeridos', 400);
            $stmt = $conn->prepare('INSERT INTO Notificacion (tipo, titulo, descripcion, fecha, leida, id_usuario) VALUES (?, ?, ?, ?, ?, ?)');
            $stmt->bind_param('sssiii', $tipo, $titulo, $descripcion, $fecha, $leida, $id_usuario);
            if ($stmt->execute()) echo json_encode(['ok' => true, 'id' => $stmt->insert_id]); else json_error('Error al crear notificación: '.$stmt->error,500);
        } else {
            $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;
            if (!$id) json_error('ID inválido',400);
            $stmt = $conn->prepare('UPDATE Notificacion SET tipo=?, titulo=?, descripcion=?, fecha=?, leida=?, id_usuario=? WHERE id_notificacion=?');
            $stmt->bind_param('sssiiii', $tipo, $titulo, $descripcion, $fecha, $leida, $id_usuario, $id);
            if ($stmt->execute()) echo json_encode(['ok' => true]); else json_error('Error al actualizar notificación: '.$stmt->error,500);
        }

    } elseif ($resource === 'incidencias') {
        $fecha = isset($_REQUEST['fecha_reporte']) ? trim($_REQUEST['fecha_reporte']) : date('Y-m-d');
        $tipo = isset($_REQUEST['tipo']) ? trim($_REQUEST['tipo']) : '';
        $estado = isset($_REQUEST['estado']) ? trim($_REQUEST['estado']) : '';
        $descripcion = isset($_REQUEST['descripcion']) ? trim($_REQUEST['descripcion']) : '';
        $id_usuario_repor = isset($_REQUEST['id_usuario_reporta']) ? intval($_REQUEST['id_usuario_reporta']) : 0;

        if ($id_usuario_repor && !ensure_exists($conn, 'Usuario', 'id_usuario', $id_usuario_repor)) json_error('Usuario reporta no existe', 400);

        if ($action === 'create') {
            if (!$descripcion || !$id_usuario_repor) json_error('Descripción y usuario requeridos', 400);
            $stmt = $conn->prepare('INSERT INTO Incidencia (fecha, estado, descripcion, id_usuario_repor) VALUES (?, ?, ?, ?)');
            $stmt->bind_param('sssi', $fecha, $estado, $descripcion, $id_usuario_repor);
            if ($stmt->execute()) echo json_encode(['ok' => true, 'id' => $stmt->insert_id]); else json_error('Error al crear incidencia: '.$stmt->error,500);
        } else {
            $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;
            if (!$id) json_error('ID inválido',400);
            $stmt = $conn->prepare('UPDATE Incidencia SET fecha=?, estado=?, descripcion=?, id_usuario_repor=? WHERE id_incidencia=?');
            $stmt->bind_param('sssii', $fecha, $estado, $descripcion, $id_usuario_repor, $id);
            if ($stmt->execute()) echo json_encode(['ok' => true]); else json_error('Error al actualizar incidencia: '.$stmt->error,500);
        }

    } elseif ($resource === 'propuestas') {
        $id_prod_solicitado = isset($_REQUEST['id_producto_solicitado']) ? intval($_REQUEST['id_producto_solicitado']) : 0;
        $id_prod_ofrecido = isset($_REQUEST['id_producto_ofrecido']) ? intval($_REQUEST['id_producto_ofrecido']) : 0;
        $estado = isset($_REQUEST['estado']) ? trim($_REQUEST['estado']) : '';
        $fecha = isset($_REQUEST['fecha_propuesta']) ? trim($_REQUEST['fecha_propuesta']) : date('Y-m-d');
        $id_usuario = isset($_REQUEST['id_usuario_propone']) ? intval($_REQUEST['id_usuario_propone']) : 0;
        $mensaje = isset($_REQUEST['mensaje']) ? trim($_REQUEST['mensaje']) : '';

        if ($id_prod_solicitado && !ensure_exists($conn, 'Producto', 'id_producto', $id_prod_solicitado)) json_error('Producto solicitado no existe', 400);
        if ($id_prod_ofrecido && !ensure_exists($conn, 'Producto', 'id_producto', $id_prod_ofrecido)) json_error('Producto ofrecido no existe', 400);
        if ($id_usuario && !ensure_exists($conn, 'Usuario', 'id_usuario', $id_usuario)) json_error('Usuario no existe', 400);

        if ($action === 'create') {
            if (!$id_prod_solicitado || !$id_prod_ofrecido || !$id_usuario) json_error('Productos y usuario requeridos', 400);
            $stmt = $conn->prepare('INSERT INTO PropuestaIntercambio (id_prod_solicitado, id_prod_ofrecido, estado, fecha, id_usuario) VALUES (?, ?, ?, ?, ?)');
            $stmt->bind_param('iissi', $id_prod_solicitado, $id_prod_ofrecido, $estado, $fecha, $id_usuario);
            if ($stmt->execute()) echo json_encode(['ok' => true, 'id' => $stmt->insert_id]); else json_error('Error al crear propuesta: '.$stmt->error,500);
        } else {
            $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;
            if (!$id) json_error('ID inválido',400);
            $stmt = $conn->prepare('UPDATE PropuestaIntercambio SET id_prod_solicitado=?, id_prod_ofrecido=?, estado=?, fecha=?, id_usuario=? WHERE id_propuesta=?');
            $stmt->bind_param('iissii', $id_prod_solicitado, $id_prod_ofrecido, $estado, $fecha, $id_usuario, $id);
            if ($stmt->execute()) echo json_encode(['ok' => true]); else json_error('Error al actualizar propuesta: '.$stmt->error,500);
        }
    } elseif ($resource === 'imagenes_producto') {
        $url_imagen = isset($_REQUEST['url_imagen']) ? trim($_REQUEST['url_imagen']) : '';
        $id_producto = isset($_REQUEST['id_producto']) ? intval($_REQUEST['id_producto']) : 0;

        if ($id_producto && !ensure_exists($conn, 'Producto', 'id_producto', $id_producto)) json_error('Producto no existe', 400);

        if ($action === 'create') {
            if (!$url_imagen || !$id_producto) json_error('URL de imagen e ID de producto requeridos', 400);
            $stmt = $conn->prepare('INSERT INTO ImagenProducto (url_imagen, id_producto) VALUES (?, ?)');
            $stmt->bind_param('si', $url_imagen, $id_producto);
            if ($stmt->execute()) echo json_encode(['ok' => true, 'id' => $stmt->insert_id]); else json_error('Error al crear imagen: '.$stmt->error,500);
        } else {
            $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;
            if (!$id) json_error('ID inválido',400);
            $stmt = $conn->prepare('UPDATE ImagenProducto SET url_imagen=?, id_producto=? WHERE id_imagen=?');
            $stmt->bind_param('sii', $url_imagen, $id_producto, $id);
            if ($stmt->execute()) echo json_encode(['ok' => true]); else json_error('Error al actualizar imagen: '.$stmt->error,500);
        }

    } elseif ($resource === 'conversaciones') {
        $id_usuario1 = isset($_REQUEST['id_usuario1']) ? intval($_REQUEST['id_usuario1']) : 0;
        $id_usuario2 = isset($_REQUEST['id_usuario2']) ? intval($_REQUEST['id_usuario2']) : 0;
        $id_producto = isset($_REQUEST['id_producto']) ? intval($_REQUEST['id_producto']) : 0;
        $ultimo_mensaje_contenido = isset($_REQUEST['ultimo_mensaje_contenido']) ? trim($_REQUEST['ultimo_mensaje_contenido']) : '';

        if ($id_usuario1 && !ensure_exists($conn, 'Usuario', 'id_usuario', $id_usuario1)) json_error('Usuario 1 no existe', 400);
        if ($id_usuario2 && !ensure_exists($conn, 'Usuario', 'id_usuario', $id_usuario2)) json_error('Usuario 2 no existe', 400);
        if ($id_producto && !ensure_exists($conn, 'Producto', 'id_producto', $id_producto)) json_error('Producto no existe', 400);

        if ($action === 'create') {
            if (!$id_usuario1 || !$id_usuario2 || !$id_producto) json_error('Usuarios y producto requeridos', 400);
            $stmt = $conn->prepare('INSERT INTO ChatConversacion (id_usuario1, id_usuario2, id_producto, fecha_inicio, ultimo_mensaje, ultimo_mensaje_contenido) VALUES (?, ?, ?, NOW(), NOW(), ?)');
            $stmt->bind_param('iiis', $id_usuario1, $id_usuario2, $id_producto, $ultimo_mensaje_contenido);
            if ($stmt->execute()) echo json_encode(['ok' => true, 'id' => $stmt->insert_id]); else json_error('Error al crear conversación: '.$stmt->error,500);
        } else {
            $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;
            if (!$id) json_error('ID inválido',400);
            if ($ultimo_mensaje_contenido !== '') {
                $stmt = $conn->prepare('UPDATE ChatConversacion SET id_usuario1=?, id_usuario2=?, id_producto=?, ultimo_mensaje=NOW(), ultimo_mensaje_contenido=? WHERE id_conversacion=?');
                $stmt->bind_param('iiisi', $id_usuario1, $id_usuario2, $id_producto, $ultimo_mensaje_contenido, $id);
            } else {
                $stmt = $conn->prepare('UPDATE ChatConversacion SET id_usuario1=?, id_usuario2=?, id_producto=?, ultimo_mensaje_contenido=? WHERE id_conversacion=?');
                $stmt->bind_param('iiisi', $id_usuario1, $id_usuario2, $id_producto, $ultimo_mensaje_contenido, $id);
            }
            if ($stmt->execute()) echo json_encode(['ok' => true]); else json_error('Error al actualizar conversación: '.$stmt->error,500);
        }

    } elseif ($resource === 'chat_mensajes') {
        $id_conversacion = isset($_REQUEST['id_conversacion']) ? intval($_REQUEST['id_conversacion']) : 0;
        $id_emisor = isset($_REQUEST['id_emisor']) ? intval($_REQUEST['id_emisor']) : 0;
        $contenido = isset($_REQUEST['contenido']) ? trim($_REQUEST['contenido']) : '';
        $tipo_mensaje = isset($_REQUEST['tipo_mensaje']) ? trim($_REQUEST['tipo_mensaje']) : 'texto';
        $leido = isset($_REQUEST['leido']) ? intval($_REQUEST['leido']) : 0;
        $leido_en = isset($_REQUEST['leido_en']) ? trim($_REQUEST['leido_en']) : null;

        if ($id_conversacion && !ensure_exists($conn, 'ChatConversacion', 'id_conversacion', $id_conversacion)) json_error('Conversación no existe', 400);
        if ($id_emisor && !ensure_exists($conn, 'Usuario', 'id_usuario', $id_emisor)) json_error('Usuario emisor no existe', 400);

        if ($action === 'create') {
            if (!$id_conversacion || !$id_emisor || !$contenido) json_error('Conversación, emisor y contenido requeridos', 400);
            $enviado_en = date('Y-m-d H:i:s');
            if ($leido && !$leido_en) {
                $leido_en = $enviado_en;
            }
            $stmt = $conn->prepare('INSERT INTO ChatMensaje (id_conversacion, id_emisor, contenido, tipo_mensaje, enviado_en, leido, leido_en) VALUES (?, ?, ?, ?, ?, ?, ?)');
            $stmt->bind_param('iisssis', $id_conversacion, $id_emisor, $contenido, $tipo_mensaje, $enviado_en, $leido, $leido_en);
            if ($stmt->execute()) echo json_encode(['ok' => true, 'id' => $stmt->insert_id]); else json_error('Error al crear mensaje de chat: '.$stmt->error,500);
        } else {
            $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;
            if (!$id) json_error('ID inválido',400);
            if ($leido && !$leido_en) {
                $leido_en = date('Y-m-d H:i:s');
            }
            $stmt = $conn->prepare('UPDATE ChatMensaje SET id_conversacion=?, id_emisor=?, contenido=?, tipo_mensaje=?, leido=?, leido_en=? WHERE id_mensaje=?');
            $stmt->bind_param('iissisi', $id_conversacion, $id_emisor, $contenido, $tipo_mensaje, $leido, $leido_en, $id);
            if ($stmt->execute()) echo json_encode(['ok' => true]); else json_error('Error al actualizar mensaje de chat: '.$stmt->error,500);
        }

    } else {
        json_error('Recurso no soportado para create/update: '.$resource,400);
    }

} elseif ($action === 'options') {
    ensure_permission_or_403($sessionRole, 'options', 'list');
    // Lightweight options for select inputs
    switch ($resource) {
        case 'users':
            $sql = "SELECT id_usuario AS id, nombre_comp AS label FROM Usuario ORDER BY nombre_comp ASC LIMIT 200";
            $res = $conn->query($sql);
            if (!$res) json_error('Error al cargar usuarios: '.$conn->error,500);
            $rows = [];
            while ($r = $res->fetch_assoc()) $rows[] = $r;
            echo json_encode(['ok'=>true,'data'=>$rows]);
            break;
        case 'productos':
            $sql = "SELECT id_producto AS id, nombre AS label FROM Producto ORDER BY nombre ASC LIMIT 200";
            $res = $conn->query($sql);
            if (!$res) json_error('Error al cargar productos: '.$conn->error,500);
            $rows = [];
            while ($r = $res->fetch_assoc()) $rows[] = $r;
            echo json_encode(['ok'=>true,'data'=>$rows]);
            break;
        case 'conversaciones':
            $sql = "SELECT c.id_conversacion AS id, CONCAT('Conv #', c.id_conversacion, ' - ', COALESCE(u1.nombre_comp,''), ' y ', COALESCE(u2.nombre_comp,''), ' / ', COALESCE(p.nombre,'')) AS label
                    FROM ChatConversacion c
                    LEFT JOIN Usuario u1 ON c.id_usuario1 = u1.id_usuario
                    LEFT JOIN Usuario u2 ON c.id_usuario2 = u2.id_usuario
                    LEFT JOIN Producto p ON c.id_producto = p.id_producto
                    ORDER BY c.id_conversacion DESC LIMIT 200";
            $res = $conn->query($sql);
            if (!$res) json_error('Error al cargar conversaciones: '.$conn->error,500);
            $rows = [];
            while ($r = $res->fetch_assoc()) $rows[] = $r;
            echo json_encode(['ok'=>true,'data'=>$rows]);
            break;
        default:
            json_error('Recurso no soportado para options: '.$resource,400);
    }

} elseif ($action === 'capabilities') {
    // Return capability matrix for current role
    $resources = ['users','productos','valoraciones','imagenes_producto','categorias','incidencias','propuestas','conversaciones','chat_mensajes','notificaciones'];
    $caps = [];
    foreach ($resources as $res) {
        $caps[$res] = [
            'list' => has_permission($sessionRole, $res, 'list'),
            'create' => has_permission($sessionRole, $res, 'create'),
            'update' => has_permission($sessionRole, $res, 'update'),
            'delete' => has_permission($sessionRole, $res, 'delete')
        ];
    }
    echo json_encode(['ok'=>true, 'role'=>$sessionRole, 'capabilities'=>$caps]);

} elseif ($action === 'dashboard') {
    // Dashboard statistics
    $stats = [];
    
    try {
        // Total de usuarios
        $userCountRes = $conn->query("SELECT COUNT(*) as total FROM Usuario");
        $stats['totalUsers'] = $userCountRes ? $userCountRes->fetch_assoc()['total'] : 0;
        
        // Intercambios en proceso (propuestas con estado 'pendiente' o 'en proceso')
        $exchangesRes = $conn->query("SELECT COUNT(*) as total FROM PropuestaIntercambio WHERE estado IN ('pendiente', 'en proceso', 'aceptada')");
        $stats['activeExchanges'] = $exchangesRes ? $exchangesRes->fetch_assoc()['total'] : 0;
        
        // Productos publicados por mes en el año actual
        $currentYear = date('Y');
        $productsByMonthRes = $conn->query("
            SELECT MONTH(f_publicacion) as mes, COUNT(*) as total 
            FROM Producto 
            WHERE YEAR(f_publicacion) = $currentYear 
            GROUP BY MONTH(f_publicacion)
            ORDER BY mes
        ");
        $productsByMonth = array_fill(1, 12, 0);
        if ($productsByMonthRes) {
            while ($row = $productsByMonthRes->fetch_assoc()) {
                $productsByMonth[(int)$row['mes']] = (int)$row['total'];
            }
        }
        $stats['productsByMonth'] = array_values($productsByMonth);
        
        // Incidencias por estado
        $incidenciasRes = $conn->query("
            SELECT estado, COUNT(*) as total 
            FROM Incidencia 
            GROUP BY estado
        ");
        $incidencias = ['nueva' => 0, 'en_progreso' => 0, 'resuelta' => 0];
        if ($incidenciasRes) {
            while ($row = $incidenciasRes->fetch_assoc()) {
                $estado = strtolower($row['estado']);
                if ($estado === 'nueva' || $estado === 'nuevo' || $estado === 'pendiente') {
                    $incidencias['nueva'] += (int)$row['total'];
                } elseif ($estado === 'en progreso' || $estado === 'en_progreso' || $estado === 'procesando') {
                    $incidencias['en_progreso'] += (int)$row['total'];
                } elseif ($estado === 'resuelta' || $estado === 'cerrada' || $estado === 'completada') {
                    $incidencias['resuelta'] += (int)$row['total'];
                }
            }
        }
        $stats['incidencias'] = $incidencias;
        
        // Productos por categoría
        $productsPerCategoryRes = $conn->query("
            SELECT categoria, COUNT(*) as total 
            FROM Producto 
            GROUP BY categoria 
            ORDER BY total DESC
        ");
        $productsByCategory = [];
        if ($productsPerCategoryRes) {
            while ($row = $productsPerCategoryRes->fetch_assoc()) {
                $productsByCategory[] = [
                    'categoria' => $row['categoria'] ?: 'Sin categoría',
                    'total' => (int)$row['total']
                ];
            }
        }
        $stats['productsByCategory'] = $productsByCategory;
        
        // Últimas 5 incidencias
        $lastIncidenciasRes = $conn->query("
            SELECT i.id_incidencia as id, i.descripcion, i.estado, i.fecha, 
                   u.nombre_comp as usuario_nombre
            FROM Incidencia i
            LEFT JOIN Usuario u ON i.id_usuario_repor = u.id_usuario
            ORDER BY i.fecha DESC
            LIMIT 5
        ");
        $lastIncidencias = [];
        if ($lastIncidenciasRes) {
            while ($row = $lastIncidenciasRes->fetch_assoc()) {
                $lastIncidencias[] = $row;
            }
        }
        $stats['lastIncidencias'] = $lastIncidencias;
        
        // Últimos 5 usuarios registrados
        $lastUsersRes = $conn->query("
            SELECT id_usuario as id, nombre_comp as nombre, correo, rol, img_usuario,
                   DATE_FORMAT(f_nacimiento, '%d/%m/%Y') as fecha_registro
            FROM Usuario
            ORDER BY id_usuario DESC
            LIMIT 5
        ");
        $lastUsers = [];
        if ($lastUsersRes) {
            while ($row = $lastUsersRes->fetch_assoc()) {
                $lastUsers[] = $row;
            }
        }
        $stats['lastUsers'] = $lastUsers;
        
        echo json_encode(['ok' => true, 'data' => $stats]);
    } catch (Exception $e) {
        json_error('Error al obtener estadísticas: ' . $e->getMessage(), 500);
    }

} else {
    json_error('Acción no soportada: ' . $action, 400);
}

?>
