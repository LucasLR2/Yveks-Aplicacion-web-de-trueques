<?php
header("Content-Type: application/json");
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->nombre) && !empty($data->descripcion)) {
    $sql = "INSERT INTO objetos (nombre, descripcion, estado, categoria, propietario) 
            VALUES (:nombre, :descripcion, :estado, :categoria, :propietario)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":nombre", $data->nombre);
    $stmt->bindParam(":descripcion", $data->descripcion);
    $stmt->bindParam(":estado", $data->estado);
    $stmt->bindParam(":categoria", $data->categoria);
    $stmt->bindParam(":propietario", $data->propietario);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Objeto creado."]);
    } else {
        echo json_encode(["message" => "No se pudo crear el objeto."]);
    }
} else {
    echo json_encode(["message" => "Faltan datos obligatorios."]);
}
?>
