<?php
session_start();
header('Content-Type: application/json');
require_once 'database.php';

// Verificar que el usuario esté autenticado
if (!isset($_SESSION['id'])) {
    error_log("DEBUG - Cambiar password: Usuario no autenticado");
    echo json_encode(['success' => false, 'message' => 'No autenticado']);
    exit;
}

error_log("DEBUG - Cambiar password: ID de sesión: " . $_SESSION['id']);

// Verificar que sea una petición POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error_log("DEBUG - Cambiar password: Método no es POST");
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Obtener datos del formulario
$passwordActual = $_POST['password_actual'] ?? '';
$passwordNueva = $_POST['password_nueva'] ?? '';

error_log("DEBUG - Cambiar password: Password actual recibido: " . (empty($passwordActual) ? 'VACÍO' : 'OK'));
error_log("DEBUG - Cambiar password: Password nueva recibido: " . (empty($passwordNueva) ? 'VACÍO' : 'OK'));

// Validaciones básicas
if (empty($passwordActual) || empty($passwordNueva)) {
    error_log("DEBUG - Cambiar password: Campos vacíos");
    echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios']);
    exit;
}

if (strlen($passwordNueva) < 6) {
    error_log("DEBUG - Cambiar password: Password nueva muy corta");
    echo json_encode(['success' => false, 'message' => 'La contraseña debe tener al menos 6 caracteres']);
    exit;
}

$idUsuario = $_SESSION['id'];

try {
    // Obtener la contraseña actual del usuario
    $stmt = $conn->prepare("SELECT contrasena FROM Usuario WHERE id_usuario = ?");
    $stmt->bind_param("i", $idUsuario);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        error_log("DEBUG - Cambiar password: Usuario no encontrado en BD con ID: " . $idUsuario);
        echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
        exit;
    }
    
    $usuario = $result->fetch_assoc();
    error_log("DEBUG - Cambiar password: Hash en BD: " . $usuario['contrasena']);
    
    // Hashear la contraseña actual ingresada con SHA-256 (así se guardan en la BD)
    $hashPasswordActual = hash('sha256', $passwordActual);
    error_log("DEBUG - Cambiar password: Hash de password actual ingresado: " . $hashPasswordActual);
    
    // Verificar la contraseña actual
    if ($hashPasswordActual !== $usuario['contrasena']) {
        error_log("DEBUG - Cambiar password: Hashes no coinciden");
        echo json_encode(['success' => false, 'message' => 'La contraseña actual es incorrecta']);
        exit;
    }
    
    error_log("DEBUG - Cambiar password: Password actual verificado correctamente");
    
    // Hashear la nueva contraseña con SHA-256
    $hashPasswordNueva = hash('sha256', $passwordNueva);
    error_log("DEBUG - Cambiar password: Hash de password nueva: " . $hashPasswordNueva);
    
    // Verificar que la nueva contraseña sea diferente
    if ($hashPasswordNueva === $usuario['contrasena']) {
        error_log("DEBUG - Cambiar password: Password nueva es igual a la actual");
        echo json_encode(['success' => false, 'message' => 'La nueva contraseña debe ser diferente a la actual']);
        exit;
    }
    
    // Actualizar la contraseña
    $stmt = $conn->prepare("UPDATE Usuario SET contrasena = ? WHERE id_usuario = ?");
    $stmt->bind_param("si", $hashPasswordNueva, $idUsuario);
    
    if ($stmt->execute()) {
        error_log("DEBUG - Cambiar password: Contraseña actualizada exitosamente para usuario ID: " . $idUsuario);
        echo json_encode(['success' => true, 'message' => 'Contraseña actualizada exitosamente']);
    } else {
        error_log("DEBUG - Cambiar password: Error al ejecutar UPDATE: " . $stmt->error);
        echo json_encode(['success' => false, 'message' => 'Error al actualizar la contraseña']);
    }
    
    $stmt->close();
    
} catch (Exception $e) {
    error_log("DEBUG - Cambiar password: Excepción: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Error en el servidor: ' . $e->getMessage()]);
}

$conn->close();
?>
