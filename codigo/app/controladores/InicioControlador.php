<?php
// app/controladores/InicioControlador.php

class InicioControlador {
    public function index() {
        $usuario = $_SESSION['usuario'] ?? null;

        // A futuro: traer productos desde la base de datos mediante el modelo Producto
        // $productos = Producto::obtenerDestacados();

        // Datos a pasar a la vista
        $data = [
            'usuario'    => $usuario,
            'isLoggedIn' => $usuario !== null,
            // 'productos' => $productos
        ];

        // Hacer accesibles las variables en las vistas
        extract($data);

        // Carga de layouts y vista
        require __DIR__ . '/../vistas/layouts/header.php';
        require __DIR__ . '/../vistas/inicio/inicio.php';
        require __DIR__ . '/../vistas/layouts/footer.php';
    }
}
