// Ya podemos empezar los sockets desde el lado del cliente :)
const socket = io();

// Cliente
socket.on('Mi mensaje', data => {
    alert(data);

    // Enviamos información del cliente al servidor
    socket.emit('Notificación', 'Mensaje recibido exitosamente');
})