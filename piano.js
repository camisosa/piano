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
                mensajeDeConsola.style.display = 'none'; // Oculta todos los mensajes}
            });
            mensajeDeConsola[5].style.display = 'block'; // Mostrar el mensaje 

            mensajeDeIa.forEach(mensajeDeIa => {
                mensajeDeIa.style.display = 'none'; // Oculta todos los mensajes}
            });
            mensajeDeIa[2].style.display = 'block'; // Mostrar el mensaje 

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

        } else if (notaActual > ia1 && notaActual < ia2) {
            mensajeDeConsola.forEach(mensajeDeConsola => {
                mensajeDeConsola.style.display = 'none'; // Oculta todos los mensajes}
            });
            mensajeDeIa.forEach(mensajeDeIa => {
                mensajeDeIa.style.display = 'none'; // Oculta todos los mensajes}
            });
            mensajeDeIa[1].style.display = 'block'; // Mostrar el mensaje 
            mensajeDeConsola[4].style.display = 'block'; // Mostrar el mensaje 
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


// Selecciona todos los elementos que tienen la clase "diapositiva"
const diapositivas = document.querySelectorAll('.diapositiva');
const mensajeDeConsola = document.querySelectorAll('.mensajeConsola');
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
const instrucciones = document.querySelector('.carrusel');
// Carga el piano
const piano = document.querySelector('.piano-contenedor');
// Carga la botonera piano
const pianoMuestra = document.querySelector('.piano-muestra');


// Controlar la imagen que muestra actual
let indiceActual = 0;

// Mostrar la diapositiva
function mostrarDiapositiva(indice) {
    diapositivas.forEach(diapositiva => {
        diapositiva.style.display = 'none'; // Oculta todas las diapositivas
        piano.style.display = 'none'; // Oculta todas las diapositivas
    });

    diapositivas[indice].style.display = 'block'; // Muestra la diapositiva actual

    // Controlar la visibilidad de los botones
    if (indiceActual === 0) {
        anterior.style.display = 'none'; // Oculta el botón "Anterior"
    } else {
        anterior.style.display = 'block'; // Muestra el botón "Anterior"
    }

    if (indiceActual === diapositivas.length - 1) {
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

//Avanzar a la siguiente diapositiva
function continuar() {
    // Aumentar el índice
    indiceActual++;
    // Mostrar la nueva diapositiva
    mostrarDiapositiva(indiceActual);
}

// Función para retroceder a la diapositiva anterior
function volver() {
    // Disminuir el índice
    indiceActual--;
    // Mostrar la nueva diapositiva
    mostrarDiapositiva(indiceActual);
}

function encenderPiano() {
    instrucciones.style.display = 'none'; // Oculta todas las diapositivas
    encendido.style.display = 'none'; // Oculta el botón "ON" 
    apagado.style.display = 'block'; // Mostrar el botón "OFF" 
    anterior.style.display = 'none'; // Oculta el botón "Anterior"
    piano.style.display = 'block'; // Muestra el piano
    pianoMuestra.style.display = 'none'; // Muestra el piano
    melodía();
}

function cancelar() {
    if (indiceActual == diapositivas.length - 1) {
        instrucciones.style.display = 'block'; // Mostrar las instrucciones
        anterior.style.display = 'block'; // Mostrar el botón "Anterior"
        encendido.style.display = 'block'; // Muestra el botón "ON" 
        apagado.style.display = 'none'; // Mostrar el botón "OFF" 
        piano.style.display = 'none'; // Oculta el piano
        mensajeDeConsola.style.display = 'block'; // Mostrar el botón "ON" 
        pianoMuestra.style.display = 'block'; // Muestra el piano
        clearInterval(intervaloMelodia); // Detiene la reproducción de la melodía si está sonando
        notaActual = 0; // Reiniciar la secuencia de notas
    }     
}


mostrarDiapositiva(indiceActual);
