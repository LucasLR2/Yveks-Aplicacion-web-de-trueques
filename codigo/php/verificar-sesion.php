<?php
    session_start();
    header('Content-Type: application/json');

    echo json_encode([
        'logueado' => isset($_SESSION['nombre'])
    ]);
?>