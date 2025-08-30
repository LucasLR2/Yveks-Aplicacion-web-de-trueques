
document.addEventListener('DOMContentLoaded', () => {
  const formularios = document.querySelectorAll('.registro-form');
  formularios.forEach(form => {
    form.addEventListener('submit', e => {
      const nombre = form.querySelector('input[name="nombre"]');
      const correo = form.querySelector('input[name="correo"]');
      const pass = form.querySelector('input[name="contrasena"]');
      const terminos = form.querySelector('input[name="terminos"]');
      if (!nombre.value.trim() || !correo.value.trim() || !pass.value.trim() || !terminos.checked) {
        e.preventDefault();
        mostrarAlertaRegistro('Todos los campos y aceptar términos son obligatorios.', 'error', form);
      }
    });
  });

  // Mensajes según estado en URL
  const p = new URLSearchParams(window.location.search);
  const estado = p.get('estado');
  if (estado) {
    if (estado === 'ok') mostrarAlertaRegistro('Registro exitoso. Ahora puedes iniciar sesión.', 'ok');
    else if (estado === 'campos') mostrarAlertaRegistro('Completa todos los campos y acepta los términos.', 'error');
    else if (estado === 'dup') mostrarAlertaRegistro('Ese correo ya está registrado.', 'error');
    else if (estado === 'error') mostrarAlertaRegistro('Error al registrar. Intenta de nuevo.', 'error');
  }
});

function mostrarAlertaRegistro(msg, tipo='info', form) {
  let contenedor;
  if (form) contenedor = form.querySelector('[id^="alerta-registro-"]');
  if (!contenedor) {
    contenedor = window.innerWidth >= 1024 ? document.getElementById('alerta-registro-desktop') : document.getElementById('alerta-registro-mobile');
  }
  if (!contenedor) return;
  const estilos = { error:{f:'#FEE2E2',b:'#F87171',t:'#7F1D1D'}, ok:{f:'#D1FAE5',b:'#34D399',t:'#065F46'}, info:{f:'#DBEAFE',b:'#60A5FA',t:'#1E3A8A'} };
  const c = estilos[tipo]||estilos.info;
  contenedor.textContent = msg;
  contenedor.style.background=c.f; contenedor.style.borderColor=c.b; contenedor.style.color=c.t;
  contenedor.classList.remove('hidden');
  clearTimeout(contenedor._t);
  contenedor._t = setTimeout(()=>contenedor.classList.add('hidden'),6000);
  if (!document.getElementById('registro-alert-style')){
    const st=document.createElement('style'); st.id='registro-alert-style'; st.textContent='.fadeIn{animation:fadeIn .3s ease}@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}'; document.head.appendChild(st);
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