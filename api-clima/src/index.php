<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permitir peticiones externas

$ciudades = ["Montevideo", "Buenos Aires", "Santiago", "Lima", "Bogotá"];
$condiciones = ["Soleado", "Nublado", "Lluvioso", "Ventoso", "Parcialmente nublado"];

$respuesta = [
    "ciudad" => $ciudades[array_rand($ciudades)],
    "temperatura" => rand(10, 35),
    "humedad" => rand(40, 90),
    "condicion" => $condiciones[array_rand($condiciones)],
    "ultima_actualizacion" => date("Y-m-d H:i:s")
];

echo json_encode($respuesta, JSON_PRETTY_PRINT);
