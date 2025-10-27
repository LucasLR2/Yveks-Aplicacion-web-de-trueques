<?php
    session_start();
    header('Content-Type: application/json');
    require_once 'database.php';

    if (isset($_SESSION['id'])) {
        $idUsuario = $_SESSION['id'];
        
        // Obtener datos del usuario incluyendo la imagen
        $stmt = $conn->prepare("SELECT nombre_comp, correo, img_usuario FROM Usuario WHERE id_usuario = ?");
        $stmt->bind_param("i", $idUsuario);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $usuario = $result->fetch_assoc();
            
            // Determinar la ruta de la imagen
            // Si img_usuario ya tiene la ruta completa desde recursos/, usarla directamente
            // Si no tiene imagen, usar el icono por defecto
            $imgUsuario = $usuario['img_usuario'] 
                ? $usuario['img_usuario']  // Ya viene como "recursos/imagenes/perfiles/avatar_xxx.jpg"
                : 'recursos/iconos/solido/comunicacion/usuario.svg';
            
            echo json_encode([
                'logueado' => true,
                'nombre' => $usuario['nombre_comp'],
                'correo' => $usuario['correo'],
                'img_usuario' => $imgUsuario,
                'id' => $idUsuario
            ]);
        } else {
            echo json_encode([
                'logueado' => false
            ]);
        }
        
        $stmt->close();
        $conn->close();
    } else {
        echo json_encode([
            'logueado' => false
        ]);
    }
?>