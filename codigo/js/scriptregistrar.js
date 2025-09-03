document.addEventListener('DOMContentLoaded', () => {
  const formularios = document.querySelectorAll('.registro-form');
  formularios.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const nombre = form.querySelector('input[name="nombre"]');
      const correo = form.querySelector('input[name="correo"]');
      const pass = form.querySelector('input[name="contrasena"]');
      const terminos = form.querySelector('input[name="terminos"]');
      if (!nombre.value.trim() || !correo.value.trim() || !pass.value.trim() || !terminos.checked) {
        mostrarAlertaRegistro('Llenar todos los campos y aceptar términos son obligatorios.', form);
        return;
      }
      const data = new FormData(form);
      fetch('registrar.php', {
        method: 'POST',
        body: data
      })
      .then(res => res.json())
      .then(resp => {
        if (resp.success) {
          window.location.href = resp.redirect;
        } else {
          mostrarAlertaRegistro(resp.message || 'Error al registrar. Intenta de nuevo.', form);
        }
      })
      .catch(() => {
        mostrarAlertaRegistro('Error de conexión con el servidor.', form);
      });
    });
  });
});

function mostrarAlertaRegistro(mensaje, form) {
  // Seleccionar el contenedor adecuado (mobile o desktop) en base al formulario o viewport
  let contenedor;
  if (form) {
    contenedor = form.querySelector('[id^="alerta-registro-"]');
  } else {
    if (window.innerWidth >= 1024) {
      contenedor = document.getElementById('alerta-registro-desktop');
    } else {
      contenedor = document.getElementById('alerta-registro-mobile');
    }
  }
  if (!contenedor) return;

  contenedor.textContent = mensaje;
  contenedor.style.backgroundColor = '#FEE2E2';
  contenedor.style.borderColor = '#F87171';
  contenedor.style.color = '#7F1D1D';
  contenedor.classList.remove('hidden');
  contenedor.classList.add('fadeIn');

  clearTimeout(contenedor._timeoutId);
  contenedor._timeoutId = setTimeout(() => {
    contenedor.classList.add('hidden');
  }, 6000);

  if (!document.getElementById('registro-alert-style')) {
    const style = document.createElement('style');
    style.id = 'registro-alert-style';
    style.textContent = '.fadeIn{animation:fadeIn .3s ease}@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}';
    document.head.appendChild(style);
  }
}


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
    // Configurar visibilidad para desktop
    configurarVisibilidadPassword('password-escritorio', 'togglePassword-escritorio');

    // Configurar visibilidad para móvil
    configurarVisibilidadPassword('password-movil', 'togglePassword-movil');
});


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