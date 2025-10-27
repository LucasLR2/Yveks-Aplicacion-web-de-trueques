// chatbot
const baseUrl = "php"; // Ajustado para que apunte a la carpeta php

document.addEventListener("DOMContentLoaded", function () {
  
  const chatbotBtn = document.getElementById("chatbot-btn");
  const chatbotContainer = document.getElementById("chatbot-container");
  const chatbotClose = document.getElementById("chatbot-close");
  const inputField = document.getElementById('chatbot-input'); 
  const sendBtn = document.getElementById('chatbot-send');     
  let botInitialized = false;
  let botui;
  let esperandoProducto = false; 

  function normalizarTexto(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); 
  }

  // Abrir chatbot
  chatbotBtn.addEventListener("click", function (event) {
    event.preventDefault();
    chatbotContainer.classList.remove("hidden");
    
    // En mobile, prevenir scroll del body cuando el chat está abierto
    if (window.innerWidth <= 480) {
      document.body.style.overflow = 'hidden';
    }

    if (!botInitialized) {
      botui = new BotUI('botui-app');

      botui.message.add({ content: '¡Hola! Soy tu asistente de trueques 🤝' })
        .then(() => botui.message.add({
          delay: 500,
          content: 'Elegí cómo iniciar la conversación:'
        }))
        .then(() => mostrarMenu());

      botInitialized = true;
    }
  });
  // Cerrar chatbot
  if (chatbotClose) {
    chatbotClose.addEventListener("click", function (event) {
      event.preventDefault();
      chatbotContainer.classList.add("hidden");
      
      // Restaurar scroll del body
      document.body.style.overflow = '';
    });
  }

  function mostrarMenu() {
    const botonesOpciones = document.querySelectorAll('.chat-options .option-btn');

    botonesOpciones.forEach(boton => {
      boton.addEventListener('click', function () {
        const valor = boton.dataset.value;
        const textoBoton = boton.textContent.trim();

        botonesOpciones.forEach(b => b.disabled = true);

        botui.message.add({ 
          content: textoBoton, 
          human: true 
        }).then(() => {
          // luego de la respuesta del bot
          switch (valor) {
            case 'intercambiar':
              botui.message.add({ 
                content: 'Escribí un producto y descubrí opciones de intercambio',
                delay: 300 
              });
              esperandoProducto = true; 
              break;
            case 'solicitados':
              mostrarProductosSolicitados();
              break;
            case 'otro':
              botui.message.add({ 
                content: 'Funcionalidad en desarrollo.',
                delay: 300 
              }).then(() => {
                preguntarSiNecesitaMasAyuda();
              });
              break;
            default:
              console.log('Opción no definida');
          }
        });

        setTimeout(() => {
          botonesOpciones.forEach(b => b.disabled = false);
        }, 500);
      });
    });
  }

  function preguntarSiNecesitaMasAyuda() {
    setTimeout(() => {
      botui.message.add({
        content: '¿Puedo ayudarte con algo más? 😊',
        delay: 300
      });
    }, 300);
  }

  sendBtn.addEventListener('click', enviarMensaje);
  inputField.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') enviarMensaje();
  });

  function enviarMensaje() {
    const mensaje = inputField.value.trim();
    if (!mensaje) return;

    botui.message.add({ content: mensaje, human: true });
    inputField.value = '';

    if (esperandoProducto) {
      // buscar producto por nombre
      fetch(`${baseUrl}/chatbot.php?producto=${encodeURIComponent(mensaje)}`)
        .then(res => res.json())
        .then(data => {
          esperandoProducto = false;

          console.log('Respuesta del servidor:', data); // debug

          if (!data.ok && data.error) {
            botui.message.add({ content: data.error }).then(() => {
              preguntarSiNecesitaMasAyuda();
            });
            return;
          }

          if (data.mensaje) {
            botui.message.add({ content: data.mensaje });
          }

          // productos encontrados
          if (data.productos && data.productos.length > 0) {
            let delay = 200;
            data.productos.forEach((prod, index) => {
              setTimeout(() => {
                botui.message.add({
                  content: `• ${prod}`,
                  cssClass: 'chatbot-producto',
                  click: () => {
                    alert(`Mostrar info de la publicación de: ${prod}`);
                  }
                });

                if (index === data.productos.length - 1) {
                  setTimeout(() => {
                    preguntarSiNecesitaMasAyuda();
                  }, 400);
                }
              }, delay * index);
            });
          } else if (data.productos && data.productos.length === 0) {

            setTimeout(() => {
              preguntarSiNecesitaMasAyuda();
            }, 500);
          }
        })
        .catch(err => {
          esperandoProducto = false;
          botui.message.add({ content: 'Hubo un error al conectarse con el servidor.' }).then(() => {
            preguntarSiNecesitaMasAyuda();
          });
          console.error('Error:', err);
        });
    } else {
      // mjs libres
      fetch(`${baseUrl}/chatbot.php?mensaje=${encodeURIComponent(mensaje)}`)
        .then(res => res.json())
        .then(data => {
          botui.message.add({ content: data.respuesta || 'No hay respuesta.' }).then(() => {
            preguntarSiNecesitaMasAyuda();
          });
        })
        .catch(err => {
          botui.message.add({ content: 'Error al conectarse al servidor.' }).then(() => {
            preguntarSiNecesitaMasAyuda();
          });
          console.error(err);
        });
    }
  }

  function mostrarProductosSolicitados() {
    fetch(`${baseUrl}/chatbot.php?productos_solicitados=1`)
      .then(res => res.json())
      .then(data => {
        console.log('Productos solicitados:', data); // debug

        if (!data.ok) {
          botui.message.add({ content: data.error || 'Error al obtener productos.' }).then(() => {
            preguntarSiNecesitaMasAyuda();
          });
          return;
        }

        if (!data.productos || data.productos.length === 0) {
          botui.message.add({ content: 'No hay productos solicitados en este momento.' }).then(() => {
            preguntarSiNecesitaMasAyuda();
          });
          return;
        }

        botui.message.add({ 
          content: data.mensaje,
          delay: 300 
        }).then(() => {

          data.productos.forEach((prod, index) => {
            botui.message.add({
              content: `${index + 1}. ${prod}`,
              delay: 150 * (index + 1),
              cssClass: 'chatbot-producto'
            });
          });
          
          setTimeout(() => {
            botui.message.add({
              content: '💡 ¡Aprovechá estas oportunidades! Publicá alguno de estos productos y conseguí lo que necesitás.',
              delay: 200
            }).then(() => {
              // si necesita más ayuda
              setTimeout(() => {
                preguntarSiNecesitaMasAyuda();
              }, 500);
            });
          }, 150 * data.productos.length + 500);
        });
      })
      .catch(err => {
        botui.message.add({ content: 'Hubo un error al conectarse con el servidor.' }).then(() => {
          preguntarSiNecesitaMasAyuda();
        });
        console.error('Error:', err);
      });
  }
});