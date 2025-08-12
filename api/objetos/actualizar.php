<?php
header("Content-Type: application/json");
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $sql = "UPDATE objetos SET nombre = :nombre, descripcion = :descripcion, 
            estado = :estado, categoria = :categoria WHERE id = :id";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":id", $data->id);
    $stmt->bindParam(":nombre", $data->nombre);
    $stmt->bindParam(":descripcion", $data->descripcion);
    $stmt->bindParam(":estado", $data->estado);
    $stmt->bindParam(":categoria", $data->categoria);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Objeto actualizado."]);
    } else {
        echo json_encode(["message" => "Error al actualizar."]);
    }
} else {
    echo json_encode(["message" => "ID no proporcionado."]);
}
?>
