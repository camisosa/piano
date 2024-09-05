// Secuencia de notas para
const secuencia = ["do", "do", "sol", "sol", "la", "la", "sol", "fa", "fa", "mi", "mi", "re", "re", "do"];
let notaActual = 0;

// Número de notas para cada nivel
const nivel1 = Math.ceil(secuencia.length / 3); // Primer tercio
const nivel2 = nivel1 * 2; // Segundo tercio

// Duración del tiempo entre notas
const duracionNota = 500; // en milisegundos

/*Función para reproducir el sonido de la nota
function reproducirSonido(nota, callback) {
    const audio = new Audio(`data/${nota}.mp3`); // Uso de backticks para la interpolación
    audio.addEventListener('canplaythrough', () => {
        audio.play().then(() => {
            setTimeout(callback, duracionNota); // Ejecutar el callback después de que termine la nota
        }).catch(error => {
            console.error("Error al reproducir el sonido:", error);
        });
    });
}
*/
// Función para reproducir la secuencia
function reproducirSecuencia() {
    if (notaActual < secuencia.length) {
        let nota = secuencia[notaActual];
        const teclaElemento = document.querySelector(`.tecla[data-note="${nota}"]`);

        teclaElemento.classList.add("active");
        reproducirSonido(nota, () => {
            teclaElemento.classList.remove("active");
            notaActual++;
            reproducirSecuencia(); // Reproducir la siguiente nota
        });
    } else {
        notaActual = 0; // Reiniciar para que se pueda volver a tocar la canción
    }
}

// Función para manejar la entrada del usuario
function manejarEntradaUsuario(nota) {
    const notaEsperada = secuencia[notaActual];
    const teclaElemento = document.querySelector(`.tecla[data-note="${nota}"]`);

    if (nota === notaEsperada) {
        teclaElemento.classList.add("active");
        reproducirSonido(nota, () => {
            teclaElemento.classList.remove("active");
            notaActual++;

            if (notaActual === secuencia.length) {
                alert("¡Bien hecho! Sabes mucho de música.");
                notaActual = 0; // Reiniciar la secuencia para jugar de nuevo
                setTimeout(reproducirSecuencia, 1000);
            }
        });
    } else {
        let mensaje;
        if (notaActual <= nivel1) {
            mensaje = "¡Falta mucha práctica!";
        } else if (notaActual <= nivel2) {
            mensaje = "¡Eres bueno, pero te falta un poco de práctica!";
        } else {
            mensaje = "¡Buen intento, pero sigue practicando!";
        }

        alert(mensaje);
        notaActual = 0; // Reiniciar para jugar de nuevo
        setTimeout(reproducirSecuencia, 1000);
    }
}

// Mapeo de teclas a notas
const teclasMapa = {
    'e': 'do',
    'r': 're',
    't': 'mi',
    'y': 'fa',
    'u': 'sol',
    'i': 'la',
    'o': 'si'
};

// Función para manejar la entrada del teclado
document.addEventListener('keydown', (event) => {
    const nota = teclasMapa[event.key]; // Obtiene la nota asociada a la tecla presionada
    if (nota) {
        manejarEntradaUsuario(nota); // Llama a la función para manejar la entrada del usuario
    }
});

// Asignar el evento de clic a cada tecla del piano (como ya tenías)
document.querySelectorAll(".tecla").forEach(tecla => {
    tecla.addEventListener("click", () => {
        const nota = tecla.dataset.note;
        manejarEntradaUsuario(nota);
    });
});

// Iniciar el juego mostrando la secuencia
reproducirSecuencia();
