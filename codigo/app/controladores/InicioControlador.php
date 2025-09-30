<?php
// app/controladores/InicioControlador.php

class InicioControlador {
    public function index() {
        $usuario = $_SESSION['usuario'] ?? null;

        $data = [
            'usuario' => $usuario,
            'isLoggedIn' => $usuario !== null
        ];

        // Cargar vista con layout
        require __DIR__ . '/../vistas/layouts/header.php';
        require __DIR__ . '/../vistas/home/index.php';
        require __DIR__ . '/../vistas/layouts/footer.php';
    }
}
