/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const socket = io()
const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const nombre = document.getElementById('nombre')
const email = document.querySelector('#email')
const text = document.getElementById('mensaje')
const apellido = document.querySelector('#apellido')
const edad = document.querySelector('#edad')
const alias = document.querySelector('#alias')
const avatar = document.querySelector('#avatar')

const authorSchema = new normalizr.schema.Entity('authors')
const postSchema = new normalizr.schema.Entity('post', {
  author: authorSchema
})
const postsSchema = new normalizr.schema.Entity('posts', { mensajes: [postSchema], authors: [authorSchema] })

function sendMessage () {
  const message = {
    author: {
      id: email.value,
      nombre: nombre.value,
      apellido: apellido.value,
      edad: edad.value,
      alias: alias.value,
      avatar: avatar.value
    },
    text: text.value
  }
  if (text.value) {
    regexEmail.test(message.author.id) ? socket.emit('incomingMessage', message) : alert('Ingrese un email valido para enviar mensaje')
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

const obtenerProductosMocked = () => {
  fetch('/api/productos-test')
    .then(res => res.json())
    .then(data => {
      let productList = ''
      data.forEach(product => {
        productList += `
                  <tr>
                      <th scope="row">${product.id}</th>
                      <td>${product.title}</td>
                      <td>$${product.price}</td>
                      <td>
                          <img src="${product.thumbnail}" alt="imagen" class="img-thumbnail mx-auto d-block" width="80px">
                      </td>
                  </tr>
              `
      })
      document.querySelector('#mockedBody').innerHTML = productList
    })
    .catch(err => console.log(err))
}

socket.on('chat', mensajes => {
  console.log(mensajes)
  /*
  const now = new Date()
  const formattedDate = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
  const texto = messages.map(mensaje => {
    return (`<div>
        <strong class="chat-name">${mensaje.nombre}</strong> [<a class="chat-time">${formattedDate}</a>]:
        <em>${mensaje.text}</em>
        </div>`)
  }).join(' ')

  document.getElementById('messages').innerHTML = texto
*/
  const mensajesNormalizados = normalizr.denormalize(mensajes.result, postsSchema, mensajes.entities)
  if (mensajesNormalizados.mensajes.length < 1) return
  let board = ''
  mensajesNormalizados.mensajes.forEach(msg => {
    board += `
        <p class="msg">
            <span class="from">${msg.author.id}</span>
            <span class="name">${msg.author.nombre} ${msg.author.apellido}: </span>
            <span class="content">${msg.text}</span>
            <img class="thumbnail" src="${msg.author.avatar}" alt="Avatar img" />
        </p>
    `
  })
  document.querySelector('#messages').innerHTML = board
  const compresion = Math.floor(100 - ((JSON.stringify(mensajes).length / JSON.stringify(mensajesNormalizados).length) * 100))
  document.querySelector('#compresion').innerHTML = `Compresión: ${compresion}%`
})

const initProductos = () => {
  obtenerProductos().then(response => {
    document.getElementById('listaPrd').innerHTML = response
  })
    .catch(err => console.log(err))
  // obtengo productos mockeados
  obtenerProductosMocked()
}

socket.on('updateProductos', res => {
  console.log('actualizo prods')
  initProductos()
})

initProductos()
