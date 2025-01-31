// Importamos express como framework sobre NodeJS
const express = require('express');

// Inicializamos express
const app = express();

// Pasamos constante app al servidor
const http = require('http').Server(app);

// Pasamos constante http a Socket para la comunicación bidireccional
io = require('socket.io');

// Indicamos que los archivos estáticos se encontrarán en carpeta 'public'
app.use(express.static('./public'));

// Cargamos el 'index.html' como ruta raíz
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})

// Definimos puerto '3000' por defecto
http.listen(3000, () => console.log('SERVER ON'))

// 'connection' se ejecuta la primera vez que se abre una nueva conexión
io.on('connection', (socket) => { 
    // ############ Primer bloque
    // El console.log sólo de imprimirá la primera vez que se abra la conexión
    // console.log('Usuario conectado');

    // Enviamos mensaje desde nuestro servidor al cliente
    // socket.emit('Mi mensaje', 'Este es mi mensaje desde el servidor')

    // ############ Segundo bloque
    console.log('¡Nuevo cliente conectado!');

    // Envío los mensajes al cliente que se conectó
    socket.emit('Mensajes', mensajes);

    // Escucho los mensajes enviados por el cliente y se los propago a todos
    socket.on('Mensajes', data => {
        mensajes.push({socketid: socket.id, mensaje: data})

        /*
        io.socket.emit = envía mensajes globales a todos los clientes 
        conectados al canal de Websocket
        */
        io.socket.emit('Mensajes', mensajes);
    })
})

// Servidor
socket.on('Notificacion', data => {
    console.log(data);
})