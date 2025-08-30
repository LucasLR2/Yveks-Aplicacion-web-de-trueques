<?php
// =============================
// registrar.php
// Crea un nuevo usuario básico.
// Campos esperados (POST): nombre, correo, contrasena, terminos (checkbox)
// Respuestas vía query string (?estado=):
//   campos -> faltan campos o no aceptó términos
//   dup    -> correo ya existe
//   ok     -> registro exitoso
//   error  -> error al insertar
// =============================

require 'database.php'; // Abre conexión $conn

// Función pequeña para redirigir con código de estado y terminar.
function redir($code){
    header('Location: registrarse.html?estado='.$code);
    exit;
}

// Recibir y limpiar los campos (trim quita espacios al inicio/fin)
$nombre   = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
$correo   = isset($_POST['correo']) ? trim($_POST['correo']) : '';
$pass     = isset($_POST['contrasena']) ? trim($_POST['contrasena']) : '';
$terminos = isset($_POST['terminos']) ? '1' : '';

// Validación: todos obligatorios + términos marcados
if ($nombre === '' || $correo === '' || $pass === '' || $terminos === '') {
    redir('campos');
}

// Evitar duplicados: buscar si ya existe el correo
$correoEsc = $conn->real_escape_string($correo);  // Escapar para evitar problemas con comillas
$existe = $conn->query("SELECT 1 FROM Usuario WHERE correo='$correoEsc' LIMIT 1");
if ($existe && $existe->num_rows > 0) {
    redir('dup');
}

// Hashear la contraseña (SHA-256). En producción usar password_hash.
$hash = hash('sha256', $pass);
$nombreEsc = $conn->real_escape_string($nombre);

// Insertar nuevo usuario con rol fijo 'usuario'
$sql = "INSERT INTO Usuario (nombre_comp, correo, contrasena, rol) VALUES ('$nombreEsc', '$correoEsc', '$hash', 'usuario')";
if ($conn->query($sql)) {
    redir('ok');
} else {
    redir('error');
}
?>