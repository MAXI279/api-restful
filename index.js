const express = require('express')

const rutasApi = require('./routes/app.routes')
const rutasWeb = require('./routes/web.routes')

const app = express()
const PORT = process.env.PORT || 8080

app.use('/public', express.static('public'))

app.set('view engine', 'ejs')

app.use('/', rutasWeb)
app.use('/api', rutasApi)

const server = app.listen(PORT, () => {
  console.log('Servidor Online')
})

server.on('error', (error) => {
  console.error(`Ha ocurrido un error, reintente. Detalle: ${error}`)
})
