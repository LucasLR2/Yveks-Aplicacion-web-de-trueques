let uploadedImages = [];

// Función para mostrar alertas personalizadas
function mostrarAlerta(mensaje, tipo = 'error') {
  // Eliminar alerta anterior si existe
  const alertaAnterior = document.querySelector('.custom-alert');
  if (alertaAnterior) {
    alertaAnterior.remove();
  }

  // Crear la alerta
  const alerta = document.createElement('div');
  alerta.className = `custom-alert fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 animate-slide-down ${
    tipo === 'success' ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
  }`;
  
  // Icono
  const icono = tipo === 'success' 
    ? '<svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
    : '<svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
  
  alerta.innerHTML = `
    ${icono}
    <span class="${tipo === 'success' ? 'text-green-800' : 'text-red-800'} font-medium">${mensaje}</span>
    <button onclick="this.parentElement.remove()" class="${tipo === 'success' ? 'text-green-600 hover:text-green-800' : 'text-red-600 hover:text-red-800'} ml-4">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
  `;
  
  document.body.appendChild(alerta);
  
  // Añadir estilos para la animación si no existen
  if (!document.getElementById('custom-alert-styles')) {
    const style = document.createElement('style');
    style.id = 'custom-alert-styles';
    style.textContent = `
      @keyframes slide-down {
        from {
          transform: translate(-50%, -100%);
          opacity: 0;
        }
        to {
          transform: translate(-50%, 0);
          opacity: 1;
        }
      }
      .animate-slide-down {
        animation: slide-down 0.3s ease-out;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Auto-eliminar después de 5 segundos
  setTimeout(() => {
    if (alerta.parentElement) {
      alerta.style.opacity = '0';
      alerta.style.transition = 'opacity 0.3s';
      setTimeout(() => alerta.remove(), 300);
    }
  }, 5000);
}

function goBack() {
  const ejecutarSalida = function() {
    window.history.back();
  };

  if (window.SwalApp) {
    window.SwalApp.confirmar({
      title: 'Salir sin guardar',
      html: '¿Estás seguro de que quieres salir?<br>Se perderán los cambios no guardados.',
      confirmButtonText: 'Salir',
      cancelButtonText: 'Quedarse',
      confirmClass: 'btn-danger'
    }).then(result => {
      if (result.isConfirmed) ejecutarSalida();
    });
  } else {
    if (confirm("¿Estás seguro de que quieres salir? Se perderán los cambios.")) {
      ejecutarSalida();
    }
  }
}

function cancelForm() {
  const ejecutarCancelacion = function() {
    document.getElementById("productForm").reset();
    uploadedImages = [];
    updateImagePreview();
    updatePhotoCounter();
  };

  if (window.SwalApp) {
    window.SwalApp.confirmar({
      title: 'Cancelar publicación',
      html: '¿Estás seguro de cancelar?<br>Se perderán todos los datos ingresados.',
      confirmButtonText: 'Cancelar publicación',
      cancelButtonText: 'Continuar editando',
      confirmClass: 'btn-danger'
    }).then(result => {
      if (result.isConfirmed) ejecutarCancelacion();
    });
  } else {
    if (confirm("¿Cancelar publicación?")) {
      ejecutarCancelacion();
    }
  }
}

function handleImageUpload(event) {
  const files = Array.from(event.target.files);

  // Calcular cuántas imágenes se pueden agregar
  const espacioDisponible = 10 - uploadedImages.length;
  const archivosAProcesar = files.slice(0, espacioDisponible);

  // Mostrar alerta si intentan subir más de 10
  if (files.length > espacioDisponible) {
    mostrarAlerta(`Solo puedes agregar ${espacioDisponible} imagen(es) más. Límite: 10 fotos.`, 'error');
  }

  archivosAProcesar.forEach(file => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = e => {
        uploadedImages.push({ id: Date.now() + Math.random(), url: e.target.result });
        updateImagePreview();
        updatePhotoCounter();
      };
      reader.readAsDataURL(file);
    }
  });
  event.target.value = "";
}

function removeImage(id) {
  uploadedImages = uploadedImages.filter(img => img.id !== id);
  updateImagePreview();
  updatePhotoCounter();
}

function updateImagePreview() {
  document.querySelectorAll(".imagePreview").forEach(container => {
    container.innerHTML = "";

    uploadedImages.forEach(img => {
      const div = document.createElement("div");
      div.className = "image-item relative";
      div.innerHTML = `
        <img src="${img.url}" class="w-full h-full object-cover rounded-lg">
        <button type="button" class="remove-image absolute top-1 right-1 bg-white rounded-full px-2" onclick="removeImage(${img.id})">×</button>`;
      container.appendChild(div);
    });

    if (uploadedImages.length < 10) {
      const add = document.createElement("div");
      add.className = "upload-placeholder aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition-colors";
      add.innerHTML = `
        <svg viewBox="0 0 24 24" class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        <span class="text-xs text-gray-500">Agregar foto</span>`;

      // 🔑 Busca el input de archivo dentro del mismo form
      add.onclick = () => container.parentElement.querySelector(".imageInput").click();

      container.appendChild(add);
    }
  });
}

function updatePhotoCounter() {
  document.querySelectorAll(".photoCounter").forEach(counter => {
    counter.textContent = `${uploadedImages.length}/10`;
  });
}

function submitForm(e) {
  e.preventDefault();
  
  // Obtener el formulario que disparó el evento
  const form = e.target;
  
  // Obtener elementos desde el formulario específico
  const productNameElement = form.querySelector("#productName");
  const categoryElement = form.querySelector("#category");
  const conditionElement = form.querySelector("#condition");
  const descriptionElement = form.querySelector("#description");
  const exchangePreferencesElement = form.querySelector("#exchangePreferences");
  const locationElement = form.querySelector("#location");


  const formData = {
    name: productNameElement ? productNameElement.value.trim() : '',
    category: categoryElement ? categoryElement.value : '',
    condition: conditionElement ? conditionElement.value : '',
    description: descriptionElement ? descriptionElement.value.trim() : '',
    exchangePreferences: exchangePreferencesElement ? exchangePreferencesElement.value.trim() : '',
    location: locationElement ? locationElement.value : '',
    images: uploadedImages
  };


  // Validación mejorada
  if (uploadedImages.length === 0) {
    mostrarAlerta('Debes agregar al menos una imagen del producto.', 'error');
    return;
  }

  if (!formData.name || formData.name === '') {
    mostrarAlerta('Por favor ingresa el nombre del producto.', 'error');
    if (productNameElement) productNameElement.focus();
    return;
  }

  if (!formData.condition || formData.condition === '') {
    mostrarAlerta('Por favor selecciona el estado del producto.', 'error');
    if (conditionElement) conditionElement.focus();
    return;
  }

  if (!formData.category || formData.category === '' || formData.category === 'example') {
    mostrarAlerta('Por favor selecciona una categoría.', 'error');
    if (categoryElement) categoryElement.focus();
    return;
  }

  if (!formData.description || formData.description === '') {
    mostrarAlerta('Por favor ingresa una descripción del producto.', 'error');
    if (descriptionElement) descriptionElement.focus();
    return;
  }

  if (!formData.exchangePreferences || formData.exchangePreferences === '') {
    mostrarAlerta('Por favor ingresa tus preferencias de intercambio.', 'error');
    if (exchangePreferencesElement) exchangePreferencesElement.focus();
    return;
  }

  if (!formData.location || formData.location === '') {
    mostrarAlerta('Por favor selecciona una ubicación.', 'error');
    if (locationElement) locationElement.focus();
    return;
  }
  
  // Deshabilitar el botón de envío
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Guardando...';
  }

  fetch('php/conexion_nuevo_producto.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    
    // Primero obtener el texto para ver qué devuelve
    return response.text().then(text => {
      
      try {
        return JSON.parse(text);
      } catch (e) {
        throw new Error("El servidor devolvió una respuesta inválida. Verifica la consola PHP.");
      }
    });
  })
  .then(data => {
    
    if (data.success) {
      mostrarAlerta('¡Publicación guardada exitosamente!', 'success');
      form.reset();
      uploadedImages = [];
      updateImagePreview();
      updatePhotoCounter();
      
      // Redirigir después de 0.5 segundos
      setTimeout(() => {
        window.location.href = 'php/perfil.php';
      }, 500);
    } else {
      mostrarAlerta(data.message || "Error desconocido al guardar la publicación.", 'error');
    }
  })
  .catch(error => {
    mostrarAlerta('Error de conexión con el servidor. Por favor, intenta nuevamente.', 'error');
  })
  .finally(() => {
    // Rehabilitar el botón de envío
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Guardar publicación';
    }
  });
}

// Opciones dinámicas
const departamentos = ["Montevideo", "Canelones", "Maldonado", "Colonia", "San José", "Soriano", "Paysandú", "Durazno", "Cerro Largo", "Tacuarembó", "Salto", "Artígas", "Rivera", "Rocha", "Flores", "Lavalleja", "Treinta y Tres", "Florida", "Río Negro"];
const estados = ["Nuevo", "Usado", "Reacondicionado"];
const categorias = ["Tecnología", "Hogar", "Ropa", "Accesorios", "Deportes", "Entretenimiento", "Mascotas", "Herramientas", "Servicios"];

function cargarEstados() {
  const select = document.getElementById("condition");
  select.innerHTML = `<option value="" disabled selected>Estado del producto</option>`;
  estados.forEach(e => {
    const opt = document.createElement("option");
    opt.value = e.toLowerCase();
    opt.textContent = e;
    select.appendChild(opt);
  });
}

function cargarCategorias() {
  const select = document.getElementById("category");
  select.innerHTML = `<option value="" disabled selected>Seleccionar categoría</option>`;
  categorias.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.toLowerCase();
    opt.textContent = c;
    select.appendChild(opt);
  });
}

function cargarDepartamentos() {
  const select = document.getElementById("location");
  select.innerHTML = `<option value="" disabled selected>Selecciona ubicación</option>`;
  departamentos.forEach(d => {
    const opt = document.createElement("option");
    opt.value = d.toLowerCase();
    opt.textContent = d;
    select.appendChild(opt);
  });
}

// Variable para controlar si ya se inicializó
let formularioInicializado = false;

// Usar múltiples métodos para asegurar la carga
function inicializarFormulario() {
  // Evitar múltiples inicializaciones
  if (formularioInicializado) {
    console.log("⚠️ Formulario ya inicializado, saltando...");
    return;
  }

  console.log("=== INICIANDO CARGA DE FORMULARIO ===");

  const conditionSelect = document.getElementById("condition");
  const categorySelect = document.getElementById("category");
  const locationSelect = document.getElementById("location");

  console.log("Elemento condition:", conditionSelect);
  console.log("Elemento category:", categorySelect);
  console.log("Elemento location:", locationSelect);

  if (conditionSelect) {
    cargarEstados();
    console.log("✓ Estados cargados. Opciones:", conditionSelect.options.length);
  }

  if (categorySelect) {
    cargarCategorias();
    console.log("✓ Categorías cargadas. Opciones:", categorySelect.options.length);
  }

  if (locationSelect) {
    cargarDepartamentos();
    console.log("✓ Departamentos cargados. Opciones:", locationSelect.options.length);
  }

  updatePhotoCounter();
  updateImagePreview();

  formularioInicializado = true;
  console.log("=== FORMULARIO COMPLETAMENTE CARGADO ===");
}

// Intentar cargar de inmediato si el DOM ya está listo
if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", inicializarFormulario);
} else {
  inicializarFormulario();
}