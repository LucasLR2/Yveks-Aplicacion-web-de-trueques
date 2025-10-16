<?php
// =============================
// registrar.php
// Crea un nuevo usuario básico.
// Campos esperados (POST): nombre, correo, contrasena, terminos (checkbox)
// =============================

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
    // Registro exitoso: responder con JSON para JS
    echo json_encode(['success' => true, 'redirect' => 'iniciar-sesion.php']);
    exit;
} else {
    echo json_encode(['success' => false, 'message' => 'Error al registrar. Intenta de nuevo.']);
    exit;
}
?>