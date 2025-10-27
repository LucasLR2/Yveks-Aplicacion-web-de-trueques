<?php
include 'database.php';

// --- Obtener categorías (MySQLi) ---
try {
    $resultado = $conn->query("SELECT nombre, slug, url_imagen, descripcion FROM categoria ORDER BY nombre");

    // Si la consulta fue exitosa
    if ($resultado) {
        $categorias = $resultado->fetch_all(MYSQLI_ASSOC);
    } else {
        $categorias = [];
    }
} catch (Exception $e) {
    echo "Error al obtener categorías: " . $e->getMessage();
    $categorias = [];
}

// --- HTML para categorías móvil ---
ob_start();
?>
  <div class="relative">
    <div class="flex gap-x-4 overflow-x-auto scrollbar-hide">
      <?php if(!empty($categorias)): ?>
        <?php foreach($categorias as $cat): ?>
          <div class="flex flex-col items-center space-y-2 cursor-pointer mobile-category min-w-[72px]"
               onclick="seleccionarCategoria(this)" data-category="<?= htmlspecialchars($cat['slug']) ?>">
            <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center transition-colors">
              <img src="<?= htmlspecialchars($cat['url_imagen']) ?>" 
                   alt="<?= htmlspecialchars($cat['nombre']) ?>" 
                   class="w-5 h-5 svg-green">
            </div>
            <span class="text-xs text-gray-600 text-center truncate w-full block" title="<?= htmlspecialchars($cat['nombre']) ?>">
              <?= htmlspecialchars($cat['nombre']) ?>
            </span>
          </div>
        <?php endforeach; ?>
      <?php else: ?>
        <p class="text-sm text-gray-500">No hay categorías disponibles.</p>
      <?php endif; ?>
    </div>
  </div>
<?php
$categoriasMovil = ob_get_clean();

// --- HTML para categorías desktop ---
ob_start();
?>
  <h3 class="text-sm text-gray-800 mb-4">Categorías</h3>
  <div class="space-y-2">
    <?php if(!empty($categorias)): ?>
      <?php foreach($categorias as $cat): ?>
        <div class="desktop-category flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-50 smooth-transition"
             onclick="seleccionarCategoriaEscritorio(this, '<?= htmlspecialchars($cat['slug']) ?>')"
             data-descripcion="<?= htmlspecialchars($cat['descripcion'] ?? '') ?>">
          <img src="<?= htmlspecialchars($cat['url_imagen']) ?>" 
               alt="<?= htmlspecialchars($cat['nombre']) ?>" 
               class="w-5 h-5 svg-green">
          <span class="text-sm text-green"><?= htmlspecialchars($cat['nombre']) ?></span>
        </div>
      <?php endforeach; ?>
    <?php else: ?>
      <p class="text-sm text-gray-500">No hay categorías disponibles.</p>
    <?php endif; ?>
  </div>
<?php
$categoriasDesktop = ob_get_clean();
?>
