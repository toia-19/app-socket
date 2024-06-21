const express = require('express');
const app = express();
const server = require('http').Server(app);

// Servidor de WEBSOCKET
const io = require('socket.io')(server);

// Indicamos ruta donde estarán los ficheros estáticos usando middleware | public tiene index y main
app.use(express.static('public'));

// Contador de tiempo d espera
function iniciarContador() {
    let minutos = 0;
    let segundos = 0;

    const intervalo = setInterval(() => {
        segundos++; // Incrementamos los segundos
        if (segundos === 60) {
            // Si llegamos a 60 segundos, reiniciamos los segundos y aumentamos los minutos
            segundos = 0;
            minutos++;
        }

        console.log(`Tiempo transcurrido: ${minutos} minutos ${segundos} segundos`);

        // Enviamos el tiempo a los objetos del arreglo 'messages'
        messages.forEach((mensaje) => {
            mensaje.tiempo = `Tiempo de espera: ${minutos}:${segundos}`;
        });
    }, 1000); // Intervalo de 1 segundo (1000 milisegundos)

    setTimeout(() => {
        clearInterval(intervalo);
        console.log("Contador detenido después de 10 minutos.");
    }, 10 * 60000);
}

// Ejecutamos la función para iniciar el contador
iniciarContador();

// Arreglo de mensajes locales
let messages = [
    { nombre: "Juan", apellido: "Caceres", turno: "", tiempo: "" },
    { nombre: "Pedro", apellido: "Aguilar", turno: "", tiempo: "" },
    { nombre: "Ana", apellido: "Carreras", turno: "", tiempo: "" }
];

// Número turno random
function generarTurnoAleatorio() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';

    const letraAleatoria = letras[Math.floor(Math.random() * letras.length)];
    const numeroAleatorio = numeros[Math.floor(Math.random() * numeros.length)];

    return letraAleatoria + numeroAleatorio;
}
// Asignamos el turno aleatorio a cada author del arreglo 'messages'
messages.forEach((mensaje) => {
    mensaje.turno = generarTurnoAleatorio();
});

// Tomamos la posición 0 del turno seleccionado
let turnoSelect = messages[0];

// Servidor de websocket atento a posible conexión (pasamos mensaje 'connection')
io.on('connection', function (socket) {
    console.log('¡Un cliente se ha conectado con éxito!');
    // Enviamos el array de objetos con el evento 'messages'
    socket.emit('messages', messages);

    socket.emit('turno_actual', turnoSelect);

    // Socket escucha evento 'new-message' y cuando llegue trae los datos por 'data'
    socket.on('new-message', function (data) {
        // Pusheamos el nuevo mensaje ingresado por el usuario
        messages.push(data);

        // Le asignamos un número de turno random al nuevo usuario
        messages.forEach((mensaje) => {
            mensaje.turno = generarTurnoAleatorio();
        });

        /* Usando socket.emit creamos comunicación '1:1', pero la sala de chat es privada
        por lo que se debe notificar a todos los clientes conectados usando io.sockets.emit*/
        io.sockets.emit('messages', messages);
    })
})

// Servidor corriendo en puerto: 8080
server.listen(8080, () => {
    console.log('Servidor corriendo en: http://localhost:8080');
})