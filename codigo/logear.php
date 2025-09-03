<?php
// =============================
// logear.php
// Autentica un usuario usando correo y contraseña.
// Se realiza una consulta a la base de datos para verificar las credenciales.
// En éxito redirige a index.html
// =============================

session_start();                     // Inicia sesión para guardar datos del usuario autenticado
require 'database.php';              // Conexión a la base de datos ($conn)

// Obtener datos del formulario (POST).
$correo = isset($_POST['identificador']) ? trim($_POST['identificador']) : '';
$pass   = isset($_POST['contrasena']) ? trim($_POST['contrasena']) : '';

// Hash SHA-256 (igual a SHA2(...,256) en MySQL) para comparar con lo guardado
$hash = hash('sha256', $pass);

// Se realiza la consulta con verificacion de autenticacion del usuario
$res = $conn->query("SELECT id, correo, nombre_comp FROM Usuario WHERE correo = '$correo' AND contrasena = '$hash'");


if ($res && $res->num_rows === 1) {
    $u = $res->fetch_assoc();
    $_SESSION['id'] = $u['id'];
    $_SESSION['correo'] = $u['correo'];
    $_SESSION['nombre'] = $u['nombre_comp'];
    echo json_encode(['success' => true, 'redirect' => 'index.html']);
} else {
    echo json_encode(['success' => false, 'message' => 'No coincide el email o la contraseña.']);
}

$res->free();      // Liberar resultado
$conn->close();    // Cerrar conexión
?>


