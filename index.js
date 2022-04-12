const express = require('express')
const session = require('express-session')
const compression = require('compression')
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
const process = require('process')
const cluster = require('cluster')
const os = require('os')
const { puerto, modo } = require('./utils/minimist')
const logger = require('./logs')
const infoLog = require('./middlewares/log.middleware')
const apiErrorHandler = require('./error/api-error-handler')

const modoCluster = modo === 'CLUSTER'
// console.log(`${modoCluster} Y ${modo} y ${cluster.isPrimary}`)

if (modoCluster && cluster.isPrimary) {
  const NUM_WORKERS = os.cpus().length
  // console.log(NUM_WORKERS)
  console.log(` PRIMARY PID => ${process.pid}`)
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    console.log(` Worker ${worker.process.pid} exitted`)
    cluster.fork()
  })
} else {
  const PORT = env.PORT || 8080
  const app = express()

  const server = http.createServer(app)
  const io = require('socket.io')(server)
  const { chatSocket } = require('./socket/index')

  initDB(chatTable, prodTable)
  const contenedor = new Contenedor(chatTable, knexSqlite3)

  const chat = []

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

  chatSocket(contenedor, io, chat)

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

  server.listen(PORT, async () => {
    mongoose.connect(env.MONGO_URL)
      .then(() => {
        console.log('Connected to DB!')
        console.log('Server is up and running on port: ', +PORT)
      })
  })
}
