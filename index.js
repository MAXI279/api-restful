const express = require('express')
const { engine } = require('express-handlebars')
const path = require('path')
const http = require('http')
const rutasApi = require('./routes/app.routes')
const rutasWeb = require('./routes/web.routes')
const { knexSqlite3, chatTable, prodTable } = require('./data/config')
const Contenedor = require('./utils/manejo-knex')
const initDB = require('./data/initDB')

const app = express()
const PORT = process.env.PORT || 8080

const server = http.createServer(app)
const io = require('socket.io')(server)
const { chatSocket } = require('./socket/index')

initDB(chatTable, prodTable)
const contenedor = new Contenedor(chatTable, knexSqlite3)

const chat = []

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

chatSocket(contenedor, io, chat)

app.use('/api', rutasApi)

server.listen(PORT, () => {
  console.log('Servidor Online')
})
