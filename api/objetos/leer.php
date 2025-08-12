<?php
header("Content-Type: application/json");
require_once "../config/database.php";

$stmt = $conn->prepare("SELECT * FROM objetos ORDER BY fecha_publicacion DESC");
$stmt->execute();

$objetos = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($objetos);
?>
