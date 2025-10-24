<?php
// =============================
// actualizar-perfil.php
// Actualiza la información de perfil del usuario recién registrado
// Campos esperados (POST): fecha_nacimiento, ubicacion
// =============================

session_start();
require 'database.php'; // Abre conexión $conn

// Verificar que el usuario esté autenticado
if (!isset($_SESSION['correo'])) {
    echo json_encode(['success' => false, 'message' => 'Sesión no válida.']);
    exit;
}

// Recibir y limpiar los campos
$fechaNacimiento = isset($_POST['fecha_nacimiento']) ? trim($_POST['fecha_nacimiento']) : '';
$ubicacion = isset($_POST['ubicacion']) ? trim($_POST['ubicacion']) : '';
$avatarImagen = isset($_POST['avatar_imagen']) ? trim($_POST['avatar_imagen']) : '';

// Validar que los campos no estén vacíos
if (empty($fechaNacimiento) || empty($ubicacion) || empty($avatarImagen)) {
    echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
    exit;
}

// Validar formato de fecha (el input type="date" envía en formato YYYY-MM-DD)
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $fechaNacimiento)) {
    echo json_encode(['success' => false, 'message' => 'Formato de fecha inválido.']);
    exit;
}

// Procesar y guardar la imagen de avatar
$rutaAvatar = guardarAvatar($avatarImagen, $_SESSION['correo']);

if (!$rutaAvatar) {
    echo json_encode(['success' => false, 'message' => 'Error al procesar la imagen de perfil.']);
    exit;
}

$correo = $_SESSION['correo'];
$correoEsc = $conn->real_escape_string($correo);
$ubicacionEsc = $conn->real_escape_string($ubicacion);
$fechaEsc = $conn->real_escape_string($fechaNacimiento);
$rutaAvatarEsc = $conn->real_escape_string($rutaAvatar);

// Si no existe el ID en la sesión, obtenerlo de la base de datos
if (!isset($_SESSION['id'])) {
    $stmt = $conn->prepare("SELECT id_usuario FROM Usuario WHERE correo = ?");
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $_SESSION['id'] = $user['id_usuario'];
    }
    $stmt->close();
}

// Actualizar el usuario con la fecha de nacimiento, ubicación y avatar
$sql = "UPDATE Usuario SET f_nacimiento = '$fechaEsc', ubicacion = '$ubicacionEsc', img_usuario = '$rutaAvatarEsc' WHERE correo = '$correoEsc'";

if ($conn->query($sql)) {
    // Actualización exitosa: redirigir al inicio o al perfil
    echo json_encode(['success' => true, 'redirect' => '../index.php']);
    exit;
} else {
    echo json_encode(['success' => false, 'message' => 'Error al actualizar perfil. Intenta de nuevo.']);
    exit;
}

// Función para guardar la imagen del avatar
function guardarAvatar($imagenBase64, $correo) {
    // Validar que sea una imagen en base64
    if (!preg_match('/^data:image\/(\w+);base64,/', $imagenBase64, $type)) {
        return false;
    }
    
    // Obtener la extensión de la imagen
    $imageType = strtolower($type[1]);
    
    // Validar tipos de imagen permitidos
    $tiposPermitidos = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    if (!in_array($imageType, $tiposPermitidos)) {
        return false;
    }
    
    // Remover el prefijo data:image/...;base64,
    $imagenBase64 = preg_replace('/^data:image\/\w+;base64,/', '', $imagenBase64);
    $imagenDecodificada = base64_decode($imagenBase64);
    
    if ($imagenDecodificada === false) {
        return false;
    }
    
    // Crear directorio si no existe
    $directorioDestino = '../recursos/imagenes/perfiles/';
    if (!file_exists($directorioDestino)) {
        mkdir($directorioDestino, 0777, true);
    }
    
    // Generar nombre fijo basado en el correo del usuario (siempre el mismo)
    $nombreArchivo = 'avatar_' . md5($correo) . '.' . $imageType;
    $rutaCompleta = $directorioDestino . $nombreArchivo;
    
    // Si ya existe un avatar anterior, eliminarlo primero
    // Buscar archivos con el mismo prefijo pero diferentes extensiones
    $prefijo = 'avatar_' . md5($correo);
    $archivos = glob($directorioDestino . $prefijo . '.*');
    foreach ($archivos as $archivoAnterior) {
        if (file_exists($archivoAnterior)) {
            unlink($archivoAnterior);
        }
    }
    
    // Guardar la imagen
    if (file_put_contents($rutaCompleta, $imagenDecodificada)) {
        // Retornar la ruta relativa para guardar en la BD
        return 'recursos/imagenes/perfiles/' . $nombreArchivo;
    }
    
    return false;
}
?>
