// Secuencia de notas
const secuenciaDeNotas = ["do", "do", "sol", "sol", "la", "la", "sol", "fa", "fa", "mi", "mi", "re", "re", "do"];
let notaActual = 0;

// Cantidad de notas acertadas para cada nivel
const ia1 = Math.ceil(secuenciaDeNotas.length / 3); // Primer tercio
const ia2 = ia1 * 2; // Segundo tercio

let mensaje;

// Mapeo de teclas a notas
const mapeoTeclas = {
    'e': 'do',
    'r': 're',
    't': 'mi',
    'y': 'fa',
    'u': 'sol',
    'i': 'la',
    'o': 'si'
};

const duracionNota = 200;

// Reproduce el sonido de la nota
function reproducirSonido(nota) {
    const audio = new Audio(`data/${nota}.mp3`);
    audio.play().catch(error => console.log(error));
}

// Activa la tecla
function activarTecla(nota) {
    const tecla = document.querySelector(`.tecla[data-note="${nota}"]`);
    if (tecla) {
        tecla.classList.add('active'); // Rellena
        reproducirSonido(nota); // Reproducir el sonido

        // Saca el relleno
        setTimeout(() => {
            tecla.classList.remove('active');
        }, duracionNota);
    }
}

function controlDeTeclaPresionada(nota) {
    const notaCorrecta = secuenciaDeNotas[notaActual];
    if (nota === notaCorrecta) { // Comparar los valores de las notas
        notaActual++;
        activarTecla(nota);
        console.log(`Nota tocada: ${nota}`); // Mensaje en la consola
    } else {
        if (notaActual < ia1) {
            mensaje = "¡Falta mucha práctica!";
        } else if (notaActual < ia2) {
            mensaje = "¡Eres bueno, pero te falta un poco de práctica!";
        } else {
            mensaje = "¡Bien hecho!";
        }
        alert(mensaje);
        notaActual = 0; // Reiniciar para jugar de nuevo
    }
}

// Manejo de la tecla presionada
function teclaPresionada(event) {
    const tecla = event.key;
    const nota = mapeoTeclas[tecla]; // Obtiene la nota asociada a la tecla presionada
    if (nota) {
        controlDeTeclaPresionada(nota); // Pasar la nota a la función
    }
}

function estamosJugando() {
    document.addEventListener('keydown', teclaPresionada);
}

estamosJugando();
