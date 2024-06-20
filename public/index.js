// Ya podemos empezar los sockets desde el lado del cliente :)
/*
const socket = io();

// Cliente
socket.on('Mi mensaje', data => {
    alert(data);

    // Enviamos información del cliente al servidor
    socket.emit('Notificación', 'Mensaje recibido exitosamente');
})
*/

// ##################################### 13/06

let socket = io.connect();

socket.on('messages', function(data) {
    console.log(data);
});

function render(data){
    var html = data.map(function(elem, index){
        return(`<div>
                <strong>${elem.author}</strong>:
                <em>${elem.text}</em></div>`)
    }).join('');
    document.getElementById('messages').innerHTML = html;
}
socket.on('messages', function(data) {render(data);});