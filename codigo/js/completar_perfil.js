// Manejo del formulario de completar perfil
document.addEventListener('DOMContentLoaded', function () {
  // Configurar listeners para los inputs de avatar
  const avatarInputMobile = document.getElementById('avatar-input-mobile');
  const avatarInputDesktop = document.getElementById('avatar-input-desktop');
  
  if (avatarInputMobile) {
    avatarInputMobile.addEventListener('change', function(e) {
      handleAvatarUpload(e, 'mobile');
    });
  }
  
  if (avatarInputDesktop) {
    avatarInputDesktop.addEventListener('change', function(e) {
      handleAvatarUpload(e, 'desktop');
    });
  }
  
  const formularios = document.querySelectorAll('#form-completar-perfil-mobile, #form-completar-perfil-desktop');
  
  formularios.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const fechaNacimiento = form.querySelector('input[name="fecha_nacimiento"]');
      const ubicacion = form.querySelector('select[name="ubicacion"]');
      const avatarData = form.querySelector('input[name="avatar_imagen"]');
      
      if (!fechaNacimiento.value.trim() || !ubicacion.value) {
        mostrarAlerta('Todos los campos son obligatorios.', form);
        return;
      }
      
      const data = new FormData(form);
      
      fetch('actualizar-perfil.php', {
        method: 'POST',
        body: data
      })
      .then(res => res.json())
      .then(resp => {
        if (resp.success) {
          window.location.href = resp.redirect;
        } else {
          mostrarAlerta(resp.message || 'Error al completar perfil. Intenta de nuevo.', form);
        }
      })
      .catch(() => {
        mostrarAlerta('Error de conexión con el servidor.', form);
      });
    });
  });
});

// Función para manejar la carga del avatar
function handleAvatarUpload(event, version) {
  const file = event.target.files[0];
  
  if (!file) return;
  
  // Validar que sea una imagen
  if (!file.type.startsWith('image/')) {
    mostrarAlerta('Por favor selecciona un archivo de imagen válido.', null);
    return;
  }
  
  // Validar tamaño del archivo (máximo 5MB)
  if (file.size > 5 * 1024 * 1024) {
    mostrarAlerta('La imagen es demasiado grande. Tamaño máximo: 5MB.', null);
    return;
  }
  
  const reader = new FileReader();
  
  reader.onload = function(e) {
    const img = new Image();
    
    img.onload = function() {
      // Validar dimensiones (mínimo 50x50)
      if (img.width < 50 || img.height < 50) {
        mostrarAlerta('La imagen es demasiado pequeña. Tamaño mínimo: 50x50 píxeles.', null);
        return;
      }
      
      // Actualizar preview
      const previewMobile = document.getElementById('avatar-preview-mobile');
      const previewDesktop = document.getElementById('avatar-preview-desktop');
      
      if (previewMobile) {
        previewMobile.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-cover">`;
      }
      if (previewDesktop) {
        previewDesktop.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-cover">`;
      }
      
      // Guardar data en campos hidden
      const avatarDataMobile = document.getElementById('avatar-data-mobile');
      const avatarDataDesktop = document.getElementById('avatar-data-desktop');
      
      if (avatarDataMobile) avatarDataMobile.value = e.target.result;
      if (avatarDataDesktop) avatarDataDesktop.value = e.target.result;
    };
    
    img.src = e.target.result;
  };
  
  reader.readAsDataURL(file);
}

function mostrarAlerta(mensaje, contextoFormulario) {
  let contenedor;
  if (contextoFormulario) {
    contenedor = contextoFormulario.querySelector('[id^="alerta-completar-perfil-"]');
  } else {
    if (window.innerWidth >= 1024) {
      contenedor = document.getElementById('alerta-completar-perfil-desktop');
    } else {
      contenedor = document.getElementById('alerta-completar-perfil-mobile');
    }
  }
  if (!contenedor) return;

  contenedor.textContent = mensaje;
  contenedor.style.backgroundColor = '#FEE2E2';
  contenedor.style.borderColor = '#F87171';
  contenedor.style.color = '#7F1D1D';
  contenedor.classList.remove('hidden');
  contenedor.classList.add('animate-fade');

  clearTimeout(contenedor._timeoutId);
  contenedor._timeoutId = setTimeout(() => {
    contenedor.classList.add('hidden');
  }, 5000);
}

// Animación simple vía CSS inline
if (!document.getElementById('completar-perfil-alert-style')) {
  const style = document.createElement('style');
  style.id = 'completar-perfil-alert-style';
  style.textContent = `.animate-fade{animation:fadeIn 0.3s ease;}@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}`;
  document.head.appendChild(style);
}


window.addEventListener("DOMContentLoaded", () => {
  const diapositivas = document.getElementById('diapositivas');
  const indicadores = [
    document.getElementById('indicador-0'),
    document.getElementById('indicador-1'),
    document.getElementById('indicador-2'),
    document.getElementById('indicador-3')
  ];
  const textoTitulo = document.getElementById('texto-titulo');
  const textoSubtitulo = document.getElementById('texto-subtitulo');

  // Textos para cada diapositiva
  const textos = [
    {
      titulo: "Trueque fácil y sin vueltas",
      subtitulo: "Intercambiá lo que no usás por lo que necesitás. Sin dinero, solo comunidad."
    },
    {
      titulo: "Descubrí miles de productos",
      subtitulo: "Navegá las publicaciones y encontrá en segundos lo que buscás."
    },
    {
      titulo: "Publicá y recibí ofertas",
      subtitulo: "Subí tus productos, ofrecé varios a la vez y decidí si aceptás o no."
    },
    {
      titulo: "Chateá y concretá el trueque",
      subtitulo: "Coordina detalles directo con otros usuarios gracias al chat integrado."
    }
  ];

  let diapositivaActual = 0;
  const totalDiapositivas = 4;
  let intervalo = setInterval(siguienteDiapositiva, 5000);

  function actualizarDiapositiva() {
    diapositivas.style.transform = `translateX(-${diapositivaActual * 100}%)`;

    // Actualizar textos
    if (textoTitulo && textoSubtitulo) {
      textoTitulo.textContent = textos[diapositivaActual].titulo;
      textoSubtitulo.textContent = textos[diapositivaActual].subtitulo;
    }

    indicadores.forEach((punto, i) => {
      punto.classList.remove('bg-gray-400');
      punto.classList.add('bg-gray-300');
      if (i === diapositivaActual) {
        punto.classList.remove('bg-gray-300');
        punto.classList.add('bg-gray-400');
      }
    });
  }

  function siguienteDiapositiva() {
    diapositivaActual = (diapositivaActual + 1) % totalDiapositivas;
    actualizarDiapositiva();
  }

  window.irADiapositiva = function(indice) {
    diapositivaActual = indice;
    actualizarDiapositiva();
    clearInterval(intervalo);
    intervalo = setInterval(siguienteDiapositiva, 5000);
  };

  actualizarDiapositiva();
});