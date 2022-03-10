const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const { engine } = require('express-handlebars')
const passport = require('./middlewares/passport')
const path = require('path')
const http = require('http')
const rutasApi = require('./routes/app.routes')
const rutasWeb = require('./routes/web.routes')
const { knexSqlite3, chatTable, prodTable } = require('./data/config')
const Contenedor = require('./utils/manejo-knex')
const initDB = require('./data/initDB')
const env = require('./env.config')

const app = express()
const PORT = env.PORT || 8080

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

app.use(session({
  name: 'my-session',
  store: MongoStore.create({
    mongoUrl: env.MONGO_URL,
    mongoOptions: advancedOptions
  }),
  secret: 'stringUltraSecreto',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 60000
  }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', rutasWeb)

chatSocket(contenedor, io, chat)

app.use('/api', rutasApi)

server.listen(PORT, async () => {
  mongoose.connect(env.MONGO_URL)
    .then(() => {
      console.log('Connected to DB!')
      console.log('Server is up and running on port: ', +PORT)
    })
})
