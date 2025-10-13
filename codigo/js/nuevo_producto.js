let uploadedImages = [];

function goBack() {
  if (confirm("¿Estás seguro de que quieres salir? Se perderán los cambios.")) {
    window.history.back();
  }
}

function cancelForm() {
  if (confirm("¿Cancelar publicación?")) {
    document.getElementById("productForm").reset();
    uploadedImages = [];
    updateImagePreview();
    updatePhotoCounter();
  }
}

function handleImageUpload(event) {
  const files = Array.from(event.target.files);

  // Calcular cuántas imágenes se pueden agregar
  const espacioDisponible = 10 - uploadedImages.length;
  const archivosAProcesar = files.slice(0, espacioDisponible);

  // Mostrar alerta si intentan subir más de 10
  if (files.length > espacioDisponible) {
    alert(`Solo puedes agregar ${espacioDisponible} imagen(es) más. Límite: 10 fotos.`);
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
  const formData = {
    name: document.getElementById("productName").value,
    category: document.getElementById("category").value,
    condition: document.getElementById("condition").value,
    description: document.getElementById("description").value,
    exchangePreferences: document.getElementById("exchangePreferences").value,
    location: document.getElementById("location").value,
    images: uploadedImages
  };
  function submitForm(e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById("productName").value.trim(),
      category: document.getElementById("category").value,
      condition: document.getElementById("condition").value,
      description: document.getElementById("description").value.trim(),
      exchangePreferences: document.getElementById("exchangePreferences").value.trim(),
      location: document.getElementById("location").value,
      images: uploadedImages
    };

    // Validación mejorada
    if (!formData.name) {
      alert("Por favor ingresa el nombre del producto.");
      document.getElementById("productName").focus();
      return;
    }

    if (!formData.condition) {
      alert("Por favor selecciona el estado del producto.");
      document.getElementById("condition").focus();
      return;
    }

    if (!formData.category) {
      alert("Por favor selecciona una categoría.");
      document.getElementById("category").focus();
      return;
    }

    if (!formData.location) {
      alert("Por favor selecciona una ubicación.");
      document.getElementById("location").focus();
      return;
    }

    console.log("Publicación:", formData);
    alert("¡Publicación guardada exitosamente!");

    document.getElementById("productForm").reset();
    uploadedImages = [];
    updateImagePreview();
    updatePhotoCounter();
  }
  console.log("Publicación:", formData);
  alert("¡Publicación guardada!");
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
  select.innerHTML = `<option value="example" disabled selected>Seleccionar categoría</option>`;
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

// Usar múltiples métodos para asegurar la carga
function inicializarFormulario() {
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

  console.log("=== FORMULARIO COMPLETAMENTE CARGADO ===");
}

// Intentar cargar de inmediato si el DOM ya está listo
if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", inicializarFormulario);
} else {
  inicializarFormulario();
}

// Backup: intentar de nuevo después de 500ms por si acaso
setTimeout(inicializarFormulario, 500);