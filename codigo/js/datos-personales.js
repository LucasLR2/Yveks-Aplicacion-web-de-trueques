// Variables globales
let avatarCambiado = false;
let nuevaImagenBase64 = null;

// Cargar datos del usuario al iniciar
document.addEventListener('DOMContentLoaded', async function() {
    await cargarDatosUsuario();
    configurarEventListeners();
});

// Función para cargar datos del usuario
async function cargarDatosUsuario() {
    try {
        const response = await fetch('obtener-datos-personales.php');
        const data = await response.json();
        
        if (data.success) {
            // Llenar campos móvil
            document.getElementById('mobile-nombre').value = data.usuario.nombre_comp || '';
            document.getElementById('mobile-correo').value = data.usuario.correo || '';
            document.getElementById('mobile-fecha-nacimiento').value = data.usuario.f_nacimiento || '';
            document.getElementById('mobile-ubicacion').value = data.usuario.ubicacion || '';
            
            // Llenar campos desktop
            document.getElementById('desktop-nombre').value = data.usuario.nombre_comp || '';
            document.getElementById('desktop-correo').value = data.usuario.correo || '';
            document.getElementById('desktop-fecha-nacimiento').value = data.usuario.f_nacimiento || '';
            document.getElementById('desktop-ubicacion').value = data.usuario.ubicacion || '';
            
            // Mostrar avatar si existe
            if (data.usuario.img_usuario) {
                const avatarPath = '../' + data.usuario.img_usuario;
                document.getElementById('mobile-avatar-preview').src = avatarPath;
                document.getElementById('desktop-avatar-preview').src = avatarPath;
            }
        } else {
            mostrarAlerta('Error al cargar datos', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('Error al conectar con el servidor', 'error');
    }
}

// Configurar event listeners
function configurarEventListeners() {
    // Input de avatar móvil
    document.getElementById('mobile-avatar-input').addEventListener('change', function(e) {
        manejarCambioAvatar(e, 'mobile');
    });
    
    // Input de avatar desktop
    document.getElementById('desktop-avatar-input').addEventListener('change', function(e) {
        manejarCambioAvatar(e, 'desktop');
    });
    
    // Submit form móvil
    document.getElementById('mobile-datos-form').addEventListener('submit', function(e) {
        e.preventDefault();
        guardarCambios('mobile');
    });
    
    // Submit form desktop
    document.getElementById('desktop-datos-form').addEventListener('submit', function(e) {
        e.preventDefault();
        guardarCambios('desktop');
    });
}

// Manejar cambio de avatar
function manejarCambioAvatar(event, plataforma) {
    const file = event.target.files[0];
    
    if (!file) return;
    
    // Validar tipo de archivo
    const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!tiposPermitidos.includes(file.type)) {
        mostrarAlerta('Solo se permiten imágenes JPG, PNG o WEBP', 'error');
        return;
    }
    
    // Validar tamaño (5MB máx)
    if (file.size > 5 * 1024 * 1024) {
        mostrarAlerta('La imagen no debe superar 5MB', 'error');
        return;
    }
    
    // Leer y mostrar preview
    const reader = new FileReader();
    reader.onload = function(e) {
        nuevaImagenBase64 = e.target.result;
        avatarCambiado = true;
        
        // Actualizar ambos previews
        document.getElementById('mobile-avatar-preview').src = nuevaImagenBase64;
        document.getElementById('desktop-avatar-preview').src = nuevaImagenBase64;
    };
    reader.readAsDataURL(file);
}

// Guardar cambios
async function guardarCambios(plataforma) {
    const formData = new FormData();
    
    // Obtener valores según plataforma
    const prefix = plataforma === 'mobile' ? 'mobile' : 'desktop';
    const nombre = document.getElementById(`${prefix}-nombre`).value;
    const correo = document.getElementById(`${prefix}-correo`).value;
    const fechaNacimiento = document.getElementById(`${prefix}-fecha-nacimiento`).value;
    const ubicacion = document.getElementById(`${prefix}-ubicacion`).value;
    
    // Validaciones
    if (!nombre || nombre.trim() === '') {
        mostrarAlerta('El nombre es obligatorio', 'error');
        return;
    }

    if (!correo || correo.trim() === '') {
        mostrarAlerta('El correo es obligatorio', 'error');
        return;
    }

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        mostrarAlerta('El formato del correo no es válido', 'error');
        return;
    }

    if (!fechaNacimiento) {
        mostrarAlerta('La fecha de nacimiento es obligatoria', 'error');
        return;
    }
    
    if (!ubicacion) {
        mostrarAlerta('La ubicación es obligatoria', 'error');
        return;
    }
    
    // Agregar datos al FormData
    formData.append('nombre', nombre.trim());
    formData.append('correo', correo.trim());
    formData.append('fecha_nacimiento', fechaNacimiento);
    formData.append('ubicacion', ubicacion);
    
    // Si cambió el avatar, agregarlo
    if (avatarCambiado && nuevaImagenBase64) {
        formData.append('avatar_imagen', nuevaImagenBase64);
    }
    
    try {
        const response = await fetch('actualizar-datos-personales.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            mostrarAlerta('Datos actualizados correctamente', 'success');
            avatarCambiado = false;
            nuevaImagenBase64 = null;
            
            // Recargar datos
            setTimeout(() => {
                cargarDatosUsuario();
            }, 1000);
        } else {
            mostrarAlerta(data.message || 'Error al actualizar datos', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('Error al conectar con el servidor', 'error');
    }
}

// Mostrar alertas con SweetAlert
function mostrarAlerta(mensaje, tipo) {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            text: mensaje,
            icon: tipo,
            confirmButtonColor: '#719177',
            confirmButtonText: 'Aceptar'
        });
    } else {
        alert(mensaje);
    }
}

// Función para cancelar cambios
function cancelarCambios() {
    if (confirm('¿Deseas descartar los cambios realizados?')) {
        window.location.reload();
    }
}

// Función para habilitar/deshabilitar edición del nombre
function toggleEditarNombre(plataforma) {
    const input = document.getElementById(`${plataforma}-nombre`);
    
    if (input.hasAttribute('readonly')) {
        // Habilitar edición
        input.removeAttribute('readonly');
        input.classList.remove('bg-gray-50', 'text-gray-600', 'cursor-not-allowed');
        input.classList.add('bg-white', 'text-gray-800', 'focus:ring-2', 'focus:ring-green', 'focus:border-green');
        input.focus();
    } else {
        // Deshabilitar edición
        input.setAttribute('readonly', 'readonly');
        input.classList.add('bg-gray-50', 'text-gray-600', 'cursor-not-allowed');
        input.classList.remove('bg-white', 'text-gray-800', 'focus:ring-2', 'focus:ring-green', 'focus:border-green');
    }
}   