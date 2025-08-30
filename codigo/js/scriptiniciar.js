// Lógica de autenticación eliminada: ahora todo se procesa en logear.php.

// Configuración de visibilidad de contraseña para escritorio y móvil
function configurarVisibilidadPassword(idInput, idBoton) {
    const input = document.getElementById(idInput);
    const boton = document.getElementById(idBoton);

    if (!input || !boton) return;

    boton.addEventListener('click', function () {
        const tipo = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', tipo);

        this.innerHTML = tipo === 'password'
            ? '<i class="far fa-eye-slash"></i>'
            : '<i class="far fa-eye"></i>';
    });
}

document.addEventListener('DOMContentLoaded', function () {
  configurarVisibilidadPassword('password-escritorio', 'togglePassword-escritorio');
  configurarVisibilidadPassword('password-movil', 'togglePassword-movil');

  // Mostrar mensajes de error según la URL (error=...)
  const params = new URLSearchParams(window.location.search);
  const error = params.get('error');
  if (error) {
    if (error === 'credenciales') {
      mostrarAlerta('No coincide el email o la contraseña.', 'error');
    } else if (error === 'campos') {
      mostrarAlerta('Todos los campos son obligatorios.', 'error');
    } else if (error === 'consulta') {
      mostrarAlerta('Error interno. Intenta nuevamente.', 'error');
    }
  }

  // Validación manual en formularios antes de enviar
  const forms = document.querySelectorAll('.login-form');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      const correo = form.querySelector('input[name="identificador"]');
      const pass = form.querySelector('input[name="contrasena"]');
      if (!correo.value.trim() || !pass.value.trim()) {
        e.preventDefault();
        mostrarAlerta('Todos los campos son obligatorios.', 'error', form);
      }
    });
  });
});

function mostrarAlerta(mensaje, tipo = 'info', contextoFormulario) {
  // Seleccionar el contenedor adecuado (mobile o desktop) en base al formulario o viewport
  let contenedor;
  if (contextoFormulario) {
    contenedor = contextoFormulario.querySelector('[id^="alerta-login-"]');
  } else {
    // fallback: elegir según ancho
    if (window.innerWidth >= 1024) {
      contenedor = document.getElementById('alerta-login-desktop');
    } else {
      contenedor = document.getElementById('alerta-login-mobile');
    }
  }
  if (!contenedor) return;

  const estilos = {
    error: {
      fondo: '#FEE2E2',
      borde: '#F87171',
      texto: '#7F1D1D'
    },
    info: {
      fondo: '#DBEAFE',
      borde: '#60A5FA',
      texto: '#1E3A8A'
    },
    ok: {
      fondo: '#D1FAE5',
      borde: '#34D399',
      texto: '#065F46'
    }
  };

  const cfg = estilos[tipo] || estilos.info;
  contenedor.textContent = mensaje;
  contenedor.style.backgroundColor = cfg.fondo;
  contenedor.style.borderColor = cfg.borde;
  contenedor.style.color = cfg.texto;
  contenedor.classList.remove('hidden');
  contenedor.classList.add('animate-fade');

  clearTimeout(contenedor._timeoutId);
  contenedor._timeoutId = setTimeout(() => {
    contenedor.classList.add('hidden');
  }, 5000);
}

// Animación simple vía CSS inline si no existe
if (!document.getElementById('login-alert-style')) {
  const style = document.createElement('style');
  style.id = 'login-alert-style';
  style.textContent = `.animate-fade{animation:fadeIn 0.3s ease;}@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}`;
  document.head.appendChild(style);
}


window.addEventListener("DOMContentLoaded", () => {
  const diapositivas = document.getElementById('diapositivas');
  const indicadores = [
    document.getElementById('indicador-0'),
    document.getElementById('indicador-1'),
    document.getElementById('indicador-2')
  ];

  let diapositivaActual = 0;
  const totalDiapositivas = 3;
  let intervalo = setInterval(siguienteDiapositiva, 5000);

  function actualizarDiapositiva() {
    diapositivas.style.transform = `translateX(-${diapositivaActual * 100}%)`;

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