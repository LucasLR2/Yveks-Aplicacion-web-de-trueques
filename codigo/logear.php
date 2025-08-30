<?php
// =============================
// logear.php
// Autentica un usuario usando correo y contraseña.
// Se listan todos los usuarios y se compara en PHP (en proyectos reales conviene filtrar en la consulta para eficiencia).
// Retornos:
//   ?error=campos        -> faltan datos
//   ?error=consulta      -> fallo al obtener usuarios
//   ?error=credenciales  -> correo o contraseña no coinciden
// En éxito redirige a index.html
// =============================

session_start();                     // Inicia sesión para guardar datos del usuario autenticado
require 'database.php';              // Conexión a la base de datos ($conn)

// Obtener datos del formulario (POST). Si no vienen, quedan como cadena vacía.
$correo = isset($_POST['identificador']) ? trim($_POST['identificador']) : '';
$pass   = isset($_POST['contrasena']) ? trim($_POST['contrasena']) : '';

// Validación simple: ambos campos son obligatorios
if ($correo === '' || $pass === '') {
	header('Location: iniciarsesion.html?error=campos');
	exit; 
}

// Hash SHA-256 (igual a SHA2(...,256) en MySQL) para comparar con lo guardado
$hash = hash('sha256', $pass);

// Traer todos los usuarios (solo columnas necesarias)
$res = $conn->query("SELECT correo, contrasena, nombre_comp FROM Usuario");
if (!$res) { // Si la consulta falla
	header('Location: iniciarsesion.html?error=consulta');
	exit; 
}

$ok = false; // Bandera de autenticación correcta
while ($u = $res->fetch_assoc()) {               // Recorrer resultados
	// strcasecmp -> compara ignorando mayúsculas/minúsculas en el correo
	if (strcasecmp($u['correo'], $correo) === 0 && $u['contrasena'] === $hash) {
		// Guardar datos mínimos en sesión y marcar como autenticado
		$_SESSION['correo'] = $u['correo'];
		$_SESSION['nombre'] = $u['nombre_comp'];
		$ok = true;
		break; // No hace falta seguir
	}
}
$res->free();      // Liberar resultado
$conn->close();    // Cerrar conexión

// Redirecciones finales según resultado
if ($ok) {
	header('Location: index.html');
} else {
	header('Location: iniciarsesion.html?error=credenciales');
}
exit; // Terminar script
?>


