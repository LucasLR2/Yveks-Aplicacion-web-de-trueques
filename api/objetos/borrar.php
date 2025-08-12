<?php
header("Content-Type: application/json");
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $stmt = $conn->prepare("DELETE FROM objetos WHERE id = :id");
    $stmt->bindParam(":id", $data->id);
    
    if ($stmt->execute()) {
        echo json_encode(["message" => "Objeto eliminado."]);
    } else {
        echo json_encode(["message" => "Error al eliminar."]);
    }
} else {
    echo json_encode(["message" => "ID no proporcionado."]);
}
?>
