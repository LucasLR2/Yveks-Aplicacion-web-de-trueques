<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");


$host = "127.0.0.1";
$port = 8889;
$dbname = "dreva";
$user = "root";
$pass = "root";

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
    exit;
}

function normalize($text) {
    $map = [
        'á'=>'a','é'=>'e','í'=>'i','ó'=>'o','ú'=>'u',
        'Á'=>'a','É'=>'e','Í'=>'i','Ó'=>'o','Ú'=>'u',
        'ñ'=>'n','Ñ'=>'n'
    ];
    return mb_strtolower(strtr($text, $map), 'UTF-8');
}


if (isset($_GET['producto'])) {
    $producto_raw = trim($_GET['producto']);
    
    if ($producto_raw === '') {
        echo json_encode([
            "ok" => false,
            "error" => "No escribiste ningún producto."
        ]);
        exit;
    }

    $producto_busqueda = normalize($producto_raw);

    try {

$sql = "SELECT DISTINCT p2.nombre AS producto_ofrecido
                FROM PropuestaIntercambio pi
                JOIN Producto p1 ON pi.id_prod_solicitado = p1.id_producto
                JOIN Producto p2 ON pi.id_prod_ofrecido = p2.id_producto
                WHERE 1=1";

        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $propuestas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $productos_encontrados = [];
        
        foreach ($propuestas as $row) {

$sql_solicitado = "SELECT p.nombre 
                              FROM Producto p 
                              JOIN PropuestaIntercambio pi ON p.id_producto = pi.id_prod_solicitado 
                              WHERE pi.id_prod_ofrecido IN (
                                  SELECT id_producto FROM Producto WHERE nombre = :nombre_ofrecido
                              )";
            $stmt_sol = $pdo->prepare($sql_solicitado);
            $stmt_sol->execute(['nombre_ofrecido' => $row['producto_ofrecido']]);
            $solicitados = $stmt_sol->fetchAll(PDO::FETCH_COLUMN);
            
            foreach ($solicitados as $nombre_solicitado) {
                if (strpos(normalize($nombre_solicitado), $producto_busqueda) !== false) {
                    $productos_encontrados[] = $row['producto_ofrecido'];
                    break;
                }
            }
        }

        // elimina duplicados
        $productos_encontrados = array_unique($productos_encontrados);

        if (empty($productos_encontrados)) {
            echo json_encode([
                "ok" => true,
                "mensaje" => "No hay artículos registrados que puedan intercambiarse por '$producto_raw'.",
                "productos" => []
            ]);
        } else {
            echo json_encode([
                "ok" => true,
                "mensaje" => "A cambio de '$producto_raw' podés intercambiar:",
                "productos" => array_values($productos_encontrados)
            ]);
        }

    } catch (PDOException $e) {
        echo json_encode([
            "ok" => false,
            "error" => "Error en consulta: " . $e->getMessage()
        ]);
    }
    exit;
}

if (isset($_GET['productos_solicitados'])) {
    try {
        // consulta para obtener los productos más solicitados con contador
        $sql = "SELECT p1.nombre AS producto_solicitado, COUNT(*) AS cantidad
                FROM PropuestaIntercambio pi
                JOIN Producto p1 ON pi.id_prod_solicitado = p1.id_producto
                GROUP BY p1.id_producto, p1.nombre
                ORDER BY cantidad DESC, p1.nombre ASC
                LIMIT 15";

        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($productos)) {
            echo json_encode([
                "ok" => true,
                "mensaje" => "No hay productos solicitados en este momento.",
                "productos" => []
            ]);
        } else {
//formateo necesario
            $productos_formateados = [];
            foreach ($productos as $prod) {
                $propuestas_text = $prod['cantidad'] == 1 ? "propuesta" : "propuestas";
                $productos_formateados[] = "{$prod['producto_solicitado']} ({$prod['cantidad']} {$propuestas_text} activas)";
            }

            echo json_encode([
                "ok" => true,
                "mensaje" => "¡Podés publicar cualquiera de estos productos si los tenés en tu casa! Ya hay propuestas de intercambio activas esperando por vos:",
                "productos" => $productos_formateados,
                "total" => count($productos)
            ]);
        }
    } catch (PDOException $e) {
        echo json_encode([
            "ok" => false,
            "error" => "Error en consulta: " . $e->getMessage()
        ]);
    }
    exit;
}

// otro - en desarrollo
if (isset($_GET['otro'])) {
    echo json_encode([
        "ok" => true,
        "mensaje" => "🟢 Esta funcionalidad está en desarrollo."
    ]);
    exit;
}

if (isset($_GET['mensaje'])) {
    echo json_encode([
        "ok" => true,
        "respuesta" => "No entendí tu mensaje. Probá con: 'Qué puedo intercambiar por...' o 'Qué productos la gente solicita'."
    ]);
    exit;
}

//invalidos
echo json_encode([
    "ok" => false,
    "error" => "Parámetros inválidos. Usa ?producto=nombre o ?productos_solicitados=1"
]);
?>

