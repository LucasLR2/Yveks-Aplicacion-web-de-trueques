<?php
// =============================
// logear.php
// Autentica un usuario usando correo y contraseña.
// Se realiza una consulta a la base de datos para verificar las credenciales.
// En éxito redirige a index.html
// =============================

session_start();                     // Inicia sesión para guardar datos del usuario autenticado
require 'database.php';              // Conexión a la base de datos ($conn)

header('Content-Type: application/json');

$correo = isset($_POST['identificador']) ? trim($_POST['identificador']) : '';
$pass   = isset($_POST['contrasena']) ? trim($_POST['contrasena']) : '';
$hash = hash('sha256', $pass);

$stmt = $conn->prepare("SELECT id_usuario, correo, nombre_comp FROM Usuario WHERE correo = ? AND contrasena = ?");
if ($stmt) {
    $stmt->bind_param('ss', $correo, $hash);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res && $res->num_rows === 1) {
        $u = $res->fetch_assoc();
        $_SESSION['id'] = $u['id_usuario'];
        $_SESSION['correo'] = $u['correo'];
        $_SESSION['nombre'] = $u['nombre_comp'];
        echo json_encode(['success' => true, 'redirect' => 'index.php']);
    } else {
        echo json_encode(['success' => false, 'message' => 'No coincide el email o la contraseña.']);
    }
    $res->free();
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Error al preparar la consulta.']);
}
$conn->close();
?>


