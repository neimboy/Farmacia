/**
 * Farmacia "El mal no dura 100 años" 
 * Lógica principal del sitio
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LÓGICA DE MENÚS DESPLEGABLES ---
    const botonesDesplegables = document.querySelectorAll('.btn-desplegable');
    
    botonesDesplegables.forEach(boton => {
        boton.addEventListener('click', (e) => {
            // Evitamos que el clic se propague al window
            e.stopPropagation();
            
            const subMenu = boton.nextElementSibling;
            
            // Cerrar otros menús abiertos para que no se traslapen
            document.querySelectorAll('.sub-menu').forEach(menu => {
                if (menu !== subMenu) {
                    menu.style.display = 'none';
                }
            });

            // Alternar visibilidad: Si está oculto lo muestra, si no, lo oculta
            const estaVisible = subMenu.style.display === 'block';
            subMenu.style.display = estaVisible ? 'none' : 'block';
        });
    });

    // Cerrar menús al hacer clic en cualquier parte vacía de la pantalla
    window.addEventListener('click', () => {
        document.querySelectorAll('.sub-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    });


    // --- 2. LÓGICA DEL CARRITO DE COMPRAS ---
    // Recuperamos el carrito de LocalStorage o creamos uno vacío
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            // Buscamos el contenedor 'article' para obtener los datos correctos
            const tarjeta = e.target.closest('.tarjeta-producto');
            
            const producto = {
                id: e.target.getAttribute('data-id'),
                nombre: tarjeta.querySelector('h3').textContent,
                // Limpiamos el precio para dejar solo el número (ej: "S/ 35.00" -> 35.00)
                precio: parseFloat(tarjeta.querySelector('.precio').textContent.replace('S/ ', '')),
                cantidad: 1
            };

            agregarAlCarrito(producto);
        });
    });

    function agregarAlCarrito(productoNuevo) {
        const existe = carrito.find(item => item.id === productoNuevo.id);
        
        if (existe) {
            existe.cantidad++;
        } else {
            carrito.push(productoNuevo);
        }

        // Persistencia de datos
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        // Notificación simple al usuario
        alert(`✅ Agregado: ${productoNuevo.nombre}`);
        console.log("Carrito actualizado:", carrito);
    }


    // --- 3. VALIDACIÓN DEL FORMULARIO DE CONTACTO ---
    const formContacto = document.getElementById('form-contacto');

    if (formContacto) {
        formContacto.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue

            const datos = new FormData(formContacto);
            const nombre = datos.get('nombre');
            const botonEnvio = formContacto.querySelector('.btn-enviar');

            // Feedback visual: deshabilitar botón durante el "envío"
            botonEnvio.textContent = "Enviando mensaje...";
            botonEnvio.style.opacity = "0.7";
            botonEnvio.disabled = true;

            // Simulación de respuesta de servidor (1.5 segundos)
            setTimeout(() => {
                alert(`¡Muchas gracias ${nombre}! Hemos recibido tu consulta. Te contactaremos pronto.`);
                
                formContacto.reset(); // Limpiar campos
                botonEnvio.textContent = "Enviar Mensaje";
                botonEnvio.style.opacity = "1";
                botonEnvio.disabled = false;
            }, 1500);
        });
    }
});