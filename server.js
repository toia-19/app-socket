const express = require('express');
const app = express();
const server = require('http').Server(app);

// Servidor de WEBSOCKET
const io = require('socket.io') (server);

// Indicamos ruta donde estarán los ficheros estáticos usando middleware | public tiene index y main
app.use(express.static('public'));

// Arreglo de mensajes locales
let messages = [
    { author: "Juan", text: "Hola, ¡Qué tal!" },
    { author: "Pedro", text: "Muy bien, ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
];

// Servidor de websocket atento a posible conexión (pasamos mensaje 'connection')
io.on('connection', function(socket){
    console.log('¡Un cliente se ha conectado con éxito!');
    // Enviamos el array de objetos con el evento 'messages'
    socket.emit('messages', messages)

    // Socket escucha evento 'new-message' y cuando llegue trae los datos por 'data'
    socket.on('new-message', function(data){
        // Pusheamos el nuevo mensaje ingresado por el usuario
        messages.push(data);

        /* Usando socket.emit creamos comunicación '1:1', pero la sala de chat es privada
        por lo que se debe notificar a todos los clientes conectados usando io.sockets.emit*/
        io.sockets.emit('messages', messages)
    })
})

// Servidor corriendo en puerto: 8080
server.listen(8080, ()=>{
    console.log('Servidor corriendo en: http://localhost:8080');
})