
const chatSocket = (contenedor, io, chat) => {
  io.on('connection', async socket => {
    obtenerChatsYActualizar()
    socket.on('incomingMessage', async message => {
      await contenedor.save(message).then((res) => {
        obtenerChatsYActualizar()
        emitir()
      }).catch(async err => {
        console.log(err)
      })
    })

    socket.on('nuevoProducto', data => {
      console.log('se crea nuevo producto')
      emitirUpdateProductos()
    })
  })

  const emitir = () => io.sockets.emit('chat', chat)

  const emitirUpdateProductos = () => io.sockets.emit('updateProductos')
  /*
  const emitirProductos = () => io.sockets.emit('productos', chat)

  const solicitarProductos = async () => {
    try {
      return await fetch('http://localhost:8080/api/productos')
    } catch (error) {
      console.log(error)
    }
    const productos = 1
  } */

  const obtenerChatsYActualizar = async () => {
    await contenedor.getAll().then((res) => {
      chat = res
      emitir()
    }).catch(async err => {
      console.log(err)
    })
  }
}

module.exports = { chatSocket }
