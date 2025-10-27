<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['correo'])) {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
    exit();
}

require_once 'database.php';

$fechaNacimiento = isset($_POST['fecha_nacimiento']) ? trim($_POST['fecha_nacimiento']) : '';
$ubicacion = isset($_POST['ubicacion']) ? trim($_POST['ubicacion']) : '';
$avatarImagen = isset($_POST['avatar_imagen']) ? trim($_POST['avatar_imagen']) : '';

// Validaciones
if (empty($fechaNacimiento) || empty($ubicacion)) {
    echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios']);
    exit();
}

if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $fechaNacimiento)) {
    echo json_encode(['success' => false, 'message' => 'Formato de fecha inválido']);
    exit();
}

$correo = $_SESSION['correo'];
$rutaAvatar = null;

// Procesar avatar si se proporcionó
if (!empty($avatarImagen)) {
    $rutaAvatar = guardarAvatar($avatarImagen, $correo);
    if (!$rutaAvatar) {
        echo json_encode(['success' => false, 'message' => 'Error al procesar la imagen']);
        exit();
    }
}

// Actualizar en BD
try {
    $correoEsc = $conn->real_escape_string($correo);
    $ubicacionEsc = $conn->real_escape_string($ubicacion);
    $fechaEsc = $conn->real_escape_string($fechaNacimiento);
    
    if ($rutaAvatar) {
        $rutaAvatarEsc = $conn->real_escape_string($rutaAvatar);
        $sql = "UPDATE Usuario SET f_nacimiento = '$fechaEsc', ubicacion = '$ubicacionEsc', img_usuario = '$rutaAvatarEsc' WHERE correo = '$correoEsc'";
    } else {
        $sql = "UPDATE Usuario SET f_nacimiento = '$fechaEsc', ubicacion = '$ubicacionEsc' WHERE correo = '$correoEsc'";
    }
    
    if ($conn->query($sql)) {
        echo json_encode(['success' => true, 'message' => 'Datos actualizados correctamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al actualizar']);
    }
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}

$conn->close();

// Función para guardar avatar
function guardarAvatar($imagenBase64, $correo) {
    if (!preg_match('/^data:image\/(\w+);base64,/', $imagenBase64, $type)) {
        return false;
    }
    
    $imageType = strtolower($type[1]);
    $tiposPermitidos = ['jpg', 'jpeg', 'png', 'webp'];
    
    if (!in_array($imageType, $tiposPermitidos)) {
        return false;
    }
    
    $imagenBase64 = preg_replace('/^data:image\/\w+;base64,/', '', $imagenBase64);
    $imagenDecodificada = base64_decode($imagenBase64);
    
    if ($imagenDecodificada === false) {
        return false;
    }
    
    $directorioDestino = '../recursos/imagenes/perfiles/';
    if (!file_exists($directorioDestino)) {
        mkdir($directorioDestino, 0777, true);
    }
    
    $nombreArchivo = 'avatar_' . md5($correo) . '.' . $imageType;
    $rutaCompleta = $directorioDestino . $nombreArchivo;
    
    // Eliminar avatar anterior
    $prefijo = 'avatar_' . md5($correo);
    $archivos = glob($directorioDestino . $prefijo . '.*');
    foreach ($archivos as $archivoAnterior) {
        if (file_exists($archivoAnterior)) {
            unlink($archivoAnterior);
        }
    }
    
    if (file_put_contents($rutaCompleta, $imagenDecodificada)) {
        return 'recursos/imagenes/perfiles/' . $nombreArchivo;
    }
    
    return false;
}
?>