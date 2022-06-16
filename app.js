const express = require('express')
const session = require('express-session')
const compression = require('compression')
const MongoStore = require('connect-mongo')
const os = require('os')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const { engine } = require('express-handlebars')
const passport = require('./middlewares/passport')
const path = require('path')
const rutasApi = require('./routes/app.routes')
const env = require('./env.config')
const logger = require('./logs')
const infoLog = require('./middlewares/log.middleware')
const apiErrorHandler = require('./error/api-error-handler')

const app = express()

const rutasWeb = require('./routes/web.routes')

app.use('/public', express.static('public'))

app.use(infoLog) // middleware que loggea en consola todos los request

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

app.use('/info', (req, res, next) => {
  try {
    const info = {
      ruta: '/info',
      NUMERO_DE_PROCESADORES: os.cpus().length,
      ARGUMENTOS_ENTRADA: process.argv,
      SISTEMA_OPERATIVO: process.platform,
      VERSION_NODE: process.version,
      MEMORIA_RSS: process.memoryUsage().rss,
      PATH_EJECUCION: process.execPath,
      PROCESS_ID: process.pid,
      CARPETA_PROYECTO: process.cwd()
    }
    return res.json(info)
  } catch (error) {
    next(error)
  }
})

app.use('/info-bloq', (req, res, next) => {
  try {
    const info = {
      ruta: '/info',
      NUMERO_DE_PROCESADORES: os.cpus().length,
      ARGUMENTOS_ENTRADA: process.argv,
      SISTEMA_OPERATIVO: process.platform,
      VERSION_NODE: process.version,
      MEMORIA_RSS: process.memoryUsage().rss,
      PATH_EJECUCION: process.execPath,
      PROCESS_ID: process.pid,
      CARPETA_PROYECTO: process.cwd()
    }
    console.log(info)
    return res.json(info)
  } catch (error) {
    next(error)
  }
})

app.use('/infoZip', compression(), (req, res, next) => {
  try {
    const info = {
      ruta: '/info',
      NUMERO_DE_PROCESADORES: os.cpus().length,
      ARGUMENTOS_ENTRADA: process.argv,
      SISTEMA_OPERATIVO: process.platform,
      VERSION_NODE: process.version,
      MEMORIA_RSS: process.memoryUsage().rss,
      PATH_EJECUCION: process.execPath,
      PROCESS_ID: process.pid,
      CARPETA_PROYECTO: process.cwd()
    }
    return res.json(info)
  } catch (error) {
    next(error)
  }
})

app.use('/api', rutasApi)
app.use(apiErrorHandler)

app.all('*', (req, res) => {
  const respuesta = `ruta ${req.url} método ${req.method} no implementada`
  logger.warn(respuesta)
  return res.status(404).json({
    error: -2,
    descripcion: respuesta
  })
})

module.exports = app
