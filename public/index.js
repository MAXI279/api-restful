/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const socket = io()
const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const nombre = document.getElementById('nombre')
const text = document.getElementById('mensaje')

function sendMessage () {
  const message = {
    nombre: nombre.value,
    text: text.value
  }
  if (text.value) {
    regexEmail.test(message.nombre) ? socket.emit('incomingMessage', message) : alert('Ingrese un email valido para enviar mensaje')
  }

  text.value = ''
  text.focus()
}

function sendProducto () {
  socket.emit('nuevoProducto')
}

const obtenerProductos = async () => {
  return fetch('http://localhost:8080/productos').then((res) => {
    return res.text()
  })
    .catch(err => console.log(err))
}

socket.on('chat', messages => {
  const now = new Date()
  const formattedDate = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
  const texto = messages.map(mensaje => {
    return (`<div>
        <strong class="chat-name">${mensaje.nombre}</strong> [<a class="chat-time">${formattedDate}</a>]:
        <em>${mensaje.text}</em>
        </div>`)
  }).join(' ')

  document.getElementById('messages').innerHTML = texto
})

const initProductos = () => {
  obtenerProductos().then(response => {
    document.getElementById('listaPrd').innerHTML = response
  })
    .catch(err => console.log(err))
}

socket.on('updateProductos', res => {
  console.log('actualizo prods')
  initProductos()
})

initProductos()
