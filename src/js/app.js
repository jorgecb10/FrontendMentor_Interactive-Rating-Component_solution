document.addEventListener("DOMContentLoaded", () => {
    const pathname = window.location.pathname

    if (pathname === '/' || pathname.includes('index')) {
        const btnSubmit = document.querySelector('#submit');
        const botones = document.querySelectorAll('.btn-calificacion'); // Cambié el id por class
        let calificacion = '';

        botones.forEach(boton => {
            boton.addEventListener('click', e => {
                e.preventDefault();
                cambiarBoton(boton);
            });
        });

        // Cambié el evento de 'submit' a 'click'
        btnSubmit.addEventListener('click', validar);

        function validar(e) {
            if (calificacion === '') {
                e.preventDefault();
                console.log('No se seleccionó ninguna calificación');
            } else {
                window.location.href = `thank-you?calificacion=${calificacion}`;
            }
        }

        function cambiarBoton(boton) {
            if (!boton.classList.contains('activo')) {
                botones.forEach(b => {
                    b.classList.remove('bg-white', 'text-dark-blue', 'activo');
                    b.classList.add('hover:bg-orange-hsl', 'hover:text-dark-blue');
                });

                boton.classList.add('bg-white', 'text-dark-blue', 'activo');
                boton.classList.remove('hover:bg-orange-hsl', 'hover:text-dark-blue');
                calificacion = boton.textContent.trim();
            } else {
                boton.classList.remove('bg-white', 'text-dark-blue', 'activo');
                boton.classList.add('hover:bg-orange-hsl', 'hover:text-dark-blue');
                calificacion = '';
            }
        }
    } else if (pathname.includes('thank-you')) {
        const parameters = new URLSearchParams(window.location.search);
        const calificacion = parameters.get('calificacion');
        const divCalificacion = document.querySelector('#div-calificacion');

        const parrafo = document.createElement('p');
        parrafo.className = 'calificacion';
        parrafo.textContent = `You selected ${calificacion} out of 5`;
        divCalificacion.appendChild(parrafo);
    }
});
