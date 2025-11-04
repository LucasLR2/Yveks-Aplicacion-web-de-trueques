<?php
session_start();
require_once __DIR__ . '/database.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// API Key de Groq
$GROQ_API_KEY = "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";

// =====================================================
// ENDPOINT: Enviar mensaje al chatbot
// =====================================================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $mensaje = $data['mensaje'] ?? '';
    $idUsuario = $_SESSION['id'] ?? null;
    
    if (empty($mensaje)) {
        echo json_encode(['error' => 'Mensaje vacío']);
        exit;
    }
    
    // Obtener contexto del usuario
    $contexto = obtenerContextoUsuario($conn, $idUsuario);
    
    // Procesar con IA o fallback
    $respuesta = procesarMensajeConIA($mensaje, $contexto, $GROQ_API_KEY);
    
    // Si la IA falla, usar sistema de patrones
    if (!$respuesta) {
        $respuesta = procesarMensajeConPatrones($mensaje, $contexto, $conn);
    }
    
    // Guardar historial
    if ($idUsuario) {
        guardarHistorialChat($conn, $idUsuario, $mensaje, $respuesta);
    }
    
    echo json_encode([
        'success' => true,
        'respuesta' => $respuesta,
        'sugerencias' => generarSugerencias($mensaje, $contexto)
    ]);
    exit;
}

// =====================================================
// ENDPOINT: Obtener historial de chat
// =====================================================
if (isset($_GET['historial'])) {
    $idUsuario = $_SESSION['id'] ?? null;
    
    if (!$idUsuario) {
        echo json_encode(['success' => false, 'mensajes' => []]);
        exit;
    }
    
    $stmt = $conn->prepare("
        SELECT mensaje_usuario, respuesta_bot, fecha 
        FROM ChatbotHistorial 
        WHERE id_usuario = ? 
        ORDER BY fecha DESC 
        LIMIT 20
    ");
    $stmt->bind_param("i", $idUsuario);
    $stmt->execute();
    $result = $stmt->get_result();
    $historial = [];
    while ($row = $result->fetch_assoc()) {
        $historial[] = $row;
    }
    
    echo json_encode(['success' => true, 'mensajes' => array_reverse($historial)]);
    exit;
}

// =====================================================
// ENDPOINT: Marcar chatbot como visto
// =====================================================
if (isset($_GET['marcar_visto'])) {
    $idUsuario = $_SESSION['id'] ?? null;
    
    if ($idUsuario) {
        $stmt = $conn->prepare("UPDATE Usuario SET chatbot_visto = 1 WHERE id_usuario = ?");
        $stmt->bind_param("i", $idUsuario);
        $stmt->execute();
    }
    
    echo json_encode(['success' => true]);
    exit;
}

// =====================================================
// ENDPOINT: Verificar si es nuevo usuario
// =====================================================
if (isset($_GET['es_nuevo'])) {
    $idUsuario = $_SESSION['id'] ?? null;
    
    if (!$idUsuario) {
        echo json_encode(['es_nuevo' => true]);
        exit;
    }
    
    $stmt = $conn->prepare("SELECT chatbot_visto FROM Usuario WHERE id_usuario = ?");
    $stmt->bind_param("i", $idUsuario);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    
    echo json_encode(['es_nuevo' => !($user['chatbot_visto'] ?? 0)]);
    exit;
}

// =====================================================
// FUNCIONES AUXILIARES
// =====================================================

function obtenerContextoUsuario($conn, $idUsuario) {
    $contexto = [
        'nombre' => 'Usuario',
        'productos_publicados' => 0,
        'ofertas_recibidas' => 0,
        'categorias_favoritas' => [],
        'productos_recientes' => []
    ];
    
    if (!$idUsuario) return $contexto;
    
    // Obtener nombre
    $stmt = $conn->prepare("SELECT nombre_comp FROM Usuario WHERE id_usuario = ?");
    $stmt->bind_param("i", $idUsuario);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($user = $result->fetch_assoc()) {
        $contexto['nombre'] = explode(' ', $user['nombre_comp'])[0];
    }
    
    // Productos publicados
    $stmt = $conn->prepare("SELECT COUNT(*) as total FROM Publica WHERE id_usuario = ?");
    $stmt->bind_param("i", $idUsuario);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        $contexto['productos_publicados'] = $row['total'];
    }
    
    // Ofertas recibidas
    $stmt = $conn->prepare("
        SELECT COUNT(*) as total 
        FROM PropuestaIntercambio pi
        JOIN Publica pub ON pub.id_producto = pi.id_prod_solicitado
        WHERE pub.id_usuario = ? AND pi.estado = 'pendiente'
    ");
    $stmt->bind_param("i", $idUsuario);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        $contexto['ofertas_recibidas'] = $row['total'];
    }
    
    // Categorías favoritas (basado en sus productos)
    $stmt = $conn->prepare("
        SELECT p.categoria, COUNT(*) as total 
        FROM Producto p
        JOIN Publica pub ON pub.id_producto = p.id_producto
        WHERE pub.id_usuario = ?
        GROUP BY p.categoria
        ORDER BY total DESC
        LIMIT 3
    ");
    $stmt->bind_param("i", $idUsuario);
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $contexto['categorias_favoritas'][] = $row['categoria'];
    }
    
    return $contexto;
}

function procesarMensajeConIA($mensaje, $contexto, $apiKey) {
    // Construir el prompt con contexto
    $systemPrompt = "Eres un asistente virtual de Dreva, una plataforma de intercambio de productos. 
Tu objetivo es ayudar a los usuarios a encontrar productos, responder preguntas sobre la plataforma y sugerir intercambios relevantes.

INFORMACIÓN DEL USUARIO:
- Nombre: {$contexto['nombre']}
- Productos publicados: {$contexto['productos_publicados']}
- Ofertas pendientes: {$contexto['ofertas_recibidas']}
- Categorías de interés: " . implode(', ', $contexto['categorias_favoritas']) . "

INSTRUCCIONES:
- Sé amigable, conciso y útil
- Si preguntan sobre productos, ofrece buscar en la plataforma
- Si preguntan cómo funciona, explica el sistema de trueques
- Usa emojis ocasionalmente para ser más cercano
- Menciona su nombre si es relevante
- Máximo 3-4 líneas de respuesta";

    $userMessage = $mensaje;
    
    // Llamar a la API de Groq
    $ch = curl_init('https://api.groq.com/openai/v1/chat/completions');
    
    $data = [
        'model' => 'llama-3.3-70b-versatile',
        'messages' => [
            ['role' => 'system', 'content' => $systemPrompt],
            ['role' => 'user', 'content' => $userMessage]
        ],
        'temperature' => 0.7,
        'max_tokens' => 200
    ];
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        $result = json_decode($response, true);
        return $result['choices'][0]['message']['content'] ?? null;
    }
    
    return null;
}

function procesarMensajeConPatrones($mensaje, $contexto, $conn) {
    $mensaje = strtolower(trim($mensaje));
    
    // Saludos
    if (preg_match('/^(hola|hey|buenas|buenos dias|buenas tardes|hi|hello)/', $mensaje)) {
        return "¡Hola {$contexto['nombre']}! 👋 ¿En qué puedo ayudarte hoy? Puedo ayudarte a buscar productos, explicarte cómo funciona Dreva o sugerirte intercambios.";
    }
    
    // Búsqueda de productos
    if (preg_match('/(buscar|busco|quiero|necesito|tengo|producto|intercambio)/i', $mensaje)) {
        // Extraer posible categoría o producto del mensaje
        $categorias = ['tecnologia', 'hogar', 'ropa', 'deportes', 'entretenimiento', 'mascotas', 'herramientas'];
        foreach ($categorias as $cat) {
            if (stripos($mensaje, $cat) !== false) {
                return "¡Perfecto! Te puedo ayudar a buscar en la categoría de $cat. ¿Qué tipo de producto específico estás buscando?";
            }
        }
        return "Puedo ayudarte a buscar productos. ¿Qué estás buscando específicamente? También puedes explorar nuestras categorías: Tecnología, Hogar, Ropa, Deportes y más.";
    }
    
    // Cómo funciona
    if (preg_match('/(como funciona|que es|explicar|ayuda|como uso)/i', $mensaje)) {
        return "Dreva es simple: \n1️⃣ Publica productos que ya no uses\n2️⃣ Busca lo que necesites\n3️⃣ Haz ofertas de intercambio\n4️⃣ ¡Chatea y concreta el trueque! Sin dinero de por medio 😊";
    }
    
    // Ofertas
    if (preg_match('/(oferta|ofrecer|propuesta)/i', $mensaje)) {
        if ($contexto['ofertas_recibidas'] > 0) {
            return "Tienes {$contexto['ofertas_recibidas']} ofertas pendientes en tus productos. ¿Quieres que te ayude a revisarlas?";
        }
        return "Para hacer una oferta, busca el producto que te interesa y haz clic en 'Hacer oferta'. Podrás proponer uno de tus productos a cambio.";
    }
    
    // Publicar
    if (preg_match('/(publicar|subir|agregar|crear) producto/i', $mensaje)) {
        return "Para publicar un producto, ve a la sección 'Nuevo Producto' en el menú. Necesitarás fotos, descripción y elegir una categoría. ¿Te ayudo con algo más específico?";
    }
    
    // Respuesta por defecto
    return "Entiendo que necesitas ayuda. Puedo asistirte con:\n• Buscar productos\n• Explicar cómo funciona Dreva\n• Gestionar tus ofertas\n• Publicar productos\n\n¿Sobre qué quieres saber más?";
}

function generarSugerencias($mensaje, $contexto) {
    $mensaje = strtolower($mensaje);
    
    // Sugerencias dinámicas según el mensaje
    if (preg_match('/(hola|hey|buenas)/i', $mensaje)) {
        return [
            '🔍 Buscar productos',
            '❓ ¿Cómo funciona?',
            '📦 Mis productos'
        ];
    }
    
    if (preg_match('/(buscar|producto)/i', $mensaje)) {
        return [
            '💻 Tecnología',
            '🏠 Hogar',
            '👕 Ropa'
        ];
    }
    
    if (preg_match('/(como funciona|ayuda)/i', $mensaje)) {
        return [
            '📝 Publicar producto',
            '🤝 Hacer una oferta',
            '💬 Chatear con usuarios'
        ];
    }
    
    // Sugerencias por defecto
    return [
        '🔍 Buscar productos',
        '❓ ¿Cómo funciona?',
        '📦 Ver mis ofertas'
    ];
}

function guardarHistorialChat($conn, $idUsuario, $mensaje, $respuesta) {
    $stmt = $conn->prepare("
        INSERT INTO ChatbotHistorial (id_usuario, mensaje_usuario, respuesta_bot, fecha)
        VALUES (?, ?, ?, NOW())
    ");
    $stmt->bind_param("iss", $idUsuario, $mensaje, $respuesta);
    $stmt->execute();
}

// Respuesta por defecto si no hay endpoint válido
echo json_encode(['error' => 'Endpoint no válido']);