// Ya podemos empezar los sockets desde el lado del cliente :)
let socket = io.connect();

// Función para imprimir mensajes en 'index.html'
// 'data' contiene arreglo de mensajes que envia el servidor
function render(data) {
    // map itera sobre cada objeto del arreglo y ejecuta la funcion en ellos
    var html = data.map(function(elem) {
        return (`<div>
                    <strong>${elem.author}</strong>:
                    <em>${elem.text}</em>
                </div>`)
    // 'join' separa los elementos del array con un espacio
    }).join (" ");
    // se inserta el template en el div de html
    document.getElementById('messages').innerHTML = html;
}
socket.on('messages', function(data) { render(data); });

// Función addMessage vinculada al formulario
function addMessage(e) {
    var mensaje = {
        // Obtenemos valor de los inputs
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };

    // Envia a través de socket para que lo escuche el servidor
    socket.emit('new-message', mensaje);
    return false;
}
