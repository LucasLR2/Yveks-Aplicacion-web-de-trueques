<?php
session_start();
header('Content-Type: application/json');
ob_start();

// Línea 7 de chatbot.php
$conexion = null;
if (file_exists(__DIR__ . '/database.php')) {
    require_once __DIR__ . '/database.php';
} elseif (file_exists(__DIR__ . '/conexion.php')) {
    require_once __DIR__ . '/conexion.php';
}

// Configuración de la API de Grok (xAI)
define('GROK_API_KEY', 'TU_API_KEY_AQUI'); // REEMPLAZAR CON API KEY REAL
define('GROK_API_URL', 'https://api.x.ai/v1/chat/completions');

try {
    // ==========================================
    // PETICIONES GET
    // ==========================================
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        
        if (isset($_GET['estado_usuario'])) {
            $userId = $_SESSION['id_usuario'] ?? null;
            
            $response = [
                'logueado' => $userId !== null, // AÑADIR ESTO
                'es_nuevo' => true,
                'primer_visita' => true,
                'productos_publicados' => 0,
                'ofertas_pendientes' => 0
            ];
            
            if ($userId && isset($conexion)) {
                $stmt = $conexion->prepare("
                    SELECT 
                        u.nombre,
                        (SELECT COUNT(*) FROM productos WHERE id_usuario = ?) as productos,
                        (SELECT COUNT(*) FROM ofertas WHERE id_usuario_destinatario = ? AND estado = 'pendiente') as ofertas,
                        (SELECT COUNT(*) FROM chatbot_conversaciones WHERE id_usuario = ?) as tiene_historial
                    FROM usuarios u
                    WHERE u.id = ?
                ");
                $stmt->bind_param("iiii", $userId, $userId, $userId, $userId);
                $stmt->execute();
                $result = $stmt->get_result()->fetch_assoc();
                
                if ($result) {
                    $response = [
                        'logueado' => true, // IMPORTANTE
                        'nombre' => $result['nombre'] ?? 'Usuario',
                        'es_nuevo' => $result['tiene_historial'] == 0,
                        'primer_visita' => $result['tiene_historial'] == 0,
                        'productos_publicados' => (int)$result['productos'],
                        'ofertas_pendientes' => (int)$result['ofertas']
                    ];
                }
            }
            
            echo json_encode($response);
            exit;
        }
        
        if (isset($_GET['historial'])) {
            $userId = $_SESSION['id_usuario'] ?? null;
            $mensajes = [];
            
            if ($userId && isset($conexion)) {
                $stmt = $conexion->prepare("
                    SELECT mensaje_usuario, respuesta_bot 
                    FROM chatbot_conversaciones 
                    WHERE id_usuario = ? 
                    ORDER BY fecha_creacion DESC 
                    LIMIT 20
                ");
                $stmt->bind_param("i", $userId);
                $stmt->execute();
                $result = $stmt->get_result();
                
                while ($row = $result->fetch_assoc()) {
                    array_unshift($mensajes, [
                        'mensaje_usuario' => $row['mensaje_usuario'],
                        'respuesta_bot' => $row['respuesta_bot']
                    ]);
                }
            }
            
            echo json_encode([
                'success' => true,
                'mensajes' => $mensajes
            ]);
            exit;
        }
        
        if (isset($_GET['marcar_visto'])) {
            echo json_encode(['success' => true]);
            exit;
        }
    }
    
    // ==========================================
    // PETICIONES POST - Procesar con IA
    // ==========================================
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        if (!isset($data['mensaje'])) {
            throw new Exception('Mensaje no proporcionado');
        }
        
        $mensaje = trim($data['mensaje']);
        $userId = $_SESSION['id_usuario'] ?? null;
        
        // DEBUG: Ver qué está pasando
        error_log("USER ID en POST: " . ($userId ?? 'NULL'));
        error_log("SESSION completa: " . print_r($_SESSION, true));
        
        // Obtener contexto del usuario desde la base de datos
        $contextoUsuario = obtenerContextoUsuario($userId, $conexion);
        
        // DEBUG: Ver el contexto
        error_log("Contexto obtenido: " . json_encode($contextoUsuario));
        
        // Generar respuesta con IA de Grok
        $respuesta = generarRespuestaGrok($mensaje, $contextoUsuario);
        
        // Guardar conversación en base de datos
        if ($userId && isset($conexion)) {
            guardarConversacion($userId, $mensaje, $respuesta['respuesta'], $conexion);
        }
        
        echo json_encode($respuesta);
        exit;
    }
    
    throw new Exception('Método no permitido');
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'respuesta' => 'Lo siento, tuve un problema procesando tu mensaje. ¿Puedes intentar de nuevo?'
    ]);
}

ob_end_flush();

// ==========================================
// OBTENER CONTEXTO DEL USUARIO
// ==========================================
function obtenerContextoUsuario($userId, $conexion) {
    if (!$userId || !$conexion) {
        return [
            'logueado' => false,
            'productos' => 0,
            'ofertas_recibidas' => 0,
            'ofertas_enviadas' => 0,
            'intercambios_completados' => 0
        ];
    }
    
    try {
        // Obtener datos del usuario
        $stmt = $conexion->prepare("
            SELECT nombre, email FROM usuarios WHERE id = ?
        ");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $usuario = $stmt->get_result()->fetch_assoc();
        
        // Obtener productos del usuario
        $stmt = $conexion->prepare("
            SELECT COUNT(*) as total FROM productos WHERE id_usuario = ?
        ");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $productos = $stmt->get_result()->fetch_assoc()['total'];
        
        // Obtener ofertas recibidas pendientes
        $stmt = $conexion->prepare("
            SELECT COUNT(*) as total FROM ofertas 
            WHERE id_usuario_destinatario = ? AND estado = 'pendiente'
        ");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $ofertasRecibidas = $stmt->get_result()->fetch_assoc()['total'];
        
        // Obtener ofertas enviadas pendientes
        $stmt = $conexion->prepare("
            SELECT COUNT(*) as total FROM ofertas 
            WHERE id_usuario_origen = ? AND estado = 'pendiente'
        ");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $ofertasEnviadas = $stmt->get_result()->fetch_assoc()['total'];
        
        // Obtener intercambios completados
        $stmt = $conexion->prepare("
            SELECT COUNT(*) as total FROM ofertas 
            WHERE (id_usuario_origen = ? OR id_usuario_destinatario = ?) 
            AND estado = 'aceptada'
        ");
        $stmt->bind_param("ii", $userId, $userId);
        $stmt->execute();
        $completados = $stmt->get_result()->fetch_assoc()['total'];
        
        return [
            'logueado' => true,
            'nombre' => $usuario['nombre'] ?? 'Usuario',
            'productos' => (int)$productos,
            'ofertas_recibidas' => (int)$ofertasRecibidas,
            'ofertas_enviadas' => (int)$ofertasEnviadas,
            'intercambios_completados' => (int)$completados
        ];
        
    } catch (Exception $e) {
        return [
            'logueado' => true,
            'productos' => 0,
            'ofertas_recibidas' => 0,
            'ofertas_enviadas' => 0,
            'intercambios_completados' => 0
        ];
    }
}

// ==========================================
// GENERAR RESPUESTA CON GROK
// ==========================================
function generarRespuestaGrok($mensaje, $contexto) {
    // Construir el prompt con contexto
    $systemPrompt = construirPromptSistema($contexto);
    
    try {
        $ch = curl_init(GROK_API_URL);
        
        $requestData = [
            'model' => 'grok-beta',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => $systemPrompt
                ],
                [
                    'role' => 'user',
                    'content' => $mensaje
                ]
            ],
            'temperature' => 0.7,
            'max_tokens' => 300
        ];
        
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($requestData),
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'Authorization: Bearer ' . GROK_API_KEY
            ],
            CURLOPT_TIMEOUT => 30
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);
        
        // DEBUG: Log para ver qué pasa
        error_log("Grok HTTP Code: " . $httpCode);
        error_log("Grok Response: " . substr($response, 0, 200));
        
        if ($httpCode === 200 && $response) {
            $result = json_decode($response, true);
            $respuestaTexto = $result['choices'][0]['message']['content'] ?? '';
            
            if (!empty($respuestaTexto)) {
                // Generar sugerencias basadas en el contexto
                $sugerencias = generarSugerenciasInteligentes($mensaje, $contexto);
                
                return [
                    'success' => true,
                    'respuesta' => trim($respuestaTexto),
                    'sugerencias' => $sugerencias
                ];
            }
        }
        
        // Si falla Grok, usar respuestas predefinidas
        error_log("Grok falló, usando respuesta simple");
        return generarRespuestaSimple($mensaje, $contexto);
        
    } catch (Exception $e) {
        error_log("Error en Grok: " . $e->getMessage());
        // Si hay error, usar respuestas predefinidas
        return generarRespuestaSimple($mensaje, $contexto);
    }
}

// ==========================================
// CONSTRUIR PROMPT DEL SISTEMA
// ==========================================
function construirPromptSistema($contexto) {
    $prompt = "Eres el asistente virtual de Dreva, una plataforma de intercambio de productos (trueque). ";
    $prompt .= "Tu objetivo es ayudar a los usuarios de manera amigable, clara y concisa.\n\n";
    
    $prompt .= "INFORMACIÓN DEL USUARIO:\n";
    if ($contexto['logueado']) {
        $prompt .= "- Usuario logueado: Sí\n";
        if (isset($contexto['nombre'])) {
            $prompt .= "- Nombre: {$contexto['nombre']}\n";
        }
        $prompt .= "- Productos publicados: {$contexto['productos']}\n";
        $prompt .= "- Ofertas recibidas pendientes: {$contexto['ofertas_recibidas']}\n";
        $prompt .= "- Ofertas enviadas pendientes: {$contexto['ofertas_enviadas']}\n";
        $prompt .= "- Intercambios completados: {$contexto['intercambios_completados']}\n";
    } else {
        $prompt .= "- Usuario no logueado (visitante)\n";
    }
    
    $prompt .= "\nINSTRUCCIONES:\n";
    $prompt .= "1. Responde en español de forma amigable y natural\n";
    $prompt .= "2. Sé breve y directo (máximo 2-3 líneas)\n";
    $prompt .= "3. Usa emojis moderadamente para hacerlo más amigable\n";
    $prompt .= "4. Si el usuario pregunta sobre sus datos, usa la información proporcionada arriba\n";
    $prompt .= "5. Si el usuario no está logueado, sugiere crear cuenta o iniciar sesión cuando sea relevante\n";
    $prompt .= "6. Si el usuario no tiene productos publicados, anímalo a publicar\n";
    $prompt .= "7. Para preguntas sobre productos específicos (ej: cinto, celular), explica que puede buscarlos en el buscador de la plataforma\n";
    $prompt .= "8. No inventes funcionalidades que no existen\n";
    $prompt .= "9. No uses formato markdown ni asteriscos, solo texto plano con emojis\n\n";
    
    $prompt .= "FUNCIONALIDADES DE DREVA:\n";
    $prompt .= "- Publicar productos para intercambiar\n";
    $prompt .= "- Buscar productos por categoría o búsqueda\n";
    $prompt .= "- Hacer ofertas de intercambio\n";
    $prompt .= "- Chatear con otros usuarios\n";
    $prompt .= "- Gestionar ofertas recibidas y enviadas\n";
    $prompt .= "- Ver historial de intercambios\n\n";
    
    $prompt .= "Responde de manera útil y directa a la pregunta del usuario.";
    
    return $prompt;
}

// ==========================================
// GENERAR SUGERENCIAS INTELIGENTES
// ==========================================
function generarSugerenciasInteligentes($mensaje, $contexto) {
    $mensajeLower = mb_strtolower($mensaje, 'UTF-8');
    
    // Si pregunta por productos específicos
    if (preg_match('/\b(busco|necesito|quiero|cinto|cinturón|ropa|celular|laptop|libro)\b/i', $mensaje)) {
        return ['Ir al buscador', 'Ver categorías', 'Publicar lo que tengo'];
    }
    
    if (!$contexto['logueado']) {
        return ['Iniciar sesión', 'Crear cuenta', 'Explorar productos'];
    }
    
    // Si no tiene productos
    if ($contexto['productos'] == 0) {
        return ['Publicar mi primer producto', 'Buscar productos', '¿Cómo funciona?'];
    }
    
    // Si tiene ofertas pendientes
    if ($contexto['ofertas_recibidas'] > 0) {
        return ['Ver mis ofertas', 'Buscar más productos', 'Publicar otro producto'];
    }
    
    // Sugerencias por defecto
    return ['Buscar productos', 'Publicar producto', 'Ver mi actividad', 'Más ayuda'];
}

// ==========================================
// RESPUESTA SIMPLE SIN IA (RESPALDO)
// ==========================================
function generarRespuestaSimple($mensaje, $contexto) {
    $mensajeLower = mb_strtolower($mensaje, 'UTF-8');
    
    // Lista de productos comunes
    $productos = ['cinto', 'cinturón', 'remera', 'camiseta', 'celular', 'teléfono', 
                  'laptop', 'computadora', 'libro', 'zapato', 'zapatilla', 'pantalón', 
                  'jean', 'reloj', 'auricular', 'audífono'];
    
    // Buscar si menciona algún producto
    $productoEncontrado = null;
    foreach ($productos as $prod) {
        if (strpos($mensajeLower, $prod) !== false) {
            $productoEncontrado = $prod;
            break;
        }
    }
    
    // Si menciona un producto específico
    if ($productoEncontrado) {
        return [
            'success' => true,
            'respuesta' => "¿Buscas $productoEncontrado? 🔍 Puedo ayudarte a encontrarlo. ¿Quieres que busque en el catálogo?",
            'sugerencias' => ["Sí, buscar $productoEncontrado", 'Ver todas las categorías', 'Publicar lo que tengo']
        ];
    }
    
    // Búsqueda de productos específicos
    if (preg_match('/\b(cinto|cinturón|busco|necesito|quiero|celular|laptop|ropa|zapato)\b/i', $mensaje)) {
        $respuesta = "Para buscar productos específicos, usa el buscador en la página principal 🔍\n\n";
        $respuesta .= "También puedes explorar por categorías. ¡Seguro encuentras lo que buscas!";
        
        return [
            'success' => true,
            'respuesta' => $respuesta,
            'sugerencias' => ['Ir al buscador', 'Ver categorías', 'Publicar lo que tengo']
        ];
    }
    
    // Saludos
    if (preg_match('/\b(hola|hey|buenos|buenas|saludos)\b/i', $mensaje)) {
        $saludo = $contexto['logueado'] && isset($contexto['nombre']) 
            ? "¡Hola " . explode(' ', $contexto['nombre'])[0] . "! 👋" 
            : "¡Hola! 👋";
        
        return [
            'success' => true,
            'respuesta' => "$saludo ¿En qué puedo ayudarte hoy?",
            'sugerencias' => generarSugerenciasInteligentes($mensaje, $contexto)
        ];
    }
    
    // Ayuda general
    if (preg_match('/\b(ayuda|help|auxilio|como funciona)\b/i', $mensaje)) {
        return [
            'success' => true,
            'respuesta' => "Puedo ayudarte a publicar productos, buscar intercambios, gestionar ofertas y más. ¿Qué necesitas? 😊",
            'sugerencias' => ['¿Cómo funciona?', 'Publicar producto', 'Buscar', 'Más info']
        ];
    }
    
    // IMPORTANTE: Verificar si está logueado antes de responder
    if ($contexto['logueado']) {
        // Usuario LOGUEADO
        if ($contexto['productos'] == 0) {
            return [
                'success' => true,
                'respuesta' => "Para comenzar a intercambiar, primero necesitas publicar productos. ¿Te ayudo con eso? 📦",
                'sugerencias' => ['Sí, publicar ahora', 'Primero explorar', 'Más info']
            ];
        }
        
        if ($contexto['ofertas_recibidas'] > 0) {
            return [
                'success' => true,
                'respuesta' => "Tienes {$contexto['ofertas_recibidas']} oferta(s) pendiente(s) ⏳ ¿Quieres revisarlas?",
                'sugerencias' => ['Ver ofertas', 'Buscar productos', 'Ayuda']
            ];
        }
        
        // Usuario logueado - respuesta general
        return [
            'success' => true,
            'respuesta' => "Entiendo tu pregunta 😊 Puedo ayudarte con publicar productos, buscar intercambios, gestionar ofertas y más. ¿Qué te interesa?",
            'sugerencias' => ['Buscar productos', 'Publicar producto', 'Ver mi actividad']
        ];
        
    } else {
        // Usuario NO LOGUEADO
        return [
            'success' => true,
            'respuesta' => "Para intercambiar productos necesitas crear una cuenta. ¿Te gustaría registrarte? 😊",
            'sugerencias' => ['Crear cuenta', 'Iniciar sesión', 'Explorar primero']
        ];
    }
}

// ==========================================
// GUARDAR CONVERSACIÓN
// ==========================================
function guardarConversacion($userId, $mensaje, $respuesta, $conexion) {
    try {
        $stmt = $conexion->prepare("
            INSERT INTO chatbot_conversaciones 
            (id_usuario, mensaje_usuario, respuesta_bot, fecha_creacion) 
            VALUES (?, ?, ?, NOW())
        ");
        $stmt->bind_param("iss", $userId, $mensaje, $respuesta);
        $stmt->execute();
    } catch (Exception $e) {
        // Si no existe la tabla, crearla
        try {
            $conexion->query("
                CREATE TABLE IF NOT EXISTS chatbot_conversaciones (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    id_usuario INT NOT NULL,
                    mensaje_usuario TEXT NOT NULL,
                    respuesta_bot TEXT NOT NULL,
                    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_usuario (id_usuario)
                )
            ");
            // Intentar guardar nuevamente
            $stmt = $conexion->prepare("
                INSERT INTO chatbot_conversaciones 
                (id_usuario, mensaje_usuario, respuesta_bot, fecha_creacion) 
                VALUES (?, ?, ?, NOW())
            ");
            $stmt->bind_param("iss", $userId, $mensaje, $respuesta);
            $stmt->execute();
        } catch (Exception $e) {
            // Silenciar error si no se puede crear la tabla
        }
    }
}
?>