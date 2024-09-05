// Secuencia de notas para
const secuencia = ["do", "do", "sol", "sol", "la", "la", "sol", "fa", "fa", "mi", "mi", "re", "re", "do"];
let notaActual = 0;

// niveles de conocimientos
const ia1 = Math.ceil(secuencia.length / 2,5);
const ia2 = ia1 * 2;

// de teclas a notas
const mapeoTeclas = {
    'e': 'do',
    'r': 're',
    't': 'mi',
    'y': 'fa',
    'u': 'sol',
    'i': 'la',
    'o': 'si'
};

// duracion de las notas
const duracionNota = 200;

// reproduce el sonido de la nota
function reproducirSonido(nota) {
    const audio = new Audio(`data/${nota}.mp3`);
    audio.play().catch();
}
function activarTecla(nota) {
    const tecla = document.querySelector(`.tecla[data-note="${nota}"]`);
    if (tecla) {
        tecla.classList.add('active'); // rellena
        reproducirSonido(nota); // reproducir el sonido

        // saca el relleno
        setTimeout(() => {
            tecla.classList.remove('active');
        }, duracionNota);
    }
}

// datos de entrada del teclado
function teclaPresionada(tecla) {
    const nota = mapeoTeclas[tecla.key]; // obtiene la nota asociada a la tecla presionada
    if (nota) {
        const unaTeclaFuePresionada = document.querySelector(`.tecla[data-note="${nota}"]`);
        if (unaTeclaFuePresionada) {
            activarTecla(nota);
        }
    }
}


document.addEventListener('keydown', teclaPresionada);
