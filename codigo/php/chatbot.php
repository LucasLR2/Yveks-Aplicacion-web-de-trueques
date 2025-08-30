<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$port = 8889; 
$dbname = "intercambio";
$user = "root";
$pass = "root";

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
    exit;
}


if (isset($_GET['producto'])) {
    $producto = strtolower(trim($_GET['producto']));
    $producto_normalizado = iconv('UTF-8', 'ASCII//TRANSLIT', $producto);

    $stmt = $pdo->prepare("
        SELECT DISTINCT p2.categoria 
        FROM PropuestaIntercambio pi
        JOIN Producto p1 ON pi.id_prod_solicitado = p1.id_producto
        JOIN Producto p2 ON pi.id_prod_ofrecido = p2.id_producto
        WHERE LOWER(CONVERT(p1.titulo USING utf8)) LIKE ?
    ");
    $stmt->execute(["%$producto_normalizado%"]);
    $categorias = $stmt->fetchAll(PDO::FETCH_COLUMN);

    if (empty($categorias)) {
        echo json_encode(["mensaje" => "No encontré categorías de intercambio para ese producto."]);
    } else {
        echo json_encode(["categorias" => $categorias]);
    }
    exit;
}

if (isset($_GET['categoria'])) {
    $categoria = strtolower(trim($_GET['categoria']));

    $stmt = $pdo->prepare("
        SELECT titulo 
        FROM Producto 
        WHERE LOWER(categoria) = ?
    ");
    $stmt->execute([$categoria]);
    $productos = $stmt->fetchAll(PDO::FETCH_COLUMN);

    if (empty($productos)) {
        echo json_encode(["mensaje" => "No encontré productos en esa categoría."]);
    } else {
        echo json_encode(["productos" => $productos]);
    }
    exit;
}

echo json_encode(["error" => "Parámetros inválidos. Usa ?producto= o ?categoria="]);
