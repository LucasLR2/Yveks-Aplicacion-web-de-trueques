<?php
class UsuarioControlador {
    public function dashboard() {
        session_start();

        $usuario = $_SESSION['usuario'] ?? null;

        $data = [
            'usuario' => $usuario,
            'isLoggedIn' => $usuario !== null
        ];

        require_once __DIR__ . '/../vistas/layouts/header.php';
        require_once __DIR__ . '/../vistas/usuario/dashboard.php';
    }
}