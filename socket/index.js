
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
