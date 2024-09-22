// Selecciona todos los elementos que tienen la clase...
const instrucciones = document.querySelectorAll('.instruccion');
const mensajeDeConsola = document.querySelectorAll('.mensaje');
const mensajeDeIa = document.querySelectorAll('.ia');
// Carga el boton siguiente
const siguiente = document.querySelector('.siguiente');
// Carga el boton siguiente
const anterior = document.querySelector('.anterior');
// Carga el boton apagado
const apagado = document.querySelector('.apagado');
// Carga el boton encendido
const encendido = document.querySelector('.encendido');
// Carga las instrucciones
const inicio = document.querySelector('.inicio');
// Carga el piano
const piano = document.querySelector('.piano-contenedor');
// Carga la botonera piano
const pianoMuestra = document.querySelector('.piano-muestra');


// Controlar la imagen que muestra actual
let indiceActual = 0;

// Mostrar la instruccion
function mostrarInstrucciones(indice) {

    instrucciones.forEach(instruccion => {
        instruccion.style.display = 'none'; // Oculta todas las instrucciones
        piano.style.display = 'none'; // Oculta todas las instrucciones
    });

    instrucciones[indice].style.display = 'block'; // Muestra la instruccion actual

    // Controlar la visibilidad de los botones
    if (indiceActual === 0) {
        anterior.style.display = 'none'; // Oculta el botón "Anterior"
    } else {
        anterior.style.display = 'inline'; // Muestra el botón "Anterior"
    }

    if (indiceActual === instrucciones.length - 1) {
        encendido.style.display = 'block'; // Mostrar el botón "ON" 
        mensajeDeConsola[0].style.display = 'block'; // Mostrar el mensaje probemos
        siguiente.style.display = 'none'; // Oculta el botón "Siguiente" 
        apagado.style.display = 'none'; // Mostrar el botón "OFF" 
    } else {
        siguiente.style.display = 'block'; // Mostrar el botón "Siguiente"
        encendido.style.display = 'none'; // Oculta el botón "ON" 
        apagado.style.display = 'block'; // Mostrar el botón "OFF"        
        mensajeDeConsola[0].style.display = 'none'; // Oculta el mensaje probemos
    }
}

function continuar() {
    // Aumentar el índice
    indiceActual++;
    // Mostrar la nueva instruccion
    mostrarInstrucciones(indiceActual);
}

function volver() {
    // Disminuir el índice
    indiceActual--;
    // Mostrar la nueva instruccion
    mostrarInstrucciones(indiceActual);
}

function encenderPiano() {
    inicio.style.display = 'none'; // Oculta todo
    piano.style.display = 'block'; // Muestra el piano
    melodía();
}

function cancelar() {
    inicio.style.display = 'block'; // Oculta todo
    piano.style.display = 'none'; // Oculta el piano
    clearInterval(intervaloMelodia); // Detiene la reproducción de la melodía si está sonando
    notaActual = 0; // Reiniciar la secuencia de notas
    audios.forEach(audio => {
        audio.pause();             // Pausa el audio
        audio.currentTime = 0;     // Reinicia el tiempo a 0
    });
}


mostrarInstrucciones(indiceActual);

// Secuencia de notas
const secuenciaDeNotas = [
    "do", "do", "sol", "sol", "la", "la", "sol",
    "fa", "fa", "mi", "mi", "re", "re", "do",
    /*"sol", "sol", "fa", "fa", "mi", "mi", "re", 
    "sol", "sol", "fa", "fa", "mi", "mi", "re"*/
];


// Cantidad de notas acertadas para cada nivel
const ia1 = Math.ceil(secuenciaDeNotas.length / 2); // Primer tercio
const ia2 = ia1 * 2 - 1; // Segundo tercio
const ia3 = secuenciaDeNotas.length; // Tercer tercio

// Mapeo de teclas a notas
const mapeoTeclas = {
    'e': 'do',
    'r': 're',
    't': 'mi',
    'y': 'fa',
    'u': 'sol',
    'i': 'la',
    'o': 'si',
    'E': 'do',
    'R': 're',
    'T': 'mi',
    'Y': 'fa',
    'U': 'sol',
    'I': 'la',
    'O': 'si'
};

//Tiempo estimado que dura cada nota
const duracionNota = 150;
// identificador del intervalo de la melodía
let intervaloMelodia;
//Controla por que nota va
let notaActual = 0;

// Reproduce el sonido de la nota
function reproducirSonido(nota) {
    const audio = new Audio(`data/${nota}.mp3`);
    audio.play();
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

//Empieza a sonar la melodia

function melodía() {
    mensajeDeConsola.forEach(mensajeDeConsola => {
        mensajeDeConsola.style.display = 'none'; // Oculta todos los mensajes}
    });
    mensajeDeConsola[1].style.display = 'block'; // Mostrar el mensaje 

    mensajeDeIa.forEach(mensajeDeIa => {
        mensajeDeIa.style.display = 'none'; // Oculta todos los mensajes}
    });

    intervaloMelodia = setInterval(() => {
        if (notaActual < secuenciaDeNotas.length) {
            const nota = secuenciaDeNotas[notaActual];
            activarTecla(nota);
            notaActual++;
        } else {
            clearInterval(intervaloMelodia); // Detener la melodía cuando haya terminado
            notaActual = 0; // Reiniciar para jugar de nuevo
            document.addEventListener('keydown', teclaPresionada);
            mensajeDeConsola.forEach(mensajeDeConsola => {
                mensajeDeConsola.style.display = 'none'; // Oculta todos los mensajes}
            });
            mensajeDeConsola[2].style.display = 'block'; // Mostrar el mensaje 
        }
    }, 500);
}


//Verifica si las teclas presionadas son las correctas
function controlDeTeclaPresionada(nota) {
    const notaCorrecta = secuenciaDeNotas[notaActual];

    if (nota === notaCorrecta) { // Comparar los valores de las notas
        notaActual++;
        activarTecla(nota);
        if (notaActual == ia3) {
            notaActual = 0;
            mensajeDeConsola.forEach(mensajeDeConsola => {
                mensajeDeConsola.style.display = 'none'; // Oculta todos los mensajes
            });
            mensajeDeConsola[5].style.display = 'block'; // Mostrar el mensaje 

            mensajeDeIa.forEach(mensajeDeIa => {
                mensajeDeIa.style.display = 'none'; // Oculta todos los mensajes
            });
            mensajeDeIa[2].style.display = 'block'; // Mostrar el mensaje 
            document.removeEventListener('keydown', teclaPresionada);
            audios[2].play();
        }

    } else {

        if (notaActual < ia1) {
            mensajeDeConsola.forEach(mensajeDeConsola => {
                mensajeDeConsola.style.display = 'none'; // Oculta todos los mensajes}
            });
            mensajeDeIa.forEach(mensajeDeIa => {
                mensajeDeIa.style.display = 'none'; // Oculta todos los mensajes}
            });
            mensajeDeIa[0].style.display = 'block'; // Mostrar el mensaje 
            mensajeDeConsola[3].style.display = 'block'; // Mostrar el mensaje         
            document.removeEventListener('keydown', teclaPresionada);
            audios[0].play();
        } else if (notaActual > ia1 && notaActual < ia2) {
            mensajeDeConsola.forEach(mensajeDeConsola => {
                mensajeDeConsola.style.display = 'none'; // Oculta todos los mensajes}
            });
            mensajeDeIa.forEach(mensajeDeIa => {
                mensajeDeIa.style.display = 'none'; // Oculta todos los mensajes}
            });
            mensajeDeIa[1].style.display = 'block'; // Mostrar el mensaje 
            mensajeDeConsola[4].style.display = 'block'; // Mostrar el mensaje 
            document.removeEventListener('keydown', teclaPresionada);
            audios[1].play();

        }

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


const audios = document.querySelectorAll('.miAudio');
const botonPlay = document.querySelectorAll('.play');
const botonPause = document.querySelectorAll('.pause');
const barraProgreso = document.querySelectorAll('.progreso');

// Inicializar el estado de los botones
function inicializarBotones() {
    botonPause.forEach(btn => btn.style.display = 'none');
}

inicializarBotones();
audios.forEach((audio, index) => {

    audio.addEventListener('timeupdate', () => {
        const progressValue = (audio.currentTime / audio.duration) * 100;
        barraProgreso[index].value = progressValue;
    });

    audio.addEventListener('play', () => {
        botonPlay[index].style.display = 'none'; // Oculta el botón de reproducir
        botonPause[index].style.display = 'inline'; // Muestra el botón de pausar
    });

    audio.addEventListener('pause', () => {
        botonPause[index].style.display = 'none'; // Oculta el botón de pausar
        botonPlay[index].style.display = 'inline'; // Muestra el botón de reproducir
    });
});

function reproducir(index) {
    audios[index].play();
}

function pausar(index) {
    audios[index].pause();
}