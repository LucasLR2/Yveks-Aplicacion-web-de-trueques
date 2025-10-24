<?php
// =============================
// registrar.php
// Crea un nuevo usuario básico.
// Campos esperados (POST): nombre, correo, contrasena, terminos (checkbox)
// =============================

session_start();
require 'database.php'; // Abre conexión $conn

// Recibir y limpiar los campos (trim quita espacios al inicio/fin)
$nombre   = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
$correo   = isset($_POST['correo']) ? trim($_POST['correo']) : '';
$pass     = isset($_POST['contrasena']) ? trim($_POST['contrasena']) : '';
$terminos = isset($_POST['terminos']) ? '1' : '';

$correoEsc = $conn->real_escape_string($correo);  // escape para evitar problemas con comillas
// Hashear la contraseña (SHA-256).
$hash = hash('sha256', $pass);
$nombreEsc = $conn->real_escape_string($nombre);

// Insertar nuevo usuario con rol fijo 'usuario'
$sql = "INSERT INTO Usuario (nombre_comp, correo, contrasena, rol) VALUES ('$nombreEsc', '$correoEsc', '$hash', 'usuario')";
if ($conn->query($sql)) {
    // Obtener el ID del usuario recién creado
    $id_usuario = $conn->insert_id;
    
    // Registro exitoso: iniciar sesión automáticamente
    $_SESSION['id'] = $id_usuario;
    $_SESSION['correo'] = $correo;
    $_SESSION['nombre'] = $nombre;
    
    // Redirigir a completar perfil
    echo json_encode(['success' => true, 'redirect' => 'completar_perfil.php']);
    exit;
} else {
    echo json_encode(['success' => false, 'message' => 'Error al registrar. Intenta de nuevo.']);
    exit;
}
?>
