const express = require('express')
const { engine } = require('express-handlebars')
const path = require('path')
const rutasApi = require('./routes/app.routes')
const rutasWeb = require('./routes/web.routes')

const app = express()
const PORT = process.env.PORT || 8080

app.use('/public', express.static('public'))

app.engine('handlebars', engine({
  extname: 'hbs',
  defaultLayout: 'main.hbs',
  layoutsDir: path.resolve(__dirname, './views/layouts'),
  partialsDir: path.resolve(__dirname, './views/partials')
}))
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use('/', rutasWeb)
app.use('/api', rutasApi)

const server = app.listen(PORT, () => {
  console.log('Servidor Online')
})

server.on('error', (error) => {
  console.error(`Ha ocurrido un error, reintente. Detalle: ${error}`)
})
